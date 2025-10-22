import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import TripCard from "../components/TripCard";
import ActionCard from "../components/ActionCard";
import { FaPlaneDeparture, FaWallet, FaCalendarAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/dashboard", {
  method: "GET",
  headers: { Authorization: `Bearer ${token}` },
});


        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/destination-finder?query=${search}`);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* 👋 Greeting Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Welcome back, {dashboardData?.user?.name || "Traveler"} 👋
            </h1>
            <p className="text-gray-500 mt-1">Ready for your next adventure?</p>
          </div>
          <button
            onClick={() => navigate("/trip-planner")}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Plan New Trip
          </button>
        </div>

        {/* 🔍 Quick Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-xl shadow-md p-3">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search destinations, flights, or trips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow outline-none text-gray-700"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* 📊 Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Total Trips"
            value={dashboardData?.totalTrips || 0}
            icon={<FaCalendarAlt />}
          />
          <StatCard
            title="Upcoming Flights"
            value={dashboardData?.upcomingFlights || 0}
            icon={<FaPlaneDeparture />}
          />
          <StatCard
            title="Saved Budgets"
            value={dashboardData?.savedBudgets || 0}
            icon={<FaWallet />}
          />
        </div>

        {/* ⚡ Quick Actions */}
        <h2 className="text-xl font-semibold text-gray-700">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ActionCard
            title="Find Flights"
            description="Compare flight options easily"
            onClick={() => navigate("/flight-search")}
          />
          <ActionCard
            title="Explore Destinations"
            description="Discover beautiful travel spots"
            onClick={() => navigate("/destination-finder")}
          />
          <ActionCard
            title="Book Stays"
            description="Find hotels and accommodations"
            onClick={() => navigate("/accommodation-search")}
          />
        </div>

        {/* 🧳 Recent Trips */}
        <h2 className="text-xl font-semibold text-gray-700">Your Recent Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardData?.recentTrips?.length ? (
            dashboardData.recentTrips.map((trip, index) => (
              <TripCard key={index} trip={trip} />
            ))
          ) : (
            <p className="text-gray-500">
              No trips found — start planning your first one!
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
