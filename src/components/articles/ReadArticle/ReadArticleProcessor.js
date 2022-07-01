import React, { useState } from 'react';
import './ArticlesProcessor.css'
import ChoosenArticleItem from './ChoosenArticleItem';

function ReadArticlesProcessor() {
  const [articles, setArticles] = useState([JSON.parse(localStorage.getItem("choosen"))]);
  const [likes, setLikes] = useState(localStorage.getItem("likes") != null ? Number.parseInt(localStorage.getItem("likes")) : articles[0].likes);
  const [comments, setComments] = useState(articles[0].comments);

  console.log(localStorage.getItem("likes"));
   function like(id) {
     fetch(("http://localhost:3002/api/articles/" + id + "/like"), {
      method: 'post'
    }).then(() => {
      console.log('liked');
    }).catch(err => {
      console.error(err)
    });
  }

  const articleRegex = /[a][r][t][i][c][l][e][0-9]*/;
  const savedArticleRegex = /[s][a][v][e][d][a][r][t][i][c][l][e][0-9]*/;
  const writtenArticleRegex = /[w][r][i][t][t][e][n][a][r][t][i][c][l][e][0-9]*/;

  function updateArticleInLocalStorage(read) {
    replaceForRegex(articleRegex, read);
    replaceForRegex(savedArticleRegex, read);
    replaceForRegex(writtenArticleRegex, read);
  }

  function replaceForRegex(regex, read) {
    for (const key of Object.keys(localStorage)) {
      if (regex.test(key)) {
        let article = JSON.parse(localStorage.getItem(key));
        if (article.title == read.title) {
          read.likes = Number.parseInt(localStorage.getItem("likes"));
          localStorage.removeItem(key);
          localStorage.setItem(key, JSON.stringify(read));
          break;
        }
      }
    }
  }

  function likeArticle(read) {
    like(read._id);
    setLikes(likes => Number.parseInt(localStorage.getItem("likes")) + 1);
    updateArticleInLocalStorage(read);
  }

  return (
    <div className="ArticlesList">
      <div>
        {articles
          .map(article => (
            <ChoosenArticleItem article={article} likes={likes} comments={comments} onLike={likeArticle} />
          ))}
      </div>
    </div>
  );
}

export default ReadArticlesProcessor;
