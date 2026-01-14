
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  // In a real app, this would send data to GA4, Posthog, Mixpanel, etc.
  console.log(`[Analytics] ${eventName}`, properties);
};
