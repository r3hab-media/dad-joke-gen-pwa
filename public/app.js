// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// Fetch dad jokes from API
function fetchJokes() {
  return fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    }
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    return data.joke;
  });
}

// Generate a new joke and display it on the page
function generateJoke() {
  var jokeEl = document.getElementById('joke');
  jokeEl.textContent = 'Generating joke...';

  fetchJokes().then(function(joke) {
    jokeEl.textContent = joke;
  }).catch(function(err) {
    jokeEl.textContent = 'Oops, something went wrong!';
    console.error(err);
  });
}

// Add share button functionality
function shareJoke() {
  if (navigator.share) {
    fetchJokes().then(function(joke) {
      navigator.share({
        title: 'Check out this dad joke!',
        text: joke,
        url: window.location.href
      })
      .then(function() {
        console.log('Joke shared successfully!');
      })
      .catch(function(err) {
        console.error('Error sharing joke:', err);
      });
    }).catch(function(err) {
      console.error(err);
    });
  } else {
    alert('Web Share API not supported on this browser');
  }
}

// Attach event listeners to buttons
var generateBtn = document.getElementById('generate-btn');
generateBtn.addEventListener('click', generateJoke);

var shareBtn = document.getElementById('share-btn');
shareBtn.addEventListener('click', shareJoke);
