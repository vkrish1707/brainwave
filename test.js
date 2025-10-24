Yes, you must generate a CSR (Certificate Signing Request) yourself before submitting this form, and attach it at the bottom of the form where it says:

Attach CSR using ‘Add attachment’ button below

⸻

🔐 What is a CSR?

A CSR is a file that contains:
	•	Your domain name (e.g., www.gfxipcoredashboard.uat.amd.com)
	•	Organization details
	•	Public key (generated from your server)
It is required by the Certificate Authority to issue the SSL certificate.

⸻

🧾 How to Generate the CSR (on your server)

Since your server is atlvgfxpapd01, here’s how to do it based on common scenarios:

⸻

✅ Option 1: Using OpenSSL (Linux-based servers)

Run this on the server (atlvgfxpapd01) in the terminal:

openssl req -new -newkey rsa:2048 -nodes -keyout gfxip.key -out gfxip.csr

You’ll be prompted to enter:

Prompt	Example
Common Name (CN)	www.gfxipcoredashboard.uat.amd.com (mandatory)
Organization Name	Advanced Micro Devices (or your project group)
Organizational Unit (OU)	GFX IP PMO (or relevant team)
Country Name (2 letter code)	US or CA
State or Province	e.g., Ontario
Locality (City)	e.g., Toronto
Email Address	your AMD email

This will create two files:
	•	gfxip.key → Private Key (Keep this safe, do not share it!)
	•	gfxip.csr → CSR File → Upload this in the form

⸻

✅ Option 2: Using Windows IIS Server

If you’re using Windows IIS for hosting:
	1.	Open IIS Manager
	2.	Navigate to Server Certificates
	3.	Select Create Certificate Request
	4.	Fill in the required domain info:
	•	CN: www.gfxipcoredashboard.uat.amd.com
	•	OU: GFX IP Automation Tool
	•	Company: AMD
	5.	Choose 2048-bit encryption
	6.	Save the .csr file to your machine
	7.	Upload that file in the SSL form

📘 Help Link: CSR on IIS Server (AMD ServiceNow)

⸻

📎 Upload in the Form

Once generated:
	1.	Go back to your SSL form
	2.	Click “Add attachment”
	3.	Upload the .csr file you just generated
	4.	Submit

⸻

✅ What You Need to Save

Keep the following files securely saved:
	•	gfxip.key → Required later when you install the SSL cert
	•	gfxip.csr → Already uploaded
	•	Final .crt → Will be sent to you after approval

⸻

Let me know your server OS (Linux or Windows), and I can generate exact CSR commands or even help automate it.