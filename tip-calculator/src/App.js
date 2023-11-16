import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}
function TipCalculator() {
  // Lift state to parent to pass to sibling components
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  /* Derived State
     each time that the component rerenders as the state is updated, 
     this value will be calculated again and can then also be rendered 
     here onto the UI
  */
  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the service?
      </SelectPercentage>
      <p></p>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did you'er friend like the service?
      </SelectPercentage>
      <p></p>
      {bill > 0 && (
        // use Fragment: as we have one JSX and two top level elements
        <>
          {" "}
          <Output bill={bill} tip={tip} /> <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}
function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <p>
        How much was the bill?
        <input
          type="text"
          value={bill}
          onChange={(e) => onSetBill(Number(e.target.value))}
        ></input>
      </p>
    </div>
  );
}
function SelectPercentage({ percentage, onSelect, children }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value={"0"}>it was not good 0%</option>
        <option value={"5"}>it was not good 5%</option>
        <option value={"10"}>it was good 10%</option>
        <option value={"20"}>it was amazing 20%</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <div>
      <h3>
        You pay ${bill + tip} (${bill} + ${tip} tip)
      </h3>
    </div>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
