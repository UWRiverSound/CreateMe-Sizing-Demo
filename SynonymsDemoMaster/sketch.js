
/* Input files are hard loaded here for now */
let customerFileName = "PilotCustomer";
let fileType = ".csv"
let labelsLookup ;
let headerData = 2;
let sizingLookup;
let apexTable;

let nextButton; // reuse
let showJSONButton; // Reuse
let saveOutputButton; // Reuse
let JSONdisplay; // Reuse
let intro; // Reuse


function preload() {
  customerData = loadStrings("InputFiles/" + customerFileName + fileType)
  labelsLookup = loadStrings("InputFiles/" + customerFileName + "Measurement" + fileType)
  sizingLookup = loadStrings("InputFiles/" + customerFileName + "Sizes" + fileType);
  apexTable = loadTable("InputFiles/PilotShimaSeiki.csv", "csv", "header");
}


function setup() {

  createCanvas(500,10);
  background(100);
  // saveFileUpdateApex();
  createElement("h1", "The Process");
  
  intro = createP("Press the button to view the sequence of file translations./n" +
  "Each file that is produced can be saved, you can simply display it and move on." +
  "Each stage of the process has a standalone version.  A mystery is that the final stage, producing the updated Apex .csv/n" +
  "works in the standalone, but not in this demo.  This begs the question of finding a better library for tables.");
  intro.id('intro');
  
  saveOutputButton = createButton(' ');
  saveOutputButton.id("saveB");
  saveOutputButton.hide();

  showJSONButton = createButton(' ');
  showJSONButton.id("jDisplay");
  showJSONButton.hide();

  

  nextButton = createButton("Convert PilotCustomer .csv to .json")
  nextButton.id("nextB");
  nextButton.mousePressed(customerToJSON);

  JSONdisplay = createDiv();
  JSONdisplay.id('formatJSON');
  JSONdisplay.hide();
}

function changeText(id, str) {
  document.getElementById(id).innerHTML = str;
}



function saveFileUpdateApex() {
 
  uwSaveTable(apexTable, 'ShimaSeikiUpdate');
}

function uwSaveTable(table,filename) {
  arrayOfStrings = [];
 
  for(let r = 0 ; r < table.getRowCount();r++) {
    let row = oneRow(table,r);
    arrayOfStrings.push(row);
  }
 
 saveStrings(arrayOfStrings,filename, 'csv')
}

function oneRow(table,row) {
  oneLine = table.getString(row,0);
 
  let count = table.getColumnCount();
 
  for(let c = 1; c < count ; c++) {
  
    oneLine =  oneLine +  "," + table.get(row,c) 
  }
  //console.log(oneLine);
  return oneLine;
}
