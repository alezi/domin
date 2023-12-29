const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'https://domin-lemon.vercel.app', // 你的前端应用的域名
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.post('/query-domain', async (req, res) => {
    try {
        const { domain } = req.body;
        const [name, suffix] = domain.split('.');
        
        if (!name || !suffix) {
            return res.status(400).send({ error: 'Invalid domain format.' });
        }

        const response = await axios.get(`https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

