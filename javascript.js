// Modal functionality
const shareButton = document.getElementById('share-button');
const shareModal = document.getElementById('shareModal');
const closeModal = document.getElementById('closeModal');
const copyLink = document.getElementById('copyLink');
const copyResult = document.getElementById('copyResult');
const shareWhatsapp = document.getElementById('shareWhatsapp');
const shareTelegram = document.getElementById('shareTelegram');
const downloadPoster = document.getElementById('downloadPoster');

// Website URL
const websiteUrl = window.location.href;

// Open modal
shareButton.addEventListener('click', () => {
  shareModal.style.display = 'flex';
});

// Close modal
closeModal.addEventListener('click', () => {
  shareModal.style.display = 'none';
  copyResult.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === shareModal) {
    shareModal.style.display = 'none';
    copyResult.style.display = 'none';
  }
});

// Copy link functionality
copyLink.addEventListener('click', (e) => {
  e.preventDefault();
   
  // Alternate method for copying text to clipboard
  try {
    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = websiteUrl;
    document.body.appendChild(tempInput);
    
    // Select the text
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    
    // Copy the text
    document.execCommand('copy');
    
    // Remove the temporary element
    document.body.removeChild(tempInput);
    
    copyResult.textContent = 'Link berhasil disalin!';
    copyResult.className = 'copy-result copy-success';
    copyResult.style.display = 'block';
    
    setTimeout(() => {
      copyResult.style.display = 'none';
    }, 3000);
   } catch (err) {
    // Fallback to the original method if the alternative fails
    navigator.clipboard.writeText(websiteUrl).then(() => {
      copyResult.textContent = 'Link berhasil disalin!';
      copyResult.className = 'copy-result copy-success';
      copyResult.style.display = 'block';
      
      setTimeout(() => {
        copyResult.style.display = 'none';
      }, 3000);
    }).catch(err => {
      copyResult.textContent = 'Gagal menyalin link: ' + err;
      copyResult.className = 'copy-result copy-error';
      copyResult.style.display = 'block';
    });
  }
});

// Share to WhatsApp
shareWhatsapp.addEventListener('click', (e) => {
  e.preventDefault();
  const text = encodeURIComponent('Baca artikel menarik tentang fortifikasi gizi: ') + encodeURIComponent(websiteUrl);
  window.open(`https://wa.me/?text=${text}`, '_blank');
});

// Share to Telegram
shareTelegram.addEventListener('click', (e) => {
  e.preventDefault();
  const text = encodeURIComponent('Baca artikel menarik tentang fortifikasi gizi: ');
  window.open(`https://t.me/share/url?url=${encodeURIComponent(websiteUrl)}&text=${text}`, '_blank');
});

// Download poster
downloadPoster.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Show loading status
  copyResult.textContent = 'Sedang membuat poster...';
  copyResult.className = 'copy-result copy-success';
  copyResult.style.display = 'block';
  
  // Use html2canvas to create an image of the page
  html2canvas(document.body, {
    allowTaint: true,
    useCORS: true,
    scrollX: 0,
    scrollY: 0,
    windowWidth: document.documentElement.offsetWidth,
    windowHeight: document.documentElement.offsetHeight,
    scale: 1
  }).then(canvas => {
    // Create download link
    const link = document.createElement('a');
    link.download = 'gizi-fortifikasi-poster.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    copyResult.textContent = 'Poster berhasil diunduh!';
    
    setTimeout(() => {
      copyResult.style.display = 'none';
    }, 3000);
  }).catch(err => {
    copyResult.textContent = 'Gagal mengunduh poster: ' + err;
    copyResult.className = 'copy-result copy-error';
  });
});
