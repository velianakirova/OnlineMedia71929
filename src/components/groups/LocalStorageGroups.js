const groupRegex = /[g][r][o][u][p][0-9]*/;

function loadGroupsFromLocalStorage() {
    let alreadyLoadedGroups = [];
    let groupsFromLocalStorage = [];
    for (const key of Object.keys(localStorage)) {
        if (groupRegex.test(key)) {
            let group = JSON.parse(localStorage.getItem(key));
            if (!isAlreadyLoadedGroup(group.name, alreadyLoadedGroups)) {
                groupsFromLocalStorage.push(group);
                alreadyLoadedGroups.push(group.name);
            }
        }
    }
    return groupsFromLocalStorage;
}

const isAlreadyLoadedGroup = (groupName, loadedGroupNames) => {
    for (let i = 0; i < loadedGroupNames.length; i++) {
        if(loadedGroupNames[i] === groupName){
            return true;
        }
    }
    return false;
}

function saveGroupsFromMongoDbToLocalStorage() {
    fetch('http://localhost:3002/api/groups')
        .then((response) => response.json())
        .then((groups) => {
            if (groups && groups.length !== 0) {
                groups.map(group => {
                    let rand = Math.random() * 1000;
                    let uniqueKey = "group" + Math.floor(rand);
                    localStorage.setItem(uniqueKey, JSON.stringify(group)); 
                })
            }
        })
}

saveGroupsFromMongoDbToLocalStorage();

const LOCAL_STORAGE_GROUPS = loadGroupsFromLocalStorage();
export default LOCAL_STORAGE_GROUPS;