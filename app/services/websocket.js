import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from 'tortuga-frontend/config/environment';
import Pusher from 'pusher-js';

export default class WebSocketService extends Service {
    @service appLogger;

    isOnline = false;
    client = null;

    connect() {
        const pusher = new Pusher(config.pusher.appKey, {
            cluster: config.pusher.appCluster,
            forceTLS: true,
        });

        pusher.connection.bind('error', err => {
            if (err.error.data.code === 4004) {
                this.appLogger.log('Pusher connection limit error', err);
                return;
            }
        });

        pusher.connection.bind('state_change', states => {
            this.set('isOnline', states.current === 'connected');
        });

        this.client = pusher;
    }

    subscribe(channelName, handlers = []) {
        const channel = this.client.subscribe(channelName);

        channel.bind('pusher:subscription_error', status => {
            this.appLogger.log(`Pusher subscription error to channel: ${channelName}`, status);
        });

        handlers.forEach(handler => {
            channel.bind(handler.eventName, handler.eventHandler);
        });
    }

    unsubscribe(channelName) {
        this.client.unsubscribe(channelName);
    }
}
