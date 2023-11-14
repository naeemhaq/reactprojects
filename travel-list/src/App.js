import { useState } from "react";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import Logo from "./components/Logo";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  //const [items, setItems] = useState([]);
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    /*
      spread operator to add all items one by one into ...items. It will also add item at the end of ...items array. 
      check chapter 19 video min location (4:00) of this course.
    */
    setItems((items) => [...items, item]);
  }
  /*
    In order to delete an item, we need to know which item it actually is that should be deleted. So to tell the function which item it is, handleDelete(id).
    Each of the items has an ID, so we use that ID to remove the corresponding object from the items array. Now about the delete operation itself, we will of 
    course delete the item from the user interface by updating state. So we call setItems(). And now here in setItems(), we need the new array after the item 
    has been deleted. The new Array will be based on the current/existing one therefore we pass current items to a callback function with current item as its 
    input. We want to filter out the item that has the parameter ID items.filter(item=>item.id !==id) i.e. in each iteration we look for item.id which is 
    different from ID. So whenever this condition here is true, the item will end up in the new array i.e. items not deleted. And if false item will no longer 
    be part of final array.
  */
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  /*
    To update one of the objects in the array, we will simply loop over the entire items array using the map property which will then in the end return a 
    brand new array with the same length of the initial items array. But one of the objects will then, of course, have been updated. So in the iteration, 
    each of the elements is called an item. And then here is what we're gonna do. So whenever the item has the ID that is equal to the ID that we passed in, 
    so which means that this is the object that we want to actually update, then we create a brand new object based on the current item, and then we set 
    packed to the opposite of packed, so of item.packed. And that's it. And if else, so for all the other objects, we will simply return the current item.
  */
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
