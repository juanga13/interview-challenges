import type {Item} from "./types";

import {useEffect, useState} from "react";

import styles from "./App.module.scss";
import api from "./api";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleToggle(id: Item["id"]) {
    setItems((items) =>
      items.map((item) => (item.id === id ? {...item, completed: !item.completed} : item)),
    );
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    event.preventDefault();
    setLoading(true);
    api.add(value).then((items) => {
      setItems(items);
      setLoading(false);
    });
    setValue("");
  }

  function handleRemove(id: Item["id"]) {
    setLoading(true);
    api.remove(id).then((items) => {
      setItems(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    setLoading(true);
    api.list().then((items) => {
      setItems(items);
      setLoading(false);
    });
  }, []);

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input name="text" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      {loading && <p>loading...</p>}
      <ul>
        {items
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <li
              key={item.id}
              className={item.completed ? styles.completed : ""}
              onClick={() => handleToggle(item.id)}
            >
              {item.text} <button onClick={() => handleRemove(item.id)}>[X]</button>
            </li>
          ))}
      </ul>
    </main>
  );
}

export default App;
