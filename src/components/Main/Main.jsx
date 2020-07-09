import React, { useState } from 'react';
import axios from 'axios';
import { Gluejar } from '@charliewilco/gluejar';

export const Main = () => {
  const [display, setDisplay] = useState('inline-block');

  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const [Links, setLinks] = useState([]);

  const imgPaste = async imageBlob => {
    setLoading(true);
    console.log('imageBlob', imageBlob);

    if (imageBlob.images.length !== 0) {
      console.log(imageBlob);
      setDisplay('none');
      const lastImage = imageBlob.images.slice(-1);

      fetch(lastImage)
        .then(r => r.blob())
        .then(r => fileUpload(r));
    }
    return;
  };

  const fileUpload = async (file, name = 'default.png') => {
    let form = new FormData();

    console.log('file', file);

    form.append('image', file, name);

    const endpoint = 'https://api.imgur.com/3/image';

    const config = {
      method: 'post',
      url: `${endpoint}`,
      headers: {
        Authorization: 'Client-ID 11b31fa59eb3832',
        'content-type': 'multipart/form-data',
      },
      data: form,
    };

    console.log(config);

    // await axios(config)
    //   .then(res => {
    //     const { link } = res.data.data;
    //     console.log('link', link);
    //     navigator.clipboard.writeText(link);

    //     setLink(link);
    //     setLinks(Links.concat(link));

    //     console.log('Links', Links);
    //   })
    //   .catch(err => console.log('error', err));

    setLoading(false);
  };

  return (
    <main>
      <section className='hero'>
        <div className='path-list'>
          <h3 className='main-text'>Bit.ly but for images</h3>
          <p className='desc'>
            Paste or Upload an image and get the link to it on Imgur.
          </p>
          <div className='some empty'>
            <img
              alt='something'
              src='https://img.icons8.com/ios/200/000000/pictures-folder.png'
            />
            {loading ? (
              <i className='fa fa-spinner fa-pulse' />
            ) : (
              <p>Paste Here</p>
            )}
            <Gluejar
              onPaste={files => console.log(files)}
              onError={err => console.error(err)}
            ></Gluejar>
          </div>

          <div className='response'>
            {<a href={link}>{link}</a>}{' '}
            {!link && <p>Link has been copied to your clipboard</p>}
          </div>
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
