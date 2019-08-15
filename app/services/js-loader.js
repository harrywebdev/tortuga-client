import Service from '@ember/service';
import { A } from '@ember/array';
import { isEmpty, isBlank } from '@ember/utils';
import { Promise as EmberPromise } from 'rsvp';

export default class JsLoaderService extends Service {
    _cache = A();

    _isCached(src) {
        return this._cache.includes(src);
    }

    _updateCache(src) {
        this._cache.pushObject(src);
    }

    _getScriptAttr(attr) {
        return Object.assign(
            {
                type: 'text/javascript',
            },
            attr
        );
    }

    _loadJs(attr) {
        return new EmberPromise((resolve, reject) => {
            const attrs = this._getScriptAttr(attr);
            let script = Object.assign(document.createElement('script'), attrs);

            script.addEventListener(
                'load',
                () => {
                    resolve();
                },
                false
            );

            script.addEventListener(
                'error',
                reason => {
                    reject(reason);
                },
                false
            );

            document.getElementsByTagName('body')[0].appendChild(script);
        });
    }

    _isValidAttr(attr) {
        return !isEmpty(attr) && !isEmpty(attr.src) && !isBlank(attr.src);
    }

    load(attr) {
        return new EmberPromise((resolve, reject) => {
            if (!this._isValidAttr(attr)) {
                resolve();
                return;
            }
            if (this._isCached(attr.src)) {
                resolve();
                return;
            }
            this._loadJs(attr).then(
                () => {
                    this._updateCache(attr.src);
                    resolve();
                },
                reason => {
                    reject(reason);
                }
            );
        });
    }
}
