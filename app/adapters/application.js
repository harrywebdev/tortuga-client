import DS from 'ember-data';
import config from 'tortuga-frontend/config/environment';

export default DS.JSONAPIAdapter.extend({
    host: config.api.host,
    namespace: 'api',
});
