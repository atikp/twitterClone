console.log('newTweetPage')
import API from './API.js'
const getTweets = API.getTweets();
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
const backButtons = [...document.querySelectorAll("button.backButton")];
const newTweetForm = document.querySelector('.newTweetHeader form')
console.log(backButtons)
backButtons.forEach(backButton => {
  console.log(backButton);
  backButton.addEventListener('click',()=>{
    console.log('clicked')
    window.history.back();
  })
})

newTweetForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  console.log('tweeted');
  const tweetBody = document.querySelector('.newTweetArea')
  let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
  const newTweetObject = {
      "userId": currentUser.id,
      "content": `${tweetBody.value}`,
      "likes": 0,
      "retweets": 0,
      "date": `${today}`
    
  }
  API.postTweet(newTweetObject);
  window.location.href = 'feedView.html';
})
//create button to send tweet to the api DB