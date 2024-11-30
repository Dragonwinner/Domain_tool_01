import { saveAs } from 'file-saver';
import { NewsItem } from '../types/news';

export function exportToCsv(results: NewsItem[]) {
  const headers = ['Source', 'Title', 'Domain', 'Price', 'Timestamp'];
  const rows = results.flatMap(item =>
    item.domains.map(domain => [
      item.source,
      item.title,
      domain.name,
      domain.price?.toString() || '',
      item.timestamp
    ])
  );

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `domain-results-${new Date().toISOString()}.csv`);
}