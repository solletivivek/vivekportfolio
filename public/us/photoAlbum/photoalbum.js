// Story data - supports both images and videos
const stories = [
  { 
    type: 'image', 
    src: '../images/mine/c1.jpg', 
    caption: 'Our beautiful journey begins 🌟',
    duration: 6000 // 6 seconds for images
  },
  { 
    type: 'image', 
    src: '../images/mine/c2.jpg', 
    caption: 'Every moment with you is special 💕',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c3.jpg', 
    caption: 'Making memories together 📸',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c4.jpg', 
    caption: 'You light up my world ✨',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c5.jpg', 
    caption: 'Forever grateful for you 💖',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c6.jpg', 
    caption: 'My favorite person 🥰',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c7.jpg', 
    caption: 'Adventures with you 🌍',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c8.jpg', 
    caption: 'Creating our story 📖',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c9.jpg', 
    caption: 'Moments like these 🌸',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c10.jpg', 
    caption: 'You make everything better 🌈',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c11.jpg', 
    caption: 'Together is my favorite place 💑',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c12.jpg', 
    caption: 'Sunshine and smiles ☀️',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c13.jpg', 
    caption: 'Our little adventures 🎈',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c14.jpg', 
    caption: 'Sweet memories 🍭',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c15.jpg', 
    caption: 'Perfect moments 💫',
    duration: 6000
  },
  { 
    type: 'video', 
    src: '../images/mine/c16.mp4', 
    caption: 'Our special moment captured 🎥',
    duration: 0 // Will be auto-detected from video
  },
  { 
    type: 'image', 
    src: '../images/mine/c17.jpg', 
    caption: 'Making every day count 🌺',
    duration: 6000
  },
  { 
    type: 'video', 
    src: '../images/mine/c18.mp4', 
    caption: 'Living our best life together 🎬',
    duration: 0 // Will be auto-detected from video
  },
  { 
    type: 'image', 
    src: '../images/mine/c19.jpeg', 
    caption: 'Happiness looks like this 😊',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c20.jpeg', 
    caption: 'With you, always 💝',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c21.jpeg', 
    caption: 'Beautiful times 🌹',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c22.jpeg', 
    caption: 'My heart is full 💗',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c23.jpeg', 
    caption: 'Forever and always 💍',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c24.jpeg', 
    caption: 'You + Me = Perfect 🎯',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c25.jpeg', 
    caption: 'Endless love story 💞',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c26.jpeg', 
    caption: 'Together forever 🔒',
    duration: 6000
  },
  { 
    type: 'image', 
    src: '../images/mine/c27.jpeg', 
    caption: 'The best is yet to come! ✨',
    duration: 6000
  }
];

// Elements
const progressBarsContainer = document.querySelector('.progress-bars');
const storyImage = document.getElementById('storyImage');
const storyVideo = document.getElementById('storyVideo');
const captionText = document.getElementById('captionText');
const captionOverlay = document.getElementById('captionOverlay');
const leftZone = document.getElementById('leftZone');
const rightZone = document.getElementById('rightZone');
const pausedIndicator = document.getElementById('pausedIndicator');
const backButton = document.getElementById('backButton');
const mediaContainer = document.getElementById('mediaContainer');
const loadingSpinner = document.getElementById('loadingSpinner');

// State variables
let currentIndex = 0;
let isPaused = false;
let progressInterval = null;
let storyTimeout = null;
let startTime = 0;
let pausedTime = 0;
let remainingTime = 0;
let progressBars = [];
let currentProgress = 0;

// Initialize progress bars
function initProgressBars() {
  progressBarsContainer.innerHTML = '';
  progressBars = [];
  
  stories.forEach((_, index) => {
    const barContainer = document.createElement('div');
    barContainer.className = 'progress-bar';
    
    const barFill = document.createElement('div');
    barFill.className = 'progress-fill';
    
    barContainer.appendChild(barFill);
    progressBarsContainer.appendChild(barContainer);
    progressBars.push(barFill);
  });
}

// Update progress bar
function updateProgressBar() {
  if (isPaused) return;
  
  const elapsed = Date.now() - startTime;
  const duration = getCurrentDuration();
  const progress = Math.min((elapsed / duration) * 100, 100);
  
  if (progressBars[currentIndex]) {
    progressBars[currentIndex].style.width = `${progress}%`;
  }
}

// Get current story duration
function getCurrentDuration() {
  const story = stories[currentIndex];
  if (story.type === 'video' && storyVideo.duration) {
    return storyVideo.duration * 1000; // Convert to milliseconds
  }
  return story.duration || 6000;
}

// Show story
async function showStory(index) {
  if (index < 0 || index >= stories.length) {
    // End of stories, go back
    goBack();
    return;
  }
  
  currentIndex = index;
  const story = stories[currentIndex];
  
  // Clear any existing timers
  clearStoryTimers();
  
  // Hide both media elements
  storyImage.classList.add('hidden');
  storyVideo.classList.add('hidden');
  storyVideo.pause();
  
  // Update caption
  captionText.textContent = story.caption || '';
  captionOverlay.classList.add('show');
  
  // Mark previous stories as completed
  progressBars.forEach((bar, idx) => {
    if (idx < currentIndex) {
      bar.classList.add('completed');
      bar.style.width = '100%';
    } else if (idx > currentIndex) {
      bar.classList.remove('completed', 'active');
      bar.style.width = '0%';
    }
  });
  
  // Show current media
  if (story.type === 'video') {
    await loadVideo(story);
  } else {
    await loadImage(story);
  }
  
  // Start progress animation
  startProgress();
}

