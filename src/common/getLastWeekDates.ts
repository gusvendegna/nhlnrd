export function getLastWeekDates() {
    const today = new Date();
    let lastWeek:string[] = [];
  
    // Loop to get the past 7 days including today
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(today.getDate() - i);
      lastWeek.push(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
    }
  
    return lastWeek;
  }