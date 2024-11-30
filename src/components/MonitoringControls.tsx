import React from 'react';
import { Clock, Activity, Play, Pause } from 'lucide-react';
import { useMonitoring } from '../contexts/MonitoringContext';

export function MonitoringControls() {
  const { frequency, setFrequency, isMonitoring, setIsMonitoring } = useMonitoring();

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
        <button
          onClick={() => setFrequency('realtime')}
          className={`flex items-center space-x-1 px-3 py-1 rounded ${
            frequency === 'realtime'
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Real-time</span>
        </button>
        <button
          onClick={() => setFrequency('hourly')}
          className={`flex items-center space-x-1 px-3 py-1 rounded ${
            frequency === 'hourly'
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Hourly</span>
        </button>
      </div>
      <button
        onClick={() => setIsMonitoring(!isMonitoring)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          isMonitoring
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
      >
        {isMonitoring ? (
          <>
            <Pause className="w-4 h-4" />
            <span>Stop Monitoring</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            <span>Start Monitoring</span>
          </>
        )}
      </button>
    </div>
  );
}