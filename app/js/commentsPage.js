import API from "./API.js";
const currentTweetId = JSON.parse(sessionStorage.getItem("tweetId"));
const allUsers = API.getUsers();
const currentTweet = API.getSingleTweet(currentTweetId);
const mainTweet = document.querySelector(".mainTweet");

const backButtons = [...document.querySelectorAll("button.backButton")];
// console.log(backButtons)
backButtons.forEach(backButton => {
  backButton.addEventListener('click',()=>{
    window.history.back();
  })
})

currentTweet.then((tweet) => {
  // console.log(tweet);
  const tweetProfilePicEl = tweet.user.avatar_url;
  const tweetUserName = tweet.user.name;
  const tweetUserTag = "@" + tweet.user.name.replace(/\s/g, "").toLowerCase();
  const tweetBody = tweet.content;
  const commentSection = document.querySelector('.allComments')
  const currentTweetEl = document.createElement("div");


  currentTweetEl.classList.add("tweetWrap");
  currentTweetEl.innerHTML = `   
  <div class="tweetHeader">
    <div class="profilePic">
      <img src="${tweetProfilePicEl}">
    </div>
    <div class="userDetails">
      <h2 class="userName"><span>${tweetUserName}</span></h2>
      <p class="userTag">${tweetUserTag}</p>
    </div>
  </div>
  <div class="tweetBody">
    <p>
      ${tweetBody}
    </p>
    <div class="tweetCta">
      <button><img src="./img/notLiked.png" alt=""><h3>${tweet.likes}</h3></button>
      <button><img src="./img/NotRetweeted.png" alt=""><h3>${tweet.retweets}</h3></button>
      <button><img src="./img/comment.png" alt=""><h3>${tweet.comments.length}</h3></button>
    </div>
  </div>`;
  mainTweet.appendChild(currentTweetEl);
  const allComments = tweet.comments;
  allComments.forEach(comment => {
    // console.log('comment',comment);
    allUsers.then(userList=> {
      const commentUser = userList[comment.userId-1];
      // console.log(commentUser);
      const commentProfilePic = commentUser.avatar_url;
      const commentUserName = commentUser.name;
      const commentUserTag = commentUserName.replace(/\s/g, "").toLowerCase();
      const commentBody = comment.content;
    
      const commentEL = document.createElement('div');
      commentEL.classList.add('commentWrap');
      commentEL.innerHTML = `
      <div class="commentHeader">
      <div class="profilePic">
        <img src="${commentProfilePic}" alt="profilePic">
      </div>
      <div class="userDetails">
        <h3 class="userName"><span>${commentUserName}</span></h3>
        <p class="userTag">@${commentUserTag}</p>
      </div>
    </div>
    <div class="commentBody">
      <p>${commentBody}</p>
    </div>
      
      `
    commentSection.appendChild(commentEL);
  })
  });
});


