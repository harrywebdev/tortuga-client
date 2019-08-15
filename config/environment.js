'use strict';

module.exports = function(environment) {
    let ENV = {
        modulePrefix: 'tortuga-frontend',
        environment,
        version: '0.5.0',
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
            appId: process.env.ACCOUNTKIT_APP_ID,
            debug: process.env.ACCOUNTKIT_DEBUG === 'true',
            redirectUrl: process.env.ACCOUNTKIT_REDIRECT_URL,
            version: process.env.ACCOUNTKIT_VERSION,
        },

        api: {
            host: process.env.API_HOST,
        },

        'ember-local-storage': {
            namespace: 'tortuga',
            keyDelimiter: '/',
        },

        flashMessageDefaults: {
            destroyOnClick: true,
            timeout: 5000,
            sticky: true,
        },

        sentry: {
            dsn: process.env.SENTRY_DSN,
            debug: environment === 'development',
        },
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'alpha') {
        //
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

    // set Sentry release
    ENV.sentry.release = ENV.version;

    return ENV;
};
