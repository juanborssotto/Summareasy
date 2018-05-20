var lastRecord = [];
var titleColor = '#000000';

var colsBootstrapGridPDF = 7;
var colsBootstrapGridSummPage = 5;

$(document).on('keypress', function(e) {
  var keyPressed = String.fromCharCode(e.which);
  var selectedText = window.getSelection().toString();

  if(selectedText == '')
    selectedText = 'Lorem Lorem Lorem Lorem Loren';

  if(keyPressed == 'q' && selectedText.trim() != ''){
    addLine(selectedText);	
  }
  if(keyPressed == 'w' && selectedText.trim() != ''){
    addNewLine(selectedText);
  }
  if(keyPressed == 'e'){
    undo(); 
  }
  if(keyPressed == 't' && selectedText.trim() != ''){
    addTitle(selectedText); 
  }
});

addLine = function(t){
  var text = $('#summaryPage div:last').text();
  if(text == '')
    $('#summaryPage').append($('<div>',{text: t}));  
  else
    $('#summaryPage div:last').text(text + t);
  scrollBarToEnd('summaryPage');
}

addNewLine = function(t){
  $('#summaryPage').append($('<div>',{text: t}));
  scrollBarToEnd('summaryPage');
}

addTitle = function(t){
  $('#summaryPage').append($('<br>'));
  $('#summaryPage').append($('<div>',{text: t, class: 'title', style: 'color:' + titleColor}));
  scrollBarToEnd('summaryPage');
}

undo = function(){
  $('#summaryPage div:last').remove();
  var summPage = $('#summaryPage')[0];
  var summPageLastChild = summPage.lastChild;
  if(summPageLastChild != null && summPageLastChild.nodeName == 'BR')
    summPage.removeChild(summPageLastChild);
}

redo = function(){
  //ToDo
}

//scrollBarToEnd: Bajar scrollbar del summary page hacia el final
scrollBarToEnd = function(id){
  var $object = $('#' + id);
  $object.scrollTop($object[0].scrollHeight);
}

copySummaryPageToClipboard = function(){
    $("#summaryPage").selectText();
    /*var e = jQuery.Event("keydown");
    e.which = 67;
    e.ctrlKey = true;
    $('#body').append($('<'))
    $("whatever").trigger(e);*/
}

jQuery.fn.selectText = function(){
   var doc = document;
   var element = this[0];
   console.log(this, element);
   if (doc.body.createTextRange) {
       var range = document.body.createTextRange();
       range.moveToElementText(element);
       range.select();
   } else if (window.getSelection) {
       var selection = window.getSelection();        
       var range = document.createRange();
       range.selectNodeContents(element);
       selection.removeAllRanges();
       selection.addRange(range);
   }
};

titleColorPickerChange = function(c){
  titleColor = c.value;
  $('[class=title]').css('color',titleColor);
}

resizeSummPageLeft = function(){
  if(colsBootstrapGridSummPage == 7)
    return;
  $('#summaryPageResizer').removeClass('col-' + colsBootstrapGridSummPage);
  $('#summaryPageResizer').removeClass('col-sm-' + colsBootstrapGridSummPage);
  $('#summaryPageResizer').removeClass('col-md-' + colsBootstrapGridSummPage);
  $('#summaryPageResizer').removeClass('col-lg-' + colsBootstrapGridSummPage);

  colsBootstrapGridSummPage+= 1;
  $('#summaryPageResizer').addClass('col-' + colsBootstrapGridSummPage);
  $('#summaryPageResizer').addClass('col-sm-' + colsBootstrapGridSummPage);
  $('#summaryPageResizer').addClass('col-md-' + colsBootstrapGridSummPage);
  $('#summaryPageResizer').addClass('col-lg-' + colsBootstrapGridSummPage);

  $('#PDFContainer').removeClass('col-' + colsBootstrapGridPDF);
  $('#PDFContainer').removeClass('col-sm-' + colsBootstrapGridPDF);
  $('#PDFContainer').removeClass('col-md-' + colsBootstrapGridPDF);
  $('#PDFContainer').removeClass('col-lg-' + colsBootstrapGridPDF);

  colsBootstrapGridPDF-= 1;
  $('#PDFContainer').addClass('col-' + colsBootstrapGridPDF);
  $('#PDFContainer').addClass('col-sm-' + colsBootstrapGridPDF);
  $('#PDFContainer').addClass('col-md-' + colsBootstrapGridPDF);
  $('#PDFContainer').addClass('col-lg-' + colsBootstrapGridPDF);
}

resizeSummPageRight = function(){
  if(colsBootstrapGridSummPage == 3)
    return;
  $('#summaryPageResizer').removeClass('col-' + colsBootstrapGridSummPage);
  $('#summaryPageResizer').removeClass('col-sm-' + colsBootstrapGridSummPage);
  $('#summaryPageResizer').removeClass('col-md-' + colsBootstrapGridSummPage);
  $('#summaryPageResizer').removeClass('col-lg-' + colsBootstrapGridSummPage);

  colsBootstrapGridSummPage-= 1;
  $('#summaryPageResizer').addClass('col-' + colsBootstrapGridSummPage);
  $('#summaryPageResizer').addClass('col-sm-' + colsBootstrapGridSummPage);
  $('#summaryPageResizer').addClass('col-md-' + colsBootstrapGridSummPage);
  $('#summaryPageResizer').addClass('col-lg-' + colsBootstrapGridSummPage);

  $('#PDFContainer').removeClass('col-' + colsBootstrapGridPDF);
  $('#PDFContainer').removeClass('col-sm-' + colsBootstrapGridPDF);
  $('#PDFContainer').removeClass('col-md-' + colsBootstrapGridPDF);
  $('#PDFContainer').removeClass('col-lg-' + colsBootstrapGridPDF);

  colsBootstrapGridPDF+= 1;
  $('#PDFContainer').addClass('col-' + colsBootstrapGridPDF);
  $('#PDFContainer').addClass('col-sm-' + colsBootstrapGridPDF);
  $('#PDFContainer').addClass('col-md-' + colsBootstrapGridPDF);
  $('#PDFContainer').addClass('col-lg-' + colsBootstrapGridPDF);
}

//addLine = function(t){
//  lastRecord.push($('#summaryPage').val());
//  $('#summaryPage').val($('#summaryPage').val() + t);
//  var $textarea = $('#summaryPage');
//  $textarea.scrollTop($textarea[0].scrollHeight);
//}
 
//addNewLine = function(t){
//  lastRecord.push($('#summaryPage').val());
//  if($('#summaryPage').val().trim() == '')
//    $('#summaryPage').val(t);
//  else
//    $('#summaryPage').val($('#summaryPage').val() + '\n' + t);
//  var $textarea = $('#summaryPage');
//  $textarea.scrollTop($textarea[0].scrollHeight);
//}

//addTitle = function(t){
//  t = t.toUpperCase();
//  lastRecord.push($('#summaryPage').val());
//  if($('#summaryPage').val().trim() == '')
//    $('#summaryPage').val(t + '\n');
//  else
//    $('#summaryPage').val($('#summaryPage').val() + '\n\n' + t + '\n');
//  var $textarea = $('#summaryPage');
//  $textarea.scrollTop($textarea[0].scrollHeight);
//}

//undo = function(){
//  var index = lastRecord.length - 1;
//  $('#summaryPage').val(lastRecord[index]);
//  lastRecord.splice(index, 1);
//  console.log(lastRecord);
//}
