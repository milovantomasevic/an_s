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

var srcConnTypeField = document.getElementById('conn_type');
srcConnTypeField.addEventListener('change', function() {
  var connType = this.value;
  getSchemaOptions(connType, 'schema');
});
