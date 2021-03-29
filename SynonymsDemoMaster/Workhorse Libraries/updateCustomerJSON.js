




function updateCustomerJSON() {

  JSONdisplay.hide();
  saveOutputButton.hide();
  // T console.log("Synonyms at start", synonyms); // This is an array of strings;
  if (!customerDemo || !synonyms) { changeText('intro', "Input file problem") }
  else {
    updateCust(customerDemo, synonyms);
    customerDemo.Sizes = synonyms.Sizes;
    changeText('intro', "Updated customer JSON to include APEX");
    nextButton.hide();
    showJSONButton.show();
    changeText("jDisplay", "View updated customer output file");
    showJSONButton.mousePressed(displayUpdatedCustomerFile);

    saveOutputButton.show();
    changeText('saveB', "Save updated customer JSON file");

    saveOutputButton.mousePressed(saveFileUpdatedCustomer);

    console.log("Customer file at end", customerDemo)

  }
}

function displayUpdatedCustomerFile() {
  JSONdisplay.show();
  let jp = JSON.stringify(customerDemo, null, ' ');

  changeText('formatJSON', "The updated customer JSON file:\n" +jp);
  showJSONButton.hide();

  nextButton.show();
  changeText("nextB", "Update APEX .csv file");
  nextButton.mousePressed(updateAndSave);
}


function saveFileUpdatedCustomer() {
  saveJSON(customerDemo, customerFileName + "updated" + ".json");
}

// modifies the customer file so that it can play with the table. 
function updateCust(cust, lookup) {

  // T console.log("Customer in update Cust",cust);
  //T console.log("Lookup in update Cust", lookup);

  let custArray = cust.SizingChartMaster;
  //console.log("Just array in update Cust", custArray, custArray.length)
  let measures = lookup.Measurements;
  //console.log("Just the measures in update Cust", measures, measures.length);

  for (i = 0; i < custArray.length; i++) {
    let synpair = measures[i];
    //console.log(synpair);
    let p = synpair[customerFileName];
    let a = synpair.APEX;
    let result = findEntryInCustomerArray(p, a, custArray)


  }

}

function findEntryInCustomerArray(vLocate, vInsert, jarray) {
  let i = 0;
  let found = false;
  // console.log(jarray.length);
  while (i < jarray.length && !found) {
    //   console.log(i);
    if (jarray[i][customerFileName] === vLocate) {
      // console.log(i, "Find ", vLocate, " insert ", vInsert, " into ", jarray[i])
      found = true;
      // console.log(jarray[i], vLocate, vInsert);
      jarray[i].APEX = vInsert;
      //    console.log(jarray[i]);
    } else i++;
  }
  return i;
}

