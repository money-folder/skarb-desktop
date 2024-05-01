const path = require('node:path');

/**
 * @param {string} column
 *
 * @example
 * // returns 'id'
 * dropDatabaseColumnPrefix('wh_id')
 *
 * @example
 * // returns 'name'
 * dropDatabaseColumnPrefix('w_name')
 *
 * @returns {string}
 */
const dropDatabaseColumnPrefix = (column) => column.split('_')[1];

/**
 *
 * @param date
 *
 * @example
 * // returns '2021-09-01T12-00-00'
 * getReadableDate(new Date('2021-09-01T12:00:00'))
 *
 * @returns {string}
 */
const formatDateToSQLiteString = (date) => {
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day}T${hours}-${minutes}-${seconds}`;
};

const MS_IN_DAY = 1000 * 60 * 60 * 24;
const getDateDiffInDays = (date1, date2) => Math.abs(date2 - date1) / MS_IN_DAY;

const getAbsoluteFilePath = (filePath) =>
  path.isAbsolute(filePath) ? filePath : path.resolve(filePath);

module.exports = {
  dropDatabaseColumnPrefix,
  formatDateToSQLiteString,
  getDateDiffInDays,
  getAbsoluteFilePath,
};
