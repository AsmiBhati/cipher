const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to simulate BFS crawling
async function bfsCrawl(startUrl, maxDepth = 2) {
    let queue = [startUrl];
    let visited = new Set();

    while (queue.length && maxDepth--) {
        let url = queue.shift();
        if (visited.has(url)) continue;
        visited.add(url);

        console.log(`Crawling: ${url}`);

        // Use Gemini API to extract key points
        const summary = await summarizeContent(url);
        console.log(`Summary: ${summary}`);

        // Simulate discovering new links
        queue.push(`${url}/next`);
    }
    return Array.from(visited);
}

// Function to summarize webpage content using Gemini API
async function summarizeContent(url) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(`Summarize key points from: ${url}`);
        return result.response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        return 'Failed to summarize content';
    }
}

module.exports = { bfsCrawl };
