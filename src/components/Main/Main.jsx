import React, { useState, useCallback } from 'react';
import axios from 'axios';

import useEventListener from '../../hooks/use-event-listener';

export const Main = () => {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const [Links, setLinks] = useState([]);

  const acceptedFiles = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp'];

  const fileUpload = useCallback(
    async file => {
      let form = new FormData();

      console.log('file', file);

      form.append('image', file, 'default.png');

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

      setLoading(false);
    },
    [Links]
  );

  const imgPaste = useCallback(
    file => {
      setLoading(true);
      console.log('imageBlob', file);

      fetch(file)
        .then(r => r.blob())
        .then(r => fileUpload(r));
    },
    [fileUpload]
  );

  const handle = useCallback(
    ({ clipboardData }) => {
      let URL = window.URL;

      for (let index = 1; index < clipboardData.items.length; index++) {
        let type = clipboardData.items[index].type;
        if (acceptedFiles.includes(type)) {
          let blob = clipboardData.items[index].getAsFile();
          let src = URL.createObjectURL(blob);

          imgPaste(src);
        }
      }
    },
    [acceptedFiles, imgPaste]
  );

  useEventListener('paste', handle);

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
          </div>

          <div className='response'>
            {<a href={link}>{link}</a>}
            {link && <p>Link has been copied to your clipboard</p>}
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
