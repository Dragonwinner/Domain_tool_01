export interface DomainSettings {
  minLength: number;
  maxLength: number;
  tlds: string[];
  excludedWords: string[];
}

export interface MonitoringSettings {
  frequency: 'realtime' | 'hourly';
  isMonitoring: boolean;
  domainSettings: DomainSettings;
}