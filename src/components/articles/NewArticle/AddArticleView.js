import React, {useState } from 'react';
import LOCAL_STORAGE_ARTICLES from '../LocalStorageArticles';
import AddArticle from "./AddArticle";

function AddArticleView(){
    const [articles, setArticles] = useState(LOCAL_STORAGE_ARTICLES);

    function deleteArticle(deleted) {
      setArticles(oldArticles => oldArticles.filter(r => r.id !== deleted.id));
      localStorage.removeItem(deleted.id);
    }
        return (
          <div className="NewArticle">
          <div>
          <AddArticle onAddArticle={article => setArticles(oldArticles => [...oldArticles, article])} />
          </div>
          </div>
      );  
  }
  
  export default AddArticleView;