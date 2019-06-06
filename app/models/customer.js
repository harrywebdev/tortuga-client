import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model, attr } = DS;

export default Model.extend({
    reg_type: attr('string'),

    facebook_id: attr('string'),
    account_kit_id: attr('string'),
    code: attr('string'),

    name: attr('string'),
    email: attr('string'),
    mobile_country_prefix: attr('string'),
    mobile_national_number: attr('string'),
    mobile_number: attr('string'),

    created_at: attr('date'),
    updated_at: attr('date'),

    displayRegistrationType: computed('reg_type', function() {
        switch (this.get('reg_type')) {
            case 'facebook':
                return 'Facebook';
            case 'mobile':
                return 'telefon';
            case 'email':
                return 'email';
        }
    }),

    isFacebookLoginCustomer: computed('reg_type', function() {
        return this.get('reg_type') === 'facebook';
    }),

    isMobileCustomer: computed('reg_type', function() {
        return this.get('reg_type') === 'mobile';
    }),
});
