'use strict';

/* eslint-env node */

const getChannelURL = require('ember-source-channel-url');

module.exports = function() {
  return Promise.all([
    getChannelURL('release'),
    getChannelURL('beta'),
    getChannelURL('canary'),
  ]).then(urls => {
    let envWithoutJQuery = {
      EMBER_OPTIONAL_FEATURES: JSON.stringify({ 'jquery-integration': false }),
    };

    return {
      useYarn: true,
      scenarios: [
        {
          name: 'ember-lts-3.12',
          env: envWithoutJQuery,
          npm: {
            devDependencies: {
              'ember-source': '~3.12.0',
            },
          },
        },
        {
          name: 'ember-release',
          env: envWithoutJQuery,
          npm: {
            devDependencies: {
              'ember-source': urls[0],
            },
          },
        },
        {
          name: 'ember-beta',
          env: envWithoutJQuery,
          npm: {
            devDependencies: {
              'ember-source': urls[1],
            },
          },
        },
        {
          name: 'ember-canary',
          env: envWithoutJQuery,
          npm: {
            devDependencies: {
              'ember-source': urls[2],
            },
          },
        },
        {
          name: 'ember-without-application-wrapper',
          env: {
            EMBER_OPTIONAL_FEATURES: JSON.stringify({
              'application-template-wrapper': false,
              'jquery-integration': false,
            }),
          },
          npm: {
            devDependencies: {
              'ember-source': urls[2],
            },
          },
        },
        {
          name: 'ember-default',
          env: envWithoutJQuery,
          npm: {
            devDependencies: {},
          },
        },
      ],
    };
  });
};
