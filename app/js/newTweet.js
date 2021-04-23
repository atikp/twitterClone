console.log('newTweetPage')
import API from './API.js'
const getTweets = API.getTweets();
const backButtons = [...document.querySelectorAll("button.backButton")];
console.log(backButtons)
backButtons.forEach(backButton => {
  console.log(backButton);
  backButton.addEventListener('click',()=>{
    console.log('clicked')
    window.history.back();
  })
})

//create button to send tweet to the api DB