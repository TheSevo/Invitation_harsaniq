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

let submitted = false;

// Listen for the iframe to load (which happens after Google receives the data)
document.getElementById('hidden_iframe').addEventListener('load', function() {
    if (submitted) {
        const attendanceValue = document.getElementById('attending').value;
        
        if (attendanceValue === "Evidemment !") {
            formStatus.textContent = 'Merci ! Nous avons hâte de célébrer avec vous. 🎉';
            
            // Déclenchement des confettis
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#d4af37', '#ffffff', '#2c2c2c']
                });
            }
        } else if (attendanceValue === "Malheureusement non...") {
            formStatus.textContent = 'C\'est noté. Vous nous manquerez ! 🥺';
        } else {
            formStatus.textContent = 'Merci ! Votre réponse a bien été enregistrée.';
        }

        formStatus.style.color = '#d4af37';
        rsvpForm.reset();

        // Cache les champs et le bouton pour une interface plus propre après l'envoi
        const formElementsToHide = rsvpForm.querySelectorAll('.form-group, .submit-btn');
        formElementsToHide.forEach(el => {
            el.style.display = 'none';
        });
        submitted = false;
    }
});

rsvpForm.addEventListener('submit', function(event) {
    const attendanceValue = document.getElementById('attending').value;
    
    // Vérification de sécurité avant l'envoi
    if (!attendanceValue) {
        event.preventDefault(); // Bloque l'envoi du formulaire
        formStatus.textContent = 'Veuillez indiquer si vous serez présents avant d\'envoyer.';
        formStatus.style.color = '#e74c3c'; // Un rouge doux pour indiquer l'erreur
        return;
    }

    submitted = true;
    const submitButton = rsvpForm.querySelector('.submit-btn');
    
    // Delay the button lock by 50 milliseconds so the browser doesn't cancel the submission
    setTimeout(() => {
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';
    }, 50);
});

// Click to Enter & Audio Logic
const enterScreen = document.getElementById('enter-screen');
const enterBtn = document.getElementById('enter-btn');
const bgMusic = document.getElementById('bg-music');

if (enterBtn) {
    enterBtn.addEventListener('click', () => {
        // Play the music
        bgMusic.play().catch(error => console.log("Audio playback failed:", error));
        
        // Fade out the overlay and allow the user to scroll
        enterScreen.classList.add('hidden-screen');
        document.body.classList.remove('no-scroll');
    });
}
