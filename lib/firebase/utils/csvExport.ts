import { format } from 'date-fns';
import { logger } from './logger';

interface CSVOptions {
  filename?: string;
  headers?: string[];
  delimiter?: string;
}

export class CSVExporter {
  private static readonly DEFAULT_DELIMITER = ',';
  private static readonly LINE_BREAK = '\r\n';

  private static escapeField(field: any): string {
    const value = String(field ?? '');
    // Escape quotes and wrap in quotes if needed
    if (value.includes('"') || value.includes(',') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  private static formatTimestamp(timestamp: any): string {
    try {
      if (!timestamp) return '';
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return format(date, 'yyyy-MM-dd HH:mm:ss');
    } catch (error) {
      logger.warn('Error formatting timestamp:', error);
      return '';
    }
  }

  static generateFilename(prefix: string): string {
    const date = format(new Date(), 'yyyy-MM-dd');
    return `${prefix}_${date}.csv`;
  }

  static convertToCSV(data: any[], options: CSVOptions = {}): string {
    const {
      headers = [],
      delimiter = this.DEFAULT_DELIMITER
    } = options;

    try {
      // Generate headers if not provided
      const csvHeaders = headers.length > 0 ? headers : Object.keys(data[0] || {});
      
      // Create headers row
      const headerRow = csvHeaders.map(this.escapeField).join(delimiter);

      // Create data rows
      const rows = data.map(row => {
        return csvHeaders.map(header => {
          const value = row[header];
          // Format timestamps
          if (value && (value.toDate || value instanceof Date)) {
            return this.escapeField(this.formatTimestamp(value));
          }
          return this.escapeField(value);
        }).join(delimiter);
      });

      // Combine headers and rows
      return [headerRow, ...rows].join(this.LINE_BREAK);
    } catch (error) {
      logger.error('Error converting data to CSV:', error);
      throw new Error('Failed to generate CSV file');
    }
  }

  static downloadCSV(csvContent: string, filename: string): void {
    try {
      // Create blob with BOM for Excel compatibility
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      logger.error('Error downloading CSV:', error);
      throw new Error('Failed to download CSV file');
    }
  }
}