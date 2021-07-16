import Moongose from 'mongoose';
import Validator from 'validator';

const User = Moongose.model('User', {
	name: { type: String, required: true, trim: true },
	password: {
		type: String,
		required: true,
		minLength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contains "password"');
			}
		},
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!Validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number');
			}
		},
	},
});

export default User;
