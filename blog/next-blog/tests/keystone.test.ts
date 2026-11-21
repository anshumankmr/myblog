import assert from 'node:assert/strict';
import test from 'node:test';
import { isKeystonePath } from '../lib/keystone';

test('only the Keystone pages get the Keystone layout; the blog keeps its own', () => {
  for (const path of ['/keystone', '/keystone/', '/keystone/support/', '/keystone/bye/', '/privacy/keystone/']) {
    assert.equal(isKeystonePath(path), true, path);
  }
  for (const path of ['/', '/blogs/', '/about/', '/privacy/', '/keystones/', '/article/2026-10-03/keystone/', null, undefined]) {
    assert.equal(isKeystonePath(path), false, String(path));
  }
});
