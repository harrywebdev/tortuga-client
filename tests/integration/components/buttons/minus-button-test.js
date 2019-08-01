import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | buttons/minus-button', function(hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function(assert) {
        await render(hbs`<Buttons::MinusButton />`);

        assert.equal(this.element.querySelectorAll('.minus-button').length, 1);
    });
});
