# Chat Scenario Platform

This mono-repo contains a simple chat platform with a Node.js backend and a lightweight frontend. The backend uses the OpenAI API to answer prompts and compare an original prompt with an optimized version. The frontend provides a minimal interface to interact with the API.

## Project Structure

- `chat_back` – Express.js REST API server
- `chat_front` – Static frontend served with a simple server

## Prerequisites

- Node.js (v18+ recommended)
- An OpenAI API key

## Setup and Running

### Backend

1. Navigate to the backend folder:
   ```bash
   cd chat_back
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file and add your OpenAI API key:
   ```bash
   cp .env.example .env
   # edit .env and set OPENAI_API_KEY
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The server runs on `http://localhost:3000`.

### Frontend

1. In a new terminal, navigate to the frontend folder:
   ```bash
   cd chat_front
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the static server:
   ```bash
   npm start
   ```
   The frontend is served on `http://localhost:8080`.

### Usage

1. Open the frontend in your browser.
2. Enter a prompt and click **Send**.
3. The page displays:
   - The model's response to the original prompt and its score.
   - The optimized prompt with its response and score.

The scoring metric used is vocabulary diversity: `(unique words / total words) * 100`.

## Notes

- Ensure the backend server is running before using the frontend.
- The OpenAI API key should never be committed to source control. Use the `.env` file for local development.
