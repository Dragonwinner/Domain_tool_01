import React, { useRef } from 'react';
import { FileUp, FileText, FileSpreadsheet } from 'lucide-react';
import { processContent } from '../utils/contentProcessor';

interface ContentImportProps {
  onDomainsFound: (domains: string[]) => void;
}

export function ContentImport({ onDomainsFound }: ContentImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = React.useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const content = await processContent(file);
    const domains = await processContent(content);
    onDomainsFound(domains);
  };

  const handleTextInput = async () => {
    if (!content.trim()) return;
    const domains = await processContent(content);
    onDomainsFound(domains);
    setContent('');
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <FileUp className="w-4 h-4" />
          <span>Upload File</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.csv,.pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Or paste your content here..."
          className="w-full h-32 p-2 border rounded-lg"
        />
        <button
          onClick={handleTextInput}
          className="mt-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Process Content
        </button>
      </div>
    </div>
  );
}