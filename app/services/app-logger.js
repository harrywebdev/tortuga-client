import Service from '@ember/service';
import { withScope, captureException } from '@sentry/browser';

export default class AppLoggerService extends Service {
    error(error, fatal = false) {
        if (fatal) {
            withScope(scope => {
                scope.setLevel('fatal');
                // will be tagged with my-tag="my value"
                captureException(error);
            });
            return;
        }

        captureException(error);
    }
}
