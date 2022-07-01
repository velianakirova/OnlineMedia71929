const userRegex = /[u][s][e][r][0-9]*/;

function loadUsersFromLocalStorage() {
    let alreadyLoadedUsers = [];
    let usersFromLocalStorage = [];
    for (const key of Object.keys(localStorage)) {
        if (userRegex.test(key)) {
            let user = JSON.parse(localStorage.getItem(key));
            if (!isAlreadyLoadedUser(user.name, alreadyLoadedUsers)) {
                usersFromLocalStorage.push(user);
                alreadyLoadedUsers.push(user.name);
            }
        }
    }
    return usersFromLocalStorage;
}

const isAlreadyLoadedUser = (userName, loadedUserNames) => {
    for (let i = 0; i < loadedUserNames.length; i++) {
        if(loadedUserNames[i] === userName){
            return true;
        }
    }
    return false;
}

function saveUsersFromMongoDbToLocalStorage() {
    fetch('http://localhost:3002/api/users')
        .then((response) => response.json())
        .then((users) => {
            if (users && users.length !== 0) {
                users.map(user => {
                    let rand = Math.random() * 1000;
                    let uniqueKey = "user" + Math.floor(rand);
                    localStorage.setItem(uniqueKey, JSON.stringify(user)); 
                })
            }
        })
}

saveUsersFromMongoDbToLocalStorage();

const LOCAL_STORAGE_USERS = loadUsersFromLocalStorage();

export default LOCAL_STORAGE_USERS;