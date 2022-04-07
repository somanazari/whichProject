const currentTime = (time) => {
  let difference = new Date().getTime() - time,
    sec = Math.floor(difference / 1000),
    min = Math.floor(sec / 60),
    h = Math.floor(min / 60),
    day = Math.floor(h / 24),
    m = Math.floor(day / 30),
    y = Math.floor(m / 12);
  if (y > 0) return y + " سال قبل";
  if (m > 0) return m + " ماه قبل";
  if (day > 0) return day + " روز قبل";
  if (h > 0) return h + " ساعت قبل";
  if (min > 0) return min + " دقیقه پیش";
  if (sec > 0) return sec + " ثانیه پیش";
  return "هم اکنون";
};

export default currentTime;
