import './ArticleItem.css'
import React from 'react'
import PropTypes from 'prop-types'

const ArticleItem = ({ article, onDelete }) => {

    return (
        <div className="ArticleItem">
            <div className='ArticleItemContent'>
            <img src={article.picture}></img>
            <h4>{article.title}</h4>
            <p id="created">{article.created}</p>
            <div id="interactions">
                <p id="comments">{article.comments.length} comments</p>
            <p>{article.likes} likes</p>
            </div>
            <button id="editArticleBtn">Edit</button>
            <button id="deleteArticleBtn" className="ArticleItemBtn" title="Delete article"
                    onClick={() => onDelete(article)} >Delete</button>
            </div>
            
        </div>
    )
}

ArticleItem.propTypes = {
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
    onDelete: PropTypes.func.isRequired
}

export default ArticleItem