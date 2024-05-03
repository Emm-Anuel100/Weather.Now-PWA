
 // List of image URLs
 const images = new Array (
   '../Images/weather-pic1.webp',
   '../Images/weather-pic2.webp',
   '../Images/weather-pic3.webp'
 );

// Function to set a random background image
function setRandomBackground() {
   const randomIndex = Math.floor(Math.random() * images.length);
   const randomImageUrl = images[randomIndex];
   // Set the background image of the body element
   document.body.style.backgroundImage = `url(${randomImageUrl})`;
}

// Set random background image on page load
setRandomBackground();
