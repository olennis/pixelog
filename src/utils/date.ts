export function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function isToday(dateStr: string): boolean {
  const today = new Date();
  const todayStr = formatDate(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  return dateStr === todayStr;
}

export function parseDate(dateStr: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateStr.split('-').map(Number);
  return { year, month, day };
}

export function getMonthName(monthIndex: number): string {
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  return months[monthIndex];
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// 주어진 날짜의 해당 주 월요일을 YYYY-MM-DD로 반환
export function getMonday(date: Date): string {
  const d = new Date(date);
  const day = d.getDay(); // 0=일, 1=월, ...6=토
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

// 월요일 날짜 문자열로부터 월~일 7개 날짜 배열 반환
export function getWeekDates(mondayStr: string): string[] {
  const { year, month, day } = parseDate(mondayStr);
  const monday = new Date(year, month - 1, day);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
  });
}

export const DAY_NAMES = ['월', '화', '수', '목', '금', '토', '일'];
