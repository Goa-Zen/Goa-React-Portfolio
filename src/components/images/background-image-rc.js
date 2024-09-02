import React, { Component } from 'react';
import profilePicture1 from "../../../static/assets/images/mypictures/profile-four-1of4.jpg";
import profilePicture2 from "../../../static/assets/images/mypictures/profile-four-2of4.jpg";
import profilePicture3 from "../../../static/assets/images/mypictures/profile-four-3of4.jpg";
import profilePicture4 from "../../../static/assets/images/mypictures/profile-four-4of4.jpg";

import authPicture1 from "../../../static/assets/images/auth/login.jpg";

import contactPicture1 from "../../../static/assets/images/contact/contact.jpg";

export default class BackgroundImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageIndex: parseInt(this.props.imgIndex) ,
            allowClick: this.props.allowClick || "false",
            images:  this.selectGallery () 
          
        };
        console.log(this.state.images);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
    }    
    
    selectGallery () {
        let imagesOut =[];
        switch (this.props.collection) {
            case "mypictures":
                imagesOut = [profilePicture1,profilePicture2, profilePicture3, profilePicture4];
                return imagesOut;
            case "auth":
                imagesOut = [authPicture1];
                return imagesOut;
            case "contact":
                imagesOut = [contactPicture1];
                return imagesOut;
        }
    }
    handleMouseEnter () {
        const {imageIndex, images} = this.state;
        if (imageIndex < (images.length -1)) {
            this.setState({imageIndex: this.state.imageIndex + 1}) ;
        }else {
            this.setState({imageIndex: 0}) ;
        }
        console.log("We are calling the imageIndex y images.length " , imageIndex, images.length );

    }
    componentDidMount () {
            // this.setState({
            //     images: this.selectGallery()
            // }) ;
        //   this.props.handleGalleryState(this.state.imageIndex);

          console.log("We are calling the componentDidMount " , this.state.imageIndex );
       
    }
    render() {

        console.log("We are calling the render " , this.state.imageIndex );
        let title =this.state.allowClick === "true" ? "Click on me" : null;
        return (

                <div
                    className={this.props.className}
                    title={title}
                    style={{
                        background: "url(" + this.state.images[this.state.imageIndex] + ") no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    
                    }}
                    onClick={() => this.handleMouseEnter()}
                    // onMouseOver={() => setInterval(this.handleMouseEnter(),1000)}
                > 
                </div>

        );
    }
}