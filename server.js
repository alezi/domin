const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('.')); // 用于托管 HTML 文件

app.post('/query-domain', async (req, res) => {
    const { domain } = req.body;
    const [name, suffix] = domain.split('.');
    
    try {
        const response = await axios.get(`https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
