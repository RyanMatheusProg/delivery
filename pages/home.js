
const weekDays = getFormattedWeekDates();
const monthDays = getMonthDates();
const todayText = formatDate(new Date());
const t = [
  ...weekDays, ...monthDays
].map(e => (new Date(e)).getTime());
const registers = await db.delivery.where("day").between(Math.min(...t), Math.max(...t), true, true).toArray();

const today = { 
  credit: 0, 
  platforms: createPlatformObject(),
  bestPlatform: "agilgo"
};
const week = {
  credit: 0,
  platforms: createPlatformObject(),
  bestPlatform: "agilgo",
  chart: {},
  $chart: {}
};
const month = {
  credit: 0,
  platforms: createPlatformObject(),
  bestPlatform: "agilgo",
  chart: {},
  $chart: {}
}
for(const w of weekDays)
  week.$chart[w] = 0;
for(const d of monthDays)
  month.$chart[d] = 0
for(const item of registers){
  const day = formatDate(new Date(item.day))
  if(todayText === day){
    today.platforms[item.platform] += item.money
    today.credit += item.money;
  }
  if(weekDays.includes(day)){
    week.platforms[item.platform] += item.money;
    week.credit += item.money;
    week.$chart[day] += item.money
  }
  if(monthDays.includes(day)){
    month.platforms[item.platform] += item.money;
    month.credit += item.money;
    month.$chart[day] += item.money
  }
}
today.bestPlatform = findIndexOfMaxValue(today.platforms);
week.bestPlatform = findIndexOfMaxValue(week.platforms);
month.bestPlatform = findIndexOfMaxValue(month.platforms);

for(const d of Object.keys(month.$chart)){
  const day = d.split("-")[2];
  month.chart[Number(day)] = month.$chart[d];
}
console.log(week.$chart)
let $i=-1;
const $s = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"]
for(const $d of Object.keys(week.$chart)){
  $i++;
  week.chart[$s[$i]] = week.$chart[$d]
}

return {
  today, week, month
}