// JavaScript to detect microphone input (blowing)
let candles = document.querySelectorAll('.candle');
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioContext.createAnalyser();
let microphone;
let source;
let bufferLength;
let dataArray;

// Function to detect blow
    function detectBlow() {
    analyser.getByteFrequencyData(dataArray);
    let total = 0;

    for (let i = 0; i < bufferLength; i++) {
        total += dataArray[i];
    }

    // If sound exceeds a certain threshold, blow out candles
    if (total > 50) {
        blowOutCandles();
    }

    // Keep checking for blowing
    requestAnimationFrame(detectBlow);
}

// Blow out candles
function blowOutCandles() {
    candles.forEach(candle => {
        candle.style.backgroundColor = "#333"; // Turn off candle light (blow out)
        candle.querySelector('::after').style.display = "none"; // Hide flame
    });
}

// Set up microphone input
navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 2048;
    bufferLength
