import API from './API.js';
// Your code here
API.getTweets();
let sessionUser = JSON.parse(sessionStorage.getItem('currentUser'));
let userDetails = sessionUser.name;

const profilePicEl = document.querySelector('.profilePic img');
const userNameEl = document.querySelector('.userName');
const userTag = document.querySelector('.nameLocation .userTag');
const locationEl = document.querySelector('.nameLocation .location');
const newUserTag = (sessionUser.name.replace(/\s/g, '').toLowerCase());
const followersEl = document.querySelector('.followers span');
const followingEl = document.querySelector('.following span');

profilePicEl.src = sessionUser.avatar_url;
userNameEl.innerText = sessionUser.name;
userTag.innerText = `@${newUserTag}`;
followersEl.innerText = sessionUser.followers;
followingEl.innerText = sessionUser.following;
locationEl.innerText = sessionUser.location;

console.log('sessionUser:',sessionUser);
console.log(userDetails);
// sessionUser.tweets.push('12334');
// sessionUser.name = 'bob';
