/*
 * Task App - Rest API with MongoDB
 * MongoDB Docs: http://mongodb.github.io/node-mongodb-native/3.4/api/index.html
 * MongoDB GUI (Robo 3T): https://robomongo.org/
 * Useful Docs:
 * 	- Comparison Query Operators -> https://docs.mongodb.com/manual/reference/operator/query/gt/
 * 	- Update Operator -> https://docs.mongodb.com/manual/reference/operator/update/
 * Last Update: 19/05/2021
 */

const { MongoClient } = require('mongodb');

const PORT = 27017;
const connectionUrl = `mongodb://127.0.0.1:${PORT}`;
const databaseName = 'LocalMongoDatabase';

// Client options for a Mongo Connection
const clientConfigs = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

MongoClient.connect(`${connectionUrl}`, { ...clientConfigs }, (err, client) => {
	// Throw and error if the databse isn't accessibile
	if (err) return console.log('Unable to connect to the database');
	console.log(`Connected to ${databaseName} on port ${PORT}`);

	// DB Reference
	const db = client.db(databaseName);

	// Collections reference
	const usersCollection = db.collection('users');
	const tasksCollection = db.collection('tasks');
});
