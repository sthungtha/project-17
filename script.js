/* dark/light mode toggle */
const body = document.querySelector('body');
const modeToggle = document.getElementById('mode-toggle');
const modeStatus = document.querySelector('.mode-status');

function toggleMode() {
  body.classList.toggle('dark-mode');
  const modeMessage = body.classList.contains('dark-mode') ? 'Dark Mode' : "Light Mode"
  modeStatus.innerText = "Currently in " + modeMessage;
}
modeToggle.addEventListener('click', toggleMode);
/* image slider */
// get access to all the image elements
const images = document.querySelectorAll('#slider img');
// create a variable to keep track of which image should be displayed
let currentImage = 0;
// remove the active class from whichever image it is currently applied to
function resetSlides() {
  images.forEach(image => {
    image.classList.remove('active');
  });
}
// call our reset function and then initialize the active class on the first element in our node list
function startSlider() {
  resetSlides();
  images[currentImage].classList.add('active');
}
// function to move to the next image
function nextImage() {
  currentImage++;
  if(currentImage >= images.length) {
    currentImage = 0;
  }
  startSlider();
}
// function to move to the previous image
function previousImage() {
  currentImage--;
  if(currentImage < 0) {
    currentImage = images.length - 1;
  }
  startSlider();
}
// start the slider and set autoplay every 2 seconds
let slideInterval = setInterval(nextImage, 2000);
// stop the autoplay when hovering over the image
const slider = document.querySelector('#slider');
slider.addEventListener('mouseover', () => {
  clearInterval(slideInterval);
});
// resume autoplay when no longer hovering over the image
slider.addEventListener('mouseout', () => {
  slideInterval = setInterval(nextImage, 2000);
});
// add event listeners to the buttons
const previousButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
previousButton.addEventListener('click', previousImage);
nextButton.addEventListener('click', nextImage);
/* Project 10 fade and slide in effect */
// select all the elements with a class of item
const items = document.querySelectorAll('.item');
// define options for our Intersection Observer
const options = {
  threshold: 0.5
};
// create the actual observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('slide-in');
      // add the slide-in class to each one if it is intersecting
    }
  });
}, options);
// loop over all the DOM nodes we selected
items.forEach(item => {
  observer.observe(item); // tell our observer to observe each of them
});
// PROJECT 11 (script.js)
// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBolbYj6LbdUt2Yhc7AuOM2f_B4H_3YECI",
  authDomain: "c1-project-11.firebaseapp.com",
  databaseURL: "https://c1-project-11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "c1-project-11",
  storageBucket: "c1-project-11.appspot.com",
  messagingSenderId: "118889403471",
  appId: "1:118889403471:web:dffde4cd08927dcac3c63a"
};
firebase.initializeApp(firebaseConfig);
// Create a reference to the Firebase Realtime Database
var database = firebase.database();
// Get the form element
var form = document.getElementById('contact-form');
// Add an event listener to the form's submit button
form.addEventListener('submit', function(event) {
  event.preventDefault();
  // Get the input fields
  var email = document.getElementById('email-input').value;
  var type = document.getElementById('type-input').value;
  // Validate the input fields
  if(email === '' || type === '') {
    alert('Please fill out all fields.');
    return;
  }
  // Create a new object with the data
  var data = {
    email: email,
    type: type
  };
  // Push the data to the Firebase Realtime Database
  database.ref('subscribers').push(data);
  // Reset the form
  form.reset();
  alert('Thank you for Sign-up!');
});
/* 
I made changes to HTML and JavaScript for a Sign-up form 
with validation to ensure that the input fields are filled out. 
I am also using Firebase as to store the data from the form submissions
*/
/* project-12 */
// Retrieve data from Firebase
var database = firebase.database();
var newsletterRef = database.ref('subscribers');
newsletterRef.on('value', function(snapshot) {
  var data = snapshot.val();
  // Transform the data into the appropriate format
  var transformedData = {
    Clients: 0,
    Employers: 0,
    Others: 0
  };
  Object.keys(data).forEach(function(key) {
    var type = data[key].type;
    if(type === 'Client') {
      transformedData.Clients++;
    } else if(type === 'Employer') {
      transformedData.Employers++;
    } else {
      transformedData.Others++;
    }
  });
  // Create the pie chart using D3.js
  var width = 500;
  var height = 500;
  var radius = Math.min(width, height) / 2;
  var svg = d3.select('#chart').append('svg').attr('width', width).attr('height', height);
  var g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
  var color = d3.scaleOrdinal().domain(Object.keys(transformedData)).range(d3.schemeCategory10);
  var pie = d3.pie().value(function(d) {
    return d.value;
  }).sort(null);
  var path = d3.arc().outerRadius(radius - 10).innerRadius(0);
  var arc = g.selectAll('.arc').data(pie(d3.entries(transformedData))).enter().append('g').attr('class', 'arc');
  arc.append('path').attr('d', path).attr('fill', function(d) {
    return color(d.data.key);
  });
  arc.append('text').attr('transform', function(d) {
    return 'translate(' + path.centroid(d) + ')';
  }).attr('dy', '.35em').text(function(d) {
    return d.data.key + ": " + d.data.value;
  });
});
/* Project 13 */
let unsortedItems = [];

function addItem() {
  const input = document.getElementById('inputList');
  const value = input.value.trim();
  if(value !== '') {
    unsortedItems.push(value);
    input.value = '';
    displayList();
  }
}

function sortList() {
  unsortedItems.sort((a, b) => {
    if(isNaN(a) || isNaN(b)) {
      // Sort alphabetically if both items are not numbers
      return a.localeCompare(b);
    } else {
      // Convert items to numbers and sort numerically
      return Number(a) - Number(b);
    }
  });
  displayList();
}

function displayList() {
  const list = document.getElementById('listItems');
  list.innerHTML = '';
  unsortedItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}
/* Project 14 */
// Asynchronous function to load the Google Maps API
async function loadGoogleMapsAPI() {
  return new Promise((resolve, reject) => {
    // Create a script element to load the Google Maps API
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBQWZczi3vmgPNN9A-1UdnMk4COWQKCQjM&callback=initializeMap';
    // Tells the browser to continue loading the rest of the page while the script is loading.
    script.defer = true;
    script.async = true;
    // Handle script load success
    script.onload = resolve;
    // Handle script load error
    script.onerror = reject;
    // Append the script element to the document
    document.head.appendChild(script);
  });
}
// Function to initialize the map
function initializeMap() {
  // Create a new map instance
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 51.621441,
      lng: -3.943646
    }, // Set the initial center of the map
    zoom: 7 // Set the initial zoom level
  });
  // Add a marker to the map
  const marker = new google.maps.Marker({
    position: {
      lat: 51.621441,
      lng: -3.943646
    },
    map: map,
    title: 'Swansea, UK'
  });
}
// Call the asynchronous function to load the Google Maps API
loadGoogleMapsAPI().then(() => {
  // The Google Maps API has been successfully loaded
  initializeMap();
}).catch((error) => {
  // An error occurred while loading the Google Maps API
  console.log('Error loading Google Maps:', error);
});