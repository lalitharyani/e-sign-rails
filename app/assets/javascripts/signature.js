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
  saveButton = wrapper.querySelector("[data-action=save]"),
  previewButton = wrapper.querySelector("[data-action=preview]"),
  canvas = wrapper.querySelector("canvas"),
  signaturePad;

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
});

previewButton.addEventListener("click", function (event) {
   window.open(signaturePad.toDataURL());
  
});

saveButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
      alert("Please provide signature first.");
  } else {

  	///send ajax request to save the signature

  }

});