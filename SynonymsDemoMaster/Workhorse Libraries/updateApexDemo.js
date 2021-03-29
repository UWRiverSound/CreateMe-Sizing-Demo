function updateAndSave() {
  
    JSONdisplay.hide();
    saveOutputButton.hide();
    if (!apexTable) {
        changeText('intro', "No Shima Seiki file");
    } else {
        nextButton.hide();
        changeText("intro", "Shima Seiki table modified in the LL column\nPress the button to save it as a .csv. Compare it with PilotShimaSeiki.csv and PilotCustomer.csv")
        
        updateApex(apexTable, 'LL');
        saveOutputButton.show();
        changeText('saveB', "Save Shima Seiki File");
        saveOutputButton.mousePressed(saveFileUpdateApex);   
    }
}
   
  
  /*
  function doIt() {
   // let displayJSON = createElement('p',JSON.stringify(customerJSON,null,' '));
   // displayJSON.style('white-space', 'break-spaces')
    console.log("We are here and we are stuck");
    uwSaveTable(apexTable, "testing.csv")
  }
  */
  function updateApex( apex, aColumnId) {
  
  
    // These are the same for all labels 
    // Locate the customerSize label
    let customerSize = findCustomerSize(customerDemo.Sizes, aColumnId);
  
    // Locate APEX column
    let apexColumn = apex.getRow(1).arr.indexOf(aColumnId);
    console.log("Apex column", apexColumn, "Customer column: " + customerSize);
    let measureArray = synonyms.Measurements;
  
  
    // console.log("Measure array", measureArray);
  
    // These need to iterate through the rows
    for (let i = 0; i < measureArray.length; i++) {
      // i = 0;
      thisPair = measureArray[i];
      console.log("this pair",thisPair);
      let apexLabel = thisPair.APEX;
      if (apexLabel == "") {
        console.log(i, "No apex row!", thisPair);
      } else {
        customerLabel = thisPair[customerFileName];
        // Locate the customer Measurement - do this in one step since you are right there.
        let customerMeasureString = 
        findCustomerMeasure( customerLabel, customerDemo.SizingChartMaster, customerFileName, customerSize);
        let customerMeasureValue = fractionToFloat(customerMeasureString);
        console.log(customerMeasureValue, customerMeasureString);
  
  
  
        // Locate the APEX table row and drop in the value.
  
        let apexRow = apexTable.findRow(apexLabel, 1);
        if (apexRow == null) {
          console.log(i, "no such row in apex table")
        } else {
          console.log(i, apexLabel, customerLabel, apexRow);
          let apexRowOldvalue = apexRow.get(apexColumn);
          console.log("Customer value", customerMeasureValue, "Apex value", apexRowOldvalue);
          apexRow.set(apexColumn, customerMeasureValue);
        }
      }
  
  
    }
  
  }
  
  
  
  function findCustomerMeasure( cLabel, cArray, cName, cSize) {
    let i = 0;
    let found = false;
    let cValue;
    // console.log("In findCustomerMeasure", cLabel,cArray, cName,cSize);
    while (i < cArray.length && !found) {
      let thisRecord = cArray[i];
      if (thisRecord[cName] === cLabel) {
        found = true;
        //  console.log(thisRecord.Sizing[cSize]);
        cValue = thisRecord.Sizing[cSize];
        // console.log("Size in inches is: ", cValue);
  
      }
  
      i++
    }
    return cValue;
  }
  
  function fractionToFloat(str) {
    // parses "int" or "int simpleFraction" 
    //   Returns undefined for other messy things:
     //  1A,  1 A, 1 2, 1 2/A
       
    if (typeof(str) == "string")  {
      let strA = str.split(" ");
  
      if (strA.length == 1) return parseInt(strA);
      else if (strA.length == 2) {
        let fra = strA[1].split("/");
        return (fra[0] / fra[1] + parseInt(strA[0]));
      } else return null;
    }
  }
  
  //This is working 
  function findCustomerSize(cArray, aColID) {
  
    let i = 0;
    let found = false;
    let customerColumn;
    while (i < cArray.length && !found) {
      let apexColumn = cArray[i].APEX;
      if (apexColumn === aColID) {
        found = true;
        customerColumn = cArray[i][customerFileName].SetApex;
      }
      i++;
    }
    return customerColumn;
  }