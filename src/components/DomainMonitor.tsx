import React, { useState, useEffect } from 'react';
import { Clock, Globe, Newspaper } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { NewsItem } from '../types/news';
import { NewsItemCard } from './NewsItemCard';
import { FilterBar } from './FilterBar';
import { MonitoringControls } from './MonitoringControls';
import { SettingsPanel } from './SettingsPanel';
import { ContentImport } from './ContentImport';
import { useMonitoring } from '../contexts/MonitoringContext';
import { useSettings } from '../contexts/SettingsContext';
import { startMonitoring, stopMonitoring, newsCache } from '../services/monitor';
import { exportToCsv } from '../utils/export';

const DomainMonitor: React.FC = () => {
  const [results, setResults] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { frequency, isMonitoring } = useMonitoring();
  const { settings } = useSettings();

  useEffect(() => {
    if (isMonitoring) {
      startMonitoring(frequency);
    } else {
      stopMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [frequency, isMonitoring, settings]);

  useEffect(() => {
    const updateResults = () => {
      setResults(newsCache);
      setLoading(false);
    };

    const interval = setInterval(updateResults, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDomainsFound = (domains: string[]) => {
    // Process domains from content import
    console.log('Domains found:', domains);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">News Domain Monitor</h1>
              <div className="flex items-center space-x-4">
                <SettingsPanel />
                <MonitoringControls />
              </div>
            </div>

            <ContentImport onDomainsFound={handleDomainsFound} />

            <div className="flex justify-between items-center my-6">
              <FilterBar filter={filter} setFilter={setFilter} />
              <button
                onClick={() => exportToCsv(results)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Export Results
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {results.map((item, index) => (
                  <NewsItemCard key={`${item.source}-${index}`} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DomainMonitor;