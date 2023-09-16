import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import {
  FaArchive,
  FaBox,
  FaCodepen,
  FaHome,
  FaSignOutAlt,
  FaStar,
  FaUserAlt,
} from "react-icons/fa";

const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <FaHome />,
    to: "/dashboard/",
    section: "",
  },
  {
    display: "Discover",
    icon: <FaStar />,
    to: "/dashboard/discover",
    section: "discover",
  },
  {
    display: "Courses",
    icon: <FaCodepen />,
    to: "/dashboard/courses",
    section: "courses",
  },
  {
    display: "Leaderboard",
    icon: <FaUserAlt />,
    to: "/dashboard/leaderboard",
    section: "leaderboard",
  },
  {
    display: "Feed",
    icon: <FaBox />,
    to: "/dashboard/feed",
    section: "feed",
  },
  {
    display: "Achievements",
    icon: <FaArchive />,
    to: "/dashboard/achievements",
    section: "achievements",
  },
  {
    display: "Logout",
    icon: <FaSignOutAlt />,
    to: "/dashboard/logout",
    section: "logout",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );

      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[2] || "";
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const signOut = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:3001/api/browserClose", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id }),
    });
    localStorage.removeItem("user");
    navigate("/student/signin");
  };

  return (
    <div className="sidebar border-r w-64 flex flex-col">
      <div className="sidebar__logo w-48 mx-auto mt-4 flex justify-center items-center">
        <img src="/assets/images/logo.png" alt="logo"></img>
      </div>
      <div ref={sidebarRef} className="sidebar__menu flex-1">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {sidebarNavItems.slice(0, -1).map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mb-4" onClick={signOut}>
        <Link to="/dashboard/logout">
          <div className="sidebar__menu__item">
            <div className="sidebar__menu__item__icon">
              <FaSignOutAlt />
            </div>
            <div className="sidebar__menu__item__text">Logout</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
