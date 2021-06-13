/*
 * MongoDB - Crud Operations
 * MongoDB Docs: http://mongodb.github.io/node-mongodb-native/3.4/api/index.html
 * MongoDB GUI (Robo 3T): https://robomongo.org/
 * Useful Docs:
 * 	- Comparison Query Operators -> https://docs.mongodb.com/manual/reference/operator/query/gt/
 * Last Update: 19/05/2021
 */

const { MongoClient, ObjectID } = require('mongodb');

const {
	closeConnection,
	connectionReferences,
	GET_ALL_FROM_COLLECTION,
	UPDATE_RECORD,
	UPDATE_RECORDS,
	DELETE_RECORD,
} = require('./utils');

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

	/*
	 * Perform an "UPDATE" request, to complete all the tasks that aren't completed
	 */
	UPDATE_RECORDS(
		// Get all tasks that aren't completed yet
		{ completed: false },
		// Set the completed variable to true
		{ $set: { completed: true } },
		// Collection
		tasksCollection,
		// Callback
		() => closeConnection(client, databaseName)
	);

	/*
	 * Perform a "DELETE" request - Delete a document in a MongoDB Collection
	 */
	DELETE_RECORD({ name: 'Pablo' }, usersCollection, () => {
		closeConnection(client, databaseName);
	});

	/*
	 * Perform a "GET" request - Get the matching Record from the database collection if the query match some data.
	 * $gte -> Matches values that are greater than or equal to a specified value.
	 */
	GET_ALL_FROM_COLLECTION({ age: { $gte: 20 } }, usersCollection).then(() => {
		closeConnection(client, databaseName);
	});
});
