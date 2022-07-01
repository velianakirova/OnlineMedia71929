import React, {useState } from 'react';
import UsersList from './UsersList';
import './UserProfileProcessor.css'
import LOGGED_USER from './LocalStorageLoggedUser';
import SavedArticlesList from '../../articles/SavedArticlesList';
import ChoosenArticleItem from '../../articles/ReadArticle/ChoosenArticleItem';

function UserProfileProcessor(){
  const [users, setUsers] = useState(LOGGED_USER);
  const [savedArticles, setSavedArticles] = useState(LOGGED_USER[0].savedArticles);
  const [writtenArticles, setWrittenArticles] = useState(LOGGED_USER[0].writtenArticles);

  const userRegex = /[u][s][e][r][0-9]*/;
  function removeUserFromLocalStorage(id) {
      for (const key of Object.keys(localStorage)) {
          if (userRegex.test(key)) {
              let user = JSON.parse(localStorage.getItem(key));
              if (user._id == id){
                localStorage.removeItem(key);
              }
          }
      }
  }

  function removeU(id){
    fetch("http://localhost:3002/api/users/" + id, {
      method: 'delete'
    }).then(() => {
       console.log('removed');
    }).catch(err => {
      console.error(err)
    });
  }
  
  function getCurrentLikes(id) {
    const headers = new Headers();
    headers.append("Authorization", localStorage.getItem("access_token"));
  
    fetch(("http://localhost:3002/api/articles/" + id + "/likes"), {
     method: 'get',
     headers: headers
   }).then((response) => response.json())
     .then((like) => {
       localStorage.setItem("likes", JSON.stringify(like));
     })
 }

  function readArticle(read) {
    getCurrentLikes(read._id);
    localStorage.setItem("choosen", JSON.stringify(read));
    window.location.href='/ReadArticle';
  }

  function deleteUser(deleted) {
    setUsers(oldUsers => oldUsers.filter(u => u._id !== deleted._id));
    removeU(deleted._id);
    removeUserFromLocalStorage(deleted._id);
  }

      return (
        <div className="UsersList">
        <h1>Users</h1>
        <div>
          <UsersList users={users} onDelete={deleteUser}/>
          <div className='userArticles'>Saved articles</div>
          <SavedArticlesList articles={savedArticles} onRead={readArticle}></SavedArticlesList>
          <div className='userArticles'>Written articles</div>
          <SavedArticlesList articles={writtenArticles} onRead={readArticle}></SavedArticlesList>
        </div>
        </div>
    );  
}

export default UserProfileProcessor;