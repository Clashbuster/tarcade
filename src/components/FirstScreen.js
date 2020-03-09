import React from 'react';
import Title from "./Title.js"
import PlayButton from './PlayButton.js';


export default class FirstScreen extends React.Component {


    



    render(){
        return(
            <div id="first-screen">
            <PlayButton enterBrowser={this.props.enterBrowser}></PlayButton>
            <Title></Title>
            </div>
        )
    }
}
