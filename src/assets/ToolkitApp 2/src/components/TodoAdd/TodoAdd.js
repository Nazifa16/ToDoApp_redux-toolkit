import { useRef } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addTodo } from "../../store/slices/todoSlice"


const TodoAdd = () => {
    let todoTitle = useRef()

    const dispatch = useDispatch()

    const add = (e) => {
        e.preventDefault()

        let { current: { value } } = todoTitle

        dispatch(addTodo(value))
        todoTitle.current.value = ''
    }

    return (
        <Form class="mb-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="display-6">Todo Title</Form.Label>
                <Form.Control ref={todoTitle} type="text" className="form-control-lg" placeholder="Enter email" />
            </Form.Group>
            <Button onClick={add} variant="primary" className="w-100 btn-lg" type="submit">
                Send
            </Button>
        </Form>
    )
}

export default TodoAdd