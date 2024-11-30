import React from 'react';
import { Settings } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export function SettingsPanel() {
  const { settings, updateSettings } = useSettings();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleTldChange = (tld: string) => {
    const newTlds = settings.domainSettings.tlds.includes(tld)
      ? settings.domainSettings.tlds.filter(t => t !== tld)
      : [...settings.domainSettings.tlds, tld];
    
    updateSettings({
      ...settings,
      domainSettings: {
        ...settings.domainSettings,
        tlds: newTlds
      }
    });
  };

  const availableTlds = ['.com', '.net', '.org', '.io', '.co', '.app', '.dev', '.ai'];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg p-4 z-50">
          <h3 className="text-lg font-semibold mb-4">Domain Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Domain Length</label>
              <div className="flex space-x-4">
                <div>
                  <label className="text-sm">Min</label>
                  <input
                    type="number"
                    value={settings.domainSettings.minLength}
                    onChange={(e) => updateSettings({
                      ...settings,
                      domainSettings: {
                        ...settings.domainSettings,
                        minLength: parseInt(e.target.value)
                      }
                    })}
                    className="w-20 p-1 border rounded"
                    min="1"
                    max="63"
                  />
                </div>
                <div>
                  <label className="text-sm">Max</label>
                  <input
                    type="number"
                    value={settings.domainSettings.maxLength}
                    onChange={(e) => updateSettings({
                      ...settings,
                      domainSettings: {
                        ...settings.domainSettings,
                        maxLength: parseInt(e.target.value)
                      }
                    })}
                    className="w-20 p-1 border rounded"
                    min="1"
                    max="63"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">TLDs</label>
              <div className="grid grid-cols-4 gap-2">
                {availableTlds.map(tld => (
                  <label key={tld} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.domainSettings.tlds.includes(tld)}
                      onChange={() => handleTldChange(tld)}
                      className="rounded"
                    />
                    <span>{tld}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}