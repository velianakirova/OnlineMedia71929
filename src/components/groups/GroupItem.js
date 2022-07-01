import './GroupItem.css'
import React from 'react'
import PropTypes from 'prop-types'

const GroupItem = ({ group, onDelete }) => {

    return (
        <div className="GroupItem">
            <div className='GroupItemContent'>
            <h4>{group.name}</h4>
            <p id="articles">{group.articles.length} articles</p>
            <button id="deleteBtn" className="GroupItemBtn" title="Delete group"
                    onClick={() => onDelete(group)} >Delete</button>
            </div>
            
        </div>
    )
}

GroupItem.propTypes = {
    group: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        articles: PropTypes.array.isRequired,
        created: PropTypes.string.isRequired,
        lastModified: PropTypes.string.isRequired
    }),
    onDelete: PropTypes.func.isRequired
}

export default GroupItem