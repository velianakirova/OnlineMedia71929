import React from "react";
import './ArticleList.css'
import SavedArticleItem from "./SavedArticleItem";

const SavedArticlesList = ({ articles, ...props }) => {
    return (
        <ul className="ArticlesListItems">
            {articles
                .map(article => (
                    <div>
                        <SavedArticleItem article={article} {...props} />
                    </div>
                ))}
        </ul>
    )
}

export default SavedArticlesList;