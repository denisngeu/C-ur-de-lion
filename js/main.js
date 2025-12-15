// Main JavaScript file for Cœur de Lion 90 International website
// This script handles the mobile navigation toggle, scroll reveal animations, and form validation.

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

// Form validation and submission handler
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form elements
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const honeypot = form.querySelector('[name="honeypot"]');
  const formMessage = document.getElementById('form-message');
  
  // Clear previous error messages
  clearErrors();
  
  // Check honeypot (spam protection)
  if (honeypot && honeypot.value !== '') {
    return false;
  }
  
  // Validate inputs
  let isValid = true;
  
  // Validate name
  if (!nameInput.value.trim()) {
    showError('name-error', 'Veuillez entrer votre nom.');
    isValid = false;
  } else if (nameInput.value.trim().length < 2) {
    showError('name-error', 'Le nom doit contenir au moins 2 caractères.');
    isValid = false;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    showError('email-error', 'Veuillez entrer votre adresse e-mail.');
    isValid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    showError('email-error', 'Veuillez entrer une adresse e-mail valide.');
    isValid = false;
  }
  
  // Validate message
  if (!messageInput.value.trim()) {
    showError('message-error', 'Veuillez entrer votre message.');
    isValid = false;
  } else if (messageInput.value.trim().length < 10) {
    showError('message-error', 'Le message doit contenir au moins 10 caractères.');
    isValid = false;
  }
  
  // If validation passes, show success message
  if (isValid) {
    // In a real implementation, you would send the form data to a server here
    // For now, we'll just show a success message
    formMessage.textContent = 'Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.';
    formMessage.className = 'form-feedback success';
    formMessage.style.display = 'block';
    
    // Reset form
    form.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  } else {
    formMessage.textContent = 'Veuillez corriger les erreurs ci-dessus.';
    formMessage.className = 'form-feedback error';
    formMessage.style.display = 'block';
  }
  
  return false;
}

// Helper function to show error messages
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

// Helper function to clear all error messages
function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(error => {
    error.textContent = '';
    error.style.display = 'none';
  });
  
  const formMessage = document.getElementById('form-message');
  if (formMessage) {
    formMessage.style.display = 'none';
  }
}
