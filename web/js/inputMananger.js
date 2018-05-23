var undoID = [];

var ids = {
  id: 0,
  currentIDChanged: function(id) {
    undoID.push(id);
  },
  set currentID(id) {
    this.id = id;
    this.currentIDChanged(id);
  },
  get currentID() {
    return this.id;
  }
};

var titleColor = '#000000';

var colsBootstrapGridPDF = 7;
var colsBootstrapGridSummPage = 5;

var keyCommands = ['q','w','e','u','t','a'];

$(document).on('keypress', function(e) {
  var keyPressed = String.fromCharCode(e.which);
  var selectedText = window.getSelection().toString();

  //Sólo para testear, sin tener que andar seleccionando texto.
  /*if(selectedText == '')
    selectedText = 'Testing testing testing testing ._.';*/

  if(selectedText.trim() == '')
    return;

  if(!keyCommands.includes(keyPressed))
    return;

  if(keyPressed == 'q'){
    addLine(selectedText); 
  }
  if(keyPressed == 'w'){
    addNewLine(selectedText);
  }
  if(keyPressed == 'e'){
    addNewParagraph(selectedText);
  }
  if(keyPressed == 'u'){
    undo();
  }
  if(keyPressed == 't'){
    addTitle(selectedText);
  }
  if(keyPressed == 'a'){
    addItemNumberedList(selectedText);
  }
});

addNewParagraph = function(t){
  $('#summaryPage').append($('<br>'));
  $('#summaryPage').append($('<div>',{text: t, id: ++ids.currentID}));
  scrollBarToEnd('summaryPage');
}

addItemNumberedList = function(t){
  //Si el último div contiene un <ol>, agrego el item en el mismo
  if($('#summaryPage div:last ol').length == 1){
    var li = $('<li>', {text: t, id: ++ids.currentID, class: 'numberedListItem'});
    $('#summaryPage div:last ol').append(li);
  }
  else{
    //Creo un nuevo ol
    var div = $('<div>', {id: ++ids.currentID});
    var ol = $('<ol>');
    //La primera <li> no tiene id, para que el undo saque directamente el <div>
    var li = $('<li>', {text: t, class: 'numberedListItem'});
    ol.append(li);
    div.append(ol);
    $('#summaryPage').append(div);
  }
  scrollBarToEnd('summaryPage');
}

addLine = function(t){
  var text = $('#summaryPage div:last').text().trim();
  if(text == ''){
    var div = $('<div>',{text: t, id: ++ids.currentID})
    $('#summaryPage').append(div);
  }
  else{
    var span = $('<span>',{text: t, id: ++ids.currentID});
    $('#summaryPage div:last').append(span);
  }
  scrollBarToEnd('summaryPage');
}

addNewLine = function(t){
  $('#summaryPage').append($('<div>',{text: t, id: ++ids.currentID}));
  scrollBarToEnd('summaryPage');
}

addTitle = function(t){
  //Si no es el primer título, le agrego un <br>.
  if($('#summaryPage').html().trim() != ''){
    $('#summaryPage').append($('<br>'));
  }
  $('#summaryPage').append($('<div>',{text: t, class: 'title', style: 'color:' + titleColor, id: ++ids.currentID}));
  scrollBarToEnd('summaryPage');
}

undo = function(){
  var lastID = undoID.splice(-1,1)[0];
  if(lastID == undefined)
    return;
  $('#' + lastID).remove();

  //Si el último elemento de summaryPage es un <br>, lo borro
  var summPage = $('#summaryPage')[0];
  var summPageLastChild = summPage.lastChild;
  if(summPageLastChild != null && summPageLastChild.nodeName == 'BR')
    summPage.removeChild(summPageLastChild);
}

redo = function(){
  //TODO
}

copySummaryPageToClipboard = function(){
  $("#summaryPage").selectText();
  document.execCommand('copy');
  //Show toast to user
  showSnackBar('Copied to clipboard');
  window.getSelection().removeAllRanges();
  $('body').focus();
}

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
