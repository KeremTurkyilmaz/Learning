/*
 * MongoDB - Task App - Rest Api
 * MongoDB Docs: http://mongodb.github.io/node-mongodb-native/3.4/api/index.html
 * Mongoose API: https://mongoosejs.com/
 * MongoDB GUI (Robo 3T): https://robomongo.org/
 * Useful Docs:
 * 	- Http Statuses -> https://httpstatuses.com/
 * Last Update: 16/07/2021
 */

import MongooseDB from './db/mongoose';
import Express from 'express';

import taskRouter from './routes/task';
import userRouter from './routes/user';

const DB_PORT = 27017;
const dbConfiguration = {
	url: `mongodb://127.0.0.1:${DB_PORT}`,
	options: {
		dbName: 'db-rest-api',
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
};

// Pass DB Url and Connection Options
const mongooseConnection = new MongooseDB({
	url: dbConfiguration.url,
	connectionOptions: dbConfiguration.options,
});

// Start Mongoose Connection
mongooseConnection.init();

// Create Express App
const app = Express();
const PORT = process.env.PORT || 3000;

// // Parse incoming JSON to an Object
app.use(Express.json());

// Routes Setup
app.use(userRouter);
app.use(taskRouter);

// App Listen
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
