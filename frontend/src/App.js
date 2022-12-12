import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const UNSPLASH_KEY = process.env.REACT_APP_UNSLPASH_KEY;

/* will have everythng to fetch, and search*/
const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    /* previene que se cargue la página*/
    /* vamos a almacenar en el state todo lo que el usuario ingrese, nnpmhaciendo el formulario un componente controlado,
    y tomamos del valor del state y no del formulario*/
    /* Va después de la función App, porque antes no teníamos la variable word*/
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages([{...data, title: word}, ...images]);
      })
      .catch((err) => {
        console.log(err);
      });
    setWord('');
  };

  /* if image.id = id, the image is filtered out of new array*/
  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
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
                <ImageCard image={image} deleteImage={handleDeleteImage} />
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
