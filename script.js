const headings = document.querySelectorAll('.heading');
let currentStep = 0;
let isScrolling = false;

// Show and hide heading
function showHeading(step) {
  if (headings[step]) headings[step].classList.add('show');
}
function hideHeading(step) {
  if (headings[step]) headings[step].classList.remove('show');
}

// Mouse wheel support (desktop/laptop)
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  isScrolling = true;

  if (e.deltaY > 0 && currentStep < headings.length) {
    showHeading(currentStep);
    currentStep++;
  } else if (e.deltaY < 0 && currentStep > 0) {
    currentStep--;
    hideHeading(currentStep);
  }

  setTimeout(() => (isScrolling = false), 1500);
});

// Touch support (mobile/tablet)
let startY = 0;

window.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
  if (isScrolling) return;
  const endY = e.changedTouches[0].clientY;
  const deltaY = startY - endY;

  if (Math.abs(deltaY) < 30) return; // ignore small swipes

  isScrolling = true;

  if (deltaY > 0 && currentStep < headings.length) {
    // swipe up
    showHeading(currentStep);
    currentStep++;
  } else if (deltaY < 0 && currentStep > 0) {
    // swipe down
    currentStep--;
    hideHeading(currentStep);
  }

  setTimeout(() => (isScrolling = false), 1500);
});
