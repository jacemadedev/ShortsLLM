import express from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const distPath = join(__dirname, 'dist');
console.log('Serving static files from:', distPath);
app.use(express.static(distPath));

const outputDir = join(__dirname, 'output');
fs.ensureDirSync(outputDir);
app.use('/output', express.static(outputDir));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/process-video', async (req, res) => {
  // ... (keep the existing code for this route)
});

app.get('*', (req, res) => {
  console.log('Serving index.html for path:', req.path);
  res.sendFile(join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server environment: ${process.env.NODE_ENV}`);
});

// ... (keep the existing error handling code)