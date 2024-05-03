"use strict";

// List of image URLs
var images = new Array('../images/weather-pic1.webp', '../images/weather-pic2.webp', '../images/weather-pic3.webp'); // Function to set a random background image

function setRandomBackground() {
  var randomIndex = Math.floor(Math.random() * images.length);
  var randomImageUrl = images[randomIndex]; // Set the background image of the body element

  document.body.style.backgroundImage = "url(".concat(randomImageUrl, ")");
} // Set random background image on page load


setRandomBackground();