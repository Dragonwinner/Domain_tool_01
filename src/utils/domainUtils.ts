import { NEWS_SOURCES } from '../services/newsConfig';

export function generateDomainSuggestions(headline: string): string[] {
  const words = headline
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .split(/\s+/)
    .filter(word => word.length >= 3 && word.length <= 15);

  const tlds = ['.com', '.io', '.net', '.org', '.co'];
  const suggestions: string[] = [];

  // Single word domains
  words.forEach(word => {
    tlds.forEach(tld => {
      suggestions.push(word + tld);
    });
  });

  // Two word combinations
  for (let i = 0; i < words.length - 1; i++) {
    const combined = words[i] + words[i + 1];
    if (combined.length <= 15) {
      tlds.forEach(tld => {
        suggestions.push(combined + tld);
      });
    }
  }

  return [...new Set(suggestions)];
}

export async function checkDomainAvailability(domain: string): Promise<boolean> {
  // In a real application, this would check with a domain registrar API
  // For demo purposes, return a random boolean
  return Math.random() > 0.7;
}

export function estimateDomainPrice(domain: string): number {
  // In a real application, this would get real pricing from a registrar API
  const basePrice = 10;
  const length = domain.length;
  
  // Shorter domains are more expensive
  const lengthFactor = Math.max(1, (20 - length) / 10);
  
  return Math.round(basePrice * lengthFactor * 100) / 100;
}