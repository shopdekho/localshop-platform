/*
=========================================================
Project      : LocalShop Platform
Repository   : localshop-platform
File         : config.js
Version      : 0.1.0
=========================================================
*/

const APP_CONFIG = {

    APP_NAME: "LocalShop",

    VERSION: "0.1.0",

    ENVIRONMENT: "development",

    API: {

        BASE_URL: "/api",

        TIMEOUT: 15000,

        RETRY: 2

    },

    CACHE: {

        ENABLED: true,

        DURATION: 300000

    },

    STORAGE_KEYS: {

        USER: "ls_user",

        TOKEN: "ls_token",

        SHOP: "ls_shop",

        THEME: "ls_theme",

        LANGUAGE: "ls_language",

        RECENT_SHOPS: "ls_recent_shops",

        FAVORITES: "ls_favorites"

    },

    ROUTES: {

        HOME: "/",

        SEARCH: "/search",

        SHOP: "/shop",

        SCAN: "/scan",

        MERCHANT: "/merchant",

        LOGIN: "/login",

        PROFILE: "/profile",

        FAVORITES: "/favorites",

        OFFERS: "/offers"

    },

    DEFAULTS: {

        LANGUAGE: "en",

        THEME: "default",

        CURRENCY: "₹",

        COUNTRY: "IN"

    }

};

Object.freeze(APP_CONFIG);
