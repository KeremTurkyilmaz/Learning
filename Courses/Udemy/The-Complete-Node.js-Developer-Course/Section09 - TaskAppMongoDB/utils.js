/**
 *	Close DB connection
 * @param {Object} client - Client reference
 * @param {Object} databaseName - Database Name
 */
const closeConnection = (client, databaseName) => {
	console.log(`Close connection to ${databaseName}`);
	client.close();
};
/**
 *	Return some useful information about the database and the collection
 * @param {Object} res - Response Object
 * @param {Object} col - The reference of a collection pointing to the database
 */
const connectionReferences = (res, collection) => {
	// Grab database name and collection name from the response data
	const { db, collection: collectioName } = collection.s.namespace || undefined;
	let out = '';
	out += `${res.insertedCount} Records inserted into ${collectioName} collection in the ${db} database.` + '\n';
	out += `Records: ` + res.ops.toArray();
	// Return all the information
	return out;
};

/**
 * Perform a "DELETE" request - Delete a document in a MongoDB Collection
 * https://docs.mongodb.com/manual/reference/operator/update/
 * @param {Object} target - Target to be update into the collection
 * @param {Object} collection - Collection Reference
 * @param {requestCallback} callback - The callback that handles the response.
 * @returns {callback} The callback that handles the response.
 */
const DELETE_RECORD = (target, collection, callback) => {
	return collection.deleteOne(target, (err, res) => {
		if (err) return console.error(err);
		if (res.matchedCount === 0) {
			console.error('Error: UPDATE_RECORD -> Record not found');
			return;
		}
		console.error('Record Deleted');
		return callback(null, res);
	});
};

/**
 * Perform an "UPDATE" request - update a record in a MongoDB Collection
 * https://docs.mongodb.com/manual/reference/operator/update/
 * @param {Object} target - Target to be update into the collection
 * @param {Object} update - The update operations to be applied to the document
 * @param {Object} collection - Collection Reference
 * @param {requestCallback} callback - The callback that handles the response.
 * @returns {callback} The callback that handles the response.
 */
const UPDATE_RECORD = (target, update, collection, callback) => {
	return collection.updateOne(target, update, (err, res) => {
		if (err) return console.error(err);
		if (res.matchedCount === 0) {
			console.error('Error: UPDATE_RECORD -> Record not found');
			return;
		}
		console.error('Record Updated');
		return callback(null, res);
	});
};

/**
 * Perform an "UPDATE" request - Update multiple documents in a MongoDB Collection
 * https://docs.mongodb.com/manual/reference/operator/update/
 * @param {Object} targets - Record to update into the collection
 * @param {Object} update - The update operations to be applied to the document
 * @param {Object} collection - Collection Reference
 * @param {requestCallback} callback - The callback that handles the response.
 * @returns {callback} The callback that handles the response.
 */
const UPDATE_RECORDS = (targets, update, collection, callback) => {
	return collection.updateMany(targets, update, (err, res) => {
		if (err) return console.error(err);
		if (res.matchedCount === 0) {
			console.error('Error: UPDATE_RECORDS -> Not Records Found');
			return;
		}
		console.error(`${res.matchedCount} Records Updated`);
		return callback(null, res);
	});
};

/**
 * Perform a "POST" request - inserts a bunch of data in a MongoDB Collection
 * @param {(Object|Object[])} records - Record/Records to be pushed into the collection
 * @param {Object} collection - Collection Reference
 * @param {requestCallback} callback - The callback that handles the response.
 * @returns {callback} The callback that handles the response.
 */
const POST_TO_COLLECTION = (records, collection, callback) => {
	if (!collection) {
		return callback('You must provide a collection!', null);
	} else if (!records) {
		return callback('You must provide at least one record!', null);
	} else if (Array.isArray(records) && records.length) {
		return collection.insertMany(records, (err, res) => callback(err, res));
	} else {
		return collection.insertOne(records, (err, res) => callback(err, res));
	}
};

/**
 * Perform a "GET" request - Get the matching Record from the database collection if the query match some data.
 * Fetches the first document that matches the query
 * @param {Object} query - Query for find Operation
 * @param {Object} collection - Collection Reference
 * @param {requestCallback} callback - The callback that handles the response.
 * @returns {callback} The callback that handles the response.
 */
const GET_ONE_FROM_COLLECTION = (query, collection, callback) => {
	if (!collection) {
		return callback('You must provide a collection!', null);
	} else if (!query) {
		return callback('You must provide a query parameter!', null);
	} else {
		return collection.findOne(query, (err, res) => {
			if (err) return console.log('Unable to get the data, Error: ' + err);
			if (!res) return console.log('No results found with this query');
			return callback(null, res);
		});
	}
};

/**
 * Perform a "GET" request - Get all matching Record from the database collection if the query match some data
 * @param {Object} query - Query for find Operation
 * @param {Object} collection - Collection Reference
 */
const GET_ALL_FROM_COLLECTION = (query, collection) => {
	return new Promise((resolve, reject) => {
		if (!collection) {
			reject('Error: You must provide a collection!');
		} else if (!query) {
			reject('Error: You must provide a query parameter!');
		} else {
			collection.find(query).toArray((err, res) => {
				if (err) reject('Unable to get the data, Error: ' + err);
				if (res.length === 0) reject('Zero results found with this query');
				resolve(res);
			});
		}
	});
};

// Utils

/**
 * Create some fake users records
 *
 * @param {Object} db - Database reference
 */
const sampleUsersData = (db) => {
	// Grab the users collection from the database
	// If the collection doesn't exits, a new collection is created
	const usersCollection = db.collection('users');
	const records = [
		{ name: 'Eleven', age: 21 },
		{ name: 'Rafael', age: 11 },
		{ name: 'Pablo', age: 34 },
		{ name: 'Raul', age: 48 },
	];
	// Perform a "POST" request
	POST_TO_COLLECTION(records, usersCollection, (err, res) => {
		if (err) return console.log(err);
		console.log('All Records added successfully into the database');
	});
};

/**
 * Create some fake tasks records
 *
 * @param {Object} db - Database reference
 */
const sampleTasksData = (db) => {
	// Grab the tasks collection from the database
	// If the collection doesn't exits, a new collection is created
	const tasksCollection = db.collection('tasks');
	const records = [
		{ description: 'Taks Nr. 01', completed: false },
		{ description: 'Taks Nr. 02', completed: false },
		{ description: 'Taks Nr. 03', completed: true },
		{ description: 'Taks Nr. 04', completed: false },
	];
	// Perform a "POST" request
	POST_TO_COLLECTION(records, tasksCollection, (err, res) => {
		if (err) return console.log(err);
		console.log('All Records added successfully into the database');
	});
};

module.exports = {
	closeConnection,
	connectionReferences,
	sampleUsersData,
	sampleTasksData,
	POST_TO_COLLECTION,
	GET_ONE_FROM_COLLECTION,
	GET_ALL_FROM_COLLECTION,
	UPDATE_RECORD,
	UPDATE_RECORDS,
	DELETE_RECORD,
};
