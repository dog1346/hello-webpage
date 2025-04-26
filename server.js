const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.all('/*', async (req, res) => {
    const url = 'https://discord.com' + req.url;
    console.log('프록시 요청:', url); // 디버깅 로그
    try {
        const response = await fetch(url, {
            method: req.method,
            body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('프록시 에러:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Proxy server running...'));
