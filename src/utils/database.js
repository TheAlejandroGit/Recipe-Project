//? Dependencies
const { Sequelize } = require("sequelize");
const config = require('../config')

const db = new Sequelize({
    dialect: 'postgres',
    host: config.db.host, //? Variable de entorno del host
    username: config.db.userName, //? Variable de entorno del usuario
    password: config.db.password, //? Variable de entorno de la contraseña
    database: config.db.name, //? Variable de entorno de la base de datos
    dialectOptions: 
        process.env.NODE_ENV === 'production'
            ? {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            } : {},
})

module.exports = db