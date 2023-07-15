function setById(id, data) {
  let elm = $('#' + id)
  let elm_type = elm.prop('nodeName')
  let is_data_empty = data === undefined || data === '' || data === null || data === 0
  data = is_data_empty ? '' : data

  switch (elm_type) {
    case 'INPUT':
      elm.val(data); break;
    case 'SELECT':
      elm.val(data); break;
    case 'TEXTAREA':
      elm.val(data); break;
    default:
      elm.text(data); break;
  }
}

function getById(id) {
  let elm = $('#' + id)
  let elm_type = elm.prop('nodeName')

  switch (elm_type) {
    case 'INPUT':
      return elm.val();
    case 'SELECT':
      return elm.val();
    case 'TEXTAREA':
      return elm.val();
    default:
      return elm.text();
  }
}

function time_str_convert(seconds) {
  let minutes = Math.floor(seconds / 60);
  let extraSeconds = seconds % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
  return minutes + ":" + extraSeconds
}