import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import TripCard from "../components/TripCard";
import ActionCard from "../components/ActionCard";
import { FaPlaneDeparture, FaWallet, FaCalendarAlt } from "react-icons/fa";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDashboardData(data))
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, []);

  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (!dashboardData) return <Layout>Loading...</Layout>;

  const { totalTrips, totalBudget, upcoming, trips, name } = dashboardData;

  return (
    <Layout currentPageName="Dashboard">
      <div className="max-w-6xl mx-auto mt-10 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {getGreeting()}, {name?.split(" ")[0]} 👋
          </h2>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap gap-6">
          <StatCard title="Total Trips" value={totalTrips} icon={<FaPlaneDeparture />} />
          <StatCard title="This Year" value={totalTrips} icon={<FaCalendarAlt />} />
          <StatCard title="Total Budget" value={`₹${totalBudget}`} icon={<FaWallet />} />
          <StatCard title="Upcoming" value={upcoming} icon={<FaCalendarAlt />} />
        </div>

        {/* Recent Trips */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Recent Trips</h3>
          <div className="space-y-3">
            {trips?.length > 0 ? (
              trips.slice(0, 5).map((trip) => (
                <TripCard
                  key={trip._id}
                  name={trip.name}
                  location={`${trip.from} → ${trip.to}`}
                  date={new Date(trip.date).toDateString()}
                  budget={`₹${trip.budget}`}
                />
              ))
            ) : (
              <p className="text-gray-500">No trips found.</p>
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActionCard title="Plan New Trip" description="Create a detailed itinerary" />
            <ActionCard title="Find Flights" description="Search and compare flight prices" />
            <ActionCard title="Book Stay" description="Discover hotels & accommodations" />
            <ActionCard title="Explore Destinations" description="Get personalized recommendations" />
          </div>
        </section>
      </div>
    </Layout>
  );
}
