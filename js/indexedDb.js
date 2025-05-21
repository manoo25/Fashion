class IndexedDBManager {
    constructor(dbName = 'AppDB', storeName = 'AppStore') {
        this.dbName = dbName;
        this.storeName = storeName;
        this.dbPromise = null;
    }

    async _initDB() {
        if (this.dbPromise) return this.dbPromise;
        
        this.dbPromise = new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this.dbName, 1);

            request.onerror = (event) => {
                console.error('فشل فتح قاعدة البيانات:', event.target.error);
                reject(event.target.error);
            };

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                }
            };
        });
        
        return this.dbPromise;
    }

    // دالة لحفظ البيانات
    async setItem(key, value) {
        try {
            const db = await this._initDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.storeName, 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.put(value, key);
                
                request.onsuccess = () => resolve();
                request.onerror = (event) => reject(event.target.error);
            });
        } catch (error) {
            console.error('خطأ في حفظ البيانات:', error);
            throw error;
        }
    }

    // دالة لاسترجاع البيانات
    async getItem(key) {
        try {
            const db = await this._initDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.storeName, 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.get(key);
                
                request.onsuccess = () => resolve(request.result);
                request.onerror = (event) => reject(event.target.error);
            });
        } catch (error) {
            console.error('خطأ في استرجاع البيانات:', error);
            throw error;
        }
    }

    // دالة لحذف عنصر محدد
    async removeItem(key) {
        try {
            const db = await this._initDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.storeName, 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.delete(key);
                
                request.onsuccess = () => resolve();
                request.onerror = (event) => reject(event.target.error);
            });
        } catch (error) {
            console.error('خطأ في حذف البيانات:', error);
            throw error;
        }
    }

   
}


const indexedDB = new IndexedDBManager();

export default indexedDB;