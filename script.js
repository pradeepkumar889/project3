function mergeImages() {
    const fileInput = document.getElementById('imageUpload');
    const files = fileInput.files;
  
    if (files.length < 2) {
      alert('Please select at least two images to merge.');
      return;
    }
  
    const images = [];
    let loadedImages = 0;
  
    // Create Image objects for each selected file
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          images.push(img);
          loadedImages++;
          if (loadedImages === files.length) {
            renderMergedImage(images);
          }
        };
      };
      reader.readAsDataURL(file);
    });
  }
  
  function renderMergedImage(images) {
    const totalWidth = images.reduce((acc, img) => acc + img.width, 0);
    const maxHeight = Math.max(...images.map(img => img.height));
  
    const canvas = document.getElementById('canvas');
    canvas.width = totalWidth;
    canvas.height = maxHeight;
    const ctx = canvas.getContext('2d');
  
    let xOffset = 0;
    images.forEach(img => {
      ctx.drawImage(img, xOffset, 0);
      xOffset += img.width;
    });
  
    // Show download link
    const downloadLinkContainer = document.getElementById('downloadLinkContainer');
    downloadLinkContainer.innerHTML = '';
    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL('image/jpeg');
    downloadLink.download = 'merged_image.jpg';
    downloadLink.textContent = 'Download Merged Image';
    downloadLinkContainer.appendChild(downloadLink);
  }
  