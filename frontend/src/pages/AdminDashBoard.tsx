// pages/AdminDashboard.tsx


export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content p-6">
      <h1 className="text-3xl font-bold mb-6">🎬 Admin Dashboard</h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              🎟️
            </div>
            <div className="stat-title text-2xl">Total Active Users</div>
            <div className="stat-value text-primary">12,583</div>
            <div className="stat-desc">+5.8% from last month</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              ⏰
            </div>
            <div className="stat-title text-2xl">Top Showtimes</div>
            <div className="stat-value text-secondary">125</div>
            <div className="stat-desc">+12 this week</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-accent">
              👥
            </div>
            <div className="stat-title text-2xl">Users per Showtime</div>
            <div className="stat-value text-accent">98</div>
            <div className="stat-desc">Stable</div>
          </div>
        </div>
      </div>

      {/* Top Movies & Upcoming Showtimes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="card-title">🎥 Top Movies</div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace these rows with map from top_movies */}
                <tr>
                  <td>101</td>
                  <td>Edge of Tomorrow</td>
                  <td>8.9</td>
                </tr>
                <tr>
                  <td>102</td>
                  <td>Interstellar</td>
                  <td>9.1</td>
                </tr>
                <tr>
                  <td>103</td>
                  <td>Inception</td>
                  <td>9.3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="card-title">📅 Upcoming Showtimes</div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Movie</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace these rows with map from upcoming_showtimes */}
                <tr>
                  <td>501</td>
                  <td>Dune Part II</td>
                  <td>2025-08-15</td>
                </tr>
                <tr>
                  <td>502</td>
                  <td>Blade Runner 2099</td>
                  <td>2025-09-02</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bookings Per Theater */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body">
          <div className="card-title">🏢 Bookings per Theater</div>
          <table className="table">
            <thead>
              <tr>
                <th>Theater</th>
                <th>City</th>
                <th>Bookings</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace with bookings_per_theater map */}
              <tr>
                <td>Majestic Cineplex</td>
                <td>Los Angeles</td>
                <td>2,105</td>
              </tr>
              <tr>
                <td>Grand Hall</td>
                <td>New York</td>
                <td>1,872</td>
              </tr>
              <tr>
                <td>Starlight Screens</td>
                <td>Chicago</td>
                <td>1,345</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
