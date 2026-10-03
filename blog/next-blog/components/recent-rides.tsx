export default function RecentRides() {
  return (
    <section className="section" aria-labelledby="rides-heading">
      <h2 id="rides-heading" className="activity-heading">Recent rides</h2>
      <iframe
        title="Anshuman Kumar’s latest rides on Strava"
        src="https://www.strava.com/athletes/34639203/latest-rides/55aab79d3b61cb1174268222ef82b6037a7f2268"
        width={300}
        height={454}
        scrolling="no"
        loading="lazy"
        className="strava-widget strava-rides mt-4"
      />
      <a className="meta inline-block mt-3" href="https://www.strava.com/athletes/34639203" target="_blank" rel="noopener noreferrer">View on Strava →</a>
    </section>
  );
}
