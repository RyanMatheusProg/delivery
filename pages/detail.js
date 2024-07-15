const textFrom = params.from 
  ? params.from
  : getMonthDates()[0];

const from = new Date(textFrom).getTime();

const textTo = params.to
  ? params.to
  : getMonthDates().pop()
const to = new Date(textTo).getTime() + (24 * 60 * 60 * 1000);

const offset = (Number(params.page) || 1) * 25 - 25;
let i = 0;
let m = 0;
const items = await db.delivery.orderBy("day").reverse().filter((e) => {
  i++;
  if(i <= offset) return false;
  if(m > 25) return false;
  m++
  return e.day >= from && e.day <= to;
}).toArray();
    
const register = items.slice(0, 25);

return {
  from: textFrom,
  to: textTo,
  items: register,
  hasBeforePage: offset > 0,
  hasNextPage: items.length === 26,
  beforePage: Number(params.page || 1) - 1,
  nextPage: Number(params.page || 1) + 1,
}