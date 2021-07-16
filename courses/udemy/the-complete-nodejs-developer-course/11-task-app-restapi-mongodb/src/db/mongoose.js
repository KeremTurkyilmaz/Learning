import Mongoose from 'mongoose';

export default class MongooseDB {
	constructor(options = {}) {
		this.options = options;
		this.url = this.options.url;
		this.connectionOptions = this.options.connectionOptions;
	}
	init() {
		console.log('Start Mongoose Connection');
		Mongoose.connect(this.url, { ...this.connectionOptions });
	}
}
