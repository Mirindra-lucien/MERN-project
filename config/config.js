
const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI || process.env.MONGO_HOST 
    || "mongodb://" + (process.env.IP || "127.0.0.1") + ":" +
    (process.env.MONGO_PORT || "27017") + "/mimoza"
}

module.exports = config;