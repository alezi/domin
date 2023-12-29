const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// 解析 JSON 请求体
app.use(express.json());

// 提供静态文件，'public' 是包含 index.html 的目录
app.use(express.static(path.join(__dirname, 'public')));

// 处理根 URL 请求并提供 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 处理域名查询的 API 请求
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
