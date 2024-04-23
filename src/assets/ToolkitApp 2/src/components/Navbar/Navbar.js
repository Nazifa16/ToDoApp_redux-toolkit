
import { Navbar, Container } from 'react-bootstrap'

const Header = () => {

    return (
        <header className="mb-5">
            <Navbar bg="primary" variant="primary">
                <Container>
                    <Navbar.Brand href="#home" className="text-white">Todo App</Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    )
}


export default Header