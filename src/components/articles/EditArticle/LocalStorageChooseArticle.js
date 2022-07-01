
function loadActiclesFromLocalStorage() {
    let alreadyLoadedArticles = [];
    let articlesFromLocalStorage = [];
    for (const key of Object.keys(localStorage)) {
        if ("toEdit" == (key)) {
            let article = JSON.parse(localStorage.getItem(key));
            console.log("local: " + article);
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

const LOCAL_STORAGE_ARTICLE_TO_EDIT = loadActiclesFromLocalStorage();

export default LOCAL_STORAGE_ARTICLE_TO_EDIT;