const monthNames = [
    'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
    'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
  ];
  
export const convertFileNameToMonthYear = (fileName: string): string => {
    const match = fileName.match(/(\d{10})-(\d{2})-(\d{4})\.pdf/);
    if (!match) {
        throw new Error('File name is invalid.');
    }

    const month = parseInt(match[2], 10);
    const year = match[3];

    if (month < 1 || month > 12) {
        throw new Error('Month invalid.');
    }

    const monthName = monthNames[month - 1];

    return `${monthName}/${year}`;
};