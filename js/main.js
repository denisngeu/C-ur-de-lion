// Main JavaScript file for Cœur de Lion 90 International website
// This script handles the mobile navigation toggle and scroll reveal animations.

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  // Scroll reveal animation using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const options = {
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, options);

  reveals.forEach(el => {
    observer.observe(el);
  });
});