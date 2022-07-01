import React, {useState } from 'react';
import GroupsList from './GroupsList';
import './GroupsProcessor.css'
import LOCAL_STORAGE_GROUPS from './LocalStorageGroups';

function GroupsProcessor(){
  const [groups, setGroups] = useState(LOCAL_STORAGE_GROUPS);

  const groupRegex = /[g][r][o][u][p][0-9]*/;
  function removeGroupFromLocalStorage(id) {
    for (const key of Object.keys(localStorage)) {
        if (groupRegex.test(key)) {
            let user = JSON.parse(localStorage.getItem(key));
            if (user._id == id){
              localStorage.removeItem(key);
            }
        }
    }
}

function removeGroup(id){
  fetch("http://localhost:3002/api/groups/" + id, {
    method: 'delete',
    headers: {"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"}
  }).then(() => {
     console.log('removed');
  }).catch(err => {
    console.error(err)
  });
}

  function deleteGroup(deleted) {
    removeGroup(deleted._id);
    removeGroupFromLocalStorage(deleted._id);
    setGroups(oldGroups => oldGroups.filter(g => g._id !== deleted._id));
  }

      return (
        <div className="GroupsList">
        <form className='GroupsForm'>
          <div>
            <h1>Groups</h1>
          <GroupsList groups={groups} onDelete={deleteGroup}/>
        </div>
        </form>
        </div>
    );  
    
}

export default GroupsProcessor;
