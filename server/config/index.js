import * as _ from 'lodash';

const {SN_DB_USER, SN_DB_PASS, JWT_SECRET, NODE_ENV} = process.env;

if (!SN_DB_USER || !SN_DB_PASS || !JWT_SECRET) {
    throw 'SN_DB_USER, SN_DB_PASS, and JWT_SECRET environment variables must be set up';
}

export default _.merge(require(`./${NODE_ENV}`), {
    isDev: NODE_ENV === 'dev',
    isProd: NODE_ENV === 'prod'
});
