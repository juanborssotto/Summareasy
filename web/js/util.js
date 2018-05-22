//scrollBarToEnd: Bajar scrollbar del summary page hacia el final
scrollBarToEnd = function(id){
	var $object = $('#' + id);
	$object.scrollTop($object[0].scrollHeight);
}

//Función bien choreada de stackoverflow, anda vos a saber que hace, pero funca
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

//Mostrar un toast por pantalla al usuario
//text: El texto que querés mostrar
function showSnackBar(text) {
//If snackbar has html text on it, then it's being shown, so return
if($('#snackbar').html().trim() != '')
  return;

//Set the text you want to show
$('#snackbar').html(text);

// Get the snackbar DIV
var x = document.getElementById("snackbar");

// Add the "show" class to DIV
x.className = "show";

// After 3 seconds, remove the show class from DIV
setTimeout(function(){
  x.className = x.className.replace("show", "");
  $('#snackbar').html('');
  }, 3000);
}