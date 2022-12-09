import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';

/*will have everythng to fetch, and search*/
const App=()=> {
  const [word, setWord]=useState('');
  
  const handleSearchSubmit = (e) =>{
    e.preventDefault() /*previene que se cargue la página*/
    /*console.log(e.target[0].value);así no podemos sincronizar el tema, debemos usar una forma que sea un conmponente controlado para poder hacer el seguimiento en react*/
    /*vamos a almacenar en el state todo lo que el usuario ingrese, haciendo el formulario un componente controlado, y tomamos del valor del state y no del formulario*/
    console.log(word); /*Va después de la función App, porque antes no teníamos la variable word*/
  }


  return (
    <div className="App">
      <Header title="Images Gallery"/>
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit}/>
    </div>
  );
}

export default App;
