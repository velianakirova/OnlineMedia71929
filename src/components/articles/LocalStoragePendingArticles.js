const articleRegex = /[p][e][n][d][i][n][g][a][r][t][i][c][l][e][0-9]*/;

function loadActiclesFromLocalStorage() {
    let alreadyLoadedArticles = [];
    let articlesFromLocalStorage = [];
    for (const key of Object.keys(localStorage)) {
        if (articleRegex.test(key)) {
            let article = JSON.parse(localStorage.getItem(key));
            if (!isAlreadyLoadedArticle(article.title, alreadyLoadedArticles)) {
                articlesFromLocalStorage.push(article);
                alreadyLoadedArticles.push(article.title);
            }
        }
    }
    return articlesFromLocalStorage;
}

const isAlreadyLoadedArticle = (articleName, loadedArticleNames) => {
    for (let i = 0; i < loadedArticleNames.length; i++) {
        if(loadedArticleNames[i] === articleName){
            return true;
        }
    }
    return false;
}

function saveArticlesFromMongoDbToLocalStorage() {
    fetch('http://localhost:3002/api/articles/pending')
        .then((response) => response.json())
        .then((articles) => {
            if (articles && articles.length !== 0) {
                articles.map(article => {
                    let rand = Math.random() * 1000;
                    let uniqueKey = "pendingarticle" + Math.floor(rand);
                    localStorage.setItem(uniqueKey, JSON.stringify(article)); 
                })
            }
        })
}

saveArticlesFromMongoDbToLocalStorage();

const LOCAL_STORAGE_PENDING_ARTICLES = loadActiclesFromLocalStorage();

export default LOCAL_STORAGE_PENDING_ARTICLES;