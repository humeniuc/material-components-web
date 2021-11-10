/** @license Googler-authored internal-only code. */

import 'jasmine';

import {MDCRadio} from '@material/radio/component';
import {customMatchers} from 'google3/testing/karma/karma_scuba_framework';
import {each, Environment} from 'google3/third_party/javascript/material_components_web/testing/screenshot/environment';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30_000;

describe('MDCRadio in high contrast mode', () => {
  const env = new Environment({name: 'radio'});
  const FAKE_RIPPLE_CLASS = 'mdc-ripple-upgraded--background-focused';
  const EXTRA_PADDING_CLASS = 'test-cell--padding';

  beforeAll(async () => {
    await env.setUp();
    jasmine.addMatchers(customMatchers);

    for (const el of each('.test-cell')) {
      el.classList.add(EXTRA_PADDING_CLASS);
    }
    for (const el of each('.test-container .mdc-radio')) {
      MDCRadio.attachTo(el);
      el.classList.add(FAKE_RIPPLE_CLASS);
    }
  });

  afterAll(async () => {
    for (const el of each('.test-container .mdc-radio')) {
      el.classList.remove(FAKE_RIPPLE_CLASS);
    }

    for (const el of each('.test-cell')) {
      el.classList.remove(EXTRA_PADDING_CLASS);
    }
  });

  it('baseline focus ring', async () => {
    expect(await env.diffElement('hcm_baseline', '.test-baseline'))
        .toHavePassed();
  });

  it('density focus ring', async () => {
    expect(await env.diffElement('hcm_density', '.test-density'))
        .toHavePassed();
  });
});
