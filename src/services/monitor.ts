import axios from 'axios';
import * as cheerio from 'cheerio';
import { NEWS_SOURCES } from './newsConfig';
import { checkDomainAvailability, generateDomainSuggestions, estimateDomainPrice } from '../utils/domainUtils';
import { format } from 'date-fns';
import type { NewsItem, DomainResult } from '../types/news';

let newsCache: NewsItem[] = [];
let monitoringInterval: number | null = null;

async function fetchNewsFromSource(source: typeof NEWS_SOURCES[0]) {
  try {
    const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(source.url)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data.contents);
    const headlines: string[] = [];
    
    $(source.selector).each((_, element) => {
      headlines.push($(element).text().trim());
    });

    return headlines;
  } catch (error) {
    console.error(`Error fetching from ${source.name}:`, error);
    return [];
  }
}

async function processHeadlines(headlines: string[], source: string): Promise<NewsItem[]> {
  const domains: NewsItem[] = [];

  for (const headline of headlines) {
    const suggestions = generateDomainSuggestions(headline);
    const availabilityChecks = await Promise.all(
      suggestions.map(async (domain): Promise<DomainResult> => {
        const available = await checkDomainAvailability(domain);
        return {
          name: domain,
          available,
          price: available ? estimateDomainPrice(domain) : undefined
        };
      })
    );

    const availableDomains = availabilityChecks.filter(d => d.available);
    
    if (availableDomains.length > 0) {
      domains.push({
        source,
        title: headline,
        timestamp: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss'),
        domains: availableDomains
      });
    }
  }

  return domains;
}

async function monitorNews() {
  console.log('Starting news monitoring...', new Date().toISOString());
  
  try {
    for (const source of NEWS_SOURCES) {
      console.log(`Checking ${source.name}...`);
      const headlines = await fetchNewsFromSource(source);
      const newDomains = await processHeadlines(headlines, source.name);
      
      if (newDomains.length > 0) {
        newsCache = [...newDomains, ...newsCache].slice(0, 1000);
        saveResults();
      }
    }
  } catch (error) {
    console.error('Error in monitoring cycle:', error);
  }
}

function saveResults() {
  console.log('New domains found:', newsCache.length);
}

export function startMonitoring(frequency: 'realtime' | 'hourly') {
  stopMonitoring();

  const interval = frequency === 'hourly' ? 3600000 : 300000; // 1 hour or 5 minutes
  monitoringInterval = window.setInterval(monitorNews, interval);
  
  console.log(`Started ${frequency} monitoring`);
  monitorNews(); // Initial run
}

export function stopMonitoring() {
  if (monitoringInterval !== null) {
    window.clearInterval(monitoringInterval);
    monitoringInterval = null;
  }
  console.log('Monitoring stopped');
}

export { newsCache };