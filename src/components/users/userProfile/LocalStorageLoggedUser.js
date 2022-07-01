const userRegex = /[u][s][e][r][0-9]*/;

function loadUsersFromLocalStorage() {
    return [JSON.parse(localStorage.getItem("loggedUser"))];
}

function saveUsersFromMongoDbToLocalStorage() {
    const username = localStorage.getItem("loggedUserName");//JSON.parse(localStorage.getItem("loggedUser").
    fetch(`http://localhost:3002/api/users/${username}`)
        .then((response) => response.json())
        .then((users) => {
            if (users && users.length !== 0) {
                users.map(user => {
                    localStorage.setItem("loggedUser", JSON.stringify(user)); 
                })
            }
        })
}

saveUsersFromMongoDbToLocalStorage();

const LOGGED_USER = loadUsersFromLocalStorage();

export default LOGGED_USER;