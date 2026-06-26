// Funkcija za dobijanje shema izabrane baze
function getSchemaOptions(connType, fieldId) {
  console.log('Fetching schemas for connection type:', connType);

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
    console.log('Received schema data:', data);

    var field = document.getElementById(fieldId);
    field.innerHTML = data;
  })
  .catch(function(error) {
    console.log('Error fetching schemas:', error);
  });
}

function setupFieldAndLocalStorage(fieldId, storageKey) {
  var field = document.getElementById(fieldId);
  var savedValue = localStorage.getItem(storageKey);

  console.log('Saved', fieldId, ':', savedValue);

  if (savedValue) {
    field.value = savedValue;

    getSchemaOptions(savedValue, fieldId.replace('conn_type', 'schema'));

    var schemaField = document.querySelector('[name="' + fieldId.replace('conn_type', 'schema') + '"]');
    var savedSchema = localStorage.getItem(storageKey.replace('conn_type', 'schema'));

    if (savedSchema) {
      setTimeout(function() {
        schemaField.value = savedSchema;
        console.log('Setting schema value from localStorage:', savedSchema);
      }, 200);
    } else {
      getSchemaOptions(savedValue, fieldId.replace('conn_type', 'schema'));
    }
  }

  field.addEventListener('change', function() {
    var connType = this.value;

    localStorage.setItem(storageKey, connType);

    getSchemaOptions(connType, fieldId.replace('conn_type', 'schema'));
    console.log('Connection type changed to:', connType);
  });
}

setupFieldAndLocalStorage('src_conn_type', 'src_conn_type');
setupFieldAndLocalStorage('dst_conn_type', 'dst_conn_type');

document.addEventListener('submit', function(event) {
  var form = event.target;

  ['src_conn_type', 'dst_conn_type'].forEach(function(connTypeField) {
    var field = form.querySelector('[name="' + connTypeField + '"]');
    var schemaField = form.querySelector('[name="' + connTypeField.replace('conn_type', 'schema') + '"]');

    if (field) {
      var connType = field.value;
      var schema = schemaField ? schemaField.value : null;

      localStorage.setItem(connTypeField, connType);
      if (schema) {
        localStorage.setItem(connTypeField.replace('conn_type', 'schema'), schema);
      }

      console.log('Form submitted. Connection type:', connType, 'Schema:', schema);
    }
  });
});
