import express from 'express';

import sequelize from './config/database.js';

sequelize.sync();

const app = express();

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export default app;
