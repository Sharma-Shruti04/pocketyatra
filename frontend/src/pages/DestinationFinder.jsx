import React, { useState } from "react";
import Navbar from "../components/Navbar"; // ✅ import your navbar component

export default function DestinationFinder() {
  const [type, setType] = useState("Adventure");
  const [budget, setBudget] = useState("Mid-range");
  const [region, setRegion] = useState("Any");

  const handleSearch = () => {
    // TODO: Add search/filter logic here
    alert(`Searching for ${type}, ${budget}, ${region}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#ebf3fb", fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "900px", margin: "60px auto", textAlign: "center" }}>
        <h2 style={{ fontWeight: "700", fontSize: "26px", color: "#22335b", marginBottom: "6px" }}>
          Discover Your Next Destination
        </h2>
        <p style={{ color: "#4f596a", marginBottom: "40px" }}>
          Tell us what you like, and we'll find the perfect travel spot for you.
        </p>

        <div style={{
          background: "white",
          padding: "16px 24px",
          borderRadius: "8px",
          boxShadow: "0 8px 24px rgb(0 0 0 / 0.05)",
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap"
        }}>
          <select value={type} onChange={e => setType(e.target.value)} style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #ddd" }}>
            <option>Adventure</option>
            <option>Relaxation</option>
            <option>Cultural</option>
            <option>Nature</option>
          </select>

          <select value={budget} onChange={e => setBudget(e.target.value)} style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #ddd" }}>
            <option>Budget</option>
            <option>Mid-range</option>
            <option>Luxury</option>
          </select>

          <select value={region} onChange={e => setRegion(e.target.value)} style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #ddd" }}>
            <option>Any</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>America</option>
          </select>

          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "#0b1526",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "0 18px",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            aria-label="Search Destinations"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              width="18"
              height="18"
            >
              <path d="M12 2a10 10 0 0 1 7.07 17.07" />
              <path d="M2 12a10 10 0 0 1 17.07-7.07" />
            </svg>
          </button>
        </div>
      </main>

      <footer style={{
        background: "white",
        borderTop: "1px solid #eaeaea",
        padding: "8px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#999",
        fontSize: "11px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{
            backgroundColor: "#0b1526",
            color: "white",
            borderRadius: "6px",
            padding: "4px 6px",
            fontWeight: "600",
            fontSize: "12px",
          }}>🌍</div>
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
