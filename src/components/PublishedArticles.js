import React, { useState } from 'react';
import SavedArticlesList from './articles/SavedArticlesList';
import LOCAL_STORAGE_PUBLISHED_ARTICLES from './LocalStoragePublishedArticles';
import './PublishedArticles.css'

export default function AllPublishedArticles() {
    const [publishedArticles, setPublishedArticles] = useState(LOCAL_STORAGE_PUBLISHED_ARTICLES);

    function getCurrentLikes(id) {
        fetch(("http://localhost:3002/api/articles/" + id + "/likes"), {
         method: 'get'
       }).then((response) => response.json())
         .then((like) => {
           localStorage.setItem("likes", JSON.stringify(like));
         })
     }

    function readArticle(read) {
        getCurrentLikes(read._id);
        localStorage.setItem("choosen", JSON.stringify(read));
        window.location.href='/ReadArticle';
      }

    return (
        
        <div>
        <form className='articlesForm'>
          <h1>Enjoy :) </h1>
        </form>
          <SavedArticlesList articles={publishedArticles} onRead={readArticle}></SavedArticlesList>
        </div>
    );  
}