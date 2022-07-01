const writtenArticleRegex = /[w][r][i][t][t][e][n][a][r][t][i][c][l][e][0-9]*/;

function loadActiclesFromLocalStorage() {
    let alreadyLoadedArticles = [];
    let articlesFromLocalStorage = [];
    for (const key of Object.keys(localStorage)) {
        if (writtenArticleRegex.test(key)) {
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

function writtenArticlesFromMongoDbToLocalStorage() {
    const loggedUserId = "62b6b7a71e31c7aa30faaae9";
    fetch(`http://localhost:3002/api/readers/${loggedUserId}/articles/written`)
        .then((response) => response.json())
        .then((articles) => {
            if (articles) {
                articles.map(article => {
                    let rand = Math.random() * 1000;
                    let uniqueKey = "writtenarticle" + Math.floor(rand);
                    localStorage.setItem(uniqueKey, JSON.stringify(article)); 
                })
            }
        })
}

writtenArticlesFromMongoDbToLocalStorage();

const LOCAL_STORAGE_WRITTEN_ARTICLES = loadActiclesFromLocalStorage();

export default LOCAL_STORAGE_WRITTEN_ARTICLES;