const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    "header": "eyJmaWQiOjQyMTU2MCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDVERjk2RjUwMTc5OTk4QzhEODE1MTA4OEI4NEI1ZmZDOWQ0NDY3MjgifQ",
    "payload": "eyJkb21haW4iOiJtaW5pYXBwLWVpZ2h0LXNub3d5LnZlcmNlbC5hcHAifQ",
    "signature": "/TEEFtwqpyaMUGl8iPfbv50at416K15LXgmNvYOOjqN3JprE1GmDERAVN4hib9XkZWtMVScRp20qNGt74V3VQRs="
  },
  miniapp: {
    version: "1",
    name: "Base XP", 
    subtitle: "The Operating System for Farcaster", 
    description: "Ads",
    screenshotUrls: [`${ROOT_URL}/background.png`],
    iconUrl: `${ROOT_URL}/background.png`,
    splashImageUrl: `${ROOT_URL}/background.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["marketing", "ads", "quickstart", "waitlist"],
    heroImageUrl: `${ROOT_URL}/background.png`, 
    tagline: "",
    ogTitle: "",
    ogDescription: "",
    ogImageUrl: `${ROOT_URL}/background.png`,
  },
} as const;

