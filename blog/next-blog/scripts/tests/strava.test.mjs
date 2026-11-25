import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseRides, fetchRides, STRAVA_WIDGET_URL } from '../activity.mjs';

const widget = readFileSync(new URL('./fixtures/strava-latest-rides.html', import.meta.url), 'utf8');

test('Strava widget rides keep ids, cleaned titles, ISO days, and the widget’s own numbers', () => {
  const rides = parseRides(widget);
  assert.equal(rides.length, 5);
  assert.deepEqual(rides[0], {
    id: '21078520549', href: 'https://www.strava.com/activities/21078520549', title: 'Sunday Morning Ride',
    date: '2026-11-22', virtual: false, distanceKm: 41.3, elapsedSeconds: 13272, climbMeters: 282,
  });
  assert.deepEqual(rides.slice(1, 3).map(ride => [ride.title, ride.virtual, ride.elapsedSeconds]), [
    ['Coast to Coast in Watopia', true, 3194], ['Big Gear SST - 3x5', true, 2279],
  ]);
  assert.equal(parseRides(widget, 2).length, 2);
});

test('Strava widget rides are always newest first, even if the widget order changes', () => {
  const [head, ...blocks] = widget.split(/(?=<li>\s*<a class='map-thumb')/);
  const end = blocks.at(-1).lastIndexOf('</li>') + '</li>'.length;
  const tail = blocks.at(-1).slice(end);
  blocks[blocks.length - 1] = blocks.at(-1).slice(0, end);
  const rides = parseRides(head + blocks.reverse().join('') + tail);
  assert.equal(rides.length, 5);
  assert.equal(rides[0].title, 'Sunday Morning Ride');
  assert.deepEqual(rides.map(ride => ride.date), [...rides.map(ride => ride.date)].sort().reverse());
});

test('Strava widget decodes entities and never carries markup or tracking parameters through', () => {
  const html = widget.replace('Sunday Morning Ride</a>', 'Tom &amp; Jerry &#39;s &lt;b&gt;ride&lt;/b&gt;</a>');
  const [ride] = parseRides(html);
  assert.equal(ride.title, 'Tom & Jerry \'s <b>ride</b>');
  assert(!ride.href.includes('utm_'));
  assert.match(ride.href, /^https:\/\/www\.strava\.com\/activities\/\d+$/);
});

test('Strava widget drops rides it cannot read and returns nothing for other pages', () => {
  for (const html of ['', '<html><body>Sign in</body></html>', "<ul class='activities'></ul></div>"]) assert.deepEqual(parseRides(html), []);
  const miles = widget.replace('<li>41.3 km</li>', '<li>25.7 mi</li>');
  assert.equal(parseRides(miles).length, 4);
  const badDate = widget.replace('Sunday, November 22, 2026', 'someday');
  assert.equal(parseRides(badDate).length, 4);
  const offsite = widget.replace('https://www.strava.com/activities/21078520549', 'https://evil.example/activities/1');
  assert.equal(parseRides(offsite).length, 4);
});

test('fetching rides uses the public widget and falls back to an empty list on any failure', async () => {
  let requested;
  const ok = async url => { requested = url; return new Response(widget); };
  assert.equal((await fetchRides(ok)).length, 5);
  assert.equal(requested, STRAVA_WIDGET_URL);
  const failures = [async () => new Response('', { status: 503 }), async () => new Response('<html>changed</html>'), async () => { throw new Error('offline'); }];
  for (const failure of failures) assert.deepEqual(await fetchRides(failure), []);
});
