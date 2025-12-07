
// Carousel Logic (Infinite Loop)
const track = document.querySelector('.carousel-track');
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');

if (track && track.children.length > 0) {
  let isMoving = false;

  const moveNext = () => {
    if (isMoving) return;
    isMoving = true;

    const slideWidth = track.firstElementChild.getBoundingClientRect().width;
    
    // Animate to the left
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${slideWidth}px)`;

    // After animation, move first item to end and reset
    track.addEventListener('transitionend', () => {
      track.style.transition = 'none';
      track.appendChild(track.firstElementChild);
      track.style.transform = 'translateX(0)';
      
      // Clear event listener to avoid stacking
      // (using {once: true} is better but let's be safe with old browser support if needed, though {once:true} is widely supported)
      setTimeout(() => { isMoving = false; }, 0);
    }, { once: true });
  };

  const movePrev = () => {
    if (isMoving) return;
    isMoving = true;

    const slideWidth = track.firstElementChild.getBoundingClientRect().width;

    // Move last item to start immediately (hidden by negative translate)
    track.style.transition = 'none';
    track.prepend(track.lastElementChild);
    track.style.transform = `translateX(-${slideWidth}px)`;

    // Force reflow
    void track.offsetWidth;

    // Animate to 0
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = 'translateX(0)';

    track.addEventListener('transitionend', () => {
      isMoving = false;
    }, { once: true });
  };

  nextButton.addEventListener('click', moveNext);
  prevButton.addEventListener('click', movePrev);
  
  // Optional: Auto-play
  // setInterval(moveNext, 5000);
}
