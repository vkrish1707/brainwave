Here’s a clean, professional message you can use to raise the request:

⸻

Subject: Request to Add “Groups” Claim in Okta Authorization Server

Message:
Hi [Okta Admin / IAM Team],

I need access to the user group information within the ID or access tokens returned by Okta during authentication. Currently, the tokens don’t include any group data because there is no “groups” claim configured in the authorization server.

As per Okta’s official documentation (Customize tokens returned from Okta with a Groups claim￼), we must create a custom claim named groups under the custom authorization server (for example: https://<your-okta-domain>/oauth2/default) and configure it to:
	•	Include in: ID Token and Access Token
	•	Value type: Groups
	•	Filter: Matches all groups or specific group naming pattern (e.g., starts with *)
	•	Include in token type: Any scope (or at least the groups scope)

This will allow the frontend and backend applications to retrieve user group membership directly from the tokens during authentication.

Could you please add this groups claim in our Okta authorization server and confirm once it’s done?

Thank you,
[Your Name]

⸻

Would you like me to tailor it for your AMD environment or your project name (like GFX IP Core Dashboard / Okta SSO setup)?