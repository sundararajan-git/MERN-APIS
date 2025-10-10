import mongoose from 'mongoose';
import { AppError } from '../utils/AppError.js';

const connections = {}

export const connectDB = () => {
    try {
        connections.auth = mongoose.createConnection(process.env.MONGO_URI_AUTH)
        connections.emart = mongoose.createConnection(process.env.MONGO_URI_EMART)
        connections.connect = mongoose.createConnection(process.env.MONGO_URI_CONNECT)
        console.log(`All DBs Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1)
    }
}

export const getDB = (name) => {
    const conn = connections[name];
    if (!conn) throw new AppError(`Database connection "${name}" not found!`);
    return conn;
};

