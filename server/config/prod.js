const {SN_DB_USER, SN_DB_PASS, JWT_SECRET} = process.env;

module.exports = {
    port: 4000,
    db: {
        url: `mongodb://${SN_DB_USER}:${SN_DB_PASS}@ds145780.mlab.com:45780/social-network`,
        options: {
            useMongoClient: true
        }
    },
    jwtSecret: JWT_SECRET
};


