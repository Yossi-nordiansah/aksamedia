import { openDB } from 'idb';

const dbPromise = openDB('crud-db', 1, {
    upgrade(db) {
        db.createObjectStore('items', {
            keyPath: 'id',
            autoIncrement: true,
        });
    },
});

export const getItems = async () => (await dbPromise).getAll('items');
export const addItem = async (item) => (await dbPromise).add('items', item);
export const updateItem = async (item) => (await dbPromise).put('items', item);
export const deleteItem = async (id) => (await dbPromise).delete('items', id);


