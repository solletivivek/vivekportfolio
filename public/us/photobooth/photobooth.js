// ===================================
// PHOTO BOOTH - SIMPLE ROMANTIC FLOW
// ===================================

// DOM Elements
const cameraScreen = document.getElementById('cameraScreen');
const noteScreen = document.getElementById('noteScreen');
const customizeScreen = document.getElementById('customizeScreen');
const previewScreen = document.getElementById('previewScreen');

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const cameraContainer = document.getElementById('cameraContainer');
const timerOverlay = document.getElementById('timerOverlay');
const timerNumber = document.getElementById('timerNumber');
const flashEffect = document.getElementById('flashEffect');
const statusText = document.getElementById('statusText');

const noteInput = document.getElementById('noteInput');
const charCount = document.getElementById('charCount');
const continueToCustomize = document.getElementById('continueToCustomize');

const dateToggle = document.getElementById('dateToggle');
const continueToPreview = document.getElementById('continueToPreview');

const photostrip = document.getElementById('photostrip');
const dateStamp = document.getElementById('dateStamp');
const photo1 = document.getElementById('photo1');
const photo2 = document.getElementById('photo2');
const photo3 = document.getElementById('photo3');
const collectPhoto = document.getElementById('collectPhoto');

const backButton = document.getElementById('backButton');

// State Variables
let stream = null;
let capturedPhotos = [];
let userNote = '';
let stripColor = 'cream';
let bgColor = 'cream';
let showDate = true;

// Shutter Sound (inline base64 audio)
const shutterSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYHGGS579+hRgwOUKXh8LtlHQU5k9nzwHUoBSl+zPLaizsKGWe98OGZPw0RVq3n77BdGAg+mtryxHImBSh9y/HajzsKF2S67+CaRw0PUqbl8bxnHwU7ldnzwHUrBSh+zPLZjT0KGWW679+gRwwNUKPg8L1pIAQ7ldnzv3YpBSh/zPLZizwKGWS779+hSQwNUKPg8L5pIgQ7ldnzv3YqBSh/zPLZizwKGWS77+CgSAwNUKPg8L5pIwQ6ldnzwHUrBSh+zPLajDwKGWW77+CgRwwNUKTh8L1oIAQ7ldnzwHUqBCh/zPLZizwKGWW779+hSQwNUKPg8L5oIgQ7ldnzwHUqBSh+zPLajTsKGGS77+CgRwwNUKTh8L1oIAQ7ldnzwHUqBSh+zPLajTwKGWW77+CfRgwNUKPg8L5pIwQ7ldnzwHYpBSh+zPLajzsKGWW77+CgSAwMUKPg8L1oIQQ7ldnzwHYqBCh+zPLajzsKGWS77+CgSAwNUKPg8L5oIgQ7ldnzwHYqBSh+zPLajzsKGWS77+CgSAwNUKPg8L5pIwQ6ldnzwHYqBCh/zPLajDwKGWS77+CgRwwNUKPg8L1oIQQ7ldnzwHYqBCh+zPLajTsKGWS77+CgRwwNUKPg8L5oIgQ7ldnzwHYqBCh+zPLajTsKGWW77+CgRwwNUKPg8L1oIAQ7ldnzwHUqBSh+zPLajDwKGWW77+CgRgwNUKTh8L1oIAQ7ldnzwHUqBSh+zPLajDwKGWW77+CgSAwMUKPg8L1oIQQ7ldnzwHUqBCh+zPLajTwKGWS77+CgSAwNUKPg8L5oIgQ7ldnzwHYqBCh+zPLajTwKGWS779+gSAwNUKPg8L1oIQQ7ldnzwHYqBCh+zPLajTsKGWW77+CgRwwNUKPg8L5oIgQ7ldnzwHYqBCh+zPLajTsKGWW77+CgRwwNUKTg8L1oIAQ7ldnzwHUqBSh+zPLajDwKGWW77+CgSAwNUKPg8L1oIAQ7ldnzwHUqBSh+zPLajDwK');

