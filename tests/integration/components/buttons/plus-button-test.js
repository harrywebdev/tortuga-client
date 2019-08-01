import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | buttons/plus-button', function(hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function(assert) {
        await render(hbs`<Buttons::PlusButton />`);

        assert.equal(this.element.querySelectorAll('.plus-button').length, 1);
    });
});
