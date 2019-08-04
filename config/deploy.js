/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
    let ENV = {
        build: {
            outputPath: 'deploy_dist',
        },
    };

    ENV['revision-data'] = {
        type: 'file-hash',
        scm: null,
    };

    ENV['display-revisions'] = {
        amount: 10,
        revisions: function(context) {
            return context.revisions;
        },
    };

    ENV['simply-ssh'] = {
        connection: {
            // parameter hash accepted by SSH2, see https://github.com/mscdex/ssh2 for details
            host: process.env.SSH_HOST,
            port: process.env.SSH_PORT,
            username: process.env.SSH_USER,
            privateKey: process.env.SSH_KEY,
        },
        dir: process.env.SSH_TARGET_DIR,
        keep: 5,
    };

    if (deployTarget === 'development') {
        ENV.build.environment = 'development';
        // configure other plugins for development deploy target here
    }

    if (deployTarget === 'alpha') {
        ENV.build.environment = 'alpha';
        // configure other plugins for staging deploy target here
    }

    if (deployTarget === 'staging') {
        ENV.build.environment = 'production';
        // configure other plugins for staging deploy target here
    }

    if (deployTarget === 'production') {
        ENV.build.environment = 'production';
        // configure other plugins for production deploy target here
    }

    // Note: if you need to build some configuration asynchronously, you can return
    // a promise that resolves with the ENV object instead of returning the
    // ENV object synchronously.
    return ENV;
};
