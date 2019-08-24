import Component from '@ember/component';
import Stickyfill from 'stickyfilljs/dist/stickyfill.es6';

export default class StickyComponent extends Component {
    classNames = ['sticky'];
    classNameBindings = ['_isStuck:sticky--stuck'];

    _scrollListener = null;
    _intersectionObserver = null;
    _isStuck = false;

    didInsertElement() {
        super.didInsertElement(...arguments);

        let options = {
            threshold: 0.5,
        };

        this._intersectionObserver = new IntersectionObserver(this._setupScrollListener.bind(this), options);

        // eslint-disable-next-line
        this._intersectionObserver.observe(this.element);

        // polyfill for older browsers
        Stickyfill.addOne(this.element);
    }

    willDestroyElement() {
        // remove polyfill instance
        Stickyfill.removeOne(this.element);

        // cleanup of scrolling listener
        if (this._scrollListener) {
            window.removeEventListener('scroll', this._scrollListener);
            this._scrollListener = null;
        }

        // cleanup of the observer
        if (this._intersectionObserver) {
            this._intersectionObserver.disconnect();
            this._intersectionObserver = null;
        }

        super.willDestroyElement(...arguments);
    }

    _setupScrollListener(entries) {
        // element in viewport -> attach listeners, init toggle
        if (entries[0].isIntersecting) {
            this._scrollListener = this._toggleClassNames.bind(this);
            this._toggleClassNames();
            window.addEventListener('scroll', this._scrollListener);
            return;
        }

        // element out, remove those listeners + unstuck
        window.removeEventListener('scroll', this._scrollListener);
        this._scrollListener = null;
        this.set('_isStuck', false);
    }

    _toggleClassNames() {
        var rect = this.element.getBoundingClientRect();

        // not at the top yet/again
        if (rect.top > 0) {
            // remove class if there is still one
            if (this._isStuck) {
                this.set('_isStuck', false);
            }
            return;
        }

        // add class if there isn't one yet
        if (!this._isStuck) {
            this.set('_isStuck', true);
        }
    }
}
