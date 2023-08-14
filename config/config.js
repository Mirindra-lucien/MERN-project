
const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGODB_URI || process.env.MONGODB_HOST 
    || "mongodb://" + (process.env.IP || "127.0.0.1") + ":" +
    (process.env.MONGODB_PORT || "27017") + "/mimoza"
}

module.exports = config;