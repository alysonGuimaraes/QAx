const { MongoClient } = require('mongodb')
require('dotenv').config()

const mongoUrl = process.env.MONGO_URI 

const client = new MongoClient(mongoUrl)

async function connect() {
    await client.connect()
    return client.db('markdb')
}

async function disconnect() {
    await client.disconnect()
}

module.exports = { connect, disconnect }
