// import React, { useState } from "react";
// import Navbar from "../components/Navbar"; 
// export default function FlightSearch() {
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [depart, setDepart] = useState("");
//   const [returnDate, setReturnDate] = useState("");
//   const [flightsFound, setFlightsFound] = useState(true);

//   const handleSearch = () => {
//     setFlightsFound(false); // simulate no flights
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//         backgroundColor: "#ebf3fb",
//         fontFamily: "'Poppins', sans-serif",
//       }}
//     >
//       <Navbar />

//       <div style={{ flex: 1, maxWidth: "900px", margin: "60px auto", textAlign: "center" }}>
//         <h2 style={{ fontWeight: "700", fontSize: "26px", color: "#22335b", marginBottom: "6px" }}>
//           Find Your Perfect Flight
//         </h2>
//         <p style={{ color: "#4f596a", marginBottom: "40px" }}>
//           Search and compare the best flight deals from thousands of airlines worldwide.
//         </p>

//         <div
//           style={{
//             background: "white",
//             padding: "18px 24px",
//             borderRadius: "8px",
//             boxShadow: "0 8px 24px rgb(0 0 0 / 0.05)",
//             display: "flex",
//             gap: "16px",
//             alignItems: "center",
//             justifyContent: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           {/* Input Fields */}
//           <div style={{ flex: "1 1 150px", textAlign: "left" }}>
//             <label htmlFor="from" style={{ fontSize: "12px", fontWeight: "600", color: "#4f596a" }}>
//               From & To
//             </label>
//             <br />
//             <input
//               id="from"
//               type="text"
//               placeholder="From"
//               value={from}
//               onChange={(e) => setFrom(e.target.value)}
//               style={{
//                 width: "90px",
//                 height: "34px",
//                 borderRadius: "6px",
//                 border: "1px solid #ddd",
//                 paddingLeft: "8px",
//                 marginRight: "6px",
//               }}
//             />
//             <span style={{ color: "#888" }}>→</span>
//             <input
//               id="to"
//               type="text"
//               placeholder="To"
//               value={to}
//               onChange={(e) => setTo(e.target.value)}
//               style={{
//                 width: "90px",
//                 height: "34px",
//                 borderRadius: "6px",
//                 border: "1px solid #ddd",
//                 paddingLeft: "8px",
//                 marginLeft: "6px",
//               }}
//             />
//           </div>

//           <div style={{ flex: "1 1 150px", textAlign: "left" }}>
//             <label htmlFor="depart" style={{ fontSize: "12px", fontWeight: "600", color: "#4f596a" }}>Depart</label>
//             <br />
//             <input
//               id="depart"
//               type="date"
//               value={depart}
//               onChange={(e) => setDepart(e.target.value)}
//               style={{
//                 width: "140px",
//                 height: "34px",
//                 borderRadius: "6px",
//                 border: "1px solid #ddd",
//                 paddingLeft: "8px",
//               }}
//             />
//           </div>

//           <div style={{ flex: "1 1 150px", textAlign: "left" }}>
//             <label htmlFor="return" style={{ fontSize: "12px", fontWeight: "600", color: "#4f596a" }}>Return</label>
//             <br />
//             <input
//               id="return"
//               type="date"
//               value={returnDate}
//               onChange={(e) => setReturnDate(e.target.value)}
//               style={{
//                 width: "140px",
//                 height: "34px",
//                 borderRadius: "6px",
//                 border: "1px solid #ddd",
//                 paddingLeft: "8px",
//               }}
//             />
//           </div>

//           <button
//             onClick={handleSearch}
//             style={{
//               backgroundColor: "#0b1526",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               height: "34px",
//               padding: "0 22px",
//               cursor: "pointer",
//               fontWeight: "600",
//               marginTop: "20px",
//             }}
//           >
//             Search
//           </button>
//         </div>

//         {!flightsFound && (
//           <div style={{ marginTop: "70px", color: "#7a8497", fontWeight: "600" }}>
//             <svg
//               width="40"
//               height="40"
//               fill="none"
//               stroke="#7a8497"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               viewBox="0 0 24 24"
//               style={{ marginBottom: "10px" }}
//             >
//               <path d="M2.5 19h19M6 15l7-7 5 5-7 7-5-5z" />
//             </svg>
//             <div>No flights found</div>
//             <small>Try adjusting your search criteria.</small>
//           </div>
//         )}
//       </div>

//       {/* Sticky Footer */}
//       <footer
//         style={{
//           background: "white",
//           borderTop: "1px solid #eaeaea",
//           padding: "8px 24px",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           color: "#999",
//           fontSize: "11px",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//           <div
//             style={{
//               backgroundColor: "#0b1526",
//               color: "white",
//               borderRadius: "6px",
//               padding: "4px 6px",
//               fontWeight: "600",
//               fontSize: "12px",
//             }}
//           >
//             ✈️
//           </div>
//           PocketYatra
//           <span style={{ fontWeight: "400", color: "#aaa", marginLeft: "6px" }}>
//             Your smart travel companion
//           </span>
//         </div>
//         <div style={{ textAlign: "right" }}>
//           Crafted with <span style={{ color: "red" }}>❤️</span> for travelers worldwide
//           <br />
//           Powered by AI · Real-time data · Smart recommendations
//         </div>
//       </footer>
//     </div>
//   );
// }




import React, { useState } from "react";
import Layout from "../components/Layout";
import InputField from "../components/InputField";

export default function FlightSearch() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    depart: "",
    returnDate: "",
  });

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!form.from || !form.to || !form.depart) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setFlights([]);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setFlights(data.flights || []);
      } else {
        alert(data.message || "Failed to fetch flights.");
      }
    } catch (err) {
      console.error("Flight search error:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">Search Flights</h1>
          <p className="text-gray-500 mt-2">
            Find the best flights for your next trip.
          </p>
        </div>

        {/* Flight Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white shadow-md rounded-xl p-6 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="From"
              name="from"
              value={form.from}
              onChange={handleChange}
              placeholder="e.g., Delhi"
            />
            <InputField
              label="To"
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="e.g., Mumbai"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Departure Date"
              type="date"
              name="depart"
              value={form.depart}
              onChange={handleChange}
            />
            <InputField
              label="Return Date (optional)"
              type="date"
              name="returnDate"
              value={form.returnDate}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Searching flights..." : "Search Flights"}
          </button>
        </form>

        {/* Flight Results */}
        {flights.length > 0 ? (
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              Available Flights
            </h2>

            <div className="divide-y divide-gray-200">
              {flights.map((flight, index) => (
                <div
                  key={index}
                  className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      ✈️ {flight.airline || "Unknown Airline"}
                    </p>
                    <p className="text-gray-600">
                      {flight.from} → {flight.to}
                    </p>
                    <p className="text-sm text-gray-500">
                      {flight.departureTime} - {flight.arrivalTime}
                    </p>
                  </div>

                  <div className="mt-2 sm:mt-0 text-right">
                    <p className="text-blue-600 font-semibold">
                      ₹{flight.price}
                    </p>
                    <button className="bg-green-500 text-white text-sm px-3 py-1 rounded-md mt-2 hover:bg-green-600 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500">
              No flights found. Try searching for another route.
            </p>
          )
        )}
      </div>
    </Layout>
  );
}
