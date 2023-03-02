import { useState } from "react";
import { useNavigate } from "react-router";
import "./CreateItem.css";

function validate(name, value) {
  let errors = { task: "", due: "" };

  if (name === "task") {
    if (!value) {
      errors.task = "Task required";
    }
  } else if (name === "due") {
    if (!value) {
      errors.due = "Due required";
    } else if (value.length < 8) {
      errors.due = "Invalid: date should be format of YYYYMMDD";
    }
  }
  return errors;
}

export default function CreateItem() {
  const [values, setValues] = useState({
    task: "",
    due: "",
  });
  const [errors, setErrors] = useState({ task: "", due: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors(validate(name, value));
    setValues({
      ...values,
      [name]: value,
    });
  };
  const history = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    if (errors.task || errors.due) {
      alert("Invalid inputs!");
      return;
    } else if (!values.task || !values.due) {
      alert("There are missing fields!");
      return;
    }

    fetch(`/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: values.task,
        due: values.due,
        status: "todo",
      }),
    }).then((res) => {
      if (res.ok) {
        alert("Created new item!");
        history("/todo");
      }
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Task</label>
        <input
          type="text"
          name="task"
          value={values.task}
          onChange={handleChange}
        />
        {errors.task && <p>{errors.task}</p>}
      </div>
      <div className="input_area">
        <label>Due</label>
        <input
          type="text"
          name="due"
          value={values.due}
          onChange={handleChange}
        />
        {errors.due && <p>{errors.due}</p>}
      </div>
      <button>Create</button>
    </form>
  );
}
