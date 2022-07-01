import React, {useState } from 'react';
import UsersList from './UsersList';
import './UserProcessor.css'
import LOCAL_STORAGE_USERS from './LocalStorageUsers';

function UsersProcessor(){
  const [users, setUsers] = useState(LOCAL_STORAGE_USERS);

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
        </div>
        </div>
    );  
}

export default UsersProcessor;