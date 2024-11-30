import React, { createContext, useContext, useState } from 'react';
import type { DomainSettings, MonitoringSettings } from '../types/settings';

interface SettingsContextType {
  settings: MonitoringSettings;
  updateSettings: (settings: MonitoringSettings) => void;
}

const defaultSettings: MonitoringSettings = {
  frequency: 'hourly',
  isMonitoring: false,
  domainSettings: {
    minLength: 3,
    maxLength: 15,
    tlds: ['.com', '.net', '.org'],
    excludedWords: ['the', 'and', 'or', 'but']
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<MonitoringSettings>(defaultSettings);

  const updateSettings = (newSettings: MonitoringSettings) => {
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}