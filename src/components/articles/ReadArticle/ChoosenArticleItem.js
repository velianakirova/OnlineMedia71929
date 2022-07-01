import './ChoosenArticleItem.css'
import React from 'react'
import PropTypes from 'prop-types'

const ChoosenArticleItem = ({ article, likes, comments, onLike }) => {

    return (
        <div className="ChoosenArticleItem">
            <div className='ChoosenArticleItemContent'>
            <h1>{article.title}</h1>
            <p id="created">{article.created}</p>
            <img src={article.picture}></img>
            <p>{article.longDescription}</p>
            <div id="interactions">
            <p>{likes} likes</p>
            <button id="like" onClick={() => onLike(article)}>Like</button>
            </div>
            <ul>
                {comments
                .map(comment => (
                        <li>{comment}</li>
                ))}
            </ul>
            </div>
        </div>
    )
}

ChoosenArticleItem.propTypes = {
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
    onLike: PropTypes.func.isRequired
}

export default ChoosenArticleItem