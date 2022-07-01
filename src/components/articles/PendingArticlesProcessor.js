import React, {useState } from 'react';
import './ArticlesProcessor.css'
import LOCAL_STORAGE_PENDING_ARTICLES from './LocalStoragePendingArticles';
import PendingArticlesList from './PendingArticlesList';

function PendingArticlesProcessor(){
  const [articles, setArticles] = useState(LOCAL_STORAGE_PENDING_ARTICLES);

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
    setArticles(oldArticles => oldArticles.filter(r => r._id !== deleted._id));
    removePendingArticleFromLocalStorage(deleted);
  }

  function publishArticle(published){
    changeArticleStatusInDB(published);
    removePendingArticleFromLocalStorage(published);
  }

  function changeArticleStatusInDB(published){
    fetch(("http://localhost:3002/api/articles/" + published._id + "/publish"), {
      method: 'post'
    }).then(() => {
      console.log('published');
    }).catch(err => {
      console.error(err)
    });
  }

  const articleRegex = /[p][e][n][d][i][n][g][a][r][t][i][c][l][e][0-9]*/;
  function removePendingArticleFromLocalStorage(published) {
      for (const key of Object.keys(localStorage)) {
          if (articleRegex.test(key)) {
              let article = JSON.parse(localStorage.getItem(key));
              if (article._id == published._id){
                localStorage.removeItem(key);
              }
          }
      }
  }

  function editArticle(edited){
    localStorage.setItem("toEdit", JSON.stringify(edited));
    window.location.href='/EditArticle';
  }

      return (
        <div className="ArticlesList">
        <form className='articlesForm'>
          <h1>Waiting for approval</h1>
        </form>
        <div>
          <PendingArticlesList articles={articles} onDelete={deleteArticle} onEdit={editArticle} onPublish={publishArticle}/>
        </div>
        </div>
    );  
    
}

export default PendingArticlesProcessor;
