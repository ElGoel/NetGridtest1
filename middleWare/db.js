import config from 'config';
import mongoose from 'mongoose';

async function connectDb() {
    return mongoose.connect(config.get("db.default"));
}

export default connectDb;