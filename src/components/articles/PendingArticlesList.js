import React from "react";
import './ArticleList.css'
import PendingArticleItem from "./PendingArticleItem";

const PendingArticlesList = ({ articles, ...props }) => {
    return (
        <ul className="ArticlesListItems">
            {articles
                .map(article => (
                    <div>
                        <PendingArticleItem article={article} {...props} />
                    </div>
                ))}
        </ul>
    )
}

export default PendingArticlesList;