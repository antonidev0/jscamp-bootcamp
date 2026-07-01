import { test, describe, before, after } from 'node:test'
import assert, { rejects } from 'node:assert'
import app from './app.js'
import { resolve } from 'node:dns'

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

before(async () => {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => resolve())
        server.on('error', reject)
    })  
})

after(async () => {
  await new Promise((resolve, reject) => {
      server.close((err) => {
          if (err) return reject(err)
          resolve()
    })
  })
})