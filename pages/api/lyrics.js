import axios from "axios";

export default async function handler(req, res) {
console.log(req.query.id);
    const options = {
        method: 'GET',
        url: 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/',
        params: { id: req.query.id,
                  text_format: "plain"},
        headers: {
            'Authorization': process.env.NEXT_PUBLIC_RAPIDAPI_KEY
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
    }
}