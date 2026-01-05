export class TokenBucket {
  private capacity: number;
  private fillPerMs: number;
  private tokens: number;
  private lastRefill: number;

  constructor(capacity: number, fillPerMs: number) {
    this.capacity = capacity;
    this.fillPerMs = fillPerMs;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  refill() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    const tokensToAdd = elapsed * this.fillPerMs;

    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  }

  tryConsume(tokens = 1): boolean {
    this.refill();
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }
}

// Simple in-memory store for rate limits (IP based)
// For a single instance, this is fine. For scale, use Redis.
const ipBuckets = new Map<string, TokenBucket>();

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export function checkRateLimit(ip: string, config: RateLimitConfig): boolean {
  let bucket = ipBuckets.get(ip);

  if (!bucket) {
    // Fill rate: maxRequests per windowMs
    const fillPerMs = config.maxRequests / config.windowMs;
    bucket = new TokenBucket(config.maxRequests, fillPerMs);
    ipBuckets.set(ip, bucket);
  }

  return bucket.tryConsume();
}

// Clean up old buckets periodically (optional optimization)
setInterval(() => {
    // In a real app we'd track last usage time and delete old ones
    if (ipBuckets.size > 10000) {
        ipBuckets.clear(); // naive cleanup
    }
}, 3600000); // Hourly
