import bcrypt from 'bcrypt'
import express from 'express'

import { db } from '#db'
import { jwtAuthentication } from '#util'

const users = express.Router()

users.get('/', jwtAuthentication, async (req, res) => {
  const collection = db.collection('users')
  const results = await collection.find({}).toArray()
  res.send(results).status(200)
})

users.post('/', async (req, res) => {
  const { username, password } = req.body
  const collection = db.collection('users')

  try {
    const existingUser = collection.find({ username: username })
    if (existingUser) {
      return res.status(400).send('User already exists')
    }

    const hashedPassword = bcrypt.hash(password, 10)
    const newUser = {
      username,
      password: hashedPassword
    }

    const result = await collection.insertOne(newUser)
    res.send(result).status(201)
  } catch {
    res.status(500).send('Error creating user')
  }
})

users.post('/login', async (req, res) => {
  const { username, password } = req.body
  const collection = db.collection('users')

  try {
    const user = collection.find({username: username})

    if (!user || !(bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials')
    }

    const accessToken = jwt.sign(
      { username: user.username },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    )
    const refreshToken = jwt.sign(
      { username: user.username},
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '2d' }
    )

    res.status(200).json({ accessToken, refreshToken })
  } catch {
    res.status(500).send('Login failed')
  }
})

export { users }

