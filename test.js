Perfect — you’re now at the final integration step 👏

Let’s make this work cleanly with your existing PM2 + Next.js + SSL setup using the serve package (no custom server.js required).

⸻

✅ 1️⃣ Install serve (if not already)

Run this once in your frontend folder:

npm install serve --save-dev


⸻

✅ 2️⃣ Folder setup for SSL certificates

You already have:

/etc/ssl/gfxip/
 ├── gfxip-dashboard.key
 ├── gfxip-dashboard.cer
 ├── gfxip-dashboard.csr

✔ Perfect — permissions are set. You can reuse them directly in the PM2 ecosystem config.

⸻

✅ 3️⃣ Update your ecosystem.config.js

Replace your current config’s env_production section with this (simplified HTTPS serve setup):

module.exports = {
    apps: [
        {
            name: 'gfx-automation-tool',
            script: 'npx',
            args: 'serve -s out -l 443 --ssl-cert /etc/ssl/gfxip/gfxip-dashboard.cer --ssl-key /etc/ssl/gfxip/gfxip-dashboard.key',
            cwd: './',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                PORT: 3000,
                HOST: '0.0.0.0',
            },
            env_uat: {
                NODE_ENV: 'uat',
                PORT: 443,
                HOST: '0.0.0.0',
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 443,
                HOST: '0.0.0.0',
            },
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            error_file: './logs/error.log',
            out_file: './logs/out.log',
            merge_logs: true,
            time: true,
        },
    ],
};


⸻

✅ 4️⃣ Update your package.json

Replace/add these key scripts:

"scripts": {
  "dev": "next dev -H 0.0.0.0 -p 3000",
  "build": "next build && next export",
  "serve:https": "npx serve -s out -l 443 --ssl-cert /etc/ssl/gfxip/gfxip-dashboard.cer --ssl-key /etc/ssl/gfxip/gfxip-dashboard.key",
  "pm2:start": "pm2 start ecosystem.config.js --env production",
  "pm2:restart": "pm2 restart gfx-automation-tool",
  "deploy": "npm run build && npm run pm2:restart"
}

🧠 Note:
	•	next export generates the out/ directory (static export).
	•	You’re serving that statically with HTTPS.

⸻

✅ 5️⃣ Run build & start (locally or on server)

npm run build
/local/system/admin/bin/sudo su -
npm run pm2:start

This will:
	•	Build your frontend to out/
	•	Serve it via HTTPS on port 443
	•	Use the certificates from /etc/ssl/gfxip/
	•	Be managed via PM2 (auto-restart, logs, etc.)

⸻

✅ 6️⃣ Verify it

Open:

https://gfxip-dashboard.uat.amd.com/

Then verify SSL:

curl -v https://gfxip-dashboard.uat.amd.com

You should see the valid certificate chain loaded.

⸻

✅ 7️⃣ Optional — Backend CORS Update

Since your backend runs on HTTP (:4000), add this in your backend CORS setup:

origin: [
  'https://gfxip-dashboard.uat.amd.com',
  'http://localhost:3000'
],
credentials: true,


⸻

✅ Summary

Step	Task	Command
1	Install serve	npm install serve --save-dev
2	Build project	npm run build
3	Start with PM2 HTTPS	npm run pm2:start
4	Check logs	pm2 logs gfx-automation-tool
5	Verify HTTPS	https://gfxip-dashboard.uat.amd.com


⸻

Would you like me to modify your ecosystem.config.js so that it automatically uses HTTP on port 3000 in development and HTTPS on port 443 in UAT/production (switching based on NODE_ENV)?
That way you can test locally too without changing anything.