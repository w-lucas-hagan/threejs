import express from 'express'
import * as dotenv from 'dotenv'
import OpenAI from 'openai'

// allows for use of environment variables 
dotenv.config()

// creating a router 
const router = express.Router()

// setting secret key to call AI image generation
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

// routes
router.route('/').get((req, res) => {
    res.status(200).json({message: "Hello from DALL.E ROUTES"})
})

export default router;