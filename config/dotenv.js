/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function(env) {
    return {
        clientAllowedKeys: [
            'API_HOST',
            'ACCOUNTKIT_APP_ID',
            'ACCOUNTKIT_DEBUG',
            'ACCOUNTKIT_REDIRECT_URL',
            'ACCOUNTKIT_VERSION',
        ],
        fastbootAllowedKeys: [],
        failOnMissingKey: true,
        path: path.join(path.dirname(__dirname), `.env.${env}`),
    };
};
