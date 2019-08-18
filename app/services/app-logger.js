import Service from '@ember/service';
import { withScope, captureException, captureMessage } from '@sentry/browser';
import { inject as service } from '@ember/service';

export default class AppLoggerService extends Service {
    @service metrics;

    error(error, fatal = false, extras = null) {
        if (fatal) {
            withScope(scope => {
                scope.setLevel('fatal');

                if (extras) {
                    scope.setExtra('extras', extras);
                }

                captureException(error);
            });
            return;
        }

        withScope(scope => {
            if (extras) {
                scope.setExtra('extras', extras);
            }

            captureException(error);
        });
    }

    log(message, extras = null) {
        withScope(scope => {
            if (extras) {
                scope.setExtra('extras', extras);
            }

            captureMessage(message);
        });
    }

    reportToAnalytics(event) {
        this.metrics.trackEvent({
            category: event.category,
            action: event.action,
            label: event.label,
            value: event.value,
        });
    }
}
