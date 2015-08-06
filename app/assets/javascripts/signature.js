var canvas = document.querySelector("canvas");

function resizeCanvas() {
  var ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

var signaturePad = new SignaturePad(canvas, {
  minWidth: 3,
  maxWidth: 4,
  penColor: "rgb(0, 0, 0)"
 });


// Returns signature image as data URL
signaturePad.toDataURL();

// Draws signature image from data URL
signaturePad.fromDataURL("data:image/png;base64,iVBORw0K...");

// Clears the canvas
signaturePad.clear();

// Returns true if canvas is empty, otherwise returns false
signaturePad.isEmpty();
var wrapper = document.getElementById("signature-pad"),
  clearButton = wrapper.querySelector("[data-action=clear]"),
  signPdfButton = wrapper.querySelector("[data-action=sign-pdf]"),
  signXlsButton = wrapper.querySelector("[data-action=sign-xls]"),
  previewButton = wrapper.querySelector("[data-action=preview]"),
  canvas = wrapper.querySelector("canvas"),
  signaturePad;

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
});

previewButton.addEventListener("click", function (event) {
   window.open(signaturePad.toDataURL());
  
});

///process pdf document
signPdfButton.addEventListener("click", function (event) {
   processSign("pdf");

});

///process xls document
signXlsButton.addEventListener("click", function (event) {
  processSign("xls");

});


function processSign(type){
  if (signaturePad.isEmpty()) {
    alert("Please provide signature first.");
  } else {
    $('#data_uri').val(signaturePad.toDataURL());
    $('#doc_type').val(type);

    $('#form').submit();
  }
}