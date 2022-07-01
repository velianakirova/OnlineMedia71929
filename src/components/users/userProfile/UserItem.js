import './UserItem.css'
import React from 'react'
import PropTypes from 'prop-types'

const UserItem = ({ user, onDelete }) => {

    return (
        <div className="UserItem">
            <div className='UserItemContent'>
                <img src={user.picture}></img>
                <div className='UserProfileInformation'>
          <div> Name: {user.name}</div>
          <div> Username: {user.username}</div>
          <div> Gender: {user.gender}</div>
          <div> Role: {user.role}</div>
          <div> Created: {user.created}</div>
          </div>
            </div>
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