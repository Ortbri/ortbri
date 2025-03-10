import { cache } from 'react';

interface StravaTokens {
	access_token: string;
	refresh_token: string;
	expires_at: number;
}

// In-memory cache for the token (only lasts during server runtime)
let tokenCache: StravaTokens | null = null;

/**
 * Refreshes the Strava access token if it's expired
 * @returns The current valid access token
 */
export const getValidStravaToken = cache(async (): Promise<string> => {
	const clientId = process.env.STRAVA_CLIENT_ID;
	const clientSecret = process.env.STRAVA_CLIENT_SECRET;
	const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

	if (!clientId || !clientSecret || !refreshToken) {
		throw new Error("Missing Strava credentials in environment variables");
	}

	// Check if we need to refresh the token
	const currentTime = Math.floor(Date.now() / 1000);
	
	// Initialize token cache if it's empty
	if (!tokenCache) {
		tokenCache = {
			access_token: process.env.STRAVA_ACCESS_TOKEN || '',
			refresh_token: refreshToken,
			expires_at: Number.parseInt(process.env.STRAVA_TOKEN_EXPIRES_AT || '0'),
		};
	}
	
	// If token is still valid, return it
	if (tokenCache.expires_at > currentTime + 60) { // Add 60 seconds buffer
		return tokenCache.access_token;
	}
	
	// Token is expired, refresh it
	console.log("Refreshing Strava token...");
	const response = await fetch("https://www.strava.com/oauth/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: "refresh_token",
			refresh_token: tokenCache.refresh_token,
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Failed to refresh Strava token: ${errorText}`);
	}

	const newTokenData = await response.json();
	
	// Update the token cache
	tokenCache = {
		access_token: newTokenData.access_token,
		refresh_token: newTokenData.refresh_token,
		expires_at: newTokenData.expires_at,
	};
	
	return newTokenData.access_token;
});