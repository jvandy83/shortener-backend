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
			aliasUrl: 'http://localhost:5500/api/fetch-url/4zDyC',
			hash: '4zDyC',
		});
	};
	it('returns 200 OK when url request is valid', async () => {
		const response = await postValidUrl();
		expect(response.status).toEqual(200);
	});
	it('returns success message when url request is valid', async () => {
		const response = await postValidUrl();
		expect(response.body.message).toEqual('ok');
	});
	it('save the url to the database', async () => {
		await postValidUrl();
		const urlList = await Url.findAll();
		expect(urlList.length).toEqual(1);
	});
});
