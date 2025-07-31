
export default function UserDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🎟️ Welcome back!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Upcoming Bookings</div>
            <div className="stat-value">3</div>
            <div className="stat-desc">1 this week</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Canceled</div>
            <div className="stat-value text-error">2</div>
            <div className="stat-desc">-1 this month</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total History</div>
            <div className="stat-value">12</div>
            <div className="stat-desc">+3 from last month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
