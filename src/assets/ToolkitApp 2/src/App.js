import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Navbar/Navbar';
import TodoAdd from './components/TodoAdd/TodoAdd';
import TodoList from './components/TodoList/TodoList';

function App() {

  return (
      <Fragment>
        <Container>
          <Header/>
          <TodoAdd/>
          <TodoList/>
        </Container>
      </Fragment>

  );
}

export default App;
