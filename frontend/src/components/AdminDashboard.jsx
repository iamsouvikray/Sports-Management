import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSport, setFilterSport] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/players');
      setPlayers(response.data);
    } catch (error) {
      setMessage('Failed to load players. Make sure the server is running.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePlayer = async (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      try {
        await axios.delete(`http://localhost:5000/api/players/${id}`);
        setPlayers(players.filter(p => p._id !== id));
        setMessage('Player deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Failed to delete player');
      }
    }
  };

  const exportToExcel = () => {
    const exportData = filteredPlayers.map(player => ({
      'Player Name': player.playerName,
      'Email': player.email,
      'Phone': player.phone,
      'Age': player.age,
      'Sport': player.sport,
      'Jersey Number': player.jersey_number || '-',
      'Position': player.position || '-',
      'Photo URL': `http://localhost:5000${player.imageUrl}`,
      'Registration Date': new Date(player.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Players');
    
    // Style the header and set column widths
    const wscols = [
      { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 8 },
      { wch: 15 }, { wch: 12 }, { wch: 15 }, { wch: 35 }, { wch: 15 }
    ];
    ws['!cols'] = wscols;

    XLSX.writeFile(wb, `Players_${new Date().toLocaleDateString()}.xlsx`);
    setMessage('Excel file downloaded successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.phone.includes(searchTerm);
    const matchesSport = filterSport === '' || player.sport === filterSport;
    return matchesSearch && matchesSport;
  });

  const sports = [...new Set(players.map(p => p.sport))];

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div> Loading...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all registered players</p>
      </div>

      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="dashboard-controls">
        <div className="controls-left">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select 
            value={filterSport}
            onChange={(e) => setFilterSport(e.target.value)}
            className="filter-select"
          >
            <option value="">All Sports</option>
            {sports.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </div>

        <button onClick={fetchPlayers} className="refresh-btn">🔄 Refresh</button>
        <button onClick={exportToExcel} className="export-btn">📊 Export to Excel</button>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number">{players.length}</div>
          <div className="stat-label">Total Players</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{sports.length}</div>
          <div className="stat-label">Sports</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{filteredPlayers.length}</div>
          <div className="stat-label">Filtered Results</div>
        </div>
      </div>

      {filteredPlayers.length === 0 ? (
        <div className="no-data">
          <p>No players found</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="players-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Player Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Sport</th>
                <th>Jersey #</th>
                <th>Position</th>
                <th>Registered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => (
                <tr key={player._id}>
                  <td>
                    <img 
                      src={`http://localhost:5000${player.imageUrl}`}
                      alt={player.playerName}
                      className="player-photo"
                    />
                  </td>
                  <td><strong>{player.playerName}</strong></td>
                  <td>{player.email}</td>
                  <td>{player.phone}</td>
                  <td>{player.age}</td>
                  <td><span className="sport-badge">{player.sport}</span></td>
                  <td>{player.jersey_number || '-'}</td>
                  <td>{player.position || '-'}</td>
                  <td>{new Date(player.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => deletePlayer(player._id)}
                      className="delete-btn"
                      title="Delete player"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
