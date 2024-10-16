# YouTube to Viral Clips Converter

This application allows users to convert YouTube videos into short, viral-ready clips using AI-powered analysis. It's built with a React frontend and a Node.js backend, utilizing various technologies to provide a seamless user experience.

## What it does

1. Users input a YouTube URL into the application.
2. The backend downloads the video and processes it using ffmpeg.
3. OpenAI's API is used to analyze the video content and determine the most engaging segments.
4. The app generates multiple short clips from these segments.
5. Users can view and download these clips directly from the interface.

## How it's built

### Frontend
- React with TypeScript for the user interface
- Vite as the build tool and development server
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js with Express for the server
- ytdl-core for YouTube video downloading
- fluent-ffmpeg for video processing
- OpenAI API for content analysis

### Key Features
- Responsive design that works on various devices
- Real-time progress updates during video processing
- Error handling for both frontend and backend operations

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Building for Production

To create a production build, run:
```
npm run build
```

Then, to start the production server:
```
npm start
```

## Note

This application is for educational purposes only. Ensure you have the right to use and modify any YouTube content before using this tool.