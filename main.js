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





// Carousel Logic (Infinite Loop) - Supports Multiple Carousels
const carouselContainers = document.querySelectorAll('.carousel-container');

carouselContainers.forEach(container => {
  const track = container.querySelector('.carousel-track');
  const nextButton = container.querySelector('.carousel-btn.next');
  const prevButton = container.querySelector('.carousel-btn.prev');

  if (track && track.children.length > 0 && nextButton && prevButton) {
    let isMoving = false;

    const moveNext = () => {
      if (isMoving) return;
      isMoving = true;

      const firstSlide = track.firstElementChild;
      if (!firstSlide) {
         isMoving = false;
         return;
      }
      const slideWidth = firstSlide.getBoundingClientRect().width;
      
      // Animate to the left
      track.style.transition = 'transform 0.5s ease-in-out';
      track.style.transform = `translateX(-${slideWidth}px)`;

      // After animation, move first item to end and reset
      track.addEventListener('transitionend', () => {
        track.style.transition = 'none';
        track.appendChild(track.firstElementChild);
        track.style.transform = 'translateX(0)';
        
        setTimeout(() => { isMoving = false; }, 0);
      }, { once: true });
    };

    const movePrev = () => {
      if (isMoving) return;
      isMoving = true;

      const lastSlide = track.lastElementChild;
       if (!lastSlide) {
         isMoving = false;
         return;
      }
      const slideWidth = lastSlide.getBoundingClientRect().width;

      // Move last item to start immediately (hidden by negative translate)
      track.style.transition = 'none';
      track.prepend(lastSlide);
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
  }
});


// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-menu ul li a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('is-active');
      navMenu.classList.remove('active');
    });
  });
}
