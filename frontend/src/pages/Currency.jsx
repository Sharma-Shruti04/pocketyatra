// import React, { useState, useEffect, useRef } from "react";
// import Layout from "../components/Layout";

// const CurrencyPage = () => {
//   const [amount, setAmount] = useState("1");
//   const [fromCurrency, setFromCurrency] = useState("USD");
//   const [toCurrency, setToCurrency] = useState("INR");
//   const [converted, setConverted] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const amountInputRef = useRef(null);

 

//   const parseAmount = (val) => {
//     if (!val) return 0;
//     const n = parseFloat(String(val).replace(/,/g, "").trim());
//     return Number.isFinite(n) ? n : NaN;
//   };

//   const convertNow = async (useAmount) => {
//     const amt = parseAmount(useAmount ?? amount);
//     if (Number.isNaN(amt)) {
//       setError("Please enter a valid number for amount.");
//       setConverted(null);
//       return;
//     }

//     setError("");
//     setLoading(true);
//     setConverted(null);

//     try {
//       // First, try with API key
//       const API_KEY = "375783b8cb8f11cdb2ed150eb5e91241"; // <-- your API key
//       const urlWithKey = `https://api.exchangerate.host/convert?access_key=${API_KEY}&from=${encodeURIComponent(
//         fromCurrency
//       )}&to=${encodeURIComponent(toCurrency)}&amount=${encodeURIComponent(amt)}`;

//       let res = await fetch(urlWithKey);
//       if (!res.ok) throw new Error(`Network response was ${res.status}`);
//       let data = await res.json();

//       let out = typeof data?.result === "number" ? data.result : undefined;
//       if (out == null && typeof data?.info?.rate === "number") {
//         out = data.info.rate * amt;
//       }

//       if (typeof out === "number") {
//         const formatted = Math.abs(out) >= 0.01 ? Number(out).toFixed(2) : Number(out).toPrecision(6);
//         setConverted(formatted);
//       } else {
//         throw new Error("Unexpected API response format.");
//       }
//       } catch (err) {
// 			console.error("Conversion error:", err);
// 			setError("Conversion failed. Check console or your network.");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	// optional: auto-convert when currencies change (but not when typing amount)
// 	useEffect(() => {
// 		// only auto-convert if user already converted once (keeps UX predictable)
// 		// remove this guard if you want conversion on every currency change
// 		// convertNow();
// 	}, [fromCurrency, toCurrency]);

// 	// handle Enter key on amount input
// 	const handleKeyDown = (e) => {
// 		if (e.key === "Enter") {
// 			convertNow();
// 		}
// 	};

//   //     let out = typeof data.result === "number" ? data.result : undefined;

//   //     // Fallback to rate * amount if needed
//   //     if (out == null && data?.info?.rate) {
//   //       out = data.info.rate * amt;
//   //     }

//   //     // If still undefined, try without key
//   //     if (out == null) {
//   //       const urlNoKey = `https://api.exchangerate.host/convert?from=${encodeURIComponent(
//   //         fromCurrency
//   //       )}&to=${encodeURIComponent(toCurrency)}&amount=${encodeURIComponent(amt)}`;
//   //       res = await fetch(urlNoKey);
//   //       if (!res.ok) throw new Error(`Network response was ${res.status}`);
//   //       data = await res.json();
//   //       //out = typeof data.result === "number" ? data.result : undefined;
//   //     }






//   //     if (typeof out === "number") {
//   //       const formatted =
//   //         Math.abs(out) >= 0.01
//   //           ? Number(out).toLocaleString(undefined, {
//   //               minimumFractionDigits: 2,
//   //               maximumFractionDigits: 2,
//   //             })
//   //           : Number(out).toPrecision(6);
//   //       setConverted(formatted);
//   //     } else {
//   //       throw new Error("Unexpected API response format.");
//   //     }
//   //   } catch (err) {
//   //     console.error("Conversion error:", err);
//   //     setError("Conversion failed. Check console or your network.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   amountInputRef.current?.focus();
//   // }, []);

//   // useEffect(() => {
//   //   if (amount) convertNow();
//   // }, [fromCurrency, toCurrency, amount]);

//   // const handleKeyDown = (e) => {
//   //   if (e.key === "Enter") convertNow();
//   // };

//   // const swapCurrencies = () => {
//   //   setFromCurrency(toCurrency);
//   //   setToCurrency(fromCurrency);
//   // };

