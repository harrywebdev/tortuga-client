'use strict';

module.exports = function(environment) {
    let ENV = {
        modulePrefix: 'tortuga-frontend',
        environment,
        rootURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
            },
            EXTEND_PROTOTYPES: {
                // Prevent Ember Data from overriding Date.parse.
                Date: false,
            },
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },

        accountKit: {
            appId: '343032269734440',
            debug: true,
            redirectUrl: 'http://tortuga.frontend.test:4200/',
            version: 'v1.0',
        },

        api: {
            host: '<insert production host here>',
        },

        'ember-local-storage': {
            namespace: 'tortuga',
            keyDelimiter: '/',
        },

        facebookLogin: {
            appId: '343032269734440',
            version: 'v1.0',
        },

        flashMessageDefaults: {
            destroyOnClick: true,
            timeout: 5000,
            sticky: true,
        },
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
        ENV.api.host = 'https://tortuga.backend.test';
    }

    if (environment === 'alpha') {
        ENV.api.host = 'http://api.tatrgel.cz';
        ENV.accountKit.redirectUrl = 'http://tortuga-bay.tatrgel.cz';
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
        ENV.APP.autoboot = false;
    }

    if (environment === 'production') {
        // here you can enable a production-specific feature
    }

    return ENV;
};
