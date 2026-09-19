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
      <div className="bg-[#F4ECE1] border border-[#DECFC0] shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden text-left">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#DECFC0] flex items-center justify-between bg-[#FAF6F0]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#241E1A]">
                Host Desk & Guest Ledger
              </span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-[#8B3A26] text-[#FAF6F0]">
                Curator Portal
              </span>
            </div>
            <p className="text-xs text-[#6E6258] mt-0.5 font-light">
              Review live waitlist sign-ups, private dining inquiries, and correspondence.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#6E6258] hover:text-[#241E1A] hover:bg-[#F4ECE1] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher & Search Bar */}
        <div className="px-5 py-3 border-b border-[#DECFC0] bg-[#F4ECE1] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold">
            <button
              onClick={() => setActiveTab('waitlist')}
              className={`px-3 py-2 transition-colors border cursor-pointer ${
                activeTab === 'waitlist'
                  ? 'bg-[#8B3A26] text-[#FAF6F0] border-[#8B3A26]'
                  : 'text-[#6E6258] bg-[#FAF6F0] border-[#DECFC0] hover:text-[#241E1A]'
              }`}
            >
              Supper Club Waitlist ({waitlist.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3 py-2 transition-colors border cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-[#8B3A26] text-[#FAF6F0] border-[#8B3A26]'
                  : 'text-[#6E6258] bg-[#FAF6F0] border-[#DECFC0] hover:text-[#241E1A]'
              }`}
            >
              Private Events ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3 py-2 transition-colors border cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-[#8B3A26] text-[#FAF6F0] border-[#8B3A26]'
                  : 'text-[#6E6258] bg-[#FAF6F0] border-[#DECFC0] hover:text-[#241E1A]'
              }`}
            >
              Messages ({messages.length})
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9E8E81]" />
              <input
                type="text"
                placeholder="Search by name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF6F0] border border-[#DECFC0] focus:outline-none focus:border-[#8B3A26] text-[#241E1A] placeholder:text-[#9E8E81]"
              />
            </div>

            {activeTab === 'waitlist' && waitlist.length > 0 && (
              <button
                onClick={exportWaitlistCSV}
                className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold bg-[#FAF6F0] border border-[#DECFC0] hover:border-[#8B3A26] text-[#241E1A] flex items-center space-x-1 cursor-pointer"
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
                <div className="p-8 text-center text-[#6E6258] bg-[#FAF6F0] border border-[#DECFC0]">
                  <Users className="w-8 h-8 mx-auto text-[#8B3A26] mb-2 opacity-80" />
                  <p className="font-serif text-lg text-[#241E1A]">No waitlist entries found.</p>
                  <p className="text-xs mt-1 font-sans font-light">Submit the waitlist form on the website to see it appear here in real-time.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-[#DECFC0] bg-[#FAF6F0]">
                    <thead className="bg-[#F4ECE1] text-[#241E1A] uppercase text-[10px] tracking-wider border-b border-[#DECFC0]">
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
                    <tbody className="divide-y divide-[#DECFC0]">
                      {filteredWaitlist.map((item) => (
                        <tr key={item.id} className="hover:bg-[#F4ECE1]/60">
                          <td className="p-3 font-mono font-semibold text-[#8B3A26]">{item.id}</td>
                          <td className="p-3 font-medium text-[#241E1A]">{item.fullName}</td>
                          <td className="p-3">
                            <div className="text-[#241E1A]">{item.email}</div>
                            {item.phone && <div className="text-[#9E8E81] text-[10px]">{item.phone}</div>}
                          </td>
                          <td className="p-3 text-[#6E6258]">{item.city}</td>
                          <td className="p-3 font-semibold text-[#241E1A]">{item.partySize}</td>
                          <td className="p-3 text-[#6E6258] max-w-[200px] truncate" title={item.dietaryPreferences.join(', ')}>
                            {item.dietaryPreferences.join(', ')}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                              item.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'invited'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-[#F4ECE1] text-[#6E6258] border border-[#DECFC0]'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <select
                              value={item.status}
                              onChange={(e) => onUpdateWaitlistStatus(item.id, e.target.value as any)}
                              className="text-[11px] bg-[#FAF6F0] border border-[#DECFC0] px-1.5 py-0.5 text-[#241E1A]"
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
                <div className="p-8 text-center text-[#6E6258] bg-[#FAF6F0] border border-[#DECFC0]">
                  <Calendar className="w-8 h-8 mx-auto text-[#8B3A26] mb-2 opacity-80" />
                  <p className="font-serif text-lg text-[#241E1A]">No private event inquiries yet.</p>
                  <p className="text-xs mt-1 font-sans font-light">When someone submits an event inquiry, it will show up here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredInquiries.map((inq) => (
                    <div key={inq.id} className="p-4 bg-[#FAF6F0] border border-[#DECFC0] space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DECFC0] pb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-[#8B3A26]">{inq.id}</span>
                          <span className="font-semibold text-sm text-[#241E1A]">{inq.fullName}</span>
                          <span className="text-[#9E8E81]">({inq.email} • {inq.phone})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider bg-[#8B3A26]/10 text-[#8B3A26] px-2 py-0.5">
                            {inq.eventType.replace('_', ' ')}
                          </span>
                          <select
                            value={inq.status}
                            onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="text-[11px] bg-[#FAF6F0] border border-[#DECFC0] px-1.5 py-0.5 text-[#241E1A]"
                          >
                            <option value="new">New</option>
                            <option value="in_discussion">In Discussion</option>
                            <option value="booked">Booked</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#6E6258]">
                        <div><strong className="text-[#241E1A]">Guests:</strong> {inq.guestCount}</div>
                        <div><strong className="text-[#241E1A]">Date:</strong> {inq.preferredDate}</div>
                        <div><strong className="text-[#241E1A]">Location:</strong> {inq.locationOrVenue}</div>
                        <div><strong className="text-[#241E1A]">Dietary:</strong> {inq.dietaryRestrictions}</div>
                      </div>

                      {inq.storytellingNotes && (
                        <div className="p-3 bg-[#F4ECE1] text-xs text-[#6E6258] border-l-2 border-[#8B3A26]">
                          <strong className="text-[#241E1A]">Occasion & Vision:</strong> {inq.storytellingNotes}
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
                <div className="p-8 text-center text-[#6E6258] bg-[#FAF6F0] border border-[#DECFC0]">
                  <Mail className="w-8 h-8 mx-auto text-[#8B3A26] mb-2 opacity-80" />
                  <p className="font-serif text-lg text-[#241E1A]">No messages in the inbox.</p>
                  <p className="text-xs mt-1 font-sans font-light">Incoming inquiries from the Get in Touch section will display here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMessages.map((msg) => (
                    <div key={msg.id} className="p-4 bg-[#FAF6F0] border border-[#DECFC0] space-y-2">
                      <div className="flex items-center justify-between border-b border-[#DECFC0] pb-2">
                        <div>
                          <span className="font-semibold text-[#241E1A] text-sm">{msg.name}</span>
                          <span className="text-xs text-[#9E8E81] ml-2">&lt;{msg.email}&gt;</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-[#8B3A26]/10 text-[#8B3A26] px-2 py-0.5">
                          {msg.purpose.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-[#6E6258] whitespace-pre-wrap font-light">{msg.message}</p>
                      <div className="text-[10px] text-[#9E8E81]">
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
        <div className="p-4 border-t border-[#DECFC0] bg-[#FAF6F0] flex items-center justify-between text-xs text-[#6E6258]">
          <span>Data stored securely in local app ledger session.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#8B3A26] text-[#FAF6F0] hover:bg-[#1F1A16] text-[10px] font-semibold uppercase tracking-widest transition-colors cursor-pointer"
          >
            Close Desk
          </button>
        </div>
      </div>
    </div>
  );
};
