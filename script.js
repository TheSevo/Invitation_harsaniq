// Set the date we're counting down to
// Format: "Month Day, Year HH:MM:SS"
const weddingDate = new Date("August 15, 2026 00:00:00").getTime();

// Find the countdown element
const countdownElement = document.getElementById("countdown");

// Update the count down every 1 second
const updateCountdown = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = weddingDate - now;

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(updateCountdown);
        countdownElement.innerHTML = "JOUR J !!!!!";
        
        // Trigger the confetti effect using the website's theme colors
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#d4af37', '#ffffff', '#2c2c2c']
            });
        }
        return;
    }

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// Scroll Fade-In Animation Logic
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Triggers animation when scrolled into view
        }
    });
}, { threshold: 0.1 }); // Starts animation when 10% of the element is visible on screen

fadeElements.forEach(element => observer.observe(element));

// Google Sheet Form Submission Logic
const rsvpForm = document.getElementById('rsvp-form');
const formStatus = document.getElementById('form-status');

rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop the default form submission

    // --- GOOGLE FORMS INVISIBLE BACKEND ---
    // 1. Paste your Google Form ID into this URL (Make sure it ends in /formResponse)
    const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLSfscczibt38T-5bXpVERW-3XMvR7naB7LMcOObqQZURWo54Aw/formResponse';
    
    // Use URLSearchParams to ensure the data is sent in the correct, simple format
    const formData = new URLSearchParams();
    formData.append('entry.2069339004', document.getElementById('guest-name').value);
    formData.append('entry.1580326361', document.getElementById('attending').value);

    const submitButton = rsvpForm.querySelector('.submit-btn');

    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';

    // Send the data invisibly to Google Forms (which passes it directly to your Sheet)
    fetch(formURL, { method: 'POST', mode: 'no-cors', body: formData })
        .then(() => {
            formStatus.textContent = 'Merci ! Votre réponse a bien été enregistrée.';
            formStatus.style.color = '#d4af37';
            rsvpForm.reset();
        })
        .catch(error => {
            formStatus.textContent = 'Oups ! Une erreur est survenue. Veuillez réessayer.';
            formStatus.style.color = 'red';
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer';
        });
});
