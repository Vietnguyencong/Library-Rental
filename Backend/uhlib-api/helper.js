function cleanRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function create_condition_string (length, value){ 
  var array = Array(length).fill(value)
  return array.join()
}

module.exports = {
  cleanRows,
  create_condition_string
};
