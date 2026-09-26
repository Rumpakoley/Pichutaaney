import React, { useState } from 'react';
import { WaitlistEntry, PrivateEventInquiry, ContactMessage, FormCustomQuestion, MenuVenueNotice, CuratorDialogueItem } from '../types';
import { X, Download, Filter, Search, Check, Clock, Mail, Users, Calendar, Star, Copy, Sparkles, CheckCircle2, Sliders, Plus, Trash2, MessageSquareText } from 'lucide-react';

interface HostLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  waitlist: WaitlistEntry[];
  inquiries: PrivateEventInquiry[];
  messages: ContactMessage[];
  onUpdateWaitlistStatus: (id: string, status: WaitlistEntry['status']) => void;
  onUpdateInquiryStatus: (id: string, status: PrivateEventInquiry['status']) => void;
  customQuestions?: FormCustomQuestion[];
  menuNotice?: MenuVenueNotice;
  dialogues?: CuratorDialogueItem[];
  onUpdateCustomQuestions?: (questions: FormCustomQuestion[]) => void;
  onUpdateMenuNotice?: (notice: MenuVenueNotice) => void;
  onUpdateDialogues?: (dialogues: CuratorDialogueItem[]) => void;
}

export const HostLedgerModal: React.FC<HostLedgerModalProps> = ({
  isOpen,
  onClose,
  waitlist,
  inquiries,
  messages,
  onUpdateWaitlistStatus,
  onUpdateInquiryStatus,
  customQuestions = [],
  menuNotice = { isActive: false, heading: '', note: '' },
  dialogues = [],
  onUpdateCustomQuestions,
  onUpdateMenuNotice,
  onUpdateDialogues,
}) => {
  const [activeTab, setActiveTab] = useState<'waitlist' | 'inquiries' | 'messages' | 'settings'>('waitlist');
  const [statusFilter, setStatusFilter] = useState<'all' | 'shortlisted' | 'pending' | 'invited' | 'confirmed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  // Form customizer state
  const [newQuestionLabel, setNewQuestionLabel] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<'text' | 'yes_no' | 'dropdown'>('text');
  const [newQuestionOptions, setNewQuestionOptions] = useState('');
  const [newQuestionRequired, setNewQuestionRequired] = useState(false);

  // Dialogue editor state
  const [newDialogueQ, setNewDialogueQ] = useState('');
  const [newDialogueA, setNewDialogueA] = useState('');

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
            <button
              onClick={() => {
                setActiveTab('settings');
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all border cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'settings'
                  ? 'bg-[#B58D59] text-[#1C1713] border-[#B58D59] font-bold shadow-xs'
                  : 'text-[#655B51] bg-[#F7F3EC] border-[#D5CBBD] hover:text-[#28221D]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Menu & Questions ({customQuestions.length})</span>
            </button>
          </div>

          {/* Filter Pills & Search */}
          <div className="flex flex-wrap items-center gap-2">
            {activeTab !== 'messages' && activeTab !== 'settings' && (
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

          {/* TAB 4: MENU & QUESTIONS SETTINGS */}
          {activeTab === 'settings' && (
            <div className="p-6 space-y-8 animate-in fade-in duration-200 text-left">
              {/* Notice Banner Editor */}
              <div className="bg-[#ECE5DA] border border-[#D5CBBD] rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5CBBD] pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B58D59] font-bold">
                      CURRENT MENU & VENUE ANNOUNCEMENT
                    </span>
                    <h3 className="font-marcellus text-xl sm:text-2xl text-[#28221D]">
                      Menu & Venue Notice on Reservation Form
                    </h3>
                    <p className="text-xs text-[#655B51] font-light">
                      This note displays prominently at the top of the reservation form. Update it anytime you change the menu, pricing, timings, or venue address.
                    </p>
                  </div>
                  <label className="flex items-center space-x-2 cursor-pointer bg-[#F7F3EC] px-3.5 py-2 rounded-full border border-[#D5CBBD] hover:border-[#B58D59] transition-colors shrink-0">
                    <input
                      type="checkbox"
                      checked={menuNotice.isActive}
                      onChange={(e) => {
                        onUpdateMenuNotice?.({ ...menuNotice, isActive: e.target.checked });
                      }}
                      className="rounded accent-[#B58D59]"
                    />
                    <span className="text-xs font-semibold text-[#28221D]">
                      {menuNotice.isActive ? 'Active (Visible on Form)' : 'Hidden (Draft)'}
                    </span>
                  </label>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                      Banner Heading
                    </label>
                    <input
                      type="text"
                      value={menuNotice.heading}
                      onChange={(e) => {
                        onUpdateMenuNotice?.({ ...menuNotice, heading: e.target.value });
                      }}
                      placeholder="e.g. Upcoming Autumn Supper Club • 5-Course Heritage Tasting"
                      className="w-full bg-[#F7F3EC] border border-[#D5CBBD] rounded-full px-4 py-2 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans"
                    />
                  </div>

                  <div>
                    <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                      Special Venue / Menu Instructions & Details
                    </label>
                    <textarea
                      rows={3}
                      value={menuNotice.note}
                      onChange={(e) => {
                        onUpdateMenuNotice?.({ ...menuNotice, note: e.target.value });
                      }}
                      placeholder="e.g. Seating promptly at 7:00 PM. BYOB welcome. Location details and secret buzzer code provided upon confirmation."
                      className="w-full bg-[#F7F3EC] border border-[#D5CBBD] rounded-2xl p-3 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Questions Builder */}
              <div className="bg-[#F7F3EC] border border-[#D5CBBD] rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5CBBD] pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B58D59] font-bold">
                      FORM QUESTIONS BUILDER
                    </span>
                    <h3 className="font-marcellus text-xl sm:text-2xl text-[#28221D]">
                      Custom Questions for Guests
                    </h3>
                    <p className="text-xs text-[#655B51] font-light">
                      Add, edit, enable, or delete questions. Guests will answer these when booking.
                    </p>
                  </div>
                </div>

                {/* Existing Questions List */}
                <div className="space-y-3">
                  {customQuestions.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#8C867D] bg-[#ECE5DA]/50 rounded-2xl border border-dashed border-[#D5CBBD]">
                      No custom questions yet. Add your first question below!
                    </div>
                  ) : (
                    customQuestions.map((q, idx) => (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          q.enabled
                            ? 'bg-[#ECE5DA] border-[#D5CBBD]'
                            : 'bg-[#ECE5DA]/40 border-dashed border-[#D5CBBD] opacity-60'
                        }`}
                      >
                        <div className="space-y-1 max-w-lg">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono font-bold text-[#B58D59]">
                              Q{idx + 1}.
                            </span>
                            <span className="font-medium text-xs text-[#28221D]">
                              {q.label}
                            </span>
                            {q.required && (
                              <span className="text-[9px] uppercase font-bold text-[#B58D59] bg-[#B58D59]/10 px-2 py-0.5 rounded-full">
                                Required
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-[10.5px] text-[#655B51]">
                            <span className="font-mono uppercase bg-white/60 px-2 py-0.5 rounded border border-[#D5CBBD]/60">
                              Type: {q.type.replace('_', ' ')}
                            </span>
                            {q.options && q.options.length > 0 && (
                              <span className="truncate max-w-xs">
                                Options: {q.options.join(', ')}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          {/* Enable/Disable Toggle */}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = customQuestions.map(item =>
                                item.id === q.id ? { ...item, enabled: !item.enabled } : item
                              );
                              onUpdateCustomQuestions?.(updated);
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                              q.enabled
                                ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                                : 'bg-[#D5CBBD] text-[#4A4138] hover:bg-[#C5BBAE]'
                            }`}
                          >
                            {q.enabled ? '✓ Enabled' : 'Disabled'}
                          </button>

                          {/* Delete Question */}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = customQuestions.filter(item => item.id !== q.id);
                              onUpdateCustomQuestions?.(updated);
                            }}
                            className="p-2 rounded-full text-rose-700 hover:bg-rose-100 hover:text-rose-900 transition-colors cursor-pointer"
                            title="Delete this question"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Add New Question Form */}
                <div className="p-5 rounded-2xl bg-[#ECE5DA] border border-[#B58D59]/30 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Plus className="w-4 h-4 text-[#B58D59]" />
                    <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#28221D]">
                      Add a New Question
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                        Question Label / Prompt
                      </label>
                      <input
                        type="text"
                        value={newQuestionLabel}
                        onChange={(e) => setNewQuestionLabel(e.target.value)}
                        placeholder="e.g. Wine pairing preference or BYOB?"
                        className="w-full bg-[#F7F3EC] border border-[#D5CBBD] rounded-full px-4 py-2 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans"
                      />
                    </div>

                    <div>
                      <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                        Answer Type
                      </label>
                      <select
                        value={newQuestionType}
                        onChange={(e) => setNewQuestionType(e.target.value as any)}
                        className="w-full bg-[#F7F3EC] border border-[#D5CBBD] rounded-full px-4 py-2 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans cursor-pointer"
                      >
                        <option value="text">Short Text Answer</option>
                        <option value="yes_no">Yes / No Buttons</option>
                        <option value="dropdown">Dropdown Selection</option>
                      </select>
                    </div>
                  </div>

                  {newQuestionType === 'dropdown' && (
                    <div>
                      <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                        Options (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={newQuestionOptions}
                        onChange={(e) => setNewQuestionOptions(e.target.value)}
                        placeholder="e.g. Red Wine, White Wine, Non-Alcoholic, BYOB"
                        className="w-full bg-[#F7F3EC] border border-[#D5CBBD] rounded-full px-4 py-2 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center space-x-2 text-xs text-[#28221D] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newQuestionRequired}
                        onChange={(e) => setNewQuestionRequired(e.target.checked)}
                        className="rounded accent-[#B58D59]"
                      />
                      <span>Mark question as required</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        if (!newQuestionLabel.trim()) return;
                        const newQ: FormCustomQuestion = {
                          id: `q-${Date.now()}`,
                          label: newQuestionLabel.trim(),
                          type: newQuestionType,
                          options: newQuestionType === 'dropdown'
                            ? newQuestionOptions.split(',').map(s => s.trim()).filter(Boolean)
                            : undefined,
                          required: newQuestionRequired,
                          enabled: true,
                        };
                        const updated = [...customQuestions, newQ];
                        onUpdateCustomQuestions?.(updated);
                        setNewQuestionLabel('');
                        setNewQuestionOptions('');
                        setNewQuestionRequired(false);
                      }}
                      className="px-5 py-2 rounded-full bg-[#28221D] hover:bg-[#1C1713] text-[#ECE5DA] text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-sm transition-transform active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#B58D59]" />
                      <span>Add Question</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* TAB 4 SECTION 3: CURATOR DIALOGUES & Q&A EDITOR */}
              <div className="bg-[#ECE5DA] border border-[#D5CBBD] rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5CBBD] pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B58D59] font-bold flex items-center gap-1.5">
                      <MessageSquareText className="w-3.5 h-3.5" />
                      <span>WEBSITE Q&A / CURATOR DIALOGUES EDITOR</span>
                    </span>
                    <h3 className="font-marcellus text-xl sm:text-2xl text-[#28221D]">
                      Edit Curator & Guest Conversations
                    </h3>
                    <p className="text-xs text-[#655B51] font-light">
                      Customize questions and answers displayed in the "Curator Dialogues" section on the website. Changes are saved instantly.
                    </p>
                  </div>
                </div>

                {/* Existing Dialogues List with Inline Editing */}
                <div className="space-y-4">
                  {dialogues.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-[#F7F3EC] border border-[#D5CBBD] space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#B58D59]">
                          Q&A Card #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = dialogues.filter(d => d.id !== item.id);
                            onUpdateDialogues?.(updated);
                          }}
                          className="p-1.5 rounded-full text-rose-700 hover:bg-rose-100 hover:text-rose-900 transition-colors cursor-pointer"
                          title="Delete this Q&A card"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                          Question
                        </label>
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => {
                            const updated = dialogues.map(d =>
                              d.id === item.id ? { ...d, question: e.target.value } : d
                            );
                            onUpdateDialogues?.(updated);
                          }}
                          className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2 text-xs text-[#28221D] font-medium focus:outline-none focus:border-[#28221D] font-sans"
                        />
                      </div>

                      <div>
                        <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                          Answer / Philosophy Response
                        </label>
                        <textarea
                          rows={3}
                          value={item.answer}
                          onChange={(e) => {
                            const updated = dialogues.map(d =>
                              d.id === item.id ? { ...d, answer: e.target.value } : d
                            );
                            onUpdateDialogues?.(updated);
                          }}
                          className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-2xl p-3 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Dialogue */}
                <div className="p-5 rounded-2xl bg-[#F7F3EC] border border-[#B58D59]/30 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Plus className="w-4 h-4 text-[#B58D59]" />
                    <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#28221D]">
                      Add a New Q&A Card
                    </span>
                  </div>

                  <div>
                    <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                      New Question Prompt
                    </label>
                    <input
                      type="text"
                      value={newDialogueQ}
                      onChange={(e) => setNewDialogueQ(e.target.value)}
                      placeholder="e.g. Q: How do you source your seasonal ingredients?"
                      className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans"
                    />
                  </div>

                  <div>
                    <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                      New Answer
                    </label>
                    <textarea
                      rows={2}
                      value={newDialogueA}
                      onChange={(e) => setNewDialogueA(e.target.value)}
                      placeholder="e.g. I work directly with local farmers and seasonal growers to bring fresh ingredients to every dinner."
                      className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-2xl p-3 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans"
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (!newDialogueQ.trim() || !newDialogueA.trim()) return;
                        const newD: CuratorDialogueItem = {
                          id: `d-${Date.now()}`,
                          question: newDialogueQ.trim(),
                          answer: newDialogueA.trim(),
                        };
                        const updated = [...dialogues, newD];
                        onUpdateDialogues?.(updated);
                        setNewDialogueQ('');
                        setNewDialogueA('');
                      }}
                      className="px-5 py-2 rounded-full bg-[#28221D] hover:bg-[#1C1713] text-[#ECE5DA] text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-sm transition-transform active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#B58D59]" />
                      <span>Add Q&A Card</span>
                    </button>
                  </div>
                </div>
              </div>
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