//   // const currencyOptions = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];
// return (
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-indigo-200 to-purple-300 p-6">
//     <div className="backdrop-blur-xl bg-white/30 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
//       <h1 className="text-3xl font-extrabold text-center text-indigo-800 mb-6 tracking-wide">
//         💱 Currency Converter
//       </h1>

//       <div className="space-y-5">
//         {/* Amount input */}
//         <input
//           ref={amountInputRef}
//           inputMode="decimal"
//           type="text"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="w-full p-3 border border-indigo-200 rounded-xl text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 placeholder-gray-400 shadow-sm transition duration-300"
//           placeholder="Enter amount (e.g. 1000 or 12.50)"
//         />

//         {/* Currency selectors */}
//         <div className="flex gap-3">
//           <select
//             value={fromCurrency}
//             onChange={(e) => setFromCurrency(e.target.value)}
//             className="flex-1 p-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 text-gray-700 shadow-sm transition duration-300"
//           >
//             <option>USD</option>
//             <option>INR</option>
//             <option>EUR</option>
//             <option>GBP</option>
//             <option>JPY</option>
//             <option>AUD</option>
//             <option>CAD</option>
//           </select>

//           <select
//             value={toCurrency}
//             onChange={(e) => setToCurrency(e.target.value)}
//             className="flex-1 p-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 text-gray-700 shadow-sm transition duration-300"
//           >
//             <option>INR</option>
//             <option>USD</option>
//             <option>EUR</option>
//             <option>GBP</option>
//             <option>JPY</option>
//             <option>AUD</option>
//             <option>CAD</option>
//           </select>
//         </div>

//         {/* Convert button */}
//         <button
//           onClick={() => convertNow()}
//           disabled={loading}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition duration-300 transform hover:scale-105 disabled:opacity-60"
//           aria-disabled={loading}
//         >
//           {loading ? "Converting..." : "Convert"}
//         </button>

//         {/* Error */}
//         {error && (
//           <div className="mt-4 text-center text-sm text-red-700 bg-red-100 px-3 py-2 rounded-lg shadow-inner animate-pulse">
//             {error}
//           </div>
//         )}

//         {/* Result */}
//         {converted !== null && !error && (
//           <div className="mt-6 text-center animate-fadeIn">
//             <p className="text-lg text-gray-700 mb-1">
//               {parseAmount(amount)} {fromCurrency} =
//             </p>
//             <p className="text-3xl font-bold text-indigo-800 drop-shadow-md animate-pulse">
//               {converted} {toCurrency}
//             </p>
//           </div>
//         )}

//         {/* <p className="mt-4 text-xs text-gray-600 text-center">
//           Powered by exchangerate.host — free public API.
//         </p> */}
//       </div>
//     </div>
//   </div>
// );
// }

// export default CurrencyPage;
import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";

export default function CurrencyPage() {
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
      const API_KEY = "375783b8cb8f11cdb2ed150eb5e91241";
      const url = `https://api.exchangerate.host/convert?access_key=${API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amt}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Network error: ${res.status}`);

      const data = await res.json();
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
      setError("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") convertNow();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            
            {/* Header Section */}
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3h6c0-1.657-1.343-3-3-3zM12 4v4m0 8v4m-7-8h14" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Currency Converter
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Instantly convert between popular currencies with real-time exchange rates.
              </p>
            </div>

            {/* Conversion Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Amount</label>
                  <input
                    ref={amountInputRef}
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter amount (e.g., 100 or 12.50)"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">From Currency</label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    >
                      {["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"].map((cur) => (
                        <option key={cur}>{cur}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">To Currency</label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    >
                      {["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"].map((cur) => (
                        <option key={cur}>{cur}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => convertNow()}
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Converting...
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6" />
                      </svg>
                      Convert
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Result Section */}
            {error && (
              <div className="text-center bg-red-100 text-red-700 py-3 rounded-xl shadow-md">
                {error}
              </div>
            )}

            {converted !== null && !error && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center">
                <h2 className="text-2xl font-bold text-indigo-700 mb-2">
                  Conversion Result
                </h2>
                <p className="text-lg text-gray-700">
                  {parseAmount(amount)} {fromCurrency} ={" "}
                  <span className="font-bold text-purple-700 text-3xl">{converted}</span>{" "}
                  {toCurrency}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