// ===================================
// CAMERA FUNCTIONS
// ===================================

async function startCamera() {
  try {
    statusText.textContent = 'Starting camera...';
    
    const constraints = {
      video: {
        facingMode: 'user',
        width: { ideal: 1080 },
        height: { ideal: 1080 }
      },
      audio: false
    };

    stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    
    // Wait for video to be ready
    await new Promise(resolve => {
      video.onloadedmetadata = resolve;
    });

    statusText.textContent = 'Get ready! 📸';
    
    // Start auto-capture flow after a brief moment
    setTimeout(() => {
      startAutoCaptureFlow();
    }, 1000);

  } catch (error) {
    console.error('Camera error:', error);
    statusText.textContent = '❌ Camera access denied. Please allow camera permissions.';
    alert('Unable to access camera. Please grant camera permissions and refresh the page.');
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
}

// ===================================
// AUTO-CAPTURE FLOW
// ===================================

async function startAutoCaptureFlow() {
  // Capture Photo 1
  await captureWithCountdown(1);
  capturedPhotos.push(captureFrame());
  
  await sleep(500);
  
  // Capture Photo 2
  statusText.textContent = 'Ready for 2nd photo 📸';
  await sleep(1000);
  await captureWithCountdown(2);
  capturedPhotos.push(captureFrame());
  
  await sleep(500);
  
  // Capture Photo 3
  statusText.textContent = 'Ready for 3rd photo 📸';
  await sleep(1000);
  await captureWithCountdown(3);
  capturedPhotos.push(captureFrame());
  
  await sleep(500);
  
  // All photos captured - stop camera and move to next step
  statusText.textContent = 'Perfect! All photos captured! ✨';
  await sleep(1000);
  
  stopCamera();
  transitionToNoteScreen();
}

async function captureWithCountdown(photoNumber) {
  // Show countdown: 3, 2, 1
  timerOverlay.classList.remove('hidden');
  
  for (let i = 3; i > 0; i--) {
    timerNumber.textContent = i;
    await sleep(1000);
  }
  
  timerOverlay.classList.add('hidden');
  
  // Flash effect
  playShutter();
  flashCamera();
  
  await sleep(200);
}

function captureFrame() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  
  // Draw the video frame
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Return as data URL
  return canvas.toDataURL('image/jpeg', 0.95);
}

// ===================================
// EFFECTS
// ===================================

function playShutter() {
  shutterSound.currentTime = 0;
  shutterSound.play().catch(() => {});
}

function flashCamera() {
  flashEffect.classList.remove('hidden');
  setTimeout(() => {
    flashEffect.classList.add('hidden');
  }, 400);
}

// ===================================
// SCREEN TRANSITIONS
// ===================================

function transitionToNoteScreen() {
  cameraScreen.classList.add('hidden');
  noteScreen.classList.remove('hidden');
  noteScreen.classList.add('screen-enter');
}

function transitionToCustomizeScreen() {
  noteScreen.classList.add('hidden');
  customizeScreen.classList.remove('hidden');
  customizeScreen.classList.add('screen-enter');
  
  // Save user note
  userNote = noteInput.value.trim();
}

function transitionToPreviewScreen() {
  customizeScreen.classList.add('hidden');
  previewScreen.classList.remove('hidden');
  previewScreen.classList.add('screen-enter');
  
  // Render the photostrip
  renderPhotostrip();
}

// ===================================
// PHOTOSTRIP RENDERING
// ===================================

function renderPhotostrip() {
  // Set photos
  photo1.src = capturedPhotos[0];
  photo2.src = capturedPhotos[1];
  photo3.src = capturedPhotos[2];
  
  // Apply strip color
  photostrip.className = 'photostrip ' + stripColor;
  
  // Apply background color
  document.body.className = 'gradient-background bg-' + bgColor;
  
  // Show/hide date stamp
  if (showDate) {
    const today = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateString = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    dateStamp.textContent = dateString;
    dateStamp.style.display = 'block';
  } else {
    dateStamp.style.display = 'none';
  }
}

