import React from "react";
import ArticleItem from "./ArticleItem";
import './ArticleList.css'

const ArticlesList = ({ articles, ...props }) => {
    return (
        <div className="ArticlesListItems">
            {articles
                .map(article => (
                        <ArticleItem article={article} {...props} />
                ))}
        </div>
    )
}

export default ArticlesList;