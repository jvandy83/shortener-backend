import express from 'express';

import cors from 'cors';

import sequelize from './src/config/database.js';

import app from './src/app.js';

import Url from './src/Url.js';

sequelize.sync();

app.use(
	cors({
		origin: 'http://localhost:3000',
	}),
);

app.use(express.json());

app.get('/api/fetch-urls', async (req, res) => {
	const urls = await Url.findAll();
	res.json({
		urls,
	});
});

app.get('/api/fetch-url/:hash', async (req, res) => {
	const url = await Url.findOne({ where: { hash: req.params.hash } });
	return res.status(301).redirect(url.actualUrl);
});

app.post('/api/create-url', async (req, res) => {
	// const existingUrl = await Url.findOne({
	// 	where: { aliasUrl: req.body.aliasUrl },
	// });
	// if (existingUrl) {
	// 	return res.status(400).json({
	// 		message: 'url already exists',
	// 	});
	// }
	console.log(req.body);
	await Url.create(req.body);
	return res.status(200).json({
		message: 'ok',
	});
});

app.get('/api/redirect/:id', (req, res) => {
	res.redirect('');
});

app.listen(5500, () => {
	console.log('Listening');
});
