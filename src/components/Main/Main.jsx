import React, { Component } from 'react';
import Image from '../second.png';

export class Main extends Component {
  render() {
    return (
      <section className='hero'>
        <div className='left'>
          <h3 className='main-text'>Bit.ly but for images</h3>
          <p className='desc'>
            Upload an image and get the link to it on Imgur.
          </p>
          <button>Upload</button>
        </div>
        <div className='right'>
          <figure>
            <img src={Image} className='image' alt='hero' />
          </figure>
        </div>
      </section>
    );
  }
}

export default Main;
