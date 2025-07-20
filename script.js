const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rgbaOutput = document.getElementById('rgbaOutput');

imageInput.addEventListener('change', function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = e.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

canvas.addEventListener('click', function (e) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(e.clientX - rect.left);
  const y = Math.floor(e.clientY - rect.top);
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  rgbaOutput.textContent = `RGBA: (${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]}) at (${x}, ${y})`;
});
