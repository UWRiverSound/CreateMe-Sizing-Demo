let customerDemo;
let customerData;

function customerToJSON() {
 
    //use try but not now.
    nextButton.hide();
    customerDemo = buildJSON(convertTable(customerData));
    if (!customerDemo) changeText('intro', "The file was not converted.")
  
    else {
      changeText('intro', 'The .csv has been converted to JSON');
      
      showJSONButton.show();
      changeText('jDisplay', "View customer json without APEX");
      showJSONButton.mousePressed(displayJSON);
  
      saveOutputButton.show();
      changeText('saveB', "Save customer json file");
      saveOutputButton.mousePressed(saveFile);
  
      // console.log(customerDemo);
  
    }
  }
  
  function displayJSON() {
   
    nextButton.show();
    changeText("nextB","Build synonyms");
    nextButton.mousePressed(buildSynonyms);

    let jp = JSON.stringify(customerDemo, null, ' ');
    
    JSONdisplay.show();
    changeText('formatJSON',"The customer JSON file without APEX:\n" + jp);
    showJSONButton.hide();
  
  }
  
  function saveFile() {
    saveJSON(customerDemo, customerFileName + ".json");
  }
  

  
  function convertTable(data) {
    let dataArray = [];
    for (let r = 0; r < data.length; r++) {
      rString = data[r];
      dataArray.push(data[r].split(","));
  
    }
    return dataArray;
  }
  
  function buildJSON(dataArray) {
    // console.log(dataArray);
    let demo = [];
    let headers = dataArray[0];
    // console.log(headers);
    let oneRow = {};
    for (let row = 1; row < dataArray.length; row++) {
      let temp = {};
      addData(temp, dataArray[row], headers);
      demo.push(temp);
  
    }
    return {
      "SizingChartMaster": demo
    }
  }
  
  function addData(dem, r, heads) {
  
  
    /* In case you want to dummy up apex and put customer in a list */
    dem["APEX"] = "Not defined";
    dem[customerFileName] = []
    dem[customerFileName].push(r[0]);
  
    dem[customerFileName] = r[0];
    dem["Sizing"] = {};
    let subDemo = dem["Sizing"];
    for (let i = 1; i < r.length; i++) {
      subDemo[heads[i]] = r[i];
    }
    // console.log(dem)
  
  }
  
  function buildTable(demo) {
    // console.log(demo);
    let sizingArray = demo.SizingChartMaster;
    let headers = "Sizes," + Object.keys(sizingArray[0].Sizing).toString();
  
    let strArray = [];
    strArray.push(headers);
    for (let i = 0; i < sizingArray.length; i++)
      strArray.push(buildRow(sizingArray[i]));
    return strArray;
  }
  
  function buildRow(row) {
    return row[fileName] + "," + Object.values(row.Sizing);
  }