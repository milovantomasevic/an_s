function runCell() {
    text = document.getElementById(selectedCellNumber).children[1].value;
    console.log(text);

    // we need to disable the run button for further run
    document.getElementById('run').disabled = true;
    fetch('/sandbox/command-processing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "X-CSRFToken": document.querySelector('input[name="csrf_token"]').value},
        body: JSON.stringify({command: text})
    }).then((response)=>response.json()).then((data)=>{
        console.log(data);
        document.getElementById(selectedCellNumber).children[2].innerText = data.result;
        document.getElementById('run').disabled = false;
    });
}