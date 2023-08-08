`use strict`

const dev = {
    app: {
        port: 3000
    },

    db: {
        connectionString: `mongodb+srv://tony68hcm:BkQIgdKROoIQxmKd@tonycluster.go1qv32.mongodb.net/tiki?retryWrites=true&w=majority`
    }
}

const production = {
    app: {
        port: 3000
    },

    db: {
        connectionString: `mongodb+srv://tony68hcm:BkQIgdKROoIQxmKd@tonycluster.go1qv32.mongodb.net/tiki?retryWrites=true&w=majority`
    }
}

const config = {dev, production}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]