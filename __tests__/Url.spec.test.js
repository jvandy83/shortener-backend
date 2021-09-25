import request from 'supertest';
import app from '../src/app.js';

import Url from '../src/Url.js';

import sequelize from '../src/config/database.js';

beforeAll(() => {
	return sequelize.sync();
});

beforeEach(() => {
	return Url.destroy({ truncate: true });
});

describe('Register Url', () => {
	const postValidUrl = () => {
		return request(app).post('/api/create-url').send({
			actualUrl: 'https://google.com',
		});
	};
	it('returns 200 OK when url request is valid', async () => {
		const response = await postValidUrl();
		expect(response.status).toBe(200);
	});
	it('returns success message when url request is valid', async () => {
		const response = await postValidUrl();
		expect(response.body.message).toBe('ok');
	});
	// it('save the url to the database', async () => {
	// 	await postValidUrl();
	// 	const userList = await User.findAll();
	// 	expect(userList.length).toBe(1);
	// });
});
