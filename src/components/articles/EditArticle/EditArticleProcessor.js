import React, { useState } from 'react';
import './ArticlesProcessor.css'
import ChoosenForEditArticleItem from './ChoosenForEditArticleItem';
import LOCAL_STORAGE_ARTICLE_TO_EDIT from './LocalStorageChooseArticle';

function EditArticlesProcessor() {
  const [articles, setArticles] = useState(LOCAL_STORAGE_ARTICLE_TO_EDIT);

  console.log("to edit " + LOCAL_STORAGE_ARTICLE_TO_EDIT)
  
  async function editArticle(article) {
    await fetch(("http://localhost:3002/api/articles/" + article._id ), {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    }).then(() => {
      console.log('edited');
    }).catch(err => {
      console.error(err)
    });
  }

  return (
    <div className="ArticlesList">
      <form className='articlesForm'>
        <h1>Edit</h1>

      </form>
      <div>
        {articles
          .map(article => (
            <ChoosenForEditArticleItem article={article} onEdit={editArticle} />
          ))}
      </div>
    </div>
  );
}

export default EditArticlesProcessor;
