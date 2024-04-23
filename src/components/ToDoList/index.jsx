import React, { useEffect, useState } from "react";
import { TiPencil } from "react-icons/ti";
import { BsTrash3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import picture from "../../assets/cv-writing-service-abstract-concept-vector-illustration_107173-38290.avif";
import {
  setTodoList,
  addTodo,
  sortTodo,
  updateTodo,
  toggleCompleted,
} from "../../store/TodoSlice";

function ToDoList() {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTask, setNewTask] = useState("");

  const toast = useToast();

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, []);

  const handleAddToDo = (task) => {
    if (task.trim().length === 0) {
      displayToast("Task cannot be empty.");
    } else {
      dispatch(
        addTodo({
          task: task,
          id: Date.now(),
        })
      );

      setNewTask("");
      setShowModal(true);
      displayToast("Task added successfully.", "success");
    }
  };

  // Function to display Chakra UI toast
  const displayToast = (message, status = "error") => {
    toast({
      title: status === "error" ? "Error" : "Success",
      description: message,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };

  // delete
  const handleDeleteTodo = (id) => {
    const updatedToDoList = todoList.filter((todo) => todo.id !== id);
    dispatch(setTodoList(updatedToDoList));
    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
    setCurrentTodo(null);
    setNewTask("");
  };

  // edit
  const handleUpdateToDoList = (id, task) => {
    if (task.trim().length === 0) {
      displayToast("Task cannot be empty.");
    } else {
      dispatch(updateTodo({ task: task, id: id }));
      setShowModal(false);

      displayToast("Task updated successfully.", "success");
    }
  };

  // sort
  const sortToDoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;
    return false;
  });
  const handleSort = (sortCriteria) => {
    dispatch(sortTodo(sortCriteria));
  };

  // toggle complete
  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };

  return (
    <div>
      {showModal && (
        <div className="bg-transparentBlack w-full left-0 top-0 h-full flex items-center justify-center fixed">
          <div className="bg-white p-5 rounded-md md:w-3/6 sm:w-5/6">
            <input
              className="outline-none border p-2 rounded-md mb-8 container"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={
                currentTodo ? "Update your list here" : "Enter your list here"
              }
            ></input>

            <div className="flex gap-2">
              {currentTodo ? (
                <>
                  <button
                    onClick={() => {
                      handleUpdateToDoList(currentTodo.id, newTask);
                      setShowModal(false);
                    }}
                    className="bg-green-500 rounded-md py-2 px-5 text-white md:w-1/5 sm:w-5/6"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                    }}
                    className="bg-red-400 rounded-md py-2 px-5 text-white md:w-1/5 sm:w-5/6"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-fuchsia-700 rounded-md  py-2 px-5 text-white font-Poppins"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500  rounded-md py-2 px-5 text-white font-Poppins "
                    onClick={() => {
                      handleAddToDo(newTask);
                      setShowModal(false);
                    }}
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center flex-col ">
        {todoList.length === 0 ? (
          <>
            <div>
              <div className="sm:w-0.5 ">
                <img src={picture} alt="picture"></img>
              </div>
              <p className=" text-center text-gray-800 ">
                You haven't added any tasks yet. Please add one.
              </p>
            </div>
          </>
        ) : (
          <div className=" container mx-auto mt-6 ">
            <div className=" flex justify-center text-sm">
              <select
                onChange={(e) => handleSort(e.target.value)}
                className=" outline-none p-3 "
              >
                <option value="All" className="text-sm">
                  All
                </option>
                <option value="Completed" className="text-sm">
                  Completed
                </option>
                <option value="Not Completed" className="text-sm">
                  Not Completed
                </option>
              </select>
            </div>
            <div className=" overflow-y-auto max-h-[50vh] scroll-my-6 ">
              {sortToDoList.map((todo) => (
                <div
                  key={todo.id}
                  className=" flex items-center justify-between mb-6  mx-auto w-full rounded-md p-4  bg-plumb"
                >
                  <div className="flex ">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleCompleted(todo.id)}
                      className="mr-4 border-magenta-60"
                    />
                    <div
                      className={`${
                        todo.completed
                          ? "line-through text-green-700"
                          : "text-indigo-800"
                      }`}
                      onClick={() => {
                        handleToggleCompleted(todo.id);
                      }}
                    >
                      {todo.task}
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-green-500 text-white p-2 rounded-md ml-2"
                      onClick={() => {
                        setShowModal(true);
                        setCurrentTodo(todo);
                        setNewTask(todo.task);
                      }}
                    >
                      <TiPencil />
                    </button>
                    <button
                      className="text-white p-2 rounded-md ml-2 bg-fuchsia-700"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <BsTrash3 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          className="bg-indigo-700 text-center text-white py-3 px-10 rounded-md mt-3 font-Poppins"
          onClick={() => {
            setShowModal(true);
            setCurrentTodo(null);
            setNewTask("");
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default ToDoList;
