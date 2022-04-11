import React from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { NavElement } from "./NavElement";

export const NavBar: React.FC = () => {
  const NavbarElements = [
    {
      name: "Index",
      path: "/",
      id: 1,
    },
    {
      name: "About Us",
      path: "/",
      id: 2,
    },
    {
      name: "Contact",
      path: "/",
      id: 3,
    },
  ];

  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand href="/" className="text-white">
          Example
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {NavbarElements.map((e) => {
              return (
                <NavElement key={e.id} name={e.name} path={e.path} id={e.id} />
              );
            })}
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
