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

// Simulate progress for the download
function simulateDownloadProgress(callback) {
  // Hide any previous messages
  copyResult.style.display = 'none';
  
  // Show the download progress container
  downloadProgress.style.display = 'block';
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        callback();
      }, 500);
    }
    
    progressBar.style.width = progress + '%';
    progressText.textContent = Math.round(progress) + '%';
  }, 200);
}

// Unduh gambar poster yang sudah tersedia
downloadPoster.addEventListener('click', (e) => {
  e.preventDefault();
 simulateDownloadProgress(() => {
 // Log untuk debugging
  console.log('Download poster clicked');
    // When the progress is complete, download the poster
    const link = document.createElement('a');
    link.href = 'images/poster.png';
    link.download = 'poster-fortifikasi-gizi.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    copyResult.textContent = 'Poster berhasil diunduh!';
    copyResult.className = 'copy-result copy-success';
    copyResult.style.display = 'block';
    
 // Show toast notification
    showToast('Poster berhasil diunduh!', 'File telah tersimpan di perangkat Anda');

   try {
      console.log('Download started...');
      
      // Metode 1: Menggunakan anchor element dengan download attribute
      const link = document.createElement('a');
      link.href = '/images/poster.png'; // Path dimulai dari root
      link.download = 'poster-fortifikasi-gizi.png';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Delay sebentar sebelum menghapus elemen
      setTimeout(() => {
        document.body.removeChild(link);
        console.log('Link element removed');
      }, 100);
      
      // Metode 2: Sebagai fallback, coba buka gambar di tab baru
      setTimeout(() => {
        window.open('images/poster.png', '_blank');
        console.log('Fallback: opening image in new tab');
      }, 200);
      
      // Show success message
      copyResult.textContent = 'Poster berhasil diunduh!';
      copyResult.className = 'copy-result copy-success';
      copyResult.style.display = 'block';
      
      // Show toast notification
      showToast('Poster berhasil diunduh!', 'File telah tersimpan di perangkat Anda');
      
      // Log sukses
      console.log('Download success reported to user');
    } catch (error) {
      console.error('Download error:', error);
      copyResult.textContent = 'Gagal mengunduh poster: ' + error;
      copyResult.className = 'copy-result copy-error';
      copyResult.style.display = 'block';
    }
    
    // Hide progress bar after a delay
    setTimeout(() => {
      downloadProgress.style.display = 'none';
    }, 2000);
    
    // Hide success message after a longer delay
    setTimeout(() => {
      copyResult.style.display = 'none';
    }, 3000);
  });
});

// Tambahkan event listener untuk mendeteksi apakah poster sudah dimuat
window.addEventListener('load', () => {
  const posterPreview = document.getElementById('posterPreview');
  if (posterPreview) {
    posterPreview.addEventListener('error', () => {
      console.error('Error loading poster preview image');
      posterPreview.src = 'https://via.placeholder.com/300x200?text=Poster+Preview+Not+Found';
    });
    
    // Coba preload gambar poster
    const img = new Image();
    img.src = '/images/poster.png';
    img.onload = () => console.log('Poster image preloaded successfully');
    img.onerror = () => console.error('Failed to preload poster image');
  }
});
