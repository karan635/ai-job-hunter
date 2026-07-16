const FIRECRAWL_SCRAPE_URL = "https://api.firecrawl.dev/v2/scrape";
const MAX_JOB_DESCRIPTION_LENGTH = 40_000;

export class FirecrawlError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "FirecrawlError";
  }
}

interface FirecrawlScrapeResponse {
  success?: boolean;
  data?: { markdown?: string };
  error?: string;
}

function validateJobUrl(value: string) {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new FirecrawlError("Enter a valid job posting URL.", 400);
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new FirecrawlError("Job posting URLs must use HTTP or HTTPS.", 400);
  }

  if (
    url.hostname === "localhost" ||
    url.hostname.endsWith(".local") ||
    /^127\./.test(url.hostname) ||
    /^10\./.test(url.hostname) ||
    /^192\.168\./.test(url.hostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(url.hostname)
  ) {
    throw new FirecrawlError("Private or local URLs are not supported.", 400);
  }

  return url.toString();
}

export async function scrapeJobDescription(jobUrl: string) {
  const apiKey = process.env.FIRECRAWL_API_KEY;

  if (!apiKey) {
    throw new FirecrawlError(
      "Firecrawl is not configured. Add FIRECRAWL_API_KEY to your environment.",
      503
    );
  }

  const response = await fetch(FIRECRAWL_SCRAPE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: validateJobUrl(jobUrl),
      formats: ["markdown"],
      onlyMainContent: true,
      blockAds: true,
      timeout: 60_000,
    }),
    signal: AbortSignal.timeout(65_000),
  });

  const payload = (await response.json().catch(() => ({}))) as FirecrawlScrapeResponse;

  if (!response.ok || !payload.success || !payload.data?.markdown?.trim()) {
    throw new FirecrawlError(
      payload.error || "Firecrawl could not extract a job description from this URL.",
      response.status >= 400 && response.status < 600 ? response.status : 502
    );
  }

  return payload.data.markdown.trim().slice(0, MAX_JOB_DESCRIPTION_LENGTH);
}
