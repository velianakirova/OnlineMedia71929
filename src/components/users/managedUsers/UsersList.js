import React from "react";
import UserItem from "./UserItem";
import './UsersList.css'

function UsersList({users, ...props}) {
    return(
        <ul className="UserList-items">
        {
        users.map(user => (
            <div>
                <UserItem user={user} {...props}/>
            </div>
        ))}
    </ul>

        
    )
}

export default UsersList;