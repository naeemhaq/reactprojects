import { useState, useEffect } from "react";

export default function App() {
  const [amount, setAmout] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function currencyConvert() {
        try {
          const host = "api.frankfurter.app";
          const res = await fetch(
            `https://${host}/latest?amount=${amount}&from=${from}&to=${to}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching currency");

          const data = await res.json();
          setConverted(data.rates[to]);
        } catch (err) {
          console.log(err.message);
        }
      }
      if (from === to) return setConverted(amount);
      currencyConvert();
    },
    [amount, from, to]
  );
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setAmout(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="PKR">PKR</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="PKR">PKR</option>
      </select>
      <p>
        From: {from} To: {to}
      </p>
      <p>
        {converted} {to}
      </p>
    </div>
  );
}
