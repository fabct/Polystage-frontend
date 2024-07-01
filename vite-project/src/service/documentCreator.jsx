import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

const exportDoc = (data, fileType) => {
    if (fileType === 'csv') {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'export.csv');
    }
    else if (fileType === 'xlsx') {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'export.xlsx');
    }
}; 

export default {
    exportDoc
}