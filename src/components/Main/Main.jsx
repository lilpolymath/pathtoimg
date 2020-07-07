import React, { useState } from 'react';
import Image from '../second.png';
import axios from 'axios';

export const Main = () => {
  const [display, setDisplay] = useState('none');
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');

  const onChange = e => {
    setImage(e.target.files[0]);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(image, 'images');
    image && fileUpload(image);
  };

  const fileUpload = async file => {
    let form = new FormData();

    form.append('image', file);
    console.log(form);
    const endpoint = 'https://api.imgur.com/3/image';

    const config = {
      method: 'post',
      url: `${endpoint}`,
      headers: {
        'content-type': file.type,
        Authorization: 'Client-ID 11b31fa59eb3832',
      },
      data: form,
    };

    await axios(config)
      .then(res => {
        const { link } = res.data.data;
        console.log('link', link);
        navigator.clipboard.writeText(link);

        setLink(link);
      })
      .catch(err => console.log('error', err));
  };

  return (
    <main>
      <section className='hero'>
        <div className='left'>
          <h3 className='main-text'>Bit.ly but for images</h3>
          <p className='desc'>
            Upload an image and get the link to it on Imgur.
          </p>
          <button onClick={() => setDisplay('block')}>Upload Image</button>
        </div>
        <div className='right'>
          <figure>
            <img src={Image} className='image' alt='hero' />
          </figure>
        </div>
      </section>
      <section className='upload' style={{ display: display }}>
        <div className='main'>
          <div className='form'>
            <p>Select the image you want to upload.</p>
            <form
              typeof='multipart/form-data'
              onSubmit={onSubmit}
              action='post'
            >
              <input accept='image/*' type='file' onChange={onChange} />
              <button className='upload-btn' type='submit'>
                Get Link
              </button>
            </form>
          </div>

          <div className='response'>
            {link} {link && <p>Link has been copied to your clipboard</p>}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
