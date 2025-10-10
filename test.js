Thanks for sharing the screenshots. Based on the messages and terminal output, here’s what’s happening and what steps you need to take next:

⸻

🧾 Summary of the Issue

You are trying to SSH into an AMD internal server (atlvgfxpapd01) with your user vmylavar, but you’re getting the following error:

Could not chdir to home directory /home/vmylavar: No such file or directory

And your user shell is currently set to:

/sbin/nologin

This is a non-interactive shell, which means even if you login, you won’t get a working shell session. This is often the default for service or deactivated accounts.

⸻

✅ Required Actions

To fix this, you need two things:

⸻

1. 🔁 Change Shell to an Interactive Shell

The IT team already told you to raise a request to change your shell from /sbin/nologin to:

/tool/pandora/bin/tcsh

✅ Raise a UNIX Account Modification request via the provided AMD ServiceNow catalog item (as shown in the screenshot).
🔗 [Use this link]: Create UNIX Account/Home Directory/Linux Virtual Desktop (ETX)

You can write in the request:

Current shell: /sbin/nologin
Requested shell: /tool/pandora/bin/tcsh
Justification: To enable interactive shell access for hosting and deploying a Node.js based internal application (GF App) on server atlvgfxpapd01.

⸻

2. 🏠 Ensure Home Directory Exists

The system also says:

Could not chdir to home directory /home/vmylavar: No such file or directory

So even after changing the shell, your login will fail unless the home directory is created.

✅ In the same request or in a follow-up message to IT/IAM team (dl.IAM_ops@amd.com), request home directory provisioning:

Kindly create the home directory /home/vmylavar with appropriate permissions and ownership, as I am setting up an internal web app deployment.

⸻

📤 Optional Email to IT Manager (Shell + Home Directory)

You may also want to send an email like this:

⸻

Subject: Request to Enable Interactive Shell and Create Home Directory for Internal App Deployment

Body:

Hi [Manager Name],

I attempted to SSH into atlvgfxpapd01 using my account vmylavar, but I’m encountering a login issue due to the shell being set to /sbin/nologin and the home directory /home/vmylavar not existing.

As advised by SaiMeghana, I’ve raised a request via the ServiceNow catalog to update my shell to /tool/pandora/bin/tcsh. I also request the IAM team to provision the required home directory to enable proper access.

This is required to host and deploy the GF internal web application backend on this server.

Appreciate your support in expediting the approval and setup.

Best regards,
Vamsi Krishna Mylavarapu

⸻

Let me know if you want this email reworded formally or casually.