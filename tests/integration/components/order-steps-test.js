import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | order-steps', function(hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function(assert) {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.set('myAction', function(val) { ... });

        this.set('selectTab', function() {
            //
        });

        await render(hbs`<OrderSteps @selectTab={{action selectTab}}/>`);

        assert.equal(this.element.querySelectorAll('.order-steps').length, 1);
    });
});
