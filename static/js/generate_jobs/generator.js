// Funkcija za dobijanje shema izabrane baze
function getSchemaOptions(connType, fieldId) {
  fetch('/pipeline/get_schemas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': document.querySelector('input[name="csrf_token"]').value
    },
    body: 'conn_type=' + connType
  })
  .then(function(response) {
    return response.text();
  })
  .then(function(data) {
    var field = document.getElementById(fieldId);
    field.innerHTML = data;
  })
  .catch(function(error) {
    console.log('Error:', error);
  });
}

var srcConnTypeField = document.getElementById('src_conn_type');
srcConnTypeField.addEventListener('change', function() {
  var connType = this.value;
  getSchemaOptions(connType, 'src_schema');
});

var dstConnTypeField = document.getElementById('dst_conn_type');
dstConnTypeField.addEventListener('change', function() {
  var connType = this.value;
  getSchemaOptions(connType, 'dst_schema');
});

document.getElementById('src_schema').addEventListener('change', function() {
  var connType = document.getElementById('src_conn_type').value;
  var schema = this.value;

  fetch('/pipeline/get_tables', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': document.querySelector('input[name="csrf_token"]').value
    },
    body: 'conn_type=' + connType + '&schema=' + schema
  })
  .then(function(response) {
    return response.text();
  })
  .then(function(data) {
    document.getElementById('include_tables').innerHTML = data;
    document.getElementById('exclude_tables').innerHTML = data;
  })
  .catch(function(error) {
    console.log('Error:', error);
  });
});
