import Header from "./components/Header";
import ToDoList from "./components/ToDoList";


function App() {
  return (
    <div className="container py-16 px-6 min-h-screen  mx-auto ">
      <Header />
      <ToDoList />
    </div>
  );
}

export default App;
