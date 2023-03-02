import { useState, useEffect } from "react";
import Item from "./Item.js";

export default function Items({ status }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/items?status=${status}`)
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => {
        setData(jsonResponse);
      });
  }, [status]);

  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td>Task</td>
          <td>Due</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return <Item key={item.id} todo={item} />;
        })}
      </tbody>
    </table>
  );
}
