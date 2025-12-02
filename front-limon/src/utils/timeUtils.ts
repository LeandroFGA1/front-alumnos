
const START_HOUR = 8;
const TOTAL_MINUTES = 15 * 60; 

export const calculatePosition = (startTime: string, endTime: string) => {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    const startInMinutes = (startH - START_HOUR) * 60 + startM;
    const endInMinutes = (endH - START_HOUR) * 60 + endM;
    const duration = endInMinutes - startInMinutes;

    const top = (startInMinutes / TOTAL_MINUTES) * 100;
    const height = (duration / TOTAL_MINUTES) * 100;

    return { top: `${top}%`, height: `${height}%` };
};