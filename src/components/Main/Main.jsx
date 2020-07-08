import React, { useState } from 'react';
import axios from 'axios';
import { Gluejar } from '@charliewilco/gluejar';

import Image from '../second.png';

export const Main = () => {
  const [display, setDisplay] = useState('inline-block');
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');
  const [Links, setLinks] = useState([]);

  const onChange = e => {
    setImage(e.target.files[0]);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(image, 'images');
    image && fileUpload(image);
  };

  const imgPaste = async imageBlob => {
    if (!imageBlob) {
      return;
    }
    setDisplay('none');

    const image = await new File([imageBlob], 'upload.png', {
      type: 'image/png',
      lastModified: new Date(),
    });

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
        setLinks(Links.concat(link));
        console.log('Links', Links);
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
          <div className='some'>
            <img
              alt='something'
              style={{ display: display }}
              src='https://img.icons8.com/ios/200/000000/pictures-folder.png'
            />
            <Gluejar
              onPaste={files => imgPaste(files)}
              onError={err => console.error(err)}
            >
              {({ images }) =>
                images.length > 0 &&
                images.map(image => (
                  <img
                    className='image preview'
                    src={image}
                    key={image}
                    alt={`Pasted: ${image}`}
                  />
                ))
              }
            </Gluejar>
          </div>

          <div className='form'>
            <p>OR</p>
            <form
              typeof='multipart/form-data'
              onSubmit={onSubmit}
              action='post'
            >
              <input accept='image/*' type='file' onChange={onChange} />

              <div>
                <button type='submit'>Get Link</button>
              </div>
            </form>
          </div>

          <div className='response'>
            {link} {link && <p>Link has been copied to your clipboard</p>}
          </div>
        </div>
        <div className='right'>
          <figure>
            <img src={Image} className='image' alt='hero' />
          </figure>
        </div>
      </section>
      <section className='path-list mr'>
        <table>
          <thead>
            <tr>
              <th>Recent Paths</th>
            </tr>
          </thead>
          <tbody>
            {link.length === 0 ? (
              <tr>
                <td className='empty'>(none)</td>
              </tr>
            ) : (
              Links.map((link, index) => {
                console.log(link);
                return (
                  <tr key={index}>
                    <td>
                      <a href={link}>{index + 1 + '. ' + link}</a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Main;
