import Mongoose from 'mongoose';

const DB_PORT = 27017;
const defaultOptions = {
	url: `mongodb://127.0.0.1:${DB_PORT}`,
	options: {
		dbName: 'db-rest-api',
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
};

export default class MongooseDB {
	constructor(options = {}) {
		this.options = { ...defaultOptions, ...options };
		this.url = this.options.url;
		this.connectionOptions = this.options.connectionOptions;
	}
	init() {
		console.log('Start Mongoose Connection');
		Mongoose.connect(this.url, { ...this.connectionOptions });
	}
}
