export const daysInMonth = (date) => {
  let days = [];
  for (
    let i = 0;
    i < new Date(date.getFullYear(), date.getUTCMonth() + 1, 0).getDate();
    i += 1
  ) {
    days.push(i + 1);
  }
  return days;
};
export const formatDate = (date) =>
  `${date.toLocaleString("default", {
    month: "long",
    timeZone: "UTC",
  })} ${date.getUTCDate()}, ${date.getFullYear()}`;

export const cropDate = (date) => {
  return `${date
    .toLocaleString("default", {
      month: "long",
      timeZone: "UTC",
    })
    .slice(0, 3)} ${date.getUTCDate()}`;
};
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatTime = (time) =>
  `${formatHours(time)}:${formatMinutes(time)} ${isPM(time) ? "PM" : "AM"}`;

export const formatHours = (time) => {
  let hours = time.getUTCHours();
  return hours == 0 ? 12 : hours > 12 ? hours - 12 : hours;
};
export const formatMinutes = (time) => {
  let minutes = time.getUTCMinutes();
  return minutes > 9 ? minutes : `0${minutes}`;
};

export const isPM = (time) => {
  const hours = time.getUTCHours();
  return hours > 11 && hours != 24;
};

export const inRange = (val, min, max) =>
  /^\d+$/.test(val) && val >= min && val <= max;

export const swapMeridiem = (time) => {
  let newTime = time;
  const hours = time.getUTCHours();
  newTime.setUTCHours(hours < 11 ? hours + 12 : hours - 12);
  return newTime;
};

export const setUTCUnits = (date, timeUnits = {}, dateIsPM = null) => {
  const isTimePM = !dateIsPM ? isPM(date) || timeUnits.hours > 11 : dateIsPM;
  const units = {
    seconds: date.getUTCSeconds(),
    minutes: date.getUTCMinutes(),
    hours: date.getUTCHours(),
    ...timeUnits,
  };

  let newDate = date;
  inRange(units.minutes, 0, 60) && newDate.setUTCMinutes(units.minutes);
  inRange(units.seconds, 0, 60) && newDate.setUTCSeconds(units.seconds);

  if (dateIsPM !== null) {
    if (!isTimePM && units.hours == 12) {
      newDate.setUTCHours(0);
    } else if (inRange(units.hours, 0, 12)) {
      newDate.setUTCHours(units.hours);
    }
    const hours = newDate.getUTCHours();
    if ((hours < 11 && isTimePM) || (hours > 12 && !isTimePM)) {
      newDate = swapMeridiem(newDate);
    }
  } else {
    newDate.setUTCHours(units.hours);
  }

  return [
    newDate,
    { minutes: newDate.getUTCMinutes(), hours: newDate.getUTCHours() },
  ];
};

export const setByDateUnit = (date, unit, i) => {
  let newDate = date;
  if (unit == "day") {
    newDate.setUTCDate(i);
  } else if (unit == "month") {
    newDate.setUTCMonth(i);
  } else if (unit == "year") {
    newDate.setUTCFullYear(date.getUTCFullYear() + i);
  }
  return newDate;
};

export const relativeTime = (time, formatTime = null) => {
  const defaultFormat = (timePast, units) =>
    timePast ? `${timePast}${units} ago` : "just now";
  const format = formatTime ?? defaultFormat;
  const millisecondsPast = Date.now() - time;
  const timeUnits = {
    years: () => new Date(millisecondsPast).getUTCFullYear() - 1970,
    months: () => new Date().getMonth() - new Date(time).getMonth(),
    weeks: () => millisecondsPast / 604800000,
    days: () => millisecondsPast / 86400000,
    hours: () => millisecondsPast / 3600000,
    minutes: () => millisecondsPast / 60000,
    seconds: () => millisecondsPast / 1000,
  };

  for (const [units, func] of Object.entries(timeUnits)) {
    let timePast = Math.floor(func());
    if (timePast > 0) {
      return format(timePast, units, defaultFormat(timePast, units));
    }
  }
  return format(0, 0, defaultFormat(0, 0));
};
