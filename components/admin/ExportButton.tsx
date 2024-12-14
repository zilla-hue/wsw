import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { DataFetcher } from '@/lib/firebase/utils/dataFetcher';
import { CSVExporter } from '@/lib/firebase/utils/csvExport';
import { toast } from 'react-hot-toast';
import { logger } from '@/lib/firebase/utils/logger';

interface ExportButtonProps {
  collectionName: string;
  filename: string;
  headers?: string[];
}

export default function ExportButton({
  collectionName,
  filename,
  headers
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = async () => {
    setIsExporting(true);
    setProgress(0);

    try {
        console.log('Fetching data...');
        
      // Fetch data with progress updates
      const data = await DataFetcher.fetchAllDocuments(collectionName, {
        onProgress: (count) => setProgress(count)
      });
console.log('Fetched data:', data);

      if (data.length === 0) {
        toast.error('No data available to export');
        return;
      }

      // Generate and download CSV
      const csvContent = CSVExporter.convertToCSV(data, { headers });
      console.log('CSV content:', csvContent);
      
      const fullFilename = CSVExporter.generateFilename(filename);
      console.log('Generated filename:', fullFilename);
      
      CSVExporter.downloadCSV(csvContent, fullFilename);

      toast.success('Export completed successfully');
      logger.info(`Successfully exported ${data.length} records to CSV`);
    } catch (error) {
        console.error('Export failed:', error);
        
      toast.error('Failed to export data');
      logger.error('Export failed:', error);
    } finally {
      setIsExporting(false);
      setProgress(0);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-teal hover:bg-brand-teal-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isExporting ? (
        <>
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          {progress > 0 ? `Exporting (${progress} records)...` : 'Preparing export...'}
        </>
      ) : (
        <>
          <Download className="h-5 w-5 mr-2" />
          Export Data
        </>
      )}
    </button>
  );
}