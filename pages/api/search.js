import axios from "axios";

export default async function handler(req, res) {
    console.log('Handler function called');

    const options = {
        method: 'GET',
        url: 'https://api.genius.com/search',
        params: {
            q: req.query.title,
            per_page: '10',
            page: '1'
        },
        headers: {
            'Authorization': process.env.NEXT_PUBLIC_RAPIDAPI_KEY
            
        }
    };
    try {
        const response = await axios.request(options);
        res.status(200).json(response.data.response)
    } catch (error) {
        console.log('here is error handler')
        console.error(error);
        res.status(500).json({error: 'An error occurred while processing your request.'})
    }
}