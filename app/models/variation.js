import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;
import { alias } from '@ember/object/computed';

export default Model.extend({
    product: belongsTo('product'),

    title: attr('string'),
    slug: attr('string'),
    description: attr('string'),
    price: attr('number'),
    formatted_price: attr('string'),

    formattedPrice: alias('formatted_price'),
});
