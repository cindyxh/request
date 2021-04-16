/**
 * replace placeholders {} in str with params object
 * @param {String} str e.g. your {carname} is locked.
 * @param {JSON} params
 */
const stringInterpolation = (str, params) => {
  const regex = /{([^}]*)}/g;
  return str.replace(regex, (m, c) => escape(params[c.trim()]));
};

module.exports = {
  stringInterpolation,
};
