"use strict";

class ServerConfig {

    constructor() {

        if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'develop' || process.env.NODE_ENV == 'DEV') {

            this.PORT = 3000;
        }
        else {
            this.PORT = 8001;
        }
    }
};

module.exports = new ServerConfig();