/* This is the version of updateApex that seems to crash saveTable.
   I suspect it has to do with either too much data or data specificity or ......
   I never did change those number to strings
   */


function updateApexDemo() {
    JSONdisplay.hide();
    saveOutputButton.hide();
    if (!apexTable) {
        changeText('intro', "No Shima Seiki file");
    } else {
        nextButton.hide();
        changeText("intro", "Shima Seiki table modified in the LL column\nPress the button to save it as a .csv. Compare it with PilotShimaSeiki.csv and PilotCustomer.csv")
    
        updateApex(apexTable, customerDemoH, synonymsH, 'LL', customerFileName);
        saveOutputButton.show();
        changeText('saveB', "Save Shima Seiki File");
    
        saveOutputButton.mousePressed(saveFileUpdateApexUW);
    }
}




function updateApex(apex, customer, synonymsJSON, aColumnId, customerName) {
    //console.log("customer", customer)
    //console.log("synonyms", synonymsJSON)
    

    /*  These are the same for all labels */
    // Locate the customerSize label
    let customerSize = findCustomerSize(customer.Sizes, aColumnId, customerName);

    // Locate APEX column
    let apexColumn = apex.getRow(1).arr.indexOf(aColumnId);
    console.log("Apex column", apexColumn, "Customer column: " + customerSize);
    let measureArray = synonymsJSON.Measurements;
    


    
    // These need to iterate through the rows
    for (let i = 0; i < 2  ; i++ ) { // measureArray.length; i++) {
       
       
        thisPair = measureArray[i];
        console.log("This pair", thisPair);
        apexLabel = thisPair.APEX;
        if (apexLabel == "") {
            console.log(i, "No apex row!", thisPair);
        } else {
            customerLabel = thisPair[customerName];
            // Locate the customer Measurement - do this in one step since you are right there.
            let customerMeasureString = findCustomerMeasure(customerLabel, customer.SizingChartMaster, customerName, customerSize);
            let customerMeasureValue = fractionToFloat(customerMeasureString);
            console.log("Customer value", customerMeasureValue, "Customer string", customerMeasureString);



            // Locate the APEX table row and drop in the value.

            let apexRow = apexTable.findRow(apexLabel, 1);
            if (apexRow == null) {
                console.log(i, "no such row in apex table")
            } else {
                console.log("Right down in there", i, apexLabel, customerLabel, apexRow);
                let apexRowOldvalue = apexRow.get(apexColumn);
                console.log("Customer value", customerMeasureValue, "Apex value", apexRowOldvalue);
                apexRow.set(apexColumn, customerMeasureValue);
                console.log("new table value", apexRow.get(apexColumn));
            }
        }


    }
    
}



function findCustomerMeasure(cLabel, cArray, cName, cSize) {
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
    /* parses "int" or "int simpleFraction" 
       Returns undefined for other messy things:
       1A,  1 A, 1 2, 1 2/A
       */
    if (typeof (str) == "string") {
        let strA = str.split(" ");

        if (strA.length == 1) return parseInt(strA);
        else if (strA.length == 2) {
            let fra = strA[1].split("/");
            return (fra[0] / fra[1] + parseInt(strA[0]));
        } else return null;
    }
}

/*This is working */
function findCustomerSize(cArray, aColID, customerName) {

    let i = 0;
    let found = false;
    let customerColumn;
    while (i < cArray.length && !found) {
        let apexColumn = cArray[i].APEX;
        if (apexColumn === aColID) {
            found = true;
            customerColumn = cArray[i][customerName].SetApex;
        }
        i++;
    }
    return customerColumn;
}