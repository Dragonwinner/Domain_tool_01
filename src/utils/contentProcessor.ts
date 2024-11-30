import * as pdfjsLib from 'pdfjs-dist';

export async function processContent(input: File | string): Promise<string[]> {
  if (input instanceof File) {
    const extension = input.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return await processPdf(input);
      case 'txt':
        return await processTxt(input);
      case 'csv':
        return await processCsv(input);
      default:
        throw new Error('Unsupported file type');
    }
  }

  // Process text content directly
  return extractWords(input);
}

async function processPdf(file: File): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(' ');
  }

  return extractWords(text);
}

async function processTxt(file: File): Promise<string[]> {
  const text = await file.text();
  return extractWords(text);
}

async function processCsv(file: File): Promise<string[]> {
  const text = await file.text();
  const lines = text.split('\n');
  return lines.flatMap(line => extractWords(line));
}

function extractWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .split(/\s+/)
    .filter(word => word.length >= 3);
}