import React from 'react';
import { Globe, Newspaper } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { NewsItem } from '../types/news';

interface NewsItemCardProps {
  item: NewsItem;
}

export function NewsItemCard({ item }: NewsItemCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Newspaper className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-700">
            {item.source}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {format(parseISO(item.timestamp), 'MMM d, yyyy HH:mm')}
        </span>
      </div>
      <p className="text-lg font-medium mb-3">{item.title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {item.domains.map((domain) => (
          <div
            key={domain.name}
            className="flex items-center space-x-2 bg-gray-50 p-2 rounded"
          >
            <Globe className="w-4 h-4 text-green-500" />
            <span className="font-mono">{domain.name}</span>
            {domain.price && (
              <span className="text-sm text-gray-500">
                (${domain.price})
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}