import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend({
    location: config.locationType,
    rootURL: config.rootURL,
    metrics: service(),

    init() {
        this._super(...arguments);

        this.on('routeDidChange', () => {
            const page = this.currentURL;
            const title = this.currentRouteName || 'unknown';
            this.get('metrics').trackPage('GoogleAnalytics', { page, title });
        });
    },
});

Router.map(function() {
    this.route('index', { path: '/' });
    this.route('confirmation', { path: '/hotovo' });

    this.route('catchall', { path: '/*path' });
});

export default Router;
