// Modal functionality
const shareButton = document.getElementById('share-button');
const shareModal = document.getElementById('shareModal');
const closeModal = document.getElementById('closeModal');
const copyLink = document.getElementById('copyLink');
const copyResult = document.getElementById('copyResult');
const shareWhatsapp = document.getElementById('shareWhatsapp');
const shareTelegram = document.getElementById('shareTelegram');
const downloadPoster = document.getElementById('downloadPoster');
const downloadProgress = document.getElementById('downloadProgress');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const toast = document.getElementById('toast');

// Website URL
const websiteUrl = window.location.href;

// Open modal
shareButton.addEventListener('click', () => {
  shareModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  shareModal.style.display = 'none';
  copyResult.style.display = 'none';
  downloadProgress.style.display = 'none';
  progressBar.style.width = '0%';
  progressText.textContent = '0%';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === shareModal) {
    shareModal.style.display = 'none';
    copyResult.style.display = 'none';
    downloadProgress.style.display = 'none';
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
  }
});

// Copy link functionality
copyLink.addEventListener('click', (e) => {
  e.preventDefault();

  try {
    const tempInput = document.createElement('input');
    tempInput.value = websiteUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    copyResult.textContent = 'Link berhasil disalin!';
    copyResult.className = 'copy-result copy-success';
    copyResult.style.display = 'block';

    setTimeout(() => {
      copyResult.style.display = 'none';
    }, 3000);
  } catch (err) {
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

// Show toast notification
function showToast(title, description) {
  const toastElement = document.getElementById('toast');
  const toastTitle = toastElement.querySelector('.toast-title');
  const toastDescription = toastElement.querySelector('.toast-description');
  
  toastTitle.textContent = title;
  toastDescription.textContent = description;

toastElement.classList.add('show');
  
  setTimeout(() => {
    toastElement.classList.remove('show');
  }, 3000);
}

// Simulate download progress
function simulateDownloadProgress(callback) {
  downloadProgress.style.display = 'block'; // Show progress container
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15; // Increment progress randomly
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(callback, 500); // Call the callback after a short delay
    }
    progressBar.style.width = progress + '%'; // Update progress bar width
    progressText.textContent = Math.round(progress) + '%'; // Update progress text
  }, 200);
}

// Download poster
downloadPoster.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Show loading status
  copyResult.textContent = 'Sedang membuat poster...';
  copyResult.className = 'copy-result copy-success';
  copyResult.style.display = 'block';
  
  // Create download link for the image
  const link = document.createElement('a');
  link.download = 'gizi-fortifikasi-poster.png';
  link.href = 'images/poster.png'; // Path ke gambar yang ingin diunduh
  link.click();
  
  copyResult.textContent = 'Poster berhasil diunduh!';
  
  setTimeout(() => {
    copyResult.style.display = 'none';
  }, 3000);
});
