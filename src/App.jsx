import { useState } from "react";
import "./App.css";

const App = () => {
  const style = {
    display: "flex",
    gap: "12px",
    padding: "50px",
  };

  const [todos, setTodos] = useState([
    {
      id: new Date().getTime(),
      title: "일어나기",
      content: "6시 기상",
      done: false,
    },
    {
      id: new Date().getTime() + 1,
      title: "아침 러닝",
      content: "30분",
      done: false,
    },
    {
      id: new Date().getTime() + 2,
      title: "스트레칭",
      content: "30분",
      done: false,
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addTodoHandler = () => {
    const newTodo = {
      id: new Date().getTime(),
      title: title,
      content: content,
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deletedTodoHandler = id => {
    const deletedTodos = todos.filter(function (todo) {
      return todo.id != id;
    });
    setTodos(deletedTodos);
  };

  const toggleTodoDone = id => {
    setTodos(doneTodos =>
      doneTodos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <>
      <h1>My Todo List</h1>
      <div className="todoInputBox">
        <div className="inputWrap">
          <p>제목</p>
          <input
            type="text"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="inputWrap">
          <p>내용</p>
          <input
            type="text"
            value={content}
            onChange={e => {
              setContent(e.target.value);
            }}
          />
        </div>
        <button className="addBtn" onClick={addTodoHandler}>
          추가
        </button>
      </div>
      <div>
        <h2>Working...</h2>
        <div style={style}>
          {todos
            .filter(function (todo) {
              return todo.done === false;
            })
            .map(function (todo) {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  deletedTodoHandler={deletedTodoHandler}
                  toggleTodoDone={toggleTodoDone}
                />
              );
            })}
        </div>
      </div>
      <div>
        <h2>Is done!!!</h2>
        <div style={style}>
          {todos
            .filter(function (todo) {
              return todo.done === true;
            })
            .map(function (todo) {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  deletedTodoHandler={deletedTodoHandler}
                  toggleTodoDone={toggleTodoDone}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default App;

const Todo = ({ todo, deletedTodoHandler, toggleTodoDone }) => {
  const todoBoxStyle = {
    width: "200px",
    height: "200px",
    border: `3px solid ${todo.done ? "#FF5F00" : "#002379"}`,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };
  const { title, content, id } = todo;
  return (
    <div style={todoBoxStyle}>
      <h2>{title}</h2>
      <h3>{content}</h3>
      <div className="btnSet">
        <button className="doneBtn" onClick={() => toggleTodoDone(id)}>
          {todo.done ? "취소" : "완료"}
        </button>
        <button className="delBtn" onClick={() => deletedTodoHandler(id)}>
          삭제
        </button>
      </div>
    </div>
  );
};
