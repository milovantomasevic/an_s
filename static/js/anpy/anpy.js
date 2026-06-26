let selectedCellNumber = 1;
let maxCellNumber = 1;

function do_resize(textbox) {
    textbox.style.height = 'auto'; // Postavljamo visinu na auto kako bismo oslobodili prethodne postavke visine
    textbox.style.height = textbox.scrollHeight + 'px'; // Postavljamo visinu na visinu sadržaja
}

function selecteCell(cell){
    if(selectedCellNumber){
        document.getElementById(selectedCellNumber).style.backgroundColor = "white";
    }
    selectedCellNumber = cell.id;
    document.getElementById(selectedCellNumber).style.backgroundColor = "#d5d9f8";
    console.log('cell selected: ', selectedCellNumber)
}

// automatically select the first cell
selecteCell(document.getElementById("1"))

function addCell(){
    maxCellNumber ++;
    document.getElementById("cell-list").insertAdjacentHTML( 'beforeend', 
    `<div class="cell" id="${maxCellNumber}" onclick="selecteCell(this)"> 
    <h4>[${maxCellNumber}]</h4>
    <textarea onkeyup="do_resize(this);"></textarea>
    <p></p>
    </div>`);
    selecteCell(document.getElementById(maxCellNumber));
}
