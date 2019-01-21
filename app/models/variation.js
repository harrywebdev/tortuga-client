import DS from 'ember-data';
import { alias } from '@ember/object/computed';

export default DS.Model.extend({
    product: DS.belongsTo('product'),

    title: DS.attr('string'),
    slug: DS.attr('string'),
    description: DS.attr('string'),
    price: DS.attr('number'),
    'formatted-price': DS.attr('string'),

    formattedPrice: alias('formatted-price'),
});
