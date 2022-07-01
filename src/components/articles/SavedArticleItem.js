import './SavedArticleItem.css'
import React from 'react'
import PropTypes from 'prop-types'

const SavedArticleItem = ({ article, onRead }) => {

    return (
        <div className="SavedArticleItem">
            <div className='SavedArticleItemContent'>
            <img src={article.picture}></img>
            <h4>{article.title}</h4>
            <button id="readBtn" onClick={() => onRead(article)}>Read</button>
            </div>     
        </div>
    )
}

SavedArticleItem.propTypes = {
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

export default SavedArticleItem