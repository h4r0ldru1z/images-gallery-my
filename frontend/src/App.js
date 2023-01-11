import {useState, useEffect} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

/* will have everythng to fetch, and search*/
const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const resp = await axios.get(`${API_URL}/images`);
      setImages(resp.data || []);
      setLoading(false);
      toast.success('Saved images downloaded!', {
        position: 'bottom-right',
        autoClose: 100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: 'bottom-right',
        autoClose: 100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
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
      toast.info(`New image ${word} was found`, {
        position: 'bottom-right',
        autoClose: 100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setImages([{...res.data, title: word}, ...images]);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: 'bottom-right',
        autoClose: 100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    console.log('clearing search form');
    setWord('');
  };

  /* if image.id = id, the image is filtered out of new array*/
  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        toast.warn(
          `Image ${images
            .find((i) => i.id === id)
            .title.toUpperCase()} was deleted!`,
          {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        );
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: 'bottom-right',
        autoClose: 100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
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
        toast.info(`Image ${imageToBeSaved.title.toUpperCase()} was saved`, {
          position: 'bottom-right',
          autoClose: 100,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: 'bottom-right',
        autoClose: 100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <div className='App'>
      <Header title='Images Gallery' />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
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
        </>
      )}
      <ToastContainer
        position='bottom-right'
        autoClose={100}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
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
