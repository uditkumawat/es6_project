"use strict";

class ServerConfig {

    constructor() {

        this.HOST = 'localhost';
        
        if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'develop' || process.env.NODE_ENV == 'DEV') {

            this.PORT = 3000;
        }
        else if(process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'TEST')
        {
            this.PORT = 3001;
        }
        else if(process.env.NODE_ENV == 'live' || process.env.NODE_ENV == 'LIVE')
        {
            this.PORT = 3002;
        }
        else {
            this.PORT = 8000;
        }
    }
};

module.exports = new ServerConfig();