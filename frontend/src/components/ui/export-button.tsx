import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Button } from './button';
import * as XLSX from 'xlsx';
import { ExportButtonProps } from '@/types/ui';

export function ExportButton<T>({ 
  data, 
  filename = 'export.xlsx',
  className 
}: ExportButtonProps<T>) {
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      icon={faFileExcel}
      onClick={handleExport}
      className={className}
    >
      Exportar Excel
    </Button>
  );
} 