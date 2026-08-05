/*
=========================================================
Project      : LocalShop Platform
Repository   : localshop-platform
File         : api.js
Version      : 0.1.0
=========================================================
*/

const Api = {

    async request(url, options = {}) {

        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, APP_CONFIG.API.TIMEOUT);

        const config = {

            method: "GET",

            headers: {
                "Content-Type": "application/json"
            },

            signal: controller.signal,

            ...options

        };

        try {

            const response = await fetch(
                APP_CONFIG.API.BASE_URL + url,
                config
            );

            clearTimeout(timeout);

            const contentType = response.headers.get("content-type");

            let data = null;

            if (contentType && contentType.includes("application/json")) {

                data = await response.json();

            } else {

                data = await response.text();

            }

            if (!response.ok) {

                throw {

                    status: response.status,

                    message: data.message || "Request Failed"

                };

            }

            return data;

        } catch (error) {

            clearTimeout(timeout);

            console.error(error);

            throw error;

        }

    },

    get(url) {

        return this.request(url);

    },

    post(url, body = {}) {

        return this.request(url, {

            method: "POST",

            body: JSON.stringify(body)

        });

    },

    put(url, body = {}) {

        return this.request(url, {

            method: "PUT",

            body: JSON.stringify(body)

        });

    },

    delete(url) {

        return this.request(url, {

            method: "DELETE"

        });

    }

};

Object.freeze(Api);
