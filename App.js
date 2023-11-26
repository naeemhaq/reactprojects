import { useState } from "react";
const pizzaData = [
  {
    id: 1,
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    id: 2,
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    id: 3,
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    id: 4,
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    id: 5,
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    id: 6,
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];
export default function App() {
  const [items, setItems] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  function handleSelection(pizza) {
    setSelectedPizza(pizza);
    setItems((items) => [...items, pizza]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    console.log(items);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <ItemList selectedPizza={selectedPizza} onSelection={handleSelection} />
      </div>
      <Cart items={items} handleDeleteItem={handleDeleteItem} />
    </div>
  );
}

function ItemList({ selectedPizza, onSelection }) {
  const items = pizzaData;
  return (
    <ul>
      {items?.map((pizza) => (
        <Item
          pizza={pizza}
          key={pizza.name}
          onSelection={onSelection}
          selectedPizza={selectedPizza}
        />
      ))}
    </ul>
  );
}
function Item({ pizza, onSelection, selectedPizza }) {
  const isSelected = selectedPizza?.name === pizza.name;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={pizza.photoName} alt={pizza.name}></img>
      <h3>{pizza.name}</h3>
      <p>{pizza.ingredients}</p>
      <span>{pizza.price}$</span>

      <Button onClick={() => onSelection(pizza)}>
        {isSelected ? "Add AGAIN?" : "Add to cart"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function Cart({ items, handleDeleteItem }) {
  const [count, setCount] = useState(1);
  return (
    <form className="form-split-bill">
      <label> 🛒 Shopping cart</label>
      <ul>
        {items.map((element) => (
          <li key={element.id}>
            <label>🍕 {element.name} </label>
            <label>$ {element.price}</label>
            <Button onClick={() => handleDeleteItem(element.id)}> ❌ </Button>
            <Button onClick={() => setCount((c) => c - 1)}>−</Button>
            <label>🔄 {count}</label>
            <Button onClick={() => setCount((c) => c + 1)}>✚</Button>
          </li>
        ))}
      </ul>
    </form>
  );
}
