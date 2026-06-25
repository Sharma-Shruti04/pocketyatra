import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import logo from "../assets/logo.png";
import StatCard from "../components/StatCard";
import TripCard from "../components/TripCard";
import ActionCard from "../components/ActionCard";
import { FaPlaneDeparture, FaWallet, FaCalendarAlt, FaSearch, FaCheckSquare, FaSquare, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const packingTemplates = {
  general: [
    { text: "Passport & Visas", packed: false },
    { text: "Tickets & Hotel Bookings", packed: false },
    { text: "Cash & Credit Cards", packed: false },
    { text: "Phone Charger & Power Bank", packed: false },
    { text: "Universal Adapter", packed: false },
    { text: "Basic Toiletries", packed: false },
    { text: "First Aid & Medicines", packed: false }
  ],
  beach: [
    { text: "Sunglasses & Sunscreen", packed: false },
    { text: "Swimwear", packed: false },
    { text: "Flip Flops / Beach Sandals", packed: false },
    { text: "Quick-dry Towel", packed: false },
    { text: "Waterproof Phone Case", packed: false },
    { text: "Sun Hat / Cap", packed: false }
  ],
  winter: [
    { text: "Heavy Thermal Innerwear", packed: false },
    { text: "Winter Jacket / Down Coat", packed: false },
    { text: "Gloves, Beanie & Scarf", packed: false },
    { text: "Thick Woolen Socks", packed: false },
    { text: "Lip Balm & Cold Cream", packed: false },
    { text: "Insulated Water Bottle", packed: false }
  ],
  business: [
    { text: "Formal Clothes / Suits", packed: false },
    { text: "Laptop & Accessories", packed: false },
    { text: "Business Cards", packed: false },
    { text: "Notebook & Pen", packed: false },
    { text: "Wrinkle-release Spray", packed: false },
    { text: "Lint Roller", packed: false }
  ]
};

const defaultNotes = [
  {
    id: 1,
    title: "💡 Dream Trip Ideas",
    content: "1. Bali: Visit Ubud monkey forest, Mount Batur hike, and beach clubs in Seminyak.\n2. Switzerland: Interlaken paragliding, explore Lauterbrunnen waterfalls.",
    category: "idea",
    date: "2026-06-22"
  },
  {
    id: 2,
    title: "✈️ Flight Booking Checklist",
    content: "- Check flight prices 3 months in advance.\n- Set calendar alerts for airline sales.\n- Verify baggage limit allowances before paying.",
    category: "flight",
    date: "2026-06-21"
  }
];

const defaultBadges = [
  { id: "first_yatra", label: "🎒 First Yatra", desc: "Start planning your first journey", unlocked: true },
  { id: "beach_bum", label: "🏖️ Beach Bum", desc: "Unlock by visiting/planning a coastal beach", unlocked: false },
  { id: "summit_seeker", label: "🏔️ Summit Seeker", desc: "Unlock by planning a mountain trek", unlocked: false },
  { id: "globetrotter", label: "🌍 Globetrotter", desc: "Unlock by planning 3+ trip itineraries", unlocked: false },
  { id: "frugal_traveler", label: "🪙 Frugal Traveler", desc: "Unlock by creating a budget under ₹10,000", unlocked: false },
  { id: "packing_pro", label: "📦 Packing Pro", desc: "Unlock by packing all items in packing list", unlocked: false }
];

const trendingDestinationsByTime = {
  morning: {
    label: "Morning Serenity",
    icon: "🌅",
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    border: "border-amber-200/50",
    textClass: "text-amber-700",
    bgBadge: "bg-amber-50 text-amber-700 border-amber-100",
    places: [
      {
        name: "Wayanad",
        cost: "₹9,000",
        image: "⛰️",
        desc: "Misty hills, spice plantations, and prehistoric caves.",
        tag: "Cozy Highlands"
      },
      {
        name: "Varanasi",
        cost: "₹6,500",
        image: "🛕",
        desc: "Spiritual morning boat rides, historic temples, and ancient ghats.",
        tag: "Ancient Spiritual"
      },
      {
        name: "Kyoto, Japan",
        cost: "₹1,10,000",
        image: "⛩️",
        desc: "Peaceful morning walks at Fushimi Inari shrine, bamboo groves, and Zen temples.",
        tag: "Zen Serenity"
      }
    ]
  },
  afternoon: {
    label: "Afternoon Heritage",
    icon: "☀️",
    gradient: "from-sky-500/10 via-blue-500/5 to-transparent",
    border: "border-sky-200/50",
    textClass: "text-sky-700",
    bgBadge: "bg-sky-50 text-sky-700 border-sky-100",
    places: [
      {
        name: "Khajuraho",
        cost: "₹8,000",
        image: "🛕",
        desc: "Stunning temples with intricate medieval carvings and sculptures.",
        tag: "Ancient Art"
      },
      {
        name: "Pondicherry",
        cost: "₹10,000",
        image: "🏡",
        desc: "French colonial architecture, bright yellow villas, and quiet cafes.",
        tag: "French Heritage"
      },
      {
        name: "Paris, France",
        cost: "₹1,20,000",
        image: "🗼",
        desc: "Visit the Louvre Museum, Eiffel Tower, and stroll down the Champs-Élysées.",
        tag: "Art & Culture"
      }
    ]
  },
  evening: {
    label: "Evening Sunset Vibes",
    icon: "🌇",
    gradient: "from-indigo-500/10 via-purple-500/5 to-pink-500/5",
    border: "border-purple-200/50",
    textClass: "text-purple-700",
    bgBadge: "bg-purple-50 text-purple-700 border-purple-100",
    places: [
      {
        name: "Alleppey",
        cost: "₹14,000",
        image: "🛶",
        desc: "Backwater cruises in traditional houseboats during golden sunsets.",
        tag: "Backwater Magic"
      },
      {
        name: "Gokarna",
        cost: "₹7,000",
        image: "🌊",
        desc: "Pristine beaches, cliff walks, and laid-back sunset vibes.",
        tag: "Hippie Haven"
      },
      {
        name: "Venice, Italy",
        cost: "₹1,60,000",
        image: "🛶",
        desc: "Romantic sunset gondola rides along the Grand Canal under historic bridges.",
        tag: "Romantic Canals"
      }
    ]
  },
  night: {
    label: "Nightlife & Stargazing",
    icon: "🌌",
    gradient: "from-violet-950/20 via-slate-900/10 to-transparent",
    border: "border-indigo-900/30",
    textClass: "text-indigo-400",
    bgBadge: "bg-indigo-950/50 text-indigo-300 border-indigo-900",
    places: [
      {
        name: "Jaisalmer",
        cost: "₹12,000",
        image: "🌌",
        desc: "Desert stargazing, dune camping, and royal campfire music.",
        tag: "Golden Desert"
      },
      {
        name: "Manali",
        cost: "₹9,000",
        image: "🔥",
        desc: "Chilly riverside camping, stargazing, and mountain bonfires.",
        tag: "Cozy Bonfire"
      },
      {
        name: "Reykjavik, Iceland",
        cost: "₹1,90,000",
        image: "🌌",
        desc: "Spectacular views of the Northern Lights, thermal pools, and night stargazing.",
        tag: "Aurora Borealis"
      }
    ]
  }
};

const getPhaseFromHour = (hour) => {
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
};

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [packingCategory, setPackingCategory] = useState("general");
  const [packingList, setPackingList] = useState(packingTemplates.general);
  const [newItemText, setNewItemText] = useState("");

  // Travel Diary state
  const [diaryNotes, setDiaryNotes] = useState(() => {
    const stored = localStorage.getItem("pocketyatra_diary");
    return stored ? JSON.parse(stored) : defaultNotes;
  });
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteCategory, setNoteCategory] = useState("idea");
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Travel Badges state
  const [badges, setBadges] = useState(() => {
    const stored = localStorage.getItem("pocketyatra_badges");
    return stored ? JSON.parse(stored) : defaultBadges;
  });

  // Bill Splitter state
  const [billAmount, setBillAmount] = useState("");
  const [numTravelers, setNumTravelers] = useState(2);
  const [tipPercentage, setTipPercentage] = useState(10);

  // Time-based trending state variables
  const [timePhase, setTimePhase] = useState(() => {
    const hour = new Date().getHours();
    return getPhaseFromHour(hour);
  });
  const [autoSync, setAutoSync] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fadeTrigger, setFadeTrigger] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      if (autoSync) {
        const hour = now.getHours();
        const currentPhase = getPhaseFromHour(hour);
        if (currentPhase !== timePhase) {
          setFadeTrigger(false);
          setTimeout(() => {
            setTimePhase(currentPhase);
            setFadeTrigger(true);
          }, 200);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [autoSync, timePhase]);

  const handlePhaseChange = (phase) => {
    setAutoSync(false);
    setFadeTrigger(false);
    setTimeout(() => {
      setTimePhase(phase);
      setFadeTrigger(true);
    }, 200);
  };

  const handleToggleAutoSync = () => {
    const nextAutoSync = !autoSync;
    setAutoSync(nextAutoSync);
    if (nextAutoSync) {
      const hour = new Date().getHours();
      const currentPhase = getPhaseFromHour(hour);
      setFadeTrigger(false);
      setTimeout(() => {
        setTimePhase(currentPhase);
        setFadeTrigger(true);
      }, 200);
    }
  };

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setPackingCategory(cat);
    setPackingList(packingTemplates[cat]);
  };

  const handleToggleItem = (index) => {
    const updated = [...packingList];
    updated[index].packed = !updated[index].packed;
    setPackingList(updated);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    setPackingList([...packingList, { text: newItemText.trim(), packed: false }]);
    setNewItemText("");
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    const newNote = {
      id: Date.now(),
      title: noteTitle.trim(),
      content: noteContent.trim(),
      category: noteCategory,
      date: new Date().toLocaleDateString('en-CA')
    };
    const updated = [newNote, ...diaryNotes];
    setDiaryNotes(updated);
    localStorage.setItem("pocketyatra_diary", JSON.stringify(updated));
    setNoteTitle("");
    setNoteContent("");
    setNoteCategory("idea");
    setIsAddingNote(false);
  };

  const handleDeleteNote = (id) => {
    const updated = diaryNotes.filter(note => note.id !== id);
    setDiaryNotes(updated);
    localStorage.setItem("pocketyatra_diary", JSON.stringify(updated));
  };

  const handleToggleBadge = (id) => {
    const updated = badges.map(badge => 
      badge.id === id ? { ...badge, unlocked: !badge.unlocked } : badge
    );
    setBadges(updated);
    localStorage.setItem("pocketyatra_badges", JSON.stringify(updated));
  };

  const totalItems = packingList.length;
  const packedItems = packingList.filter((item) => item.packed).length;
  const percentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiBase}/dashboard`, {
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
    navigate(`/destinations`);
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
      <div className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-8 pb-0 flex-1 flex flex-col transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
          <div className="space-y-8">
            {/* 👋 Greeting Section */}
            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden p-1">
                    <img src={logo} alt="PocketYatra Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      Where to next, {dashboardData?.user?.name || "Traveler"}?
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">Ready for your next adventure?</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/tripplanner")}
                  className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Plan New Trip
                </button>
              </div>
            </div>

            {/* 🌟 Dynamic Trending Destinations Showcase */}
            <div className={`bg-gradient-to-br ${trendingDestinationsByTime[timePhase].gradient} bg-white/75 dark:bg-slate-900/30 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 dark:border-slate-800/50 transition-all duration-500 ease-in-out`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <span className="text-xl">{trendingDestinationsByTime[timePhase].icon}</span>
                  </div>
                  Trending Destinations
                </h2>
                
                {/* Live Clock & Auto Sync Toggle */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Glassmorphic digital clock */}
                  <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 shadow-inner">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold tracking-wider uppercase">Local Time</span>
                    <span className="font-mono text-sm font-bold text-gray-800 dark:text-gray-100">
                      {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  
                  {/* Mode Badge */}
                  <div className={`px-3 py-1.5 rounded-full border text-xs font-bold shadow-sm uppercase tracking-wider flex items-center gap-1.5 ${trendingDestinationsByTime[timePhase].bgBadge}`}>
                    <span>{trendingDestinationsByTime[timePhase].icon}</span>
                    <span>{trendingDestinationsByTime[timePhase].label}</span>
                  </div>

                  {/* Auto Sync Toggle Button */}
                  <button
                    onClick={handleToggleAutoSync}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 border ${
                      autoSync
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-md hover:from-green-600 hover:to-emerald-700"
                        : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer"
                    }`}
                    title="Sync recommendations with actual time of day automatically"
                  >
                    <span className={`w-2 h-2 rounded-full ${autoSync ? "bg-white animate-pulse" : "bg-gray-400"}`}></span>
                    {autoSync ? "Auto Synced" : "Auto Sync Off"}
                  </button>
                </div>
              </div>

              {/* Time Machine Tabs */}
              <div className="mb-6 bg-black/5 dark:bg-white/5 p-1 rounded-2xl flex flex-wrap gap-1 max-w-lg shadow-inner">
                {Object.entries(trendingDestinationsByTime).map(([key, value]) => {
                  const isActive = timePhase === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handlePhaseChange(key)}
                      className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                        isActive
                          ? "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 shadow-md transform scale-105"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/30"
                      }`}
                    >
                      <span>{value.icon}</span>
                      <span className="capitalize">{key}</span>
                    </button>
                  );
                })}
              </div>
              
              <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 transition-all duration-300 transform ${
                fadeTrigger ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 scale-98"
              }`}>
                {trendingDestinationsByTime[timePhase].places.map((dest, idx) => (
                  <div 
                    key={`${timePhase}-${idx}`} 
                    className={`bg-white/95 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 border ${
                      timePhase === 'night' 
                        ? 'border-indigo-950/20 dark:border-indigo-900/50 hover:border-indigo-500/30 dark:hover:border-indigo-500/50' 
                        : 'border-gray-100 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-800/50'
                    } shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-4xl filter drop-shadow-sm">{dest.image}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                          timePhase === 'night' 
                            ? 'bg-indigo-950/50 text-indigo-300 border-indigo-900/50' 
                            : 'bg-purple-50 text-purple-600 border-purple-100'
                        }`}>{dest.tag}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">{dest.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">{dest.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100/50 dark:border-slate-800/80 mt-4">
                      <div>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Avg Budget</p>
                        <p className="font-bold text-lg text-purple-600 dark:text-purple-450">{dest.cost}</p>
                      </div>
                      <button
                        onClick={() => navigate(`/tripplanner?destination=${dest.name}`)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                      >
                        Quick Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ⚡ Quick Actions */}
            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div 
                  onClick={() => navigate("/flights")}
                  className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-blue-200 dark:border-blue-900/50"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-250">Find Flights</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Compare flight options easily</p>
                </div>
                
                <div 
                  onClick={() => navigate("/destinations")}
                  className="bg-gradient-to-r from-green-50 to-green-100 dark:from-emerald-950/20 dark:to-emerald-900/20 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-green-200 dark:border-emerald-900/50"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-255">Explore Destinations</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Discover beautiful travel spots</p>
                </div>
                
                <div 
                  onClick={() => navigate("/accommodation")}
                  className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-purple-200 dark:border-purple-900/50"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-255">Book Stays</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Find hotels and accommodations</p>
                </div>
              </div>
            </div>

            {/* 🎒 AI Packing Assistant */}
            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center mb-4 sm:mb-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  AI Packing Assistant
                </h2>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Theme:</span>
                  <select
                    value={packingCategory}
                    onChange={handleCategoryChange}
                    className="border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="general">💼 General Essentials</option>
                    <option value="beach">🏖️ Beach Getaway</option>
                    <option value="winter">🏔️ Winter / Mountain</option>
                    <option value="business">👔 Business Travel</option>
                  </select>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Packing Progress</span>
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 px-2.5 py-0.5 rounded-full">{packedItems} of {totalItems} Packed ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden border border-gray-200/50 dark:border-slate-700">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {packingList.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleToggleItem(idx)}
                    className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                      item.packed
                        ? "bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/30 text-gray-500 dark:text-gray-400 line-through"
                        : "bg-white dark:bg-slate-800/40 border-gray-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-md text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div className="mr-3 text-lg flex-shrink-0">
                      {item.packed ? (
                        <FaCheckSquare className="text-purple-600 dark:text-purple-450" />
                      ) : (
                        <FaSquare className="text-gray-300 dark:text-slate-700" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Add Custom Item */}
              <form onSubmit={handleAddItem} className="flex gap-3 max-w-md">
                <input
                  type="text"
                  placeholder="Add custom packing item..."
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  className="flex-1 border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-700"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <FaPlus className="text-xs" /> Add
                </button>
              </form>
            </div>

            {/* 🏆 Travel Badges & Achievements & 💸 Travel Expense Splitter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Travel Badges & Achievements Card */}
              <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 animate-fadeIn flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    Travel Badges
                  </h2>
                  <p className="text-gray-500 dark:text-gray-405 text-sm mb-6 leading-relaxed">
                    Check off the travel milestones you've completed to level up your traveler profile!
                  </p>

                  {/* Level Progress */}
                  <div className="mb-6 bg-yellow-50/50 dark:bg-yellow-950/10 border border-yellow-100 dark:border-yellow-900/30 rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Rank: <span className="font-bold text-orange-600">{badges.filter(b => b.unlocked).length >= 5 ? "Gold Explorer 🏆" : badges.filter(b => b.unlocked).length >= 3 ? "Silver Adventurer 🌟" : "Bronze Wayfarer 🎒"}</span></span>
                      <span className="text-xs font-bold text-orange-600">{badges.filter(b => b.unlocked).length} of {badges.length} unlocked ({Math.round((badges.filter(b => b.unlocked).length / badges.length) * 100)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200/60 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.round((badges.filter(b => b.unlocked).length / badges.length) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Badges Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {badges.map((badge) => (
                      <div
                        key={badge.id}
                        onClick={() => handleToggleBadge(badge.id)}
                        className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-200 select-none ${
                          badge.unlocked
                            ? "bg-yellow-50/30 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900/40 shadow-sm"
                            : "bg-white dark:bg-slate-800/40 border-gray-100 dark:border-slate-800 opacity-60 grayscale hover:opacity-85 hover:grayscale-50"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xl">{badge.label.split(" ")[0]}</span>
                          <span className={`w-2.5 h-2.5 rounded-full ${badge.unlocked ? "bg-yellow-500" : "bg-gray-300 dark:bg-slate-700"}`}></span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-800 dark:text-gray-250">{badge.label.split(" ").slice(1).join(" ")}</p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 leading-tight">{badge.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Travel Expense & Bill Splitter Card */}
              <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 animate-fadeIn flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Expense Splitter
                  </h2>
                  <p className="text-gray-500 dark:text-gray-405 text-sm mb-6 leading-relaxed">
                    Calculate group dinner splits, hotel shares, or transportation expenses instantly.
                  </p>

                  <div className="space-y-4">
                    {/* Bill Input */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Total Bill Amount (₹)</label>
                      <input
                        type="number"
                        placeholder="e.g., 5000"
                        value={billAmount}
                        onChange={(e) => setBillAmount(e.target.value)}
                        className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-100 focus:bg-white dark:focus:bg-slate-700"
                      />
                    </div>

                    {/* Travelers Counter / Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">Number of Travelers</label>
                        <span className="text-sm font-bold text-green-600 dark:text-green-300 bg-green-50 dark:bg-green-950/50 px-2 rounded-full">{numTravelers} people</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="15"
                        value={numTravelers}
                        onChange={(e) => setNumTravelers(Number(e.target.value))}
                        className="w-full accent-green-600 cursor-pointer h-2 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none"
                      />
                    </div>

                    {/* Tip Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Add Tip</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[0, 5, 10, 15].map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => setTipPercentage(pct)}
                            className={`py-1.5 text-xs font-semibold rounded-lg border transition-all duration-150 cursor-pointer ${
                              tipPercentage === pct
                                ? "bg-green-600 border-green-600 text-white shadow-sm"
                                : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                            }`}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculation Outputs */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50/50 dark:bg-slate-800/50 rounded-xl p-2">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-semibold">Tip Total</p>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-200">₹{Math.round(((parseFloat(billAmount) || 0) * tipPercentage) / 100)}</p>
                  </div>
                  <div className="bg-gray-50/50 dark:bg-slate-800/50 rounded-xl p-2">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-semibold">Total Bill</p>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-200">₹{Math.round((parseFloat(billAmount) || 0) + (((parseFloat(billAmount) || 0) * tipPercentage) / 100))}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-2 border border-green-100 dark:border-green-900/30">
                    <p className="text-[10px] text-green-500 dark:text-green-400 uppercase font-semibold">Each Split</p>
                    <p className="text-sm font-extrabold text-green-700 dark:text-green-300">₹{Math.round(numTravelers > 0 ? (((parseFloat(billAmount) || 0) + (((parseFloat(billAmount) || 0) * tipPercentage) / 100)) / numTravelers) : 0)}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* 📝 Travel Diary & Idea Scratchpad */}
            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-800/50 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center mb-4 sm:mb-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  Travel Diary & Scratchpad
                </h2>
                <button
                  onClick={() => setIsAddingNote(!isAddingNote)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-1 shadow-md cursor-pointer"
                >
                  {isAddingNote ? "Close Form" : "+ Add Travel Note"}
                </button>
              </div>

              {/* Add Note Form */}
              {isAddingNote && (
                <form onSubmit={handleAddNote} className="mb-8 p-6 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/40 dark:to-slate-900/40 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-inner space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">Note Title</label>
                      <input
                        type="text"
                        placeholder="e.g., Goa beach checklist"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        required
                        className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">Category Tag</label>
                      <select
                        value={noteCategory}
                        onChange={(e) => setNoteCategory(e.target.value)}
                        className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100"
                      >
                        <option value="idea">💡 Trip Idea</option>
                        <option value="flight">✈️ Flight Info</option>
                        <option value="packing">📋 Packing List</option>
                        <option value="general">📝 General Travel Note</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">Note Details</label>
                    <textarea
                      rows="3"
                      placeholder="Jot down links, destinations, price lists, or checklists..."
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      required
                      className="w-full border-2 border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 cursor-pointer"
                  >
                    Save Note
                  </button>
                </form>
              )}

              {/* Notes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {diaryNotes.map((note) => (
                  <div key={note.id} className="bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-300 flex flex-col justify-between relative group">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50 uppercase text-[9px]">
                          {note.category === "idea" ? "💡 Trip Idea" : note.category === "flight" ? "✈️ Flight Info" : note.category === "packing" ? "📋 Packing List" : "📝 General"}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">{note.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{note.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{note.content}</p>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm focus:opacity-100 cursor-pointer"
                      title="Delete Note"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
