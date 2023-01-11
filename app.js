import { tweetsData } from './data.js';

const tweetBtn = document.getElementById('tweet-btn');
const tweetInput = document.getElementById('tweet-input');





//event listeners

tweetBtn.addEventListener('click', function() {
  const text = tweetInput.value;
  console.log(text);
})
 


document.addEventListener('click', function(event) {
  if (event.target.dataset.like) {
    const tweetId = event.target.dataset.like;
    likeHandle(tweetId);
  }

  else if (event.target.dataset.retweet) {
    const tweetId = event.target.dataset.retweet;
    retweetHandle(tweetId);
  }

  else if (event.target.dataset.reply) {
    const tweetId = event.target.dataset.reply;
    replyHandle(tweetId);
  }
})


//functions

function getFeedHtml() {
  let feedHtml = '';
  tweetsData.forEach(function(element) {
    let heartClass = '';
    let repliesHtml = ''; 
    let retweetClass = '';
    if (element.isLiked) {
      heartClass = 'liked';
    }
    if (element.isRetweeted) {
      retweetClass = 'retweeted';
    }

    if (element.replies[0]) {
      element.replies.forEach(function(item) {
        repliesHtml += `
          <div class="tweet-reply">
            <div class="tweet-inner">
              <img src="${item.profilePic}" class="profile-pic">
              <div>
                <p class="handle">${item.handle}</p>
                <p class="tweet-text">${item.tweetText}</p>
              </div>
            </div>
          </div>`
      })
    }

    feedHtml += `
    <div class="tweet">
      <div class="tweet-inner">
        <img class='profile-pic' src='${element.profilePic}'>
        <div>
            <p class="handle">${element.handle}</p>
            <p class="tweet-text">${element.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                  <i class="fa-regular fa-comment-dots" data-reply='${element.uuid}'></i>
                  ${element.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${heartClass}" data-like='${element.uuid}'></i>
                  ${element.likes}
                </span>
                <span class="tweet-detail">
                  <i class="fa-solid fa-retweet ${retweetClass}" data-retweet='${element.uuid}'></i>
                  ${element.retweets}
                </span>
            </div>   
        </div>            
      </div>
      <div class='hidden' id="replies-${element.uuid}">
        ${repliesHtml}
      </div>   
    </div>`
  })
  return feedHtml
}


function render() {
  document.getElementById('feed').innerHTML = getFeedHtml();
}

function likeHandle(id) {
  const targetObj = tweetsData.filter(function(element) {
    return element.uuid === id
  })[0]
  if (!targetObj.isLiked) {
    targetObj.likes++;
  }
  else {
    targetObj.likes--;
  }
  targetObj.isLiked = !targetObj.isLiked;
  render();
}


function retweetHandle(id) {
  const targetObj = tweetsData.filter(function(element) {
    return element.uuid === id
  })[0]
  if (!targetObj.isRetweeted) {
    targetObj.retweets++;
  }
  else {
    targetObj.retweets--;
  }
  targetObj.isRetweeted = !targetObj.isRetweeted;
  render();
}

function replyHandle(id) {
  document.getElementById(`replies-${id}`)
    .classList.toggle('hidden');
}

render();