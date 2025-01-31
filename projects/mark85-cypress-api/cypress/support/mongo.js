const { MongoClient } = require('mongodb')

const mongoUrl = 'mongodb+srv://alysong:nosyla@cluster0.ocv7q.mongodb.net/markdb?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(mongoUrl)

async function connect() {
    await client.connect()
    return client.db('markdb')
}

async function disconnect() {
    await client.disconnect()
}

module.exports = { connect, disconnect }
