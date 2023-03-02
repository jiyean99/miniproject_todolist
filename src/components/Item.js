import { useState } from "react";

export default function Item({ todo: t }) {
  const [todo, setTodo] = useState(t);

  function toggleDone() {
    fetch(`/api/items/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        status: todo.status === "done" ? "todo" : "done",
      }),
    }).then((res) => {
      if (res.ok) {
        setTodo({
          ...todo,
          status: todo.status === "done" ? "todo" : "done",
        });
      }
    });
  }

  function deleteItem() {
    if (window.confirm("삭제 하시겠습니까?")) {
      fetch(`/api/items/${todo.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          setTodo({ id: 0 });
        }
      });
    }
  }

  if (todo.id === 0) {
    return null;
  }

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={todo.status === "done" ? true : false}
          onClick={toggleDone}
        ></input>
      </td>
      <td>{todo.task}</td>
      <td>{todo.due}</td>
      <td>
        <button onClick={deleteItem}>Delete</button>
      </td>
    </tr>
  );
}
