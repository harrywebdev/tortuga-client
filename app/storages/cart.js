import StorageObject from 'ember-local-storage/session/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
    initialState() {
        return { items: [] };
    },
});

export default Storage;
