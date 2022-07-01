import './PendingArticleItem.css'
import React from 'react'
import PropTypes from 'prop-types'

const PendingArticleItem = ({ article, onEdit, onDelete, onPublish }) => {

    return (
        <div className="PendingArticleItem">
            <div className='PendingArticleItemContent'>
            <img src={article.picture}></img>
            <h4>{article.title}</h4>
            <button id="editBtn" onClick={() => onEdit(article)}>Edit</button>
            <button id="deleteBtn" onClick={() => onDelete(article)}>Delete</button>
            <button id="approveBtn" onClick={() => onPublish(article)}>Publish</button>
            </div>     
        </div>
    )
}

PendingArticleItem.propTypes = {
    article: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        groupId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        shortDescription: PropTypes.string,
        longDescription: PropTypes.string,
        comments: PropTypes.array,
        likes: PropTypes.number,
        picture: PropTypes.string,
        created: PropTypes.string,
        lastModified: PropTypes.string
    }),
    onRead: PropTypes.func.isRequired
}

export default PendingArticleItem