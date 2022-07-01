import { Component } from "react";
import { PropTypes } from "prop-types";
import './AddArticle.css'
import { Article } from "./ArticleModel";
import LOCAL_STORAGE_GROUPS from "../../groups/LocalStorageGroups";

export default class AddArticle extends Component {
    static propTypess = {
        onAddArticle: PropTypes.func.isRequired
    }

    state = {
        userId: '', 
        groupId: '', 
        title: '', 
        shortDescription: '', 
        picture: '', 
        longDescription: ''
    }
    
    submitArticle = (event) => {
        let rand = Math.random() * 1000;
        let ArticleUniqueKey = "article" + Math.floor(rand);
        let PendingArticleUniqueKey = "pendingarticle" + Math.floor(rand);
        let WrittenArticleUniqueKey = "writtenarticle" + Math.floor(rand);

        event.preventDefault();
        const title = this.state.title.trim();
        const picture = this.state.picture.trim();
        const userId = JSON.parse(localStorage.getItem("loggedUser"))._id;
        const groupId = "62b6f5ca143bc566b8941b0c";
        const shortDescription = this.state.shortDescription.trim();
        const longDescription = this.state.longDescription.trim();

        this.setState({ title: '', picture: '', shortDescription: '', userId: '', groupId: '', longDescription: '' })
        this.props.onAddArticle(new Article(userId, groupId, title, shortDescription, picture, longDescription));

        let today = new Date().toLocaleString();

        let article = {
            userId: userId, groupId: groupId, title: title, shortDescription: shortDescription, picture:picture, longDescription:longDescription,
            comments: [],
            likes: 0,
            status: "pending",
            created: today,
            lastModified: today
        };


        const url = 'http://localhost:3002/api/articles';
        const res = fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(article)
        })
            .then(response => response.json())
            .then(function () {
                console.log("Article created");
            });

        localStorage.setItem(ArticleUniqueKey, JSON.stringify(article));
        localStorage.setItem(PendingArticleUniqueKey, JSON.stringify(article));
        localStorage.setItem(WrittenArticleUniqueKey, JSON.stringify(article));
    }

    findGroupId(groupName){
        return LOCAL_STORAGE_GROUPS.filter(group => group.name == groupName)._id;
    }

    changeTitle = (event) => {
        this.setState({ title: event.target.value })
    }

    changePicture = (event) => {
        this.setState({ picture: event.target.value })
    }

    changeShortDescription = (event) => {
        this.setState({ shortDescription: event.target.value })
    }

    changeGroupName = (event) => {
        this.setState({ groupId: event.target.value })
    }

    changeLongDescription = (event) => {
        this.setState({ longDescription: event.target.value })
    }

    render() {
        return (
            <form className="AddArticle-form" onSubmit={this.submitArticle}>
                <h1>Add artticle</h1>
                <input id="name" type="text" placeholder="Title" value={this.state.name} onChange={this.changeTitle} />
                <input id="picture" type="text" placeholder="Picure URL" value={this.state.picture} onChange={this.changePicture} />
                <input id="shortDescription" type="text" value={this.state.shortDescription} placeholder="Short description"
                    onChange={this.changeShortDescription} />
                <input id="longDescription" type="text" value={this.state.longDescription} placeholder="Long description"
                    onChange={this.changeLongDescription} />
                <input id="tags" type="text" placeholder="Group" value={this.state.groupId}
                    onChange={this.changeGroupName} />
                <button className="button" type="submit">Submit Article</button>
            </form>
        )
    }
}
