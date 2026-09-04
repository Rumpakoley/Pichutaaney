import React, { useState } from 'react';
import { WaitlistEntry, PrivateEventInquiry, ContactMessage } from '../types';
import { X, Download, Filter, Search, Check, Clock, Mail, Users, Calendar, Sparkles } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const exportWaitlistCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'City', 'Party Size', 'Dietary', 'Submitted At', 'Status'];
    const rows = waitlist.map(e => [
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
    link.setAttribute('download', `pichhutaaney_waitlist_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredWaitlist = waitlist.filter(item =>
    item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInquiries = inquiries.filter(item =>
    item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.locationOrVenue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="bg-[#FAFAF9] border border-[#E4E4E7] shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden text-left">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E4E4E7] flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#18181B]">
                Host Desk & Guest Ledger
              </span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-[#853724] text-white">
                Curator Portal
              </span>
            </div>
            <p className="text-xs text-[#52525B] mt-0.5 font-light">
              Review live waitlist sign-ups, private dining inquiries, and correspondence.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#52525B] hover:text-[#18181B] hover:bg-[#FAFAF9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher & Search Bar */}
        <div className="px-5 py-3 border-b border-[#E4E4E7] bg-[#FAFAF9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold">
            <button
              onClick={() => setActiveTab('waitlist')}
              className={`px-3 py-2 transition-colors border ${
                activeTab === 'waitlist'
                  ? 'bg-[#853724] text-white border-[#853724]'
                  : 'text-[#52525B] bg-white border-[#E4E4E7] hover:text-[#18181B]'
              }`}
            >
              Supper Club Waitlist ({waitlist.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3 py-2 transition-colors border ${
                activeTab === 'inquiries'
                  ? 'bg-[#853724] text-white border-[#853724]'
                  : 'text-[#52525B] bg-white border-[#E4E4E7] hover:text-[#18181B]'
              }`}
            >
              Private Events ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3 py-2 transition-colors border ${
                activeTab === 'messages'
                  ? 'bg-[#853724] text-white border-[#853724]'
                  : 'text-[#52525B] bg-white border-[#E4E4E7] hover:text-[#18181B]'
              }`}
            >
              Messages ({messages.length})
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
              <input
                type="text"
                placeholder="Search by name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E4E4E7] focus:outline-none focus:border-[#18181B] text-[#18181B] placeholder:text-[#A1A1AA]"
              />
            </div>

            {activeTab === 'waitlist' && waitlist.length > 0 && (
              <button
                onClick={exportWaitlistCSV}
                className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold bg-white border border-[#E4E4E7] hover:border-[#18181B] text-[#18181B] flex items-center space-x-1"
                title="Export to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 text-xs">
          {activeTab === 'waitlist' && (
            <div className="space-y-3">
              {filteredWaitlist.length === 0 ? (
                <div className="p-8 text-center text-[#52525B] bg-white border border-[#E4E4E7]">
                  <Users className="w-8 h-8 mx-auto text-[#853724] mb-2 opacity-80" />
                  <p className="font-serif text-lg text-[#18181B]">No waitlist entries found.</p>
                  <p className="text-xs mt-1 font-sans font-light">Submit the waitlist form on the website to see it appear here in real-time.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-[#E4E4E7] bg-white">
                    <thead className="bg-[#FAFAF9] text-[#18181B] uppercase text-[10px] tracking-wider border-b border-[#E4E4E7]">
                      <tr>
                        <th className="p-3">Ref ID</th>
                        <th className="p-3">Guest Name</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">City</th>
                        <th className="p-3">Party</th>
                        <th className="p-3">Dietary</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E4E7]">
                      {filteredWaitlist.map((item) => (
                        <tr key={item.id} className="hover:bg-[#FAFAF9]/60">
                          <td className="p-3 font-mono font-semibold text-[#853724]">{item.id}</td>
                          <td className="p-3 font-medium text-[#18181B]">{item.fullName}</td>
                          <td className="p-3">
                            <div className="text-[#18181B]">{item.email}</div>
                            {item.phone && <div className="text-[#A1A1AA] text-[10px]">{item.phone}</div>}
                          </td>
                          <td className="p-3 text-[#52525B]">{item.city}</td>
                          <td className="p-3 font-semibold text-[#18181B]">{item.partySize}</td>
                          <td className="p-3 text-[#52525B] max-w-[200px] truncate" title={item.dietaryPreferences.join(', ')}>
                            {item.dietaryPreferences.join(', ')}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                              item.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'invited'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-[#FAFAF9] text-[#52525B] border border-[#E4E4E7]'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <select
                              value={item.status}
                              onChange={(e) => onUpdateWaitlistStatus(item.id, e.target.value as any)}
                              className="text-[11px] bg-white border border-[#E4E4E7] px-1.5 py-0.5 text-[#18181B]"
                            >
                              <option value="pending">Pending</option>
                              <option value="invited">Invited</option>
                              <option value="confirmed">Confirmed</option>
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
                <div className="p-8 text-center text-[#52525B] bg-white border border-[#E4E4E7]">
                  <Calendar className="w-8 h-8 mx-auto text-[#853724] mb-2 opacity-80" />
                  <p className="font-serif text-lg text-[#18181B]">No private event inquiries yet.</p>
                  <p className="text-xs mt-1 font-sans font-light">When someone submits an event inquiry, it will show up here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredInquiries.map((inq) => (
                    <div key={inq.id} className="p-4 bg-white border border-[#E4E4E7] space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E4E7] pb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-[#853724]">{inq.id}</span>
                          <span className="font-semibold text-sm text-[#18181B]">{inq.fullName}</span>
                          <span className="text-[#A1A1AA]">({inq.email} • {inq.phone})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider bg-[#853724]/10 text-[#853724] px-2 py-0.5">
                            {inq.eventType.replace('_', ' ')}
                          </span>
                          <select
                            value={inq.status}
                            onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="text-[11px] bg-white border border-[#E4E4E7] px-1.5 py-0.5 text-[#18181B]"
                          >
                            <option value="new">New</option>
                            <option value="in_discussion">In Discussion</option>
                            <option value="booked">Booked</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#52525B]">
                        <div><strong className="text-[#18181B]">Guests:</strong> {inq.guestCount}</div>
                        <div><strong className="text-[#18181B]">Date:</strong> {inq.preferredDate}</div>
                        <div><strong className="text-[#18181B]">Location:</strong> {inq.locationOrVenue}</div>
                        <div><strong className="text-[#18181B]">Dietary:</strong> {inq.dietaryRestrictions}</div>
                      </div>

                      {inq.storytellingNotes && (
                        <div className="p-3 bg-[#FAFAF9] text-xs text-[#52525B] border-l-2 border-[#853724]">
                          <strong className="text-[#18181B]">Occasion & Vision:</strong> {inq.storytellingNotes}
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
                <div className="p-8 text-center text-[#52525B] bg-white border border-[#E4E4E7]">
                  <Mail className="w-8 h-8 mx-auto text-[#853724] mb-2 opacity-80" />
                  <p className="font-serif text-lg text-[#18181B]">No messages in the inbox.</p>
                  <p className="text-xs mt-1 font-sans font-light">Incoming inquiries from the Get in Touch section will display here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMessages.map((msg) => (
                    <div key={msg.id} className="p-4 bg-white border border-[#E4E4E7] space-y-2">
                      <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-2">
                        <div>
                          <span className="font-semibold text-[#18181B] text-sm">{msg.name}</span>
                          <span className="text-xs text-[#A1A1AA] ml-2">&lt;{msg.email}&gt;</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-[#853724]/10 text-[#853724] px-2 py-0.5">
                          {msg.purpose.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-[#52525B] whitespace-pre-wrap font-light">{msg.message}</p>
                      <div className="text-[10px] text-[#A1A1AA]">
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
        <div className="p-4 border-t border-[#E4E4E7] bg-white flex items-center justify-between text-xs text-[#52525B]">
          <span>Data stored securely in local app ledger session.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#853724] text-white hover:bg-[#18181B] text-[10px] font-semibold uppercase tracking-widest transition-colors"
          >
            Close Desk
          </button>
        </div>
      </div>
    </div>
  );
};
