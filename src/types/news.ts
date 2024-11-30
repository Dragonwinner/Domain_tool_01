export interface DomainResult {
  name: string;
  available: boolean;
  price?: number;
}

export interface NewsItem {
  source: string;
  title: string;
  timestamp: string;
  domains: DomainResult[];
}