import Sequelize from 'sequelize';
import sequelize from './config/database.js';

const Model = Sequelize.Model;

class Url extends Model {}

Url.init(
	{
		hash: {
			type: Sequelize.STRING,
		},
		actualUrl: {
			type: Sequelize.STRING,
		},
		aliasUrl: {
			type: Sequelize.STRING,
		},
	},
	{
		sequelize,
		modelName: 'url',
	},
);

export default Url;
