import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { leadsAPI } from '../services/api';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import { ToastContainer } from '../components/Toast';
import './Dashboard.css';

/**
 * Dashboard Page Component
 * Main admin panel for lead management
 * Updated: 2026-03-03 - Added detailed logging
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  
  // State management
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, converted: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: 'all', search: '' });
  const [selectedLead, setSelectedLead] = useState(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [toasts, setToasts] = useState([]);

  // Toast notification function
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Fetch functions with useCallback to prevent unnecessary re-renders
  const fetchLeads = useCallback(async () => {
    try {
      console.log('🔄 Fetching leads with filters:', filters);
      const response = await leadsAPI.getAll(filters);
      console.log('✅ Leads fetched:', response.data);
      setLeads(response.data.leads);
    } catch (error) {
      console.error('❌ Error fetching leads:', error);
      console.error('Error details:', error.response?.data || error.message);
      showToast(error.response?.data?.message || 'Error fetching leads', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters, showToast]);

  const fetchStats = useCallback(async () => {
    try {
      console.log('📊 Fetching stats...');
      const response = await leadsAPI.getStats();
      console.log('✅ Stats fetched:', response.data);
      setStats(response.data.stats);
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      console.error('Error details:', error.response?.data || error.message);
    }
  }, []);

  // Fetch leads and stats on component mount and when filters change
  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, [fetchLeads, fetchStats]);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await leadsAPI.update(leadId, { status: newStatus });
      fetchLeads();
      fetchStats();
      showToast('Lead status updated successfully', 'success');
    } catch (error) {
      showToast('Error updating lead status', 'error');
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;

    try {
      await leadsAPI.delete(leadId);
      fetchLeads();
      fetchStats();
      showToast('Lead deleted successfully', 'success');
    } catch (error) {
      showToast('Error deleting lead', 'error');
    }
  };

  const handleSaveNotes = async () => {
    try {
      await leadsAPI.update(selectedLead.id, { notes });
      fetchLeads();
      setIsNotesModalOpen(false);
      setSelectedLead(null);
      showToast('Notes saved successfully', 'success');
    } catch (error) {
      showToast('Error saving notes', 'error');
    }
  };

  const openNotesModal = (lead) => {
    setSelectedLead(lead);
    setNotes(lead.notes || '');
    setIsNotesModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      new: 'status-badge-new',
      contacted: 'status-badge-contacted',
      converted: 'status-badge-converted'
    };
    return classes[status] || '';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className="dashboard-container">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <span className="logo-icon">📊</span>
              <h1>Mini CRM</h1>
            </div>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-avatar">{admin?.username?.[0]?.toUpperCase()}</span>
              <span className="user-name">{admin?.username}</span>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Statistics Cards */}
        <section className="stats-section">
          <StatCard 
            title="Total Leads" 
            value={stats.total} 
            icon="📊" 
            color="#4F46E5" 
          />
          <StatCard 
            title="New Leads" 
            value={stats.new} 
            icon="✨" 
            color="#3b82f6" 
          />
          <StatCard 
            title="Contacted" 
            value={stats.contacted} 
            icon="📞" 
            color="#f59e0b" 
          />
          <StatCard 
            title="Converted" 
            value={stats.converted} 
            icon="✅" 
            color="#10b981" 
          />
        </section>

        {/* Leads Table Section */}
        <section className="leads-section">
          <div className="section-card">
            <div className="section-header">
              <h2>Lead Management</h2>
              <div className="header-actions">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                  <span className="search-icon">🔍</span>
                </div>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="status-filter"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                </select>
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>No leads found</h3>
                <p>There are no leads matching your filters</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="leads-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Source</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <div className="lead-name">{lead.name}</div>
                        </td>
                        <td>{lead.email}</td>
                        <td>{lead.phone || 'N/A'}</td>
                        <td>
                          <span className="source-badge">{lead.source}</span>
                        </td>
                        <td>
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`status-select ${getStatusBadgeClass(lead.status)}`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                          </select>
                        </td>
                        <td>{formatDate(lead.createdAt)}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-btn notes-btn"
                              onClick={() => openNotesModal(lead)}
                              title="Add/View Notes"
                            >
                              📝
                            </button>
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDeleteLead(lead.id)}
                              title="Delete Lead"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Notes Modal */}
      <Modal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        title={`Notes for ${selectedLead?.name}`}
      >
        <div className="notes-modal-content">
          <textarea
            className="notes-textarea"
            placeholder="Add follow-up notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="6"
          />
          <div className="modal-actions">
            <button
              className="btn-secondary"
              onClick={() => setIsNotesModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={handleSaveNotes}
            >
              Save Notes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
