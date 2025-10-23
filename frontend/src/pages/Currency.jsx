import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";

const CurrencyPage = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [converted, setConverted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const amountInputRef = useRef(null);

 

  const parseAmount = (val) => {
    if (!val) return 0;
    const n = parseFloat(String(val).replace(/,/g, "").trim());
    return Number.isFinite(n) ? n : NaN;
  };

  const convertNow = async (useAmount) => {
    const amt = parseAmount(useAmount ?? amount);
    if (Number.isNaN(amt)) {
      setError("Please enter a valid number for amount.");
      setConverted(null);
      return;
    }

    setError("");
    setLoading(true);
    setConverted(null);

    try {
      // First, try with API key
      const API_KEY = "375783b8cb8f11cdb2ed150eb5e91241"; // <-- your API key
      const urlWithKey = `https://api.exchangerate.host/convert?access_key=${API_KEY}&from=${encodeURIComponent(
        fromCurrency
      )}&to=${encodeURIComponent(toCurrency)}&amount=${encodeURIComponent(amt)}`;

      let res = await fetch(urlWithKey);
      if (!res.ok) throw new Error(`Network response was ${res.status}`);
      let data = await res.json();

      let out = typeof data?.result === "number" ? data.result : undefined;
      if (out == null && typeof data?.info?.rate === "number") {
        out = data.info.rate * amt;
      }

      if (typeof out === "number") {
        const formatted = Math.abs(out) >= 0.01 ? Number(out).toFixed(2) : Number(out).toPrecision(6);
        setConverted(formatted);
      } else {
        throw new Error("Unexpected API response format.");
      }
      } catch (err) {
			console.error("Conversion error:", err);
			setError("Conversion failed. Check console or your network.");
		} finally {
			setLoading(false);
		}
	};

	// optional: auto-convert when currencies change (but not when typing amount)
	useEffect(() => {
		// only auto-convert if user already converted once (keeps UX predictable)
		// remove this guard if you want conversion on every currency change
		// convertNow();
	}, [fromCurrency, toCurrency]);

	// handle Enter key on amount input
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			convertNow();
		}
	};

  //     let out = typeof data.result === "number" ? data.result : undefined;

  //     // Fallback to rate * amount if needed
  //     if (out == null && data?.info?.rate) {
  //       out = data.info.rate * amt;
  //     }

  //     // If still undefined, try without key
  //     if (out == null) {
  //       const urlNoKey = `https://api.exchangerate.host/convert?from=${encodeURIComponent(
  //         fromCurrency
  //       )}&to=${encodeURIComponent(toCurrency)}&amount=${encodeURIComponent(amt)}`;
  //       res = await fetch(urlNoKey);
  //       if (!res.ok) throw new Error(`Network response was ${res.status}`);
  //       data = await res.json();
  //       //out = typeof data.result === "number" ? data.result : undefined;
  //     }






  //     if (typeof out === "number") {
  //       const formatted =
  //         Math.abs(out) >= 0.01
  //           ? Number(out).toLocaleString(undefined, {
  //               minimumFractionDigits: 2,
  //               maximumFractionDigits: 2,
  //             })
  //           : Number(out).toPrecision(6);
  //       setConverted(formatted);
  //     } else {
  //       throw new Error("Unexpected API response format.");
  //     }
  //   } catch (err) {
  //     console.error("Conversion error:", err);
  //     setError("Conversion failed. Check console or your network.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   amountInputRef.current?.focus();
  // }, []);

  // useEffect(() => {
  //   if (amount) convertNow();
  // }, [fromCurrency, toCurrency, amount]);

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") convertNow();
  // };

  // const swapCurrencies = () => {
  //   setFromCurrency(toCurrency);
  //   setToCurrency(fromCurrency);
  // };

  // const currencyOptions = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-indigo-200 to-purple-300 p-6">
    <div className="backdrop-blur-xl bg-white/30 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
      <h1 className="text-3xl font-extrabold text-center text-indigo-800 mb-6 tracking-wide">
        💱 Currency Converter
      </h1>

      <div className="space-y-5">
        {/* Amount input */}
        <input
          ref={amountInputRef}
          inputMode="decimal"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-3 border border-indigo-200 rounded-xl text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 placeholder-gray-400 shadow-sm transition duration-300"
          placeholder="Enter amount (e.g. 1000 or 12.50)"
        />

        {/* Currency selectors */}
        <div className="flex gap-3">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="flex-1 p-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 text-gray-700 shadow-sm transition duration-300"
          >
            <option>USD</option>
            <option>INR</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>JPY</option>
            <option>AUD</option>
            <option>CAD</option>
          </select>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="flex-1 p-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 text-gray-700 shadow-sm transition duration-300"
          >
            <option>INR</option>
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>JPY</option>
            <option>AUD</option>
            <option>CAD</option>
          </select>
        </div>

        {/* Convert button */}
        <button
          onClick={() => convertNow()}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition duration-300 transform hover:scale-105 disabled:opacity-60"
          aria-disabled={loading}
        >
          {loading ? "Converting..." : "Convert"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-4 text-center text-sm text-red-700 bg-red-100 px-3 py-2 rounded-lg shadow-inner animate-pulse">
            {error}
          </div>
        )}

        {/* Result */}
        {converted !== null && !error && (
          <div className="mt-6 text-center animate-fadeIn">
            <p className="text-lg text-gray-700 mb-1">
              {parseAmount(amount)} {fromCurrency} =
            </p>
            <p className="text-3xl font-bold text-indigo-800 drop-shadow-md animate-pulse">
              {converted} {toCurrency}
            </p>
          </div>
        )}

        {/* <p className="mt-4 text-xs text-gray-600 text-center">
          Powered by exchangerate.host — free public API.
        </p> */}
      </div>
    </div>
  </div>
);
}

export default CurrencyPage;
