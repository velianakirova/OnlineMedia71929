import './UserItem.css'
import React from 'react'
import PropTypes from 'prop-types'

const UserItem = ({ user, onDelete }) => {

    return (
        <div className="UserItem">
            <span className='UserItem-content'>
          <span> Name: {user.name}</span>
          <span> Username: {user.username}</span>
          <span> Gender: {user.gender}</span>
          <span> Role: {user.role}</span>
          <span> Created: {user.created}</span>
            </span>
            <span className='UserItem-right'>
                <button className="UserItemBtn" title="Delete User"
                    onClick={() => onDelete(user)} >X</button>
            </span>
        </div>
    )
}


UserItem.propTypes = {
    user: PropTypes.shape({
         id: PropTypes.string,
         name: PropTypes.string.isRequired,
         username: PropTypes.string.isRequired,
         password: PropTypes.string.isRequired,
         gender: PropTypes.oneOf(['male', 'female']),
         role: PropTypes.oneOf(['reader', 'admin', "journalist", "editor"]),
         pucture: PropTypes.string,
         description: PropTypes.string,
         isValud: PropTypes.oneOf(['active', 'suspended', 'deactivated']),
         created: PropTypes.string.isRequired,
         lastModified: PropTypes.string.isRequired
     })
 }
 
export default UserItem