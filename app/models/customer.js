import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model } = DS;

export default Model.extend({
    reg_type: DS.attr('string'),

    account_kit_id: DS.attr('string'),
    code: DS.attr('string'),

    facebook_id: DS.attr('string'),
    access_token: DS.attr('string'),

    name: DS.attr('string'),
    email: DS.attr('string'),
    mobile_country_prefix: DS.attr('string'),
    mobile_national_number: DS.attr('string'),
    mobile_number: DS.attr('string'),

    created_at: DS.attr('date'),
    updated_at: DS.attr('date'),

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
});
