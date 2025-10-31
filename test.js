Perfect — thanks for clarifying.

Since your certificate (.cer) and key (.key) files will be located outside the project directory, and you want flexibility to adjust their paths easily (especially for production environments like your server), we’ll externalize the paths into .env variables and ensure the project does not assume any fixed location.

Here’s the updated setup plan and code tailored to your structure 👇

⸻

✅ Recommended Project Structure

/
├── backend/
│   ├── reverse-proxy.js ✅
│   └── ... (existing backend files)
├── frontend/
│   └── ...
├── .env ✅ (in backend)
├── /etc/ssl/certs/      <-- 👈 actual certificate folder (example)
│   ├── your-domain.cer
│   └── your-domain.key


⸻

📄 .env (inside backend/.env)

Make this fully configurable:

PORT=8080
FRONTEND=http://localhost:3000
BACKEND=http://localhost:4000
USE_HTTPS=true

# ABSOLUTE paths for certs, adjust for local or server
CERT_PATH=/etc/ssl/certs/your-domain.cer
KEY_PATH=/etc/ssl/certs/your-domain.key


⸻

📄 reverse-proxy.js (inside backend/)

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const fs = require('fs');
require('dotenv').config({ path: './.env' });

const app = express();

const PORT = process.env.PORT || 8080;
const FRONTEND = process.env.FRONTEND;
const BACKEND = process.env.BACKEND;
const USE_HTTPS = process.env.USE_HTTPS === 'true';

console.log(`Starting reverse proxy...`);
console.log(`Frontend → ${FRONTEND}`);
console.log(`Backend  → ${BACKEND}`);
console.log(`HTTPS    → ${USE_HTTPS}`);

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

app.use('/api', createProxyMiddleware({
    target: BACKEND,
    changeOrigin: true,
    pathRewrite: { '^/api': '' }
}));

app.use('/', createProxyMiddleware({
    target: FRONTEND,
    changeOrigin: true
}));

if (USE_HTTPS) {
    const certPath = process.env.CERT_PATH;
    const keyPath = process.env.KEY_PATH;

    if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
        console.error(`❌ SSL cert or key file not found. Please check CERT_PATH and KEY_PATH.`);
        process.exit(1);
    }

    const options = {
        cert: fs.readFileSync(certPath),
        key: fs.readFileSync(keyPath)
    };

    https.createServer(options, app).listen(PORT, () => {
        console.log(`✅ HTTPS reverse proxy running at https://localhost:${PORT}`);
    });
} else {
    app.listen(PORT, () => {
        console.log(`✅ HTTP reverse proxy running at http://localhost:${PORT}`);
    });
}


⸻

🧪 Example Run (Locally)

cd backend
node reverse-proxy.js

➡ Visit:
	•	https://localhost:8080 → Frontend
	•	https://localhost:8080/api → Backend proxied

⸻

🧠 Prompt for AI Agent

Here’s the exact AI prompt you can give to an agent to generate this reverse proxy file and setup:

⸻

🎯 AI Prompt

You are a Node.js reverse proxy setup agent.
I already have a full-stack app — frontend in Next.js running on port 3000, and backend in Express.js on port 4000.
I want to create a reverse proxy inside the existing backend folder (not a new project) to:
	•	Serve both frontend and backend via a single domain name
	•	Use HTTPS if certs are available (provided via .env as absolute paths)
	•	Route /api calls to the backend port
	•	Keep everything configurable through .env (PORT, FRONTEND, BACKEND, CERT_PATH, KEY_PATH)
	•	Avoid re-installing express, just use what’s already available in the backend

Requirements:
	•	Generate reverse-proxy.js
	•	Generate .env example
	•	Log proxy hits
	•	Use http-proxy-middleware
	•	Fail gracefully if certificate files are not found

⸻

Would you like me to generate these files (reverse-proxy.js, .env) now so you can try it locally?