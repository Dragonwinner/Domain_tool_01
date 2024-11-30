import React, { createContext, useContext, useState } from 'react';

interface MonitoringSettings {
  frequency: 'realtime' | 'hourly';
  setFrequency: (frequency: 'realtime' | 'hourly') => void;
  isMonitoring: boolean;
  setIsMonitoring: (isMonitoring: boolean) => void;
}

const MonitoringContext = createContext<MonitoringSettings | undefined>(undefined);

export function MonitoringProvider({ children }: { children: React.ReactNode }) {
  const [frequency, setFrequency] = useState<'realtime' | 'hourly'>('hourly');
  const [isMonitoring, setIsMonitoring] = useState(false);

  return (
    <MonitoringContext.Provider 
      value={{ 
        frequency, 
        setFrequency, 
        isMonitoring, 
        setIsMonitoring 
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
}

export function useMonitoring() {
  const context = useContext(MonitoringContext);
  if (context === undefined) {
    throw new Error('useMonitoring must be used within a MonitoringProvider');
  }
  return context;
}