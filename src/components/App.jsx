import React, { Component } from 'react';
import { fetchPictures } from 'services/api';

//PROPTYPES

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { ButtonLoadMore } from './Button/Button';

export class App extends Component {
  state = {
    picturesArray: [],
    isLoading: false,
    error: null,
    page: 1,
    modal: {
      isOpen: false,
      fullSizeuUrl: '',
    },
    showButton: false,
  };

  onModalOpen = data => {
    this.setState({
      modal: {
        isOpen: true,
        fullSizeuUrl: data,
      },
    });
  };

  onModalClose = () => { 
          this.setState({
            modal: {
              isOpen: false,
              fullSizeuUrl: '',
            },
          });
  }
  
  onSearchClick = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.searchQueryInput.value;
    const page = this.state.page;

    if (searchQuery.trim() === '') {
      return alert('Type something');
    }

    fetchPictures(searchQuery, page).then(responce => {
      const newPicturesArray = responce.data.hits;
      this.setState({
        picturesArray: newPicturesArray,
      });
    });

    form.reset();
  };

  render() {

    return (
      <div
        style={
          {
            // height: '100vh',
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            // fontSize: 40,
            // color: '#010101'
          }
        }
      >
        <Searchbar onSubmit={this.onSearchClick} />

        {this.state.picturesArray.length > 0 && (
          <ImageGallery
            data={this.state.picturesArray}
            openModal={this.onModalOpen}
          />
        )}

        {this.state.modal.isOpen && (
          <Modal fullSizeuUrl={this.state.modal.fullSizeuUrl} closeModal={this.onModalClose} />
        )}

        {this.state.showButton && (<ButtonLoadMore />)}
      </div>
    );
  }
}
