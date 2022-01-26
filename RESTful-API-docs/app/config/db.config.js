// setup database here, change the values to suit your environment
module.exports = {
	HOST: 'localhost',
	USER: 'postgres',
	PASSWORD: 'admin',
	DB: 'database_ch8',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};
