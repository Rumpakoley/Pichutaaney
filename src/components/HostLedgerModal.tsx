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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="bg-[#E9E4DD] border border-[#DED8CF] rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden text-left">
        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-[#DED8CF] flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center space-x-3">
              <span className="font-marcellus text-2xl sm:text-3xl font-normal text-[#171716]">
                Host Desk & Guest Ledger
              </span>
              <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-[#2D2D2A] text-white rounded-full">
                Curator Portal
              </span>
            </div>
            <p className="text-xs text-[#55524E] mt-1 font-light">
              Review live waitlist sign-ups, private dining inquiries, and correspondence.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#E9E4DD] text-[#55524E] hover:text-[#171716] hover:bg-[#DED8CF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher & Search Bar */}
        <div className="px-6 py-4 border-b border-[#DED8CF] bg-[#FAF8F5] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider font-semibold">
            <button
              onClick={() => setActiveTab('waitlist')}
              className={`px-4 py-2 rounded-full transition-all border cursor-pointer ${
                activeTab === 'waitlist'
                  ? 'bg-[#2D2D2A] text-white border-[#2D2D2A] shadow-xs'
                  : 'text-[#55524E] bg-white border-[#DED8CF] hover:text-[#171716]'
              }`}
            >
              Supper Club ({waitlist.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 rounded-full transition-all border cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-[#2D2D2A] text-white border-[#2D2D2A] shadow-xs'
                  : 'text-[#55524E] bg-white border-[#DED8CF] hover:text-[#171716]'
              }`}
            >
              Private Events ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-full transition-all border cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-[#2D2D2A] text-white border-[#2D2D2A] shadow-xs'
                  : 'text-[#55524E] bg-white border-[#DED8CF] hover:text-[#171716]'
              }`}
            >
              Messages ({messages.length})
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C867D]" />
              <input
                type="text"
                placeholder="Search by name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-white border border-[#DED8CF] focus:outline-none focus:border-[#2D2D2A] text-[#171716] placeholder:text-[#8C867D]"
              />
            </div>

            {activeTab === 'waitlist' && waitlist.length > 0 && (
              <button
                onClick={exportWaitlistCSV}
                className="px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-white border border-[#DED8CF] hover:border-[#2D2D2A] text-[#171716] flex items-center space-x-1.5 cursor-pointer shadow-xs"
                title="Export to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {activeTab === 'waitlist' && (
            <div className="space-y-3">
              {filteredWaitlist.length === 0 ? (
                <div className="p-10 rounded-2xl text-center text-[#55524E] bg-white border border-[#DED8CF]">
                  <Users className="w-8 h-8 mx-auto text-[#2D2D2A] mb-2 opacity-80" />
                  <p className="font-marcellus text-xl text-[#171716]">No waitlist entries found.</p>
                  <p className="text-xs mt-1 font-sans font-light">Submit the waitlist form on the website to see it appear here in real-time.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-[#DED8CF] bg-white shadow-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#FAF8F5] text-[#171716] uppercase text-[10px] tracking-wider border-b border-[#DED8CF]">
                      <tr>
                        <th className="p-3.5">Ref ID</th>
                        <th className="p-3.5">Guest Name</th>
                        <th className="p-3.5">Contact</th>
                        <th className="p-3.5">City</th>
                        <th className="p-3.5">Party</th>
                        <th className="p-3.5">Dietary</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DED8CF]">
                      {filteredWaitlist.map((item) => (
                        <tr key={item.id} className="hover:bg-[#FAF8F5]">
                          <td className="p-3.5 font-mono font-semibold text-[#171716]">{item.id}</td>
                          <td className="p-3.5 font-medium text-[#171716]">{item.fullName}</td>
                          <td className="p-3.5">
                            <div className="text-[#171716]">{item.email}</div>
                            {item.phone && <div className="text-[#8C867D] text-[10px]">{item.phone}</div>}
                          </td>
                          <td className="p-3.5 text-[#55524E]">{item.city}</td>
                          <td className="p-3.5 font-semibold text-[#171716]">{item.partySize}</td>
                          <td className="p-3.5 text-[#55524E] max-w-[200px] truncate" title={item.dietaryPreferences.join(', ')}>
                            {item.dietaryPreferences.join(', ')}
                          </td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                              item.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'invited'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-[#E9E4DD] text-[#55524E] border border-[#DED8CF]'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <select
                              value={item.status}
                              onChange={(e) => onUpdateWaitlistStatus(item.id, e.target.value as any)}
                              className="text-[11px] bg-white border border-[#DED8CF] rounded-full px-2 py-1 text-[#171716]"
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
                <div className="p-10 rounded-2xl text-center text-[#55524E] bg-white border border-[#DED8CF]">
                  <Calendar className="w-8 h-8 mx-auto text-[#2D2D2A] mb-2 opacity-80" />
                  <p className="font-marcellus text-xl text-[#171716]">No private event inquiries yet.</p>
                  <p className="text-xs mt-1 font-sans font-light">When someone submits an event inquiry, it will show up here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredInquiries.map((inq) => (
                    <div key={inq.id} className="p-5 bg-white rounded-2xl border border-[#DED8CF] space-y-3 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DED8CF] pb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-[#171716]">{inq.id}</span>
                          <span className="font-semibold text-sm text-[#171716]">{inq.fullName}</span>
                          <span className="text-[#8C867D]">({inq.email} • {inq.phone})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] uppercase font-semibold tracking-wider bg-[#E9E4DD] text-[#171716] px-3 py-1 rounded-full">
                            {inq.eventType.replace('_', ' ')}
                          </span>
                          <select
                            value={inq.status}
                            onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="text-[11px] bg-white border border-[#DED8CF] rounded-full px-2 py-1 text-[#171716]"
                          >
                            <option value="new">New</option>
                            <option value="in_discussion">In Discussion</option>
                            <option value="booked">Booked</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#55524E]">
                        <div><strong className="text-[#171716]">Guests:</strong> {inq.guestCount}</div>
                        <div><strong className="text-[#171716]">Date:</strong> {inq.preferredDate}</div>
                        <div><strong className="text-[#171716]">Location:</strong> {inq.locationOrVenue}</div>
                        <div><strong className="text-[#171716]">Dietary:</strong> {inq.dietaryRestrictions}</div>
                      </div>

                      {inq.storytellingNotes && (
                        <div className="p-3.5 bg-[#FAF8F5] rounded-xl text-xs text-[#55524E] border border-[#DED8CF]">
                          <strong className="text-[#171716]">Occasion & Vision:</strong> {inq.storytellingNotes}
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
                <div className="p-10 rounded-2xl text-center text-[#55524E] bg-white border border-[#DED8CF]">
                  <Mail className="w-8 h-8 mx-auto text-[#2D2D2A] mb-2 opacity-80" />
                  <p className="font-marcellus text-xl text-[#171716]">No messages in the inbox.</p>
                  <p className="text-xs mt-1 font-sans font-light">Incoming inquiries from the Get in Touch section will display here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMessages.map((msg) => (
                    <div key={msg.id} className="p-5 bg-white rounded-2xl border border-[#DED8CF] space-y-2 shadow-xs">
                      <div className="flex items-center justify-between border-b border-[#DED8CF] pb-2">
                        <div>
                          <span className="font-semibold text-[#171716] text-sm">{msg.name}</span>
                          <span className="text-xs text-[#8C867D] ml-2">&lt;{msg.email}&gt;</span>
                        </div>
                        <span className="text-[10px] uppercase font-semibold tracking-wider bg-[#E9E4DD] text-[#171716] px-3 py-1 rounded-full">
                          {msg.purpose.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-[#55524E] whitespace-pre-wrap font-light">{msg.message}</p>
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
        <div className="p-4 border-t border-[#DED8CF] bg-white flex items-center justify-between text-xs text-[#55524E]">
          <span>Data stored securely in local app ledger session.</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#2D2D2A] text-white hover:bg-[#171716] text-[11px] font-medium uppercase tracking-widest transition-colors cursor-pointer shadow-sm"
          >
            Close Desk
          </button>
        </div>
      </div>
    </div>
  );
};
