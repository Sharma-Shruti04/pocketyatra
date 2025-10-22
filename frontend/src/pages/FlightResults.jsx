import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function FlightResults() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query params
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");
  const to = queryParams.get("to");
  const depart = queryParams.get("depart");
  const returnDate = queryParams.get("returnDate");

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/flights", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ from, to, depart, returnDate }),
        });

        const data = await res.json();
        if (res.ok) setFlights(data.flights || []);
        else alert(data.message || "Failed to fetch flights");
      } catch (err) {
        console.error(err);
        alert("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (from && to && depart) fetchFlights();
    else {
      alert("Invalid search query");
      navigate("/flights/search");
    }
  }, [from, to, depart, returnDate, navigate]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">← Back to Search</button>
        <h1 className="text-2xl font-bold mb-4">Flight Results</h1>

        {loading ? (
          <p>Loading flights...</p>
        ) : flights.length === 0 ? (
          <p>No flights available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flights.map((f, idx) => (
              <div key={idx} className="border p-4 rounded shadow hover:shadow-md transition">
                <p><strong>Flight:</strong> {f.flightNumber}</p>
                <p><strong>Route:</strong> {f.from} → {f.to}</p>
                <p><strong>Departure:</strong> {f.depart}</p>
                <p><strong>Arrival:</strong> {f.arrival}</p>
                <p><strong>Price:</strong> ${f.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
