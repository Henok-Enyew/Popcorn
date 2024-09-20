import { useEffect, useState } from "react";
// 'https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD'
export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [output, setOutput] = useState("");
  console.log(amount, fromCur, toCur);
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchCur() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        console.log(toCur);
        const val = data.rates[toCur];
        console.log(val);
        setOutput(val);
      }
      // console.log(amount);
      if (fromCur == toCur) setOutput(1);
      if (amount > 0 && fromCur && toCur) fetchCur();
      return function () {
        controller.abort();
      };
    },
    [amount, fromCur, toCur]
  );
  return (
    <div className="text-xl p-4">
      <input
        className="border-2 border-gray-500 rounded-md px-3 py-1"
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={fromCur}
        defaultValue={"USD"}
        onChange={(e) => setFromCur(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        defaultValue={"USD"}
        onChange={(e) => setToCur(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
