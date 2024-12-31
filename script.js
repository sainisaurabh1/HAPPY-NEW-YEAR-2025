// New Year Greeting
const sweetyGreeting = () => {
    const greetingText = "Hey there! Wishing you a sparkling Happy New Year 2025!  Let's make this year amazing together!";
    document.getElementById("greeting").innerText = greetingText;

    // Voice Greeting
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(greetingText);
    synth.speak(utterance);
};

// share for whats App
const shareOnWhatsApp = () => {
    const url = window.location.href;  // Current page URL
    const message = "Check out New Year Celebration! 🎉";
    const shareLink = `https://wa.me/?text=${encodeURIComponent(message)}%20${encodeURIComponent(url)}`;
    
    window.open(shareLink, "_blank");
};




// Countdown Timer
const startCountdown = () => {
    const countdownEl = document.getElementById("countdown");
    const newYear = new Date("January 1, 2025 00:00:00");

    const updateCountdown = () => {
        const now = new Date();
        const timeDiff = newYear - now;

        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDiff / 1000) % 60);

            countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            countdownEl.innerHTML = "🎆 Happy New Year! 🎆";
            sweetyGreeting(); // Call greeting
            clearInterval(timer);
        }
    };

    const timer = setInterval(updateCountdown, 1000);
};
startCountdown();

// wish after complete voice wish
const generateWish = () => {
    const name = document.getElementById("user-name").value;
    const resolution = document.getElementById("resolution").value;
    const output = document.getElementById("wish-output");

    if (name && resolution) {
        const wishMessage = `Hey ${name}, Happy New Year! I believe you can totally achieve your goal of "${resolution}". Go for it! 🎉`;
        output.innerText = wishMessage;

        // SpeechSynthesis (Voice Response)
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(wishMessage);

        // Play New Year Music when wish is completed
        utterance.onend = () => {
            // Play the song after the voice wish ends
            const music = document.getElementById("newYearMusic");
            music.play();
        };

        synth.speak(utterance); // Start speaking the wish message
    } else {
        output.innerText = "Please fill in both fields to get your wish!";
    }
};


// for lady voice
// For Page 1: Capture User Data and Navigate to Page 2
document.getElementById('user-info-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Capture user inputs
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var favColor = document.getElementById('fav-color').value;

    // Store the data in localStorage
    localStorage.setItem('first-name', firstName);
    localStorage.setItem('last-name', lastName);
    localStorage.setItem('fav-color', favColor);

    // Redirect to Page 2
    window.location.href = 'personalized-message.html';
});

// For Page 2: Show Personalized Greeting with Multiple Wishes
if (window.location.pathname.endsWith('personalized-message.html')) {
    var firstName = localStorage.getItem('first-name');
    var lastName = localStorage.getItem('last-name');
    var favColor = localStorage.getItem('fav-color');

    // Display personalized message
    document.getElementById('user-name').innerText = firstName + ' ' + lastName;
    document.getElementById('personalized-message').innerText = `Hello ${firstName}, may your year be as bright as your favorite color, ${favColor}!`;

    // Display multiple wishes
    document.getElementById('wish1').innerText = `Happy New Year, ${firstName}!`;
    document.getElementById('wish2').innerText = `Wishing you a prosperous year ahead filled with happiness.`;
    document.getElementById('wish3').innerText = `May your life be as colorful as your favorite color, ${favColor}!`;

    // Change background color based on user's favorite color
    document.body.style.backgroundColor = favColor;

    // Show confetti animation
    generateConfetti();

    // Speak the personalized message and wishes
    speakText(`Happy New Year, ${firstName}! Wishing you a prosperous year ahead filled with happiness. May your life be as colorful as your favorite color, ${favColor}!`);
}

// Function to generate confetti
function generateConfetti() {
    var confettiContainer = document.createElement('div');
    confettiContainer.id = 'confetti';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        var confettiPiece = document.createElement("div");
        confettiPiece.classList.add("confetti-piece");
        confettiPiece.style.left = `${Math.random() * 100}%`;
        confettiPiece.style.animationDelay = `${Math.random() * 5}s`;
        confettiContainer.appendChild(confettiPiece);
    }

    document.getElementById('confetti').style.display = "block";
}

// Function to speak the given text
function speakText(text) {
    var msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-IN'; // You can change the language and accent here
    window.speechSynthesis.speak(msg);
}

