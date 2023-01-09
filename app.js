import { tweetsData } from './data.js';

const tweetBtn = document.getElementById('tweet-btn');
const tweetInput = document.getElementById('tweet-input');





//event listeners

tweetBtn.addEventListener('click', function() {
  const text = tweetInput.value;
  console.log(text);
})
