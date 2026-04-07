// Use the ISO 8601 Date format (YYYY-MM-DDTHH:MM:SS) for full browser compatibility
const weddingDate = new Date("2026-08-15T14:00:00").getTime();

// Cache DOM elements for better performance
const countdownEl = document.getElementById("countdown");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Update the count down every 1 second
const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in the elements, padding with zero if needed
    if (daysEl && hoursEl && minutesEl && secondsEl) {
        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    }

    // If the countdown is over, display a localized message
    if (distance < 0) {
        clearInterval(timer);
        if (countdownEl) {
            countdownEl.innerHTML = "<span>C'est le grand jour !</span>";
        }
    }
}, 1000);

// Handle RSVP Form Submission (Displays alert if action URL is empty)
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(event) {
        // If you connect Formspree, the 'action' attribute will handle the redirect automatically.
        if (!rsvpForm.getAttribute('action')) {
            event.preventDefault();
            alert('Merci, votre réponse a bien été enregistrée.');
        }
    });
}
