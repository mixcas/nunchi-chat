import moment from 'moment-timezone/builds/moment-timezone-with-data';

const CDMXTimezone = 'America/Mexico_City';
const interchangeFormatting = 'YYYY-MM-DD HH:mm';

export const transformDatepickerValue = pickerOutput => {

  if (pickerOutput === null) {
    return null;
  }

  // parse raw input as moment date. the value of input is a js date including the local timezone of the client browser. we need to force this input time to always be America/Mexico_City
  const timeRawOutput = moment(pickerOutput);

  // output and re-parse the input into moment with timezone support and timezone set as CDMX
  const timeCDMX = moment.tz(timeRawOutput.format(interchangeFormatting), interchangeFormatting, CDMXTimezone);

  // console.log('converted output value', timeCDMX.utc().format())

  // return UTC js date object as value to be saved (in Firebase this will become a unix timestamp)
  return timeCDMX.utc().toDate();
}

export const transformDatabaseValueForPicker = databaseTimestamp => {

  if (databaseTimestamp === null) {
    return null;
  }

  // parse database Timestamp then set CDMX timezone explicitly
  const timeCDMX = moment(databaseTimestamp.toDate()).tz(CDMXTimezone);

  // console.log('timeCDMX.format()' ,timeCDMX.format());

  // create date in local timezone with same hour of day as CDMX database time
  const timeLocal = moment(timeCDMX.format(interchangeFormatting), interchangeFormatting);

  // console.log('value for datepicker', timeLocal.format());

  // return local time as a date object for picker component
  return timeLocal.toDate();
}
