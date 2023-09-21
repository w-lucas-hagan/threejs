import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import dalleRoutes from './routes/dalle.routes.js'

// allows for use of environment variables 
dotenv.config()

// express server setup 
const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb'}))

// use the routes from dalleRoutes in index.js
app.use('/api/v1/dalle', dalleRoutes)

// demo route 
app.get('/', (req, res) => {
    res.status(200).json({message: "Hello from DALL.E"})
})

// hosting on port 8080
app.listen(8080, () => console.log('Server has started on port 8080'))