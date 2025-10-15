import React, { useState } from "react";
import Navbar from "../components/Navbar"; 
export default function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightsFound, setFlightsFound] = useState(true);

  const handleSearch = () => {
    setFlightsFound(false); // simulate no flights
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#ebf3fb",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Navbar />

      <div style={{ flex: 1, maxWidth: "900px", margin: "60px auto", textAlign: "center" }}>
        <h2 style={{ fontWeight: "700", fontSize: "26px", color: "#22335b", marginBottom: "6px" }}>
          Find Your Perfect Flight
        </h2>
        <p style={{ color: "#4f596a", marginBottom: "40px" }}>
          Search and compare the best flight deals from thousands of airlines worldwide.
        </p>

        <div
          style={{
            background: "white",
            padding: "18px 24px",
            borderRadius: "8px",
            boxShadow: "0 8px 24px rgb(0 0 0 / 0.05)",
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Input Fields */}
          <div style={{ flex: "1 1 150px", textAlign: "left" }}>
            <label htmlFor="from" style={{ fontSize: "12px", fontWeight: "600", color: "#4f596a" }}>
              From & To
            </label>
            <br />
            <input
              id="from"
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              style={{
                width: "90px",
                height: "34px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                paddingLeft: "8px",
                marginRight: "6px",
              }}
            />
            <span style={{ color: "#888" }}>→</span>
            <input
              id="to"
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              style={{
                width: "90px",
                height: "34px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                paddingLeft: "8px",
                marginLeft: "6px",
              }}
            />
          </div>

          <div style={{ flex: "1 1 150px", textAlign: "left" }}>
            <label htmlFor="depart" style={{ fontSize: "12px", fontWeight: "600", color: "#4f596a" }}>Depart</label>
            <br />
            <input
              id="depart"
              type="date"
              value={depart}
              onChange={(e) => setDepart(e.target.value)}
              style={{
                width: "140px",
                height: "34px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                paddingLeft: "8px",
              }}
            />
          </div>

          <div style={{ flex: "1 1 150px", textAlign: "left" }}>
            <label htmlFor="return" style={{ fontSize: "12px", fontWeight: "600", color: "#4f596a" }}>Return</label>
            <br />
            <input
              id="return"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              style={{
                width: "140px",
                height: "34px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                paddingLeft: "8px",
              }}
            />
          </div>

          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "#0b1526",
              color: "white",
              border: "none",
              borderRadius: "8px",
              height: "34px",
              padding: "0 22px",
              cursor: "pointer",
              fontWeight: "600",
              marginTop: "20px",
            }}
          >
            Search
          </button>
        </div>

        {!flightsFound && (
          <div style={{ marginTop: "70px", color: "#7a8497", fontWeight: "600" }}>
            <svg
              width="40"
              height="40"
              fill="none"
              stroke="#7a8497"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              style={{ marginBottom: "10px" }}
            >
              <path d="M2.5 19h19M6 15l7-7 5 5-7 7-5-5z" />
            </svg>
            <div>No flights found</div>
            <small>Try adjusting your search criteria.</small>
          </div>
        )}
      </div>

      {/* Sticky Footer */}
      <footer
        style={{
          background: "white",
          borderTop: "1px solid #eaeaea",
          padding: "8px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#999",
          fontSize: "11px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              backgroundColor: "#0b1526",
              color: "white",
              borderRadius: "6px",
              padding: "4px 6px",
              fontWeight: "600",
              fontSize: "12px",
            }}
          >
            ✈️
          </div>
          PocketYatra
          <span style={{ fontWeight: "400", color: "#aaa", marginLeft: "6px" }}>
            Your smart travel companion
          </span>
        </div>
        <div style={{ textAlign: "right" }}>
          Crafted with <span style={{ color: "red" }}>❤️</span> for travelers worldwide
          <br />
          Powered by AI · Real-time data · Smart recommendations
        </div>
      </footer>
    </div>
  );
}
