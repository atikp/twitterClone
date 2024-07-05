import API from './API.js'
const users = API.getUsers();
const loginSubmit = document.querySelector('.loginForm');
const userName = document.querySelector('.loginForm [placeholder=Username]')
// let userInput = 'Elbert Beer';

loginSubmit.addEventListener('submit',(event)=>{
  sessionStorage.clear();
  event.preventDefault();
  users.then(userList=> userList.forEach(user=>{
    if(user.name == userName.value){
      console.log(user.name)
      console.log(userName);
      window.location.href = '../app/feedView.html'
      const currentUser = JSON.stringify(user);
      sessionStorage.setItem('currentUser', `${currentUser}`);
    }
  }));
})