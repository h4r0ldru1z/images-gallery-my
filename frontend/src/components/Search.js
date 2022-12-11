import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

/*xs 9 toma 9 divido 12 del ancho de la columna padre, 
línea 10. así que el formulario toma 9/12 de ese ancho, que sería 2/3*/
const Search = ({ word, setWord, handleSubmit }) => {
    return (
        <Container className="mt-4">
            <Row className='justify-content-center'>
                <Col xs={12} md={8} lg={6}>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col xs={9}>
                            <Form.Control
                                type="text"
                                value={word} /*connect value del input con el state de la aplicación*/
                                onChange={(e) =>setWord(e.target.value)} /*cada vez que cambie, se llamará el evento setWord*, con el valor del evento, es decir las letras o cambios, del input form*/
                                placeholder="Search for new image... "/>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">Search</Button>
                        </Col>
                    </Form.Row>
                </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default Search;

/*creo la función en APP, que es el principal, y la llamo como propiedad, que será handle Submit. Entonces cuando haga click en submit, llamará la propiedad creada, que está ligada a la función en APP*/ 
