import React from 'react'
import { Button } from 'react-bootstrap';
import { Navbar} from 'react-bootstrap';


const Header = ({title}) => {
  return (
    <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">{title}</Navbar.Brand>
</Navbar>
  )
};

export default Header;


