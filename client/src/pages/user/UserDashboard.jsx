import "./UserDashboard.css";
import UserSidebar from "../../assets/components/User/UserSidebar";
import UserTopbar from "../../assets/components/User/UserTopbar";

const UserDashboard = () => {
  const cards = [
    {
      badgeText: "User's",
      badgeCount: 0,
      title: "My Complaints",
      icon: "bi-people-fill",
      link: "/user/my-complaints",
    },
    {
      badgeText: "Pending",
      badgeCount: 0,
      title: "Pending Complaints",
      icon: "bi-clock",
      link: "/user/pending",
    },
    {
      badgeText: "Closed Comp.",
      badgeCount: 1,
      title: "Closed Complaints",
      icon: "bi-exclamation-circle-fill",
      link: "/user/closed",
    },
  ];

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content Area */}
      <div className="content">
        {/* Topbar */}
        <UserTopbar />

        {/* Dashboard Grid Container */}
        <div className="student-dashboard-container">
          <div className="cards-wrapper">
            {cards.map((card, index) => (
              <div className="student-card" key={index}>
                {/* Custom Badge at Top */}
                <div className="card-badge">
                  <span className="badge-text">{card.badgeText}</span>
                  <span className="badge-count">{card.badgeCount}</span>
                </div>

                {/* Card Title */}
                <h3>{card.title}</h3>

                {/* Pink/Magenta Icon */}
                <div className="card-icon-container">
                  <i className={`bi ${card.icon}`}></i>
                </div>

                {/* Teal Check Button */}
                <button
                  className="check-btn"
                  onClick={() => (window.location.href = card.link)}
                >
                  Check
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;