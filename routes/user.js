import express from 'express'

import { ObjectId } from 'mongodb'

import { db } from '#db'

const users = express.Router()

users.get('/', async (req, res) => {
  let collection = db.collection('users')
  let results = await collection.find({}).toArray()
  res.send(results).status(200)
})

export { users }