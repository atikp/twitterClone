import API from "./API.js";

const getAllTweets = API.getTweets();
let sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));
let tweetPosition = JSON.parse(sessionStorage.getItem("currentUser")) || 0;
let userDetails = sessionUser.name;
const profilePicEl = document.querySelector(".profilePic img");
const userNameEl = document.querySelectorAll(".userName span");
const userTag = document.querySelector(".nameLocation .userTag");
const locationEl = document.querySelector(".nameLocation .location");
const newUserTag = sessionUser.name.replace(/\s/g, "").toLowerCase();
const followersEl = document.querySelector(".followers span");
const followingEl = document.querySelector(".following span");
const tweetWrapper = document.querySelector(".tweetWrap");
const backButtons = [...document.querySelectorAll("button .backButton")];

profilePicEl.src = sessionUser.avatar_url;
userNameEl.forEach((username) => (username.innerText = sessionUser.name));
userTag.innerText = `@${newUserTag}`;
followersEl.innerText = sessionUser.followers;
followingEl.innerText = sessionUser.following;
locationEl.innerText = sessionUser.location;

document.onload = () =>{
    window.scrollTo(0, tweetPosition);
}
const getYPosition = () => {
  var top  = window.pageYOffset || document.documentElement.scrollTop
  console.log(top)
  return top;
}

tweetWrapper.addEventListener('click',()=> {
  tweetPosition = JSON.stringify(getYPosition())
  sessionStorage.setItem('tweetPosition', tweetPosition)
})

backButtons.forEach(backButton => {
  backButton.addEventListener('click',()=>{
    console.log('clicked')
    
  })
})


console.log("sessionUser:", sessionUser);
console.log(userDetails);
getAllTweets.then((allTweets) =>
  allTweets.forEach((tweet) => {
    const commentCount = tweet.comments.length;
    
    if (tweet.userId === sessionUser.id) {
      const newTweet = document.createElement("div");
      newTweet.classList.add("tweet");
      newTweet.innerHTML = `
      <div class="tweetHeader">
        <h3 class="userName"><span>${sessionUser.name}</span> </h3>
        <p class="tweetDate">${tweet.date}</p>
      </div>
      <div class="tweetBody">
        ${tweet.content}
      </div>
      <div class="tweetCta">
        <button class="likes"><img src="./img/notLiked.png" alt=""><h3>${tweet.likes}</h3></button>
        <button class="retweets"><img src="./img/NotRetweeted.png" alt=""><h3>${tweet.retweets}</h3></button>
        <button class="comments"><img src="./img/comment.png" alt=""><h3>${commentCount}</h3></button>
      </div>
      <div class="newComment hidden">
        <form action="submit" class="commentText ">
          <textarea name="addNewComment" class="addNewComment" cols="30" rows="10" placeholder="Your comment"></textarea>
          <button type="submit">Reply</button>
        </form>
      </div>`;
      console.log(tweet);
      tweetWrapper.appendChild(newTweet);
      const commentButton = newTweet.querySelector('.comments');
      const newCommentEl = newTweet.querySelector('.newComment');
      const commentBody = newTweet.querySelector('.addNewComment');
      const addNewCommentForm = newTweet.querySelector('.commentText');
      const likeButton = newTweet.querySelector('.likes');
      const totalLikes = newTweet.querySelector('.likes h3');
      const retweetButton = newTweet.querySelector('.retweets');
      const totalRetweets = newTweet.querySelector('.retweets h3')

      let currentLikes = tweet.likes;
      console.log(currentLikes);
      let currentRetweets = tweet.retweets;
      console.log(currentRetweets);
      likeButton.addEventListener('click', ()=>{
        currentLikes+=1;
        newTweet.querySelector('.likes img').src = '../img/liked.png';
        API.patchLikes(tweet.id, currentLikes);
        totalLikes.innerText = currentLikes;
      })
      retweetButton.addEventListener('click', ()=>{
        currentRetweets+=1;
        newTweet.querySelector('.retweets img').src = '../img/retweet.png';
        API.patchRetweets(tweet.id, currentRetweets)
        totalRetweets.innerText = currentRetweets;

      })
      commentButton.addEventListener('click', ()=>{
        newCommentEl.classList.toggle('hidden')
      })
      addNewCommentForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        const fullCommentBody = {
        "userId": sessionUser.id,
        "tweetId": tweet.id,
        "content": `${commentBody.value}`,
        "date": `${today}`
        }
        API.postComment(fullCommentBody);
      })
      const tweetBody = newTweet.querySelector('.tweetBody');
      
      tweetBody.addEventListener('click',()=>{
        sessionStorage.setItem('tweetId',tweet.id);
        window.location.href = 'comments.html';
      })

    }
  })
);

