/*
=========================================================
Project      : LocalShop Platform
Repository   : localshop-platform
File         : storage.js
Version      : 0.1.0
=========================================================
*/

const Storage = {

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    get(key, defaultValue = null) {

        const value = localStorage.getItem(key);

        if (value === null) {
            return defaultValue;
        }

        try {

            return JSON.parse(value);

        } catch (error) {

            return defaultValue;

        }

    },

    remove(key) {

        localStorage.removeItem(key);

    },

    clear() {

        localStorage.clear();

    },

    has(key) {

        return localStorage.getItem(key) !== null;

    },

    setSession(key, value) {

        sessionStorage.setItem(
            key,
            JSON.stringify(value)
        );

    },

    getSession(key, defaultValue = null) {

        const value = sessionStorage.getItem(key);

        if (value === null) {
            return defaultValue;
        }

        try {

            return JSON.parse(value);

        } catch (error) {

            return defaultValue;

        }

    },

    removeSession(key) {

        sessionStorage.removeItem(key);

    },

    clearSession() {

        sessionStorage.clear();

    }

};

Object.freeze(Storage);
