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

// router to pass prompt from front end to server
router.route('/').post(async(req, res) => {
    try {
        
        // get prompt from front end 
        const { prompt } = req.body.value;

        // wait for server response (creation of image)
        const response = await openai.createImage({prompt, n: 1, size: '1024x1024', response_format: 'b64_json'})

        // store image from server response 
        const image = response.data.data[0].b64_json

        // send image to front end
        res.status(200).json({photo: image})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Something went wrong!"})
    }
})

export default router;