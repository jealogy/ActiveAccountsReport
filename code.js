function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate();
}
 

function getData() {
  var spreadSheetId = "18XesslVcAD3VfuNaVVl5WRDvh2zOhvQtPjdQe_BiUPg";
  var dataRange = "Sheet1!A2:AX"; 
  
  var range = Sheets.Spreadsheets.Values.get(spreadSheetId, dataRange);
  var values = range.values;

  return values;
}

function updateRow(rowIdx, amortization, payments, balance, monthData) {
  var spreadSheetId = "18XesslVcAD3VfuNaVVl5WRDvh2zOhvQtPjdQe_BiUPg";
  var sheet = SpreadsheetApp.openById(spreadSheetId).getSheetByName("Sheet1");

  var row = rowIdx + 2; // Adjust for 1-indexed rows

  // Update the values
  sheet.getRange(row, 12).setValue(amortization); // Monthly Amortization
  sheet.getRange(row, 13).setValue(payments); // Number of Payments
  sheet.getRange(row, 14).setValue(balance); // Balance

  // Update monthly columns
  for (var month = 0; month < 12; month++) {
    var monthIndex = month * 4 + 15; // Starting column index for each month
    var data = monthData[month] || {};
    
    sheet.getRange(row, monthIndex).setValue(data.status || ""); // Status
    sheet.getRange(row, monthIndex + 1).setValue(data.referenceNo || ""); // Reference No.
    sheet.getRange(row, monthIndex + 2).setValue(data.remarks || ""); // Remarks
    sheet.getRange(row, monthIndex + 3).setValue(data.redDebit || ""); // Redebit
  }
}
