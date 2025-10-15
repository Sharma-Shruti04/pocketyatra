import React, { useState } from "react";
import Navbar from "../components/Navbar"; // ✅ import your navbar component

export default function AccommodationSearch() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [resultsFound, setResultsFound] = useState(true);

  const handleSearch = () => {
    // Simulate "no results" for demo purposes
    setResultsFound(false);
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
          Find Your Perfect Stay
        </h2>
        <p style={{ color: "#4f596a", marginBottom: "40px" }}>
          From luxury resorts to cozy hostels, discover the best places to stay.
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
          <div style={{ flex: "1 1 200px", textAlign: "left" }}>
            <label htmlFor="destination" style={{ fontSize: "12px", fontWeight: "600", color: "#4f596a" }}>
              Destination
            </label>
            <br />
            <input
              id="destination"
              type="text"
              placeholder="e.g., Goa, Manali"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={{
                width: "180px",
                height: "34px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                paddingLeft: "8px",
              }}
            />
          </div>

          <div style={{ flex: "1 1 150px", textAlign: "left" }}>
            <label htmlFor="checkin" style={{ fontSize: "12px", fontWeight: "600", color: "#4f596a" }}>
              Check-in
            </label>
            <br />
            <input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
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
            <label htmlFor="checkout" style={{ fontSize: "12px", fontWeight: "600", color: "#4f596a" }}>
              Check-out
            </label>
            <br />
            <input
              id="checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
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

        {!resultsFound && (
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
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
            <div>No accommodations found</div>
            <small>Try a different destination or dates.</small>
          </div>
        )}
      </div>

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
            🏨
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
