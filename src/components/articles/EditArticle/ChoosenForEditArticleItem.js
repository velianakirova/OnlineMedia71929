import { Component } from "react";
import { PropTypes } from "prop-types";
import { Article } from "../NewArticle/ArticleModel";
import LOCAL_STORAGE_ARTICLE_TO_EDIT from "./LocalStorageChooseArticle";
import './ChoosenForEditArticleItem.css'

export default class ChoosenForEditArticleItem extends Component {
    state = {
        userId: '', 
        groupId: '', 
        title: '', 
        shortDescription: '', 
        picture: '', 
        longDescription: ''
    }
    
    submitArticle = (event) => {
        event.preventDefault();
        const title = this.state.title.trim();
        const picture = this.state.picture.trim();
        const shortDescription = this.state.shortDescription.trim();
        const longDescription = this.state.longDescription.trim();

        this.setState({ title: '', picture: '', shortDescription: '', longDescription: '' })

        let article = {
            title: title, shortDescription: shortDescription, picture:picture, longDescription:longDescription,
        };

        const url = "http://localhost:3002/api/articles/" + LOCAL_STORAGE_ARTICLE_TO_EDIT[0]._id;
        const res = fetch(url, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(article)
        })
            .then(response => response.json())
            .then(function () {
                console.log("Article created");
            });
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

    changeLongDescription = (event) => {
        this.setState({ longDescription: event.target.value })
    }

    render() {
        return (
            <form className="ChoosenToEditArticleItem" onSubmit={this.submitArticle}>
            <div className='ChoosenToEditArticleItemContent'>
                <p>Title</p>
                <small>{LOCAL_STORAGE_ARTICLE_TO_EDIT[0].title}</small>
                <input id='title' value={this.state.title} onChange={this.changeTitle}></input>
                <p>Picture</p>
                <small>{LOCAL_STORAGE_ARTICLE_TO_EDIT[0].title}</small>
                <input id='picture' value={this.state.picture} onChange={this.changePicture}></input>
                <p>Long Description</p>
                <small>{LOCAL_STORAGE_ARTICLE_TO_EDIT[0].longDescription}</small>
                <textarea id='longDescription' value={this.state.longDescription} onChange={this.changeLongDescription}></textarea>
                <p>Short Description</p>
                <small>{LOCAL_STORAGE_ARTICLE_TO_EDIT[0].shortDescription}</small>
                <input id='shortDescription' value={this.state.shortDescription} onChange={this.changeShortDescription}></input>
                
                <button id='saveBtn'>Save</button>
            </div>
        </form>
        )
    }
}
