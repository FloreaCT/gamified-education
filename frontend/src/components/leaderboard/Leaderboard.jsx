import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import UserTooltip from "./UserTooltip";
import axios from "axios"; // Make sure to install axios if you haven't

const Leaderboard = () => {
  const [tooltipUser, setTooltipUser] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [sortOption, setSortOption] = useState("level");
  const [timeframe, setTimeframe] = useState("weekly"); // 'weekly' or 'monthly'
  const [currentUser, setCurrentUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredLeaderboardData, setFilteredLeaderboardData] = useState([]);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentLeaderboardPage = filteredLeaderboardData.slice(
    startIndex,
    endIndex
  );

  const { user } = useContext(UserContext);

  const handleMouseEnter = (user) => {
    setTooltipUser(user);
  };

  const handleMouseLeave = () => {
    setTooltipUser(null);
  };

  useEffect(() => {
    const filteredData = leaderboardData.filter((entry) =>
      entry.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeaderboardData(filteredData);
  }, [leaderboardData, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  useEffect(() => {
    sortLeaderboard(sortOption);
  }, [sortOption]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/leaderboard",
          {
            params: {
              timeframe: timeframe,
            },
          }
        );
        const sortedData = [...response.data].sort((a, b) => b.level - a.level);
        const rankedData = sortedData.map((user, index) => ({
          ...user,
          rank: index + 1,
        }));
        setLeaderboardData(rankedData);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, [timeframe, currentPage, searchTerm]);

  const sortLeaderboard = (option) => {
    const sortedData = [...leaderboardData].sort(
      (a, b) => b[option] - a[option]
    );
    setLeaderboardData(sortedData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
      <div className="flex flex-col text-center items-center ">
        <div className="mb-4">
          <button
            className="mr-4 bg-teal-500 text-white px-4 py-2 rounded"
            onClick={() => setSortOption("weeklyXP")}
          >
            Weekly
          </button>
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded"
            onClick={() => setSortOption("monthlyXP")}
          >
            Monthly
          </button>
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="Search for a player..."
            className="w-full p-2 border-2 border-teal-500 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avatar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:cursor-pointer"
                      onClick={() => setSortOption("level")}
                    >
                      Level
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:cursor-pointer"
                      onClick={() => setSortOption("experience")}
                    >
                      Total XP
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:cursor-pointer"
                      onClick={() => setSortOption("weeklyXP")}
                    >
                      Weekly XP
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:cursor-pointer"
                      onClick={() => setSortOption("monthlyXP")}
                    >
                      Monthly XP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeaderboardPage.map((user, index) => {
                    let rowClass = "bg-white hover:bg-gray-200 cursor-pointer";

                    if (index === 0) {
                      rowClass =
                        "bg-yellow-500 text-white hover:bg-yellow-700 hover:text-white cursor-pointer";
                    } else if (index === 1) {
                      rowClass =
                        "bg-amber-800 text-white hover:bg-amber-600 hover:text-white cursor-pointer";
                    } else if (index === 2) {
                      rowClass =
                        "bg-neutral-700 text-white hover:bg-neutral-600 hover:text-white cursor-pointer";
                    } else if (user.username === currentUser.username) {
                      rowClass =
                        "bg-teal-500 text-white hover:bg-teal-700 hover:text-white cursor-pointer";
                    }

                    return (
                      <tr
                        key={index}
                        onMouseEnter={() => handleMouseEnter(user)}
                        onMouseLeave={handleMouseLeave}
                        className={rowClass}
                      >
                        <td>{user.rank}</td>
                        <td>
                          <img
                            src={user.avatar}
                            alt="Avatar"
                            className="rounded-xl w-8 inline-block my-1"
                          />
                        </td>
                        <td>{user.username}</td>
                        <td>{user.level}</td>
                        <td>{user.experience}</td>
                        <td>{user.weeklyXP}</td>
                        <td>{user.monthlyXP}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              className={`${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500"
                  : "bg-teal-500 text-white"
              } px-4 py-1 rounded mx-1 mt-2`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className={`${
                endIndex >= leaderboardData.length
                  ? "bg-gray-300 text-gray-500"
                  : "bg-teal-500 text-white"
              } px-4 py-1 rounded mx-1`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                searchTerm
                  ? endIndex >= filteredLeaderboardData.length
                  : endIndex >= leaderboardData.length
              }
            >
              Next
            </button>
          </div>
        </div>
        {tooltipUser && <UserTooltip user={tooltipUser} />}
      </div>
    </div>
  );
};

export default Leaderboard;
