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
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import InputField from "../components/InputField";

export default function FlightSearch() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    from: "",
    to: "",
    depart: "",
    returnDate: "",
  });

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

    // Navigate to results page with search parameters
    const searchParams = new URLSearchParams({
      from: form.from,
      to: form.to,
      depart: form.depart,
      ...(form.returnDate && { returnDate: form.returnDate })
    });
    
    navigate(`/flights/results?${searchParams.toString()}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Search Flights
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Find the best flights for your next adventure. Compare prices and book with confidence.
              </p>
            </div>

            {/* Flight Search Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      From
                    </label>
                    <input
                      name="from"
                      value={form.from}
                      onChange={handleChange}
                      placeholder="e.g., Delhi"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      To
                    </label>
                    <input
                      name="to"
                      value={form.to}
                      onChange={handleChange}
                      placeholder="e.g., Mumbai"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Departure Date
                    </label>
                    <input
                      type="date"
                      name="depart"
                      value={form.depart}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Return Date (optional)
                    </label>
                    <input
                      type="date"
                      name="returnDate"
                      value={form.returnDate}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Searching flights...
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search Flights
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Best Prices</h3>
                <p className="text-gray-600 text-sm">Compare prices from multiple airlines to find the best deals</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Real-time Updates</h3>
                <p className="text-gray-600 text-sm">Get instant updates on flight schedules and price changes</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Easy Booking</h3>
                <p className="text-gray-600 text-sm">Book your flights with just a few clicks and secure payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
