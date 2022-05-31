import {Item} from "./types";

export default {
  list: (): Promise<Item[]> =>
    new Promise((resolve) =>
      setTimeout(() => {
        const storedList = localStorage.getItem("items");
        let list = null;

        if (storedList) {
          list = JSON.parse(storedList);
        } else {
          list = [
            {
              id: 1,
              text: "Some thing to buy",
              completed: false,
            },
            {
              id: 2,
              text: "Some other thing to buy",
              completed: true,
            },
            {
              id: 3,
              text: "Some last to buy",
              completed: false,
            },
          ];
          localStorage.setItem("lastIndex", "3");
        }

        localStorage.setItem("items", JSON.stringify(list));

        resolve(list);
      }, 1000),
    ),
  remove: (itemId: number): Promise<Item[]> =>
    new Promise((resolve) =>
      setTimeout(() => {
        const storedList = localStorage.getItem("items");

        const list: Item[] = storedList ? JSON.parse(storedList) : [];

        const newList = list.filter((item) => item.id !== itemId);

        localStorage.setItem("items", JSON.stringify(newList));
        resolve(newList);
      }, 1000),
    ),
  add: (itemText: string): Promise<Item[]> =>
    new Promise((resolve) =>
      setTimeout(() => {
        const storedList = localStorage.getItem("items");
        const storedLastIndex = localStorage.getItem("lastIndex");

        const list = storedList ? JSON.parse(storedList) : [];
        const lastIndex = storedLastIndex ? parseInt(storedLastIndex) : 1;

        const item: Item = {
          id: lastIndex + 1,
          completed: false,
          text: itemText,
        };

        localStorage.setItem("lastIndex", (lastIndex + 1).toString());

        const newList = [...list, item];

        localStorage.setItem("items", JSON.stringify(newList));

        resolve(newList);
      }, 1000),
    ),
};
