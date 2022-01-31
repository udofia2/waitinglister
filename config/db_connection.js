import mongoose from 'mongoose';
// import logger from './logger.js';
// import config from './config';

/**
 * Connect To Database
 */
const connectDB = async () => {
  // const DB = config.db.url.replace('<PASSWORD>', config.db.password);

  mongoose.set('autoIndex', true);

  const con = await mongoose.connect(process.env.DBProd, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  });

  console.info(`MongoDB Connected: ${con.connection.host}.`);

  mongoose.connection.on('connecting', () => {
    console.info("Connecting to Database");
  });

  mongoose.connection.on('connected', () => {
    console.info("Mongoose Connected to Database");
  });

  mongoose.connection.on('error', (err) => {
    console.error(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.info("Mongoose Connection is Disconnected.");
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

export default connectDB;
