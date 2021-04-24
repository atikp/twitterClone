const API_ENDPOINT = "http://localhost:3000"
const USERS_URL = `${API_ENDPOINT}/users?_embed=tweets`
const TWEETS_URL = `${API_ENDPOINT}/tweets?_expand=user&_embed=comments`
const ONLY_TWEETS_URL = `${API_ENDPOINT}/tweets`
const COMMENTS_URL = `${API_ENDPOINT}/comments`
const getTweets = () => fetch(TWEETS_URL).then(res => res.json());
const getUsers = () => fetch(USERS_URL).then(res => res.json());


const getSingleTweet = async(tweetId)=> await fetch(`${API_ENDPOINT}/tweets/${tweetId}?_expand=user&_embed=comments`).then(res => res.json());

const postComment = async(newComment) =>{
    const postIt ={
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newComment),
    }
    return await fetch(COMMENTS_URL,postIt).then((response)=> response.json());
  }

  const patchLikes = async(tweetId, newLikesAmmount) =>{
    const patchIt = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({likes: newLikesAmmount}),
      }
      return await fetch(ONLY_TWEETS_URL+'/'+tweetId ,patchIt).then((response)=> response.json())
  }
  const patchRetweets = async(tweetId, newRetweetsAmmount) =>{
    const patchIt = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({retweets: newRetweetsAmmount}),
      }
      return await fetch(ONLY_TWEETS_URL+'/'+tweetId ,patchIt).then((response)=> response.json())
  }

  const postTweet = async(newTweet) =>{
    const postIt ={
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newTweet),
    }
    return await fetch(ONLY_TWEETS_URL,postIt).then((response)=> response.json());
  }

export default {
    getUsers,
    getTweets,
    getSingleTweet,
    postComment,
    patchLikes,
    patchRetweets,
    postTweet
}