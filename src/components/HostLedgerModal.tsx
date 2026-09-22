import React, { useState } from 'react';
import { WaitlistEntry, PrivateEventInquiry, ContactMessage } from '../types';
import { X, Download, Filter, Search, Check, Clock, Mail, Users, Calendar, Star, Copy, Sparkles, CheckCircle2 } from 'lucide-react';

interface HostLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  waitlist: WaitlistEntry[];
  inquiries: PrivateEventInquiry[];
  messages: ContactMessage[];
  onUpdateWaitlistStatus: (id: string, status: WaitlistEntry['status']) => void;
  onUpdateInquiryStatus: (id: string, status: PrivateEventInquiry['status']) => void;
}

export const HostLedgerModal: React.FC<HostLedgerModalProps> = ({
  isOpen,
  onClose,
  waitlist,
  inquiries,
  messages,
  onUpdateWaitlistStatus,
  onUpdateInquiryStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'waitlist' | 'inquiries' | 'messages'>('waitlist');
  const [statusFilter, setStatusFilter] = useState<'all' | 'shortlisted' | 'pending' | 'invited' | 'confirmed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const shortlistedWaitlistCount = waitlist.filter(w => w.status === 'shortlisted').length;
  const confirmedWaitlistCount = waitlist.filter(w => w.status === 'confirmed').length;
  const shortlistedInquiriesCount = inquiries.filter(i => i.status === 'shortlisted').length;

  const handleCopyShortlistedEmails = () => {
    const list = activeTab === 'waitlist'
      ? waitlist.filter(w => w.status === 'shortlisted')
      : inquiries.filter(i => i.status === 'shortlisted');

    const emails = list.map(item => item.email).filter(Boolean);

    if (emails.length === 0) {
      setCopiedMessage('No guests shortlisted yet. Click the ⭐ star on any guest to shortlist them!');
      setTimeout(() => setCopiedMessage(null), 3000);
      return;
    }

    navigator.clipboard.writeText(emails.join(', '));
    setCopiedMessage(`✓ Copied ${emails.length} shortlisted email${emails.length > 1 ? 's' : ''} to clipboard! Ready to paste into Gmail.`);
    setTimeout(() => setCopiedMessage(null), 3500);
  };

  const exportWaitlistCSV = (onlyShortlisted: boolean = false) => {
    const source = onlyShortlisted ? waitlist.filter(e => e.status === 'shortlisted') : waitlist;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'City', 'Party Size', 'Dietary', 'Submitted At', 'Status'];
    const rows = source.map(e => [
      e.id,
      `"${e.fullName}"`,
      e.email,
      e.phone || '',
      `"${e.city}"`,
      e.partySize,
      `"${e.dietaryPreferences.join(';')}"`,
      e.submittedAt,
      e.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pichhutaaney_${onlyShortlisted ? 'shortlist' : 'waitlist'}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleWaitlistShortlist = (item: WaitlistEntry) => {
    if (item.status === 'shortlisted') {
      onUpdateWaitlistStatus(item.id, 'pending');
    } else {
      onUpdateWaitlistStatus(item.id, 'shortlisted');
    }
  };

  const toggleInquiryShortlist = (item: PrivateEventInquiry) => {
    if (item.status === 'shortlisted') {
      onUpdateInquiryStatus(item.id, 'new');
    } else {
      onUpdateInquiryStatus(item.id, 'shortlisted');
    }
  };

  const filteredWaitlist = waitlist.filter(item => {
    const matchesSearch =
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && item.status === statusFilter;
  });

  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch =
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationOrVenue.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'shortlisted') return matchesSearch && item.status === 'shortlisted';
    if (statusFilter === 'pending') return matchesSearch && item.status === 'new';
    if (statusFilter === 'invited') return matchesSearch && item.status === 'in_discussion';
    if (statusFilter === 'confirmed') return matchesSearch && item.status === 'booked';
    return matchesSearch;
  });

  const filteredMessages = messages.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="bg-[#ECE5DA] border border-[#D5CBBD] rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden text-left">
        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-[#D5CBBD] flex items-center justify-between bg-[#F7F3EC]">
          <div>
            <div className="flex items-center space-x-3">
              <span className="font-marcellus text-2xl sm:text-3xl font-normal text-[#28221D]">
                Host Desk & Guest Ledger
              </span>
              <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-[#28221D] text-[#ECE5DA] rounded-full">
                Curator Portal
              </span>
            </div>
            <p className="text-xs text-[#655B51] mt-1 font-light">
              Review real-time reservation requests, 1-click ⭐ shortlist candidate guests, and batch-notify directly.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#ECE5DA] text-[#655B51] hover:text-[#28221D] hover:bg-[#DFD7CB] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats & Shortlist Summary Bar */}
        <div className="px-6 py-3 bg-[#E4DC CE] bg-[#E3D9CC] border-b border-[#D5CBBD] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-4">
            <span className="text-[#655B51]">
              Total Requests: <strong className="text-[#28221D]">{waitlist.length + inquiries.length}</strong>
            </span>
            <span className="text-[#B58D59] font-semibold flex items-center gap-1 bg-[#F7F3EC] px-2.5 py-1 rounded-full border border-[#B58D59]/30">
              <Star className="w-3.5 h-3.5 fill-[#B58D59] text-[#B58D59]" />
              ⭐ Shortlisted: <strong>{shortlistedWaitlistCount + shortlistedInquiriesCount}</strong>
            </span>
            <span className="text-emerald-800 font-semibold bg-[#F7F3EC] px-2.5 py-1 rounded-full border border-emerald-300">
              ✓ Confirmed: <strong>{confirmedWaitlistCount}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyShortlistedEmails}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#28221D] text-[#ECE5DA] hover:bg-[#1C1713] flex items-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
              title="Copy emails of all shortlisted guests"
            >
              <Copy className="w-3.5 h-3.5 text-[#B58D59]" />
              <span>Copy Shortlisted Emails</span>
            </button>

            {activeTab === 'waitlist' && waitlist.length > 0 && (
              <button
                onClick={() => exportWaitlistCSV(false)}
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#F7F3EC] border border-[#D5CBBD] hover:border-[#28221D] text-[#28221D] flex items-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
                title="Export all to CSV"
              >
                <Download className="w-3.5 h-3.5 text-[#655B51]" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* Feedback Alert if copied */}
        {copiedMessage && (
          <div className="px-6 py-2 bg-[#28221D] text-[#ECE5DA] text-xs font-mono flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B58D59]" />
              <span>{copiedMessage}</span>
            </div>
            <button onClick={() => setCopiedMessage(null)} className="text-[#ECE5DA]/60 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Tab switcher & Search & Filter Bar */}
        <div className="px-6 py-3.5 border-b border-[#D5CBBD] bg-[#ECE5DA] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Main tabs */}
          <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider font-semibold">
            <button
              onClick={() => {
                setActiveTab('waitlist');
                setStatusFilter('all');
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${
                activeTab === 'waitlist'
                  ? 'bg-[#28221D] text-[#ECE5DA] border-[#28221D] shadow-xs'
                  : 'text-[#655B51] bg-[#F7F3EC] border-[#D5CBBD] hover:text-[#28221D]'
              }`}
            >
              Supper Club ({waitlist.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('inquiries');
                setStatusFilter('all');
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-[#28221D] text-[#ECE5DA] border-[#28221D] shadow-xs'
                  : 'text-[#655B51] bg-[#F7F3EC] border-[#D5CBBD] hover:text-[#28221D]'
              }`}
            >
              Private Events ({inquiries.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('messages');
                setStatusFilter('all');
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-[#28221D] text-[#ECE5DA] border-[#28221D] shadow-xs'
                  : 'text-[#655B51] bg-[#F7F3EC] border-[#D5CBBD] hover:text-[#28221D]'
              }`}
            >
              Messages ({messages.length})
            </button>
          </div>

          {/* Filter Pills & Search */}
          <div className="flex flex-wrap items-center gap-2">
            {activeTab !== 'messages' && (
              <div className="flex items-center space-x-1 text-[10px] font-sans">
                {(['all', 'shortlisted', 'pending', 'invited', 'confirmed'] as const).map((filterKey) => (
                  <button
                    key={filterKey}
                    onClick={() => setStatusFilter(filterKey)}
                    className={`px-2.5 py-1 rounded-full capitalize transition-colors cursor-pointer border ${
                      statusFilter === filterKey
                        ? filterKey === 'shortlisted'
                          ? 'bg-[#B58D59] text-[#1C1713] border-[#B58D59] font-bold shadow-xs'
                          : 'bg-[#28221D] text-[#ECE5DA] border-[#28221D] font-bold'
                        : 'bg-[#F7F3EC] text-[#655B51] border-[#D5CBBD] hover:text-[#28221D]'
                    }`}
                  >
                    {filterKey === 'shortlisted' ? '⭐ Shortlisted' : filterKey}
                  </button>
                ))}
              </div>
            )}

            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C867D]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-[#F7F3EC] border border-[#D5CBBD] focus:outline-none focus:border-[#28221D] text-[#28221D] placeholder:text-[#8C867D]"
              />
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {activeTab === 'waitlist' && (
            <div className="space-y-3">
              {filteredWaitlist.length === 0 ? (
                <div className="p-10 rounded-2xl text-center text-[#655B51] bg-[#F7F3EC] border border-[#D5CBBD]">
                  <Users className="w-8 h-8 mx-auto text-[#28221D] mb-2 opacity-80" />
                  <p className="font-marcellus text-xl text-[#28221D]">No waitlist entries matching filter.</p>
                  <p className="text-xs mt-1 font-sans font-light">Change filters or submit a new reservation request on the site.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-[#D5CBBD] bg-[#F7F3EC] shadow-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#ECE5DA] text-[#28221D] uppercase text-[10px] tracking-wider border-b border-[#D5CBBD]">
                      <tr>
                        <th className="p-3 text-center">Shortlist</th>
                        <th className="p-3">Ref ID</th>
                        <th className="p-3">Guest Name</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">City</th>
                        <th className="p-3">Party</th>
                        <th className="p-3">Dietary</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Status Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D5CBBD]">
                      {filteredWaitlist.map((item) => (
                        <tr key={item.id} className={`hover:bg-[#ECE5DA]/60 transition-colors ${item.status === 'shortlisted' ? 'bg-[#FFF9EE]' : ''}`}>
                          {/* 1-Click Shortlist Button */}
                          <td className="p-3 text-center">
                            <button
                              onClick={() => toggleWaitlistShortlist(item)}
                              className={`p-1.5 rounded-lg transition-transform hover:scale-110 cursor-pointer ${
                                item.status === 'shortlisted'
                                  ? 'text-[#B58D59] bg-[#B58D59]/15'
                                  : 'text-[#8C867D] hover:text-[#B58D59]'
                              }`}
                              title={item.status === 'shortlisted' ? 'Click to remove from shortlist' : 'Click to 1-Click Shortlist!'}
                            >
                              <Star className={`w-4 h-4 ${item.status === 'shortlisted' ? 'fill-[#B58D59]' : ''}`} />
                            </button>
                          </td>
                          <td className="p-3 font-mono font-semibold text-[#28221D]">{item.id}</td>
                          <td className="p-3 font-medium text-[#28221D]">{item.fullName}</td>
                          <td className="p-3">
                            <div className="text-[#28221D] font-mono">{item.email}</div>
                            {item.phone && <div className="text-[#8C867D] text-[10px]">{item.phone}</div>}
                          </td>
                          <td className="p-3 text-[#655B51]">{item.city}</td>
                          <td className="p-3 font-semibold text-[#28221D]">{item.partySize}</td>
                          <td className="p-3 text-[#655B51] max-w-[180px] truncate" title={item.dietaryPreferences.join(', ')}>
                            {item.dietaryPreferences.join(', ')}
                          </td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-semibold uppercase tracking-wider ${
                              item.status === 'shortlisted'
                                ? 'bg-[#B58D59] text-[#1C1713] font-bold'
                                : item.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'invited'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-[#ECE5DA] text-[#655B51] border border-[#D5CBBD]'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <select
                              value={item.status}
                              onChange={(e) => onUpdateWaitlistStatus(item.id, e.target.value as any)}
                              className="text-[11px] bg-white border border-[#D5CBBD] rounded-full px-2 py-1 text-[#28221D] cursor-pointer"
                            >
                              <option value="pending">Pending</option>
                              <option value="shortlisted">⭐ Shortlisted</option>
                              <option value="invited">Invited</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-3">
              {filteredInquiries.length === 0 ? (
                <div className="p-10 rounded-2xl text-center text-[#655B51] bg-[#F7F3EC] border border-[#D5CBBD]">
                  <Calendar className="w-8 h-8 mx-auto text-[#28221D] mb-2 opacity-80" />
                  <p className="font-marcellus text-xl text-[#28221D]">No private event inquiries matching filter.</p>
                  <p className="text-xs mt-1 font-sans font-light">When someone submits an event inquiry, it will show up here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredInquiries.map((inq) => (
                    <div key={inq.id} className={`p-5 bg-[#F7F3EC] rounded-2xl border border-[#D5CBBD] space-y-3 shadow-xs transition-colors ${inq.status === 'shortlisted' ? 'bg-[#FFF9EE] border-[#B58D59]' : ''}`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D5CBBD] pb-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleInquiryShortlist(inq)}
                            className={`p-1.5 rounded-lg transition-transform hover:scale-110 cursor-pointer ${
                              inq.status === 'shortlisted'
                                ? 'text-[#B58D59] bg-[#B58D59]/15'
                                : 'text-[#8C867D] hover:text-[#B58D59]'
                            }`}
                            title={inq.status === 'shortlisted' ? 'Remove from shortlist' : '1-Click Shortlist!'}
                          >
                            <Star className={`w-4 h-4 ${inq.status === 'shortlisted' ? 'fill-[#B58D59]' : ''}`} />
                          </button>
                          <span className="font-mono text-xs font-bold text-[#28221D]">{inq.id}</span>
                          <span className="font-semibold text-sm text-[#28221D]">{inq.fullName}</span>
                          <span className="text-[#8C867D]">({inq.email} • {inq.phone})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] uppercase font-semibold tracking-wider bg-[#ECE5DA] text-[#28221D] px-3 py-1 rounded-full">
                            {inq.eventType.replace('_', ' ')}
                          </span>
                          <select
                            value={inq.status}
                            onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="text-[11px] bg-white border border-[#D5CBBD] rounded-full px-2 py-1 text-[#28221D] cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="shortlisted">⭐ Shortlisted</option>
                            <option value="in_discussion">In Discussion</option>
                            <option value="booked">Booked</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#655B51]">
                        <div><strong className="text-[#28221D]">Guests:</strong> {inq.guestCount}</div>
                        <div><strong className="text-[#28221D]">Date:</strong> {inq.preferredDate}</div>
                        <div><strong className="text-[#28221D]">Location:</strong> {inq.locationOrVenue}</div>
                        <div><strong className="text-[#28221D]">Dietary:</strong> {inq.dietaryRestrictions}</div>
                      </div>

                      {inq.storytellingNotes && (
                        <div className="p-3.5 bg-[#ECE5DA] rounded-xl text-xs text-[#655B51] border border-[#D5CBBD]">
                          <strong className="text-[#28221D]">Occasion & Vision:</strong> {inq.storytellingNotes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-3">
              {filteredMessages.length === 0 ? (
                <div className="p-10 rounded-2xl text-center text-[#655B51] bg-[#F7F3EC] border border-[#D5CBBD]">
                  <Mail className="w-8 h-8 mx-auto text-[#28221D] mb-2 opacity-80" />
                  <p className="font-marcellus text-xl text-[#28221D]">No messages in the inbox.</p>
                  <p className="text-xs mt-1 font-sans font-light">Incoming inquiries from the Get in Touch section will display here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMessages.map((msg) => (
                    <div key={msg.id} className="p-5 bg-[#F7F3EC] rounded-2xl border border-[#D5CBBD] space-y-2 shadow-xs">
                      <div className="flex items-center justify-between border-b border-[#D5CBBD] pb-2">
                        <div>
                          <span className="font-semibold text-[#28221D] text-sm">{msg.name}</span>
                          <span className="text-xs text-[#8C867D] ml-2">&lt;{msg.email}&gt;</span>
                        </div>
                        <span className="text-[10px] uppercase font-semibold tracking-wider bg-[#ECE5DA] text-[#28221D] px-3 py-1 rounded-full">
                          {msg.purpose.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-[#655B51] whitespace-pre-wrap font-light">{msg.message}</p>
                      <div className="text-[10px] text-[#8C867D]">
                        Received: {new Date(msg.submittedAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#D5CBBD] bg-[#F7F3EC] flex items-center justify-between text-xs text-[#655B51]">
          <span>Data stored securely in local app ledger session.</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#28221D] text-[#ECE5DA] hover:bg-[#1C1713] text-[11px] font-medium uppercase tracking-widest transition-colors cursor-pointer shadow-sm"
          >
            Close Desk
          </button>
        </div>
      </div>
    </div>
  );
};
