import React, {useState } from 'react';
import ArticlesList from './ArticlesList';
import './ArticlesProcessor.css'
import LOCAL_STORAGE_ARTICLES from './LocalStorageArticles';

function ArticlesProcessor(){
  const [articles, setArticles] = useState(LOCAL_STORAGE_ARTICLES);

  const articleRegex = /[a][r][t][i][c][l][e][0-9]*/;
  function removeGroupFromLocalStorage(id) {
    for (const key of Object.keys(localStorage)) {
        if (articleRegex.test(key)) {
            let article = JSON.parse(localStorage.getItem(key));
            if (article._id == id){
              localStorage.removeItem(key);
            }
        }
    }
}

function removeArticle(id){
  fetch("http://localhost:3002/api/articles/" + id, {
    method: 'delete',
    headers: {"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"}
  }).then(() => {
     console.log('removed');
  }).catch(err => {
    console.error(err)
  });
}

  function deleteArticle(deleted) {
    removeArticle(deleted._id);
    removeGroupFromLocalStorage(deleted._id);
    setArticles(oldArticles => oldArticles.filter(a => a._id !== deleted._id));
  }

  function editArticle(edited){
    localStorage.setItem("toEdit", JSON.stringify(edited));
    window.location.href='/EditArticle';
  }

      return (
        <div className="ArticlesList">
        <form className='articlesForm'>
          <h1>Articles</h1>
         
        </form>
        <div>
          <ArticlesList articles={articles} onDelete={deleteArticle} onEdit={editArticle}/>
        </div>
        </div>
    );  
    
}

export default ArticlesProcessor;
