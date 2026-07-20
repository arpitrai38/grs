import React, { useState, useEffect } from "react";
import axios from "axios";

const SessionManagement = () => {
  const [sessionValue, setSessionValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");

  const getSession = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/session/show");
      setSessions(res.data.session || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!sessionValue.trim()) {
      alert("Please Enter Session");
      return;
    }

    try {
      let res;
      if (isEditing) {
        res = await axios.put(
          `http://localhost:5000/api/session/${currentSessionId}`,
          { name: sessionValue }
        );
      } else {
        res = await axios.post(
          "http://localhost:5000/api/session/register",
          { name: sessionValue }
        );
      }

      alert(res.data.msg);
      setSessionValue("");
      setIsEditing(false);
      setCurrentSessionId(null);
      getSession();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentSessionId(item._id);
    setSessionValue(item.name);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Session?")) return;
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/session/${id}`
      );
      alert(res.data.msg);
      getSession();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentSessionId(null);
    setSessionValue('');
  };

  const filteredSession = (sessions || []).filter(
    (item) =>
      item &&
      item.name &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 'clamp(10px, 3vw, 20px)', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* 1. ADD / EDIT NEW SESSION FORM */}
      <div style={{
        maxWidth: '650px',
        margin: '0 auto 30px auto',
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: 'clamp(20px, 5vw, 30px)',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#1d4ed8', marginBottom: '25px', fontWeight: '700', fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
          {isEditing ? 'Update Session' : 'Add New Session'}
        </h2>
        
        <form onSubmit={handleSave} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#64748b', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
              Session Value
            </label>
            <input 
              type="text" 
              placeholder="Enter Session" 
              value={sessionValue}
              onChange={(e) => setSessionValue(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <button 
              type="submit"
              style={{
                flex: '1 1 150px',
                maxWidth: '200px',
                padding: '12px',
                backgroundColor: isEditing ? '#22c55e' : '#1d4ed8',
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {isEditing ? 'Update Session' : 'Save Session'}
            </button>

            {isEditing && (
              <button 
                type="button"
                onClick={handleCancelEdit}
                style={{
                  flex: '1 1 100px',
                  maxWidth: '120px',
                  padding: '12px',
                  backgroundColor: '#64748b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 2. REGISTERED SESSIONS TABLE CARD */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: 'clamp(15px, 4vw, 24px)',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h3 style={{ color: '#475569', marginBottom: '20px', fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', fontWeight: '700' }}>
          Registered Sessions
        </h3>

        {/* Table Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontSize: '14px', flex: '1 1 200px' }}>
            <select style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>entries per page</span>
          </div>
          
          <div style={{ flex: '1 1 200px', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '300px',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* The Table Wrapper (Enables smooth scrolling on mobile) */}
        <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                <th style={{ padding: '12px 8px' }}>S NO.</th>
                <th style={{ padding: '12px 8px' }}>SESSION</th>
                <th style={{ padding: '12px 8px' }}>CREATED BY</th>
                <th style={{ padding: '12px 8px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredSession.length > 0 ? (
                filteredSession.map((item, index) => (
                  <tr key={item._id || index} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                    <td style={{ padding: '16px 8px' }}>{index + 1}</td>
                    <td style={{ padding: '16px 8px', fontWeight: '500' }}>{item.name || '-'}</td>
                    <td style={{ padding: '16px 8px' }}>{item.createdBy || 'N/A'}</td>
                    <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        <button 
                          onClick={() => handleEditClick(item)} 
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#fff',
                            border: '1px solid #3b82f6',
                            color: '#3b82f6',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          📝 Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#fff',
                            border: '1px solid #ef4444',
                            color: '#ef4444',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ padding: '16px 8px', textAlign: 'center', color: '#64748b' }}>
                    No sessions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', color: '#64748b', fontSize: '14px', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ flex: '1 1 200px' }}>
            {filteredSession.length === 0
              ? `Showing 0 to 0 of ${sessions.length} entries`
              : `Showing 1 to ${filteredSession.length} of ${sessions.length} entries`}
          </div>
          <div style={{ display: 'flex', gap: '2px', flex: '1 1 150px', justifyContent: 'flex-start' }}>
            <button style={{ padding: '6px 10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', cursor: 'pointer', borderRadius: '4px 0 0 4px' }}>&laquo;</button>
            <button style={{ padding: '6px 10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', cursor: 'pointer' }}>&lsaquo;</button>
            <button style={{ padding: '6px 12px', border: '1px solid #1d4ed8', backgroundColor: '#1d4ed8', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>1</button>
            <button style={{ padding: '6px 10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', cursor: 'pointer' }}>&rsaquo;</button>
            <button style={{ padding: '6px 10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', cursor: 'pointer', borderRadius: '0 4px 4px 0' }}>&raquo;</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SessionManagement;