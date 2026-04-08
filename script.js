// Set the date we're counting down to
// Format: "Month Day, Year HH:MM:SS"
const weddingDate = new Date("august 15, 2026 00:00:00").getTime();

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
