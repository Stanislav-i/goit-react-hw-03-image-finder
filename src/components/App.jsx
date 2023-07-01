import React, { Component } from 'react';
import { fetchPictures } from 'services/api';
import { Vortex } from 'react-loader-spinner';
//PROPTYPES

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { ButtonLoadMore } from './Button/Button';

export class App extends Component {
  state = {
    userRequest: '',
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
  };

  onSearchClick = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.searchQueryInput.value;

    this.addUserRequest(searchQuery);

    if (searchQuery.trim() === '') {
      return alert('Type something');
    }
    form.reset();
  };

  onLoadButtonClick() { 
    this.setState(prevState => {
      return { page: prevState.page + 1}
    })
  }

  

  addUserRequest(string) {
    this.setState({ userRequest: string });
  }

  async componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.state.userRequest;
    const page = this.state.page

    if (prevState.userRequest !== this.state.userRequest || prevState.page !== this.state.page)
      try {
        this.setState({isLoading: true})
        await fetchPictures(searchQuery, page).then(responce => {
          const newPicturesArray = responce.data.hits;
          // console.log(newPicturesArray.length, this.state.picturesArray);
          // console.log(this.onLoadButtonClick);
          if (
            newPicturesArray.length === 12 &&
            this.state.picturesArray.length === 0
          ) {
            this.setState(prevState => {
              return {
                picturesArray: newPicturesArray,
                showButton: true,
                // page: prevState.page + 1,
              };
            });
          } else if (
            newPicturesArray.length < 12 &&
            this.state.picturesArray.length === 0
          ) {
            this.setState({ picturesArray: newPicturesArray });
          }
        });
      } catch (error) {
        this.setState({ error: error.message })
      } finally { 
        this.setState({isLoading: false})
      }
  
  }

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

        {this.state.isLoading && (
          <Vortex
            visible={true}
            height="300"
            width="300"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
          />
        )}

        {this.state.picturesArray.length > 0 && (
          <ImageGallery
            data={this.state.picturesArray}
            openModal={this.onModalOpen}
          />
        )}

        {this.state.modal.isOpen && (
          <Modal
            fullSizeuUrl={this.state.modal.fullSizeuUrl}
            closeModal={this.onModalClose}
          />
        )}

        {this.state.showButton && <ButtonLoadMore />}
      </div>
    );
  }
}
