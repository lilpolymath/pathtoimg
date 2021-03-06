import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pasteImage from 'paste-image';

export const Main = () => {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const [Links, setLinks] = useState([]);

  const fileUpload = async file => {
    let form = new FormData();

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

    await axios(config)
      .then(res => {
        const { link } = res.data.data;
        navigator.clipboard.writeText(link);

        setLink(link);

        setLinks(prevState => [...prevState, link]);
      })
      .catch(err => console.log('error', err));

    setLoading(false);
  };

  const mdFormat = () => {
    let mdLink = `![image](${link})`;
    navigator.clipboard.writeText(mdLink);
  };

  const imgPaste = file => {
    setLoading(true);

    fetch(file)
      .then(r => r.blob())
      .then(r => fileUpload(r));
  };

  useEffect(() => {
    pasteImage.on('paste-image', function(image) {
      imgPaste(image.src);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <section className='hero'>
        <div className='path-list'>
          <h3 className='main-text'>Paste an image anywhere on this page.</h3>
          <p className='desc'>Get an Imgur Link.</p>

          <div className='some empty'>
            {loading ? (
              <i className='fa fa-spinner fa-pulse' />
            ) : (
              <img
                alt='something'
                src='https://img.icons8.com/ios/200/000000/pictures-folder.png'
              />
            )}
          </div>

          <div className='response'>
            {<a href={link}>{link}</a>}
            {link && (
              <div>
                <p>Link has been copied to your clipboard</p>
                <button onClick={mdFormat}>or Copy Markdown</button>
              </div>
            )}
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
