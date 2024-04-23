import { Card, ListGroup } from "react-bootstrap"
import { useSelector } from "react-redux"



const TodoList = () => {
    let items = useSelector(state => state.todo.todo)

    return (
        <Card className="mt-5" >
            <Card.Header>Todo</Card.Header>
            <ListGroup variant="flush">
                {items?.map((item, index) => <ListGroup.Item key={`todo-${index}`}>{item}</ListGroup.Item>)}
            </ListGroup>
        </Card>
    )
}

export default TodoList