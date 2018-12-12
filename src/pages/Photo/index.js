import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonBack from '../../components/ButtonBack';
import Spinner from '../../components/Spinner';
import {
    Card,
    CardBody,
    CardImage,
  } from 'mdbreact';
import axios from 'axios';
import './photo.css';

class Photo extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        isListingLoading: false,
        photoSrc: null,
        userId: 'User',
        userName: 'UserName',
        userNic: 'UserNic',
        userLastName: '',
        userPortfolioUrl: '',
        photoCreated: '',
      }
    }

    componentDidMount = () => {
        this.handlePhotoQuery();
    };

    handlePhotoQuery = () => {
        const { match, history } = this.props;
        this.setState({ isListingLoading: true });
        const API_URL = `${process.env.REACT_APP_UNSPLASH_API_NAME}photos/${match.params.id}?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;

        axios.get(API_URL)
        .then((res) => {
            const photoSrc = res.data.urls.full;
            const userId = res.data.user.id;
            const userName = res.data.user.first_name;
            const userNic = res.data.user.username;
            const userLastName = res.data.user.last_name;
            const userPortfolioUrl = res.data.user.portfolio_url;
            const photoCreated = res.data.created_at;
  
            this.setState({
                isListingLoading: false,
                photoSrc,
                userId,
                userName,
                userLastName,
                userPortfolioUrl,
                photoCreated,
                userNic,
            });
        })
        .catch((err, error) => {
          console.log('api.unsplash not responding');
          history.push('/') 
        });
    }
    render() {
        const { 
            isListingLoading,
            photoSrc,
            userName,
            userLastName,
            userPortfolioUrl,
            userNic,
         } = this.state;

        return (
        <div className="photo-container">
            { isListingLoading && (<Spinner />)}
            <div className="photo">
                <Card className="photo-card">
                    <CardImage className="img-fluid photo-card__img" src={photoSrc} />
                    <CardBody>
                        <Link to={`/users/${userNic}`}>
                            <h2>Autor: {userName} {userLastName}</h2>
                        </Link>
                        <a className="photo-card__autor-link" href={userPortfolioUrl}>Autor's portfolio link</a>
                        <div>
                            <ButtonBack />
                        </div>
                        
                    </CardBody>
                </Card>
            </div>
        </div>
        );
    }
}

Photo.propTypes = {
    match: PropTypes.object,
};
Photo.defaultProps = {
    match: {},
};

export default Photo;