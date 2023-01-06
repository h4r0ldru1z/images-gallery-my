import {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

/* will have everythng to fetch, and search*/
const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const getSavedImages = async () => {
    try {
      const resp = await axios.get(`${API_URL}/images`);
      setImages(resp.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    /* previene que se cargue la página*/

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{...res.data, title: word}, ...images]);
    } catch (error) {
      console.log(error);
    }

    console.log('clearing search form');
    setWord('');
  };

  /* if image.id = id, the image is filtered out of new array*/
  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const resp = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (resp.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? {...image, saved: true} : image
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='App'>
      <Header title='Images Gallery' />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className='mt-4'>
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className='pb-3'>
                <ImageCard
                  image={image}
                  deleteImage={handleDeleteImage}
                  saveImage={handleSaveImage}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
};
/* voy a usar las propiedades de la card y del array
imágenes, pero cuando está sin llenar,
      va a dar error, por eso se llama el condicional && que solo lo hace si es
      true, mientras que si está sin valores es false y el !! lo convierte en
      booleano para que no salga 0 en la página */
/* map es un método de ayuda para el array, y va por todos los elementos, y
genera uno nuevo, para el ejemplo, es un array nuevo del
componente ImageCard. La imagen del componente,
es la imagen del array, y el uso del índice es para el key único. */
export default App;
