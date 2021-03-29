

let synonyms = {};
function buildSynonyms() {
    JSONdisplay.hide();
    saveOutputButton.hide();
  
    synonyms = buildSynonymsJSON(labelsLookup, sizingLookup, synonyms)
   // console.log("Synonyms after processing", synonyms);
  
    if (! synonyms) changeText('intro', "The file was not converted.")
    
    else {
      changeText('intro', 'The synonyms files was built');
      nextButton.hide();
      showJSONButton.show();
      changeText('jDisplay', "View synonyms file");
      showJSONButton.mousePressed(displaySynonyms);
  
      saveOutputButton.show();
      changeText('saveB',"Save synonym file");
     
      saveOutputButton.mousePressed(saveFileSynonyms);
  
      console.log("Synonyms after processing", synonyms);
  
    }
  }
  
  function displaySynonyms() {
    JSONdisplay.show();
  
    let jp = JSON.stringify(synonyms, null, ' ');
    changeText('formatJSON',"The synonyms file:\n" + jp);
    showJSONButton.hide();
  
    nextButton.show();
    changeText("nextB","Update customer JSON");
    nextButton.mousePressed(updateCustomerJSON);
  }
  
  function saveFileSynonyms() {
    saveJSON(synonyms, customerFileName + "Synonyms" + ".json");
  }
  
  
  
  
  
  
  
  // Build the whole json object from the measurements and sizing labels
  function buildSynonymsJSON(labelsLookup, sizingLookup, synonyms) {
  
    let structinfo = labelsLookup[0].split(",");
    let attributeLabel = structinfo[0];
    let apexColumn = parseInt(structinfo[1]);
  
     synonyms[attributeLabel] = arrayOfStringsToJSON(labelsLookup, customerFileName, apexColumn)
  
  
    structinfo = sizingLookup[0].split(",");
    attributeLabel = structinfo[0];
    apexColumn = parseInt(structinfo[1]);
    synonyms[attributeLabel] =
      arrayOfStringsToJSON(sizingLookup, customerFileName, apexColumn)
    return synonyms;
  
  }
  
  
  
  //converts a structured .csv file to a json object  
  function arrayOfStringsToJSON(lookupString, customerName, apexColumn) {
  
    let result = {}
    let dataArray = [];
  //  console.log(lookupString.length)
    for (let i = 1; i < lookupString.length; i++) {
      let parseThisRow = lookupString[i].split(',');
   //   console.log(i, parseThisRow);
      let temp = buildOneStruct(lookupString[i], customerName, apexColumn);
  
      dataArray.push(temp);
    }
      return dataArray;
    
  }
  
  // Builds a single structure for the json object, maybe not necessary as separate function?
  function buildOneStruct(attributeString, customerName, apexColumn) {
    let attributeArray = attributeString.split(",");
   // console.log(attributeString);
    let tempStruct = {};
    let customerColumn = (apexColumn == 1) ? 0 : 1;
    tempStruct["APEX"] = attributeArray[apexColumn];
    if (attributeArray.length == 2) {
      tempStruct[customerName] = attributeArray[customerColumn];
    } else { 
      // there is an accessType from index 1 & 2, 3 & 4
      // Note that there could be many many more?
      
      accessStruct = {};
      accessStruct[attributeArray[2]] = attributeArray[1];
      accessStruct[attributeArray[4]] = attributeArray[3];
     
      tempStruct[customerName] = accessStruct;
  
  
  
    }
  
    return tempStruct;
  }