// Load image
function loadImage(story) {
  return new Promise((resolve) => {
    // Show loader
    loadingSpinner.classList.remove('hidden');
    
    storyImage.onload = () => {
      // Hide loader
      loadingSpinner.classList.add('hidden');
      storyImage.classList.remove('hidden');
      resolve();
    };
    storyImage.onerror = () => {
      console.error('Failed to load image:', story.src);
      loadingSpinner.classList.add('hidden');
      resolve(); // Continue anyway
    };
    storyImage.src = story.src;
  });
}

// Load video
function loadVideo(story) {
  return new Promise((resolve) => {
    // Show loader
    loadingSpinner.classList.remove('hidden');
    
    storyVideo.onloadedmetadata = () => {
      // Hide loader
      loadingSpinner.classList.add('hidden');
      storyVideo.classList.remove('hidden');
      storyVideo.currentTime = 0;
      storyVideo.play().catch(err => {
        console.error('Failed to play video:', err);
      });
      resolve();
    };
    storyVideo.onerror = () => {
      console.error('Failed to load video:', story.src);
      loadingSpinner.classList.add('hidden');
      resolve(); // Continue anyway
    };
    storyVideo.src = story.src;
  });
}

// Start progress animation
function startProgress() {
  startTime = Date.now();
  isPaused = false;
  
  const duration = getCurrentDuration();
  
  // Update progress bar frequently
  progressInterval = setInterval(updateProgressBar, 50);
  
  // Set timeout to move to next story
  storyTimeout = setTimeout(() => {
    nextStory();
  }, duration);
  
  // Mark current progress bar as active
  if (progressBars[currentIndex]) {
    progressBars[currentIndex].classList.add('active');
  }
}

// Pause story
function pauseStory() {
  if (isPaused) return;
  
  isPaused = true;
  pausedTime = Date.now();
  remainingTime = getCurrentDuration() - (pausedTime - startTime);
  
  // Pause video if playing
  if (!storyVideo.classList.contains('hidden')) {
    storyVideo.pause();
  }
  
  // Clear timers
  clearStoryTimers();
  
  // Show paused indicator
  pausedIndicator.classList.remove('hidden');
}

// Resume story
function resumeStory() {
  if (!isPaused) return;
  
  isPaused = false;
  startTime = Date.now();
  
  // Resume video if it was playing
  if (!storyVideo.classList.contains('hidden')) {
    storyVideo.play().catch(err => console.error('Failed to resume video:', err));
  }
  
  // Hide paused indicator
  pausedIndicator.classList.add('hidden');
  
  // Resume progress
  progressInterval = setInterval(updateProgressBar, 50);
  storyTimeout = setTimeout(() => {
    nextStory();
  }, remainingTime);
}

// Clear timers
function clearStoryTimers() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
  if (storyTimeout) {
    clearTimeout(storyTimeout);
    storyTimeout = null;
  }
}

// Navigate to next story
function nextStory() {
  if (currentIndex < stories.length - 1) {
    showStory(currentIndex + 1);
  } else {
    // End of stories, go back to main page
    goBack();
  }
}

// Navigate to previous story
function previousStory() {
  if (currentIndex > 0) {
    showStory(currentIndex - 1);
  } else {
    // Already at first story, go back
    goBack();
  }
}

// Go back to main page
function goBack() {
  clearStoryTimers();
  storyVideo.pause();
  window.location.href = '../index.html';
}

// Event Listeners

// Left zone - previous story
leftZone.addEventListener('click', (e) => {
  e.preventDefault();
  previousStory();
});

// Right zone - next story
rightZone.addEventListener('click', (e) => {
  e.preventDefault();
  nextStory();
});

// Hold to pause (mouse)
let holdTimer;
mediaContainer.addEventListener('mousedown', (e) => {
  if (e.target === leftZone || e.target === rightZone) return;
  holdTimer = setTimeout(() => {
    pauseStory();
  }, 200);
});

mediaContainer.addEventListener('mouseup', (e) => {
  if (e.target === leftZone || e.target === rightZone) return;
  clearTimeout(holdTimer);
  if (isPaused) {
    resumeStory();
  }
});

mediaContainer.addEventListener('mouseleave', () => {
  clearTimeout(holdTimer);
  if (isPaused) {
    resumeStory();
  }
});

// Hold to pause (touch)
mediaContainer.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const element = document.elementFromPoint(touch.clientX, touch.clientY);
  if (element === leftZone || element === rightZone) return;
  
  holdTimer = setTimeout(() => {
    pauseStory();
  }, 200);
}, { passive: true });

mediaContainer.addEventListener('touchend', (e) => {
  clearTimeout(holdTimer);
  if (isPaused) {
    resumeStory();
  }
}, { passive: true });

// Back button
backButton.addEventListener('click', goBack);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    previousStory();
  } else if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    nextStory();
  } else if (e.key === 'Escape') {
    goBack();
  }
});

// Video ended event
storyVideo.addEventListener('ended', () => {
  nextStory();
});

// Prevent context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Initialize and start
initProgressBars();
showStory(0);
