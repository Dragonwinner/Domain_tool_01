import React from 'react';
import DomainMonitor from './components/DomainMonitor';
import { MonitoringProvider } from './contexts/MonitoringContext';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <MonitoringProvider>
        <div className="min-h-screen bg-gray-100">
          <DomainMonitor />
        </div>
      </MonitoringProvider>
    </SettingsProvider>
  );
}

export default App;