import mongoose from 'mongoose';
import config from './index';

//update mongoose's promise
mongoose.Promise = global.Promise;

//connect to our db. If there are any errors, the program will terminate
mongoose.connect(config.db.url, config.db.options, (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('The connection to the db is successfully established!');
});