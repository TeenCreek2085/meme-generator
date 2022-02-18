import { useState, useEffect } from 'react';

export const Main = () => {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    memeImg: 'http://i.imgflip.com/1bij.jpg',
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    const getMemes = async () => {
      const url = 'https://api.imgflip.com/get_memes';
      const response = await fetch(url);
      try {
        if (response.ok) {
          const responseJson = await response.json();
          setAllMemes(responseJson.data.memes);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getMemes();
  }, []);

  const getMemeImg = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme(prevMeme => ({
      ...prevMeme,
      memeImg: url,
    }));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
  };

  return (
    <main className="main">
      <div className="main__wrapper container">
        <form className="main__form" autoComplete="off" onSubmit={handleSubmit}>
          <input
            className="main__input"
            type="text"
            name="topText"
            value={meme.topText}
            maxLength="20"
            placeholder="Top text"
            onChange={handleChange}
          />
          <input
            className="main__input"
            type="text"
            name="bottomText"
            value={meme.bottomText}
            maxLength="20"
            placeholder="Bottom text"
            onChange={handleChange}
          />
          <button className="main__btn" type="submit" onClick={getMemeImg}>
            Get a new meme image 🖼
          </button>
        </form>

        <div className="meme">
          <img className="meme__img" src={meme.memeImg} alt="Meme" />
          <p className="meme__text meme__text--top">{meme.topText}</p>
          <p className="meme__text meme__text--bottom">{meme.bottomText}</p>
        </div>
      </div>
    </main>
  );
};
