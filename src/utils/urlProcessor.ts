/**
 * Utility functions for URL processing and validation
 */

export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);

    // Remove common tracking parameters
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
      "ref",
      "source",
      "campaign",
    ];

    trackingParams.forEach((param) => {
      urlObj.searchParams.delete(param);
    });

    // YouTube specific normalization
    if (isYouTubeUrl(url)) {
      return normalizeYouTubeUrl(urlObj);
    }

    // Remove fragment and trailing slash for generic URLs
    urlObj.hash = "";
    let normalized = urlObj.toString();
    if (normalized.endsWith("/") && urlObj.pathname !== "/") {
      normalized = normalized.slice(0, -1);
    }

    return normalized;
  } catch (error) {
    throw new Error(`Invalid URL: ${url}`);
  }
}

export function isYouTubeUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    return (
      hostname === "youtube.com" ||
      hostname === "www.youtube.com" ||
      hostname === "youtu.be" ||
      hostname === "m.youtube.com"
    );
  } catch {
    return false;
  }
}

export function normalizeYouTubeUrl(urlObj: URL): string {
  const hostname = urlObj.hostname.toLowerCase();

  if (hostname === "youtu.be") {
    // Convert youtu.be/VIDEO_ID to youtube.com format
    const videoId = urlObj.pathname.slice(1);
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  if (hostname.includes("youtube.com")) {
    // Keep only the v parameter for watch URLs
    const videoId = urlObj.searchParams.get("v");
    if (videoId && urlObj.pathname === "/watch") {
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
  }

  // Return as-is for other YouTube URLs (playlists, channels, etc.)
  return urlObj.toString();
}

export function detectPlatform(url: string): string {
  if (isYouTubeUrl(url)) {
    return "youtube";
  }

  // Add more platform detection logic as needed
  return "generic";
}

export function validateUrl(url: string): { isValid: boolean; error?: string } {
  try {
    const urlObj = new URL(url);

    // Only allow http and https protocols
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return { isValid: false, error: "Only HTTP and HTTPS URLs are allowed" };
    }

    // Basic hostname validation
    if (!urlObj.hostname || urlObj.hostname.length === 0) {
      return { isValid: false, error: "Invalid hostname" };
    }

    // Reject hostnames that start or end with dots
    if (urlObj.hostname.startsWith(".") || urlObj.hostname.endsWith(".")) {
      return { isValid: false, error: "Invalid hostname format" };
    }

    // Reject hostnames that don't contain at least one dot (basic domain validation)
    if (!urlObj.hostname.includes(".")) {
      return { isValid: false, error: "Hostname must be a valid domain" };
    }

    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: "Invalid URL format" };
  }
}
