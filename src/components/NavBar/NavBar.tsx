import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavElement } from './NavElement'

export const NavBar: React.FC = () => {

    const NavbarElements = [{
        name: 'Index',
        path: '/',
        id: 1,
    },
    {
        name: 'Test',
        path: '/',
        id: 2,
    }]

    return (
        <Navbar bg='dark'>
            <Container>
                <Navbar.Brand href="/" className="text-white">Example</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            NavbarElements.map((e) => {
                                return (
                                    < NavElement name={e.name} path={e.path} id={e.id} />
                                )
                            })
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