// ===================================
// DOWNLOAD FUNCTION
// ===================================

async function downloadPhotostrip() {
  collectPhoto.classList.add('loading');
  collectPhoto.textContent = 'Creating your photostrip...';
  
  await sleep(500);
  
  // Use html2canvas or manual canvas approach
  // For simplicity, we'll create a canvas with the photostrip
  const finalCanvas = document.createElement('canvas');
  const padding = 48;
  const photoSize = 800;
  const stripWidth = photoSize + (padding * 2);
  const stripHeight = (photoSize * 3) + (24 * 2) + (showDate ? 80 : 0) + (padding * 2);
  
  finalCanvas.width = stripWidth;
  finalCanvas.height = stripHeight;
  const ctx = finalCanvas.getContext('2d');
  
  // Background
  const stripColors = {
    cream: '#f5f1e8',
    lavender: '#e8e4f3',
    pink: '#fce7f3',
    black: '#1a1a1a'
  };
  ctx.fillStyle = stripColors[stripColor];
  ctx.fillRect(0, 0, stripWidth, stripHeight);
  
  // Draw photos
  let yPos = padding;
  for (let i = 0; i < 3; i++) {
    const img = new Image();
    img.src = capturedPhotos[i];
    await new Promise(resolve => {
      img.onload = () => {
        ctx.drawImage(img, padding, yPos, photoSize, photoSize);
        resolve();
      };
    });
    yPos += photoSize + 24;
  }
  
  // Draw date if enabled
  if (showDate) {
    ctx.font = 'italic 48px Georgia';
    ctx.fillStyle = stripColor === 'black' ? '#f5f1e8' : '#7d6244';
    ctx.textAlign = 'center';
    const today = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateString = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    ctx.fillText(dateString, stripWidth / 2, yPos + 40);
  }
  
  // Draw note if provided
  if (userNote) {
    ctx.font = 'italic 36px Georgia';
    ctx.fillStyle = stripColor === 'black' ? '#f5f1e8' : '#7d6244';
    ctx.textAlign = 'center';
    
    // Word wrap for long notes
    const words = userNote.split(' ');
    let line = '';
    let lineY = 40;
    
    for (let word of words) {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > photoSize - 40 && line !== '') {
        ctx.fillText(line, stripWidth / 2, lineY);
        line = word + ' ';
        lineY += 40;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, stripWidth / 2, lineY);
  }
  
  // Download
  const dataURL = finalCanvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `love-photostrip-${Date.now()}.png`;
  link.href = dataURL;
  link.click();
  
  await sleep(1000);
  
  collectPhoto.classList.remove('loading');
  collectPhoto.classList.add('success');
  collectPhoto.textContent = '✅ Photo Collected!';
  
  await sleep(1500);
  
  // Navigate back to home
  window.location.href = '../index.html';
}

// ===================================
// EVENT LISTENERS
// ===================================

// Back button
backButton.addEventListener('click', () => {
  stopCamera();
  window.location.href = '../index.html';
});

// Character counter for note
noteInput.addEventListener('input', () => {
  charCount.textContent = noteInput.value.length;
});

// Continue buttons
continueToCustomize.addEventListener('click', transitionToCustomizeScreen);
continueToPreview.addEventListener('click', transitionToPreviewScreen);

// Color options - Strip
document.querySelectorAll('[data-type="strip"]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-type="strip"]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    stripColor = btn.dataset.color;
  });
});

// Color options - Background
document.querySelectorAll('[data-type="background"]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-type="background"]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    bgColor = btn.dataset.color;
  });
});

// Date toggle
dateToggle.addEventListener('click', () => {
  dateToggle.classList.toggle('active');
  showDate = dateToggle.classList.contains('active');
  dateToggle.dataset.enabled = showDate;
});

// Collect photo button
collectPhoto.addEventListener('click', downloadPhotostrip);

// ===================================
// HELPER FUNCTIONS
// ===================================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ===================================
// INITIALIZE - Auto-start camera
// ===================================

window.addEventListener('load', () => {
  startCamera();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  stopCamera();
});
