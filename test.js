I’m using Okta authentication in a Next.js (JavaScript) frontend that connects to a backend Express API.
My setup includes:
	•	A custom AuthContext (using OktaAuth from @okta/okta-auth-js)
	•	A ProtectedRoute wrapper for all protected pages
	•	Okta configuration using PKCE flow with clientId, issuer, and redirectUri
	•	The app checks for authentication state (authState.isAuthenticated) before fetching user data or calling APIs

Everything works correctly — login, callback, tokens, and backend verification — but the frontend triggers multiple API calls right after login or page refresh.
I want you to:
	1.	Explain in detail how the frontend authentication flow works step-by-step — from app load, redirect, token storage, to token verification and rehydration.
	2.	Identify which parts of the flow typically trigger duplicate API calls (e.g., re-renders, missing dependency arrays, auth state initialization loops).
	3.	Check whether my AuthContext, useEffect hooks, or ProtectedRoute logic might be causing re-fetching or multiple authentication checks.
	4.	Explain how oktaAuth.authStateManager.subscribe() and restoreOriginalUri() behave in this flow — and whether they might cause repeated triggers.
	5.	Recommend best practices to fix it — like using a single auth provider, memoizing auth context, or gating data fetches until authState.isAuthenticated is stable.
	6.	Include suggestions specific to Next.js static or hybrid rendering, since the app might be statically served using serve and rehydrated client-side.

Also point out how to make the API fetch happen only once per login session without breaking the session persistence after page reloads.
