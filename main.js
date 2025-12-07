// Navbar scroll effect

const header = document.getElementById('navbar');



window.addEventListener('scroll', () => {

  if (window.scrollY > 50) {

    header.classList.add('scrolled');

  } else {

    header.classList.remove('scrolled');

  }

});



// Intersection Observer for scroll animations

const observerOptions = {

  root: null,

  rootMargin: '0px',

  threshold: 0.1

};



const observer = new IntersectionObserver((entries, observer) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add('active');

      observer.unobserve(entry.target); // Only animate once

    }

  });

}, observerOptions);



document.querySelectorAll('.reveal-text, .reveal-card').forEach(el => {

  observer.observe(el);

});



// Parallax effect for hero background

const heroBg = document.querySelector('.hero-bg');



window.addEventListener('scroll', () => {

  const scrollPosition = window.pageYOffset;

  heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;

});



// Stats Animation

const statsSection = document.querySelector('#events');

const statNumbers = document.querySelectorAll('.stat-number');

let started = false; // Function started ? No



if (statsSection) {

  const statsObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting && !started) {

        // Force visibility of cards

        document.querySelectorAll('.stat-card').forEach(card => card.classList.add('active'));



        statNumbers.forEach(stat => {

          const target = +stat.getAttribute('data-target');

          const duration = 2000; // 2 seconds

          

          let current = 0;

          const increment = Math.ceil(target / 50); // Increment by chunks

          

          const timer = setInterval(() => {

            current += increment;

            if (current > target) current = target;

            stat.innerText = current + "+";

            if (current == target) {

              clearInterval(timer);

            }

          }, 40);

        });

        started = true;

      }

    });

  }, { threshold: 0.1 }); // Lower threshold to trigger sooner



  statsObserver.observe(statsSection);

}



// Objectives Expanding Cards

const objCards = document.querySelectorAll('.obj-card');



objCards.forEach(card => {

  card.addEventListener('click', () => {

    removeActiveClasses();

    card.classList.add('active');

  });

  

  // Optional: Expand on hover as well

  card.addEventListener('mouseenter', () => {

    removeActiveClasses();

    card.classList.add('active');

  });

});



function removeActiveClasses() {

  objCards.forEach(card => {

    card.classList.remove('active');

  });

}





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
