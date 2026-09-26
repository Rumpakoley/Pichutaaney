import React, { useState } from 'react';
import { WaitlistEntry, PrivateEventInquiry, ContactMessage, FormCustomQuestion, MenuVenueNotice, CuratorDialogueItem, DishImageItem, HearthVideoItem } from '../types';
import { X, Download, Filter, Search, Check, Clock, Mail, Users, Calendar, Star, Copy, Sparkles, CheckCircle2, Sliders, Plus, Trash2, MessageSquareText, Image, Film, RotateCcw, Utensils } from 'lucide-react';
import { DEFAULT_DISH_COLLECTION } from './UniqueDishesGallery';
import { DEFAULT_HEARTH_VIDEOS } from './UniqueKitchenHearthReels';
import { DEFAULT_DIALOGUES } from './UniqueCuratorDialogues';

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
  dishes?: DishImageItem[];
  videos?: HearthVideoItem[];
  onUpdateCustomQuestions?: (questions: FormCustomQuestion[]) => void;
  onUpdateMenuNotice?: (notice: MenuVenueNotice) => void;
  onUpdateDialogues?: (dialogues: CuratorDialogueItem[]) => void;
  onUpdateDishes?: (dishes: DishImageItem[]) => void;
  onUpdateVideos?: (videos: HearthVideoItem[]) => void;
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
  dishes = [],
  videos = [],
  onUpdateCustomQuestions,
  onUpdateMenuNotice,
  onUpdateDialogues,
  onUpdateDishes,
  onUpdateVideos,
}) => {
  const [activeTab, setActiveTab] = useState<'waitlist' | 'inquiries' | 'messages' | 'settings'>('waitlist');
  const [settingsSubTab, setSettingsSubTab] = useState<'dishes' | 'videos' | 'dialogues' | 'notice' | 'questions'>('dishes');
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

  // Dish editor state
  const [newDishTitle, setNewDishTitle] = useState('');
  const [newDishBengaliTitle, setNewDishBengaliTitle] = useState('');
  const [newDishImageUrl, setNewDishImageUrl] = useState('');

  // Video editor state
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoTag, setNewVideoTag] = useState('');
  const [newVideoQuote, setNewVideoQuote] = useState('');
  const [newVideoSubtitle, setNewVideoSubtitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');

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
                  ? 'bg-[#28221D] text-[#ECE5DA] border-[#28221D] shadow-xs'
                  : 'text-[#655B51] bg-[#F7F3EC] border-[#D5CBBD] hover:text-[#28221D]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B58D59]" />
              <span>Content Studio (Photos, Videos & Menu)</span>
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

          {/* TAB 4: MENU, MEDIA & CONTENT STUDIO */}
          {activeTab === 'settings' && (
            <div className="p-6 space-y-6 animate-in fade-in duration-200 text-left">
              {/* Studio Sub-Navigation Bar */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F7F3EC] rounded-2xl border border-[#D5CBBD]">
                <button
                  type="button"
                  onClick={() => setSettingsSubTab('dishes')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    settingsSubTab === 'dishes'
                      ? 'bg-[#28221D] text-[#ECE5DA] shadow-xs'
                      : 'text-[#655B51] hover:text-[#28221D] hover:bg-[#ECE5DA]'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5 text-[#B58D59]" />
                  <span>🍽️ Dish Photos ({dishes.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSettingsSubTab('videos')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    settingsSubTab === 'videos'
                      ? 'bg-[#28221D] text-[#ECE5DA] shadow-xs'
                      : 'text-[#655B51] hover:text-[#28221D] hover:bg-[#ECE5DA]'
                  }`}
                >
                  <Film className="w-3.5 h-3.5 text-[#B58D59]" />
                  <span>🎬 Video Reels ({videos.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSettingsSubTab('dialogues')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    settingsSubTab === 'dialogues'
                      ? 'bg-[#28221D] text-[#ECE5DA] shadow-xs'
                      : 'text-[#655B51] hover:text-[#28221D] hover:bg-[#ECE5DA]'
                  }`}
                >
                  <MessageSquareText className="w-3.5 h-3.5 text-[#B58D59]" />
                  <span>💬 Q&A Dialogues ({dialogues.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSettingsSubTab('notice')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    settingsSubTab === 'notice'
                      ? 'bg-[#28221D] text-[#ECE5DA] shadow-xs'
                      : 'text-[#655B51] hover:text-[#28221D] hover:bg-[#ECE5DA]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B58D59]" />
                  <span>📢 Menu Notice</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSettingsSubTab('questions')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    settingsSubTab === 'questions'
                      ? 'bg-[#28221D] text-[#ECE5DA] shadow-xs'
                      : 'text-[#655B51] hover:text-[#28221D] hover:bg-[#ECE5DA]'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-[#B58D59]" />
                  <span>❓ Form Questions ({customQuestions.length})</span>
                </button>
              </div>

              {/* SUBTAB 1: DISH PHOTOS GALLERY */}
              {settingsSubTab === 'dishes' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Header & Reset */}
                  <div className="bg-[#ECE5DA] border border-[#D5CBBD] rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B58D59] font-bold">
                        DISHES FROM THE HEARTH • GALLERY MANAGER
                      </span>
                      <h3 className="font-marcellus text-xl sm:text-2xl text-[#28221D]">
                        Dish Photos & Presentation Cards
                      </h3>
                      <p className="text-xs text-[#655B51] font-light">
                        Add new photo cards, change dish descriptions, update image links, or delete cards in real-time.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onUpdateDishes?.(DEFAULT_DISH_COLLECTION)}
                      className="px-4 py-2 rounded-full border border-[#D5CBBD] bg-[#F7F3EC] hover:bg-[#28221D] hover:text-[#ECE5DA] text-xs font-medium text-[#655B51] flex items-center space-x-1.5 cursor-pointer transition-colors shrink-0"
                      title="Reset gallery to default dish cards"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Defaults</span>
                    </button>
                  </div>

                  {/* Add New Dish Form */}
                  <div className="p-6 rounded-3xl bg-[#F7F3EC] border border-[#B58D59]/40 space-y-4 shadow-sm">
                    <div className="flex items-center space-x-2 border-b border-[#D5CBBD] pb-3">
                      <Plus className="w-4 h-4 text-[#B58D59]" />
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#28221D]">
                        Add a New Dish Photo Card
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                          Dish Title / Description
                        </label>
                        <input
                          type="text"
                          value={newDishTitle}
                          onChange={(e) => setNewDishTitle(e.target.value)}
                          placeholder="e.g. Tamarind Mango Ceviche with Scallops & Citrus Broth"
                          className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans"
                        />
                      </div>

                      <div>
                        <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                          Bengali Badge Title (বাংলা নাম)
                        </label>
                        <input
                          type="text"
                          value={newDishBengaliTitle}
                          onChange={(e) => setNewDishBengaliTitle(e.target.value)}
                          placeholder="e.g. আম ও তেঁতুল সেভিচে"
                          className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-bengali text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                        Image URL (Cloudinary / Direct Link)
                      </label>
                      <input
                        type="url"
                        value={newDishImageUrl}
                        onChange={(e) => setNewDishImageUrl(e.target.value)}
                        placeholder="https://res.cloudinary.com/..."
                        className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-mono"
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (!newDishTitle.trim() || !newDishImageUrl.trim()) return;
                          const newDish: DishImageItem = {
                            id: `dish-${Date.now()}`,
                            title: newDishTitle.trim(),
                            bengaliTitle: newDishBengaliTitle.trim() || 'অনন্য পদ',
                            imageUrl: newDishImageUrl.trim(),
                            aspect: 'aspect-[3/4]',
                          };
                          const updated = [...dishes, newDish];
                          onUpdateDishes?.(updated);
                          setNewDishTitle('');
                          setNewDishBengaliTitle('');
                          setNewDishImageUrl('');
                        }}
                        className="px-6 py-2.5 rounded-full bg-[#28221D] hover:bg-[#1C1713] text-[#ECE5DA] text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-sm transition-transform active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#B58D59]" />
                        <span>Add Dish to Gallery</span>
                      </button>
                    </div>
                  </div>

                  {/* Existing Dishes List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#655B51] font-mono uppercase tracking-wider">
                      <span>Live Dishes ({dishes.length})</span>
                      <span>Edit below to update live site</span>
                    </div>

                    {dishes.map((dish, idx) => (
                      <div
                        key={dish.id}
                        className="p-5 rounded-2xl bg-[#F7F3EC] border border-[#D5CBBD] space-y-4 shadow-xs flex flex-col md:flex-row gap-5 items-start"
                      >
                        {/* Thumbnail Preview */}
                        <div className="w-24 h-28 rounded-xl overflow-hidden bg-black shrink-0 border border-white/20 relative shadow-xs">
                          <img
                            src={dish.imageUrl}
                            alt={dish.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300';
                            }}
                          />
                          <div className="absolute top-1 left-1 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-mono text-[#B58D59]">
                            #{idx + 1}
                          </div>
                        </div>

                        {/* Editable Fields */}
                        <div className="flex-1 w-full space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                                Dish Title
                              </label>
                              <input
                                type="text"
                                value={dish.title}
                                onChange={(e) => {
                                  const updated = dishes.map(d =>
                                    d.id === dish.id ? { ...d, title: e.target.value } : d
                                  );
                                  onUpdateDishes?.(updated);
                                }}
                                className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-3.5 py-1.5 text-xs text-[#28221D] font-medium focus:outline-none focus:border-[#28221D]"
                              />
                            </div>

                            <div>
                              <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                                Bengali Badge (বাংলা নাম)
                              </label>
                              <input
                                type="text"
                                value={dish.bengaliTitle}
                                onChange={(e) => {
                                  const updated = dishes.map(d =>
                                    d.id === dish.id ? { ...d, bengaliTitle: e.target.value } : d
                                  );
                                  onUpdateDishes?.(updated);
                                }}
                                className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-3.5 py-1.5 text-xs text-[#28221D] font-bengali text-sm focus:outline-none focus:border-[#28221D]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                              Image URL
                            </label>
                            <input
                              type="url"
                              value={dish.imageUrl}
                              onChange={(e) => {
                                const updated = dishes.map(d =>
                                  d.id === dish.id ? { ...d, imageUrl: e.target.value } : d
                                );
                                onUpdateDishes?.(updated);
                              }}
                              className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-3.5 py-1.5 text-xs text-[#28221D] font-mono focus:outline-none focus:border-[#28221D]"
                            />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex md:flex-col items-center justify-end gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = dishes.filter(d => d.id !== dish.id);
                              onUpdateDishes?.(updated);
                            }}
                            className="p-2 rounded-full text-rose-700 hover:bg-rose-100 hover:text-rose-900 transition-colors cursor-pointer"
                            title="Delete this dish card"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUBTAB 2: VIDEO REELS MANAGER */}
              {settingsSubTab === 'videos' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Header & Reset */}
                  <div className="bg-[#ECE5DA] border border-[#D5CBBD] rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B58D59] font-bold">
                        SCENT, SIZZLE & LIVING HEARTH • VIDEO REELS
                      </span>
                      <h3 className="font-marcellus text-xl sm:text-2xl text-[#28221D]">
                        Living Kitchen Video Reels
                      </h3>
                      <p className="text-xs text-[#655B51] font-light">
                        Add invitation videos, culinary motion reels, edit quotes/descriptions, or update video links.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onUpdateVideos?.(DEFAULT_HEARTH_VIDEOS)}
                      className="px-4 py-2 rounded-full border border-[#D5CBBD] bg-[#F7F3EC] hover:bg-[#28221D] hover:text-[#ECE5DA] text-xs font-medium text-[#655B51] flex items-center space-x-1.5 cursor-pointer transition-colors shrink-0"
                      title="Reset video reels to default videos"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Defaults</span>
                    </button>
                  </div>

                  {/* Add New Video Form */}
                  <div className="p-6 rounded-3xl bg-[#F7F3EC] border border-[#B58D59]/40 space-y-4 shadow-sm">
                    <div className="flex items-center space-x-2 border-b border-[#D5CBBD] pb-3">
                      <Plus className="w-4 h-4 text-[#B58D59]" />
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#28221D]">
                        Add a New Video Reel
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                          Video Title
                        </label>
                        <input
                          type="text"
                          value={newVideoTitle}
                          onChange={(e) => setNewVideoTitle(e.target.value)}
                          placeholder="e.g. Aamontron (The Invite) or Lemon Soufflé"
                          className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans"
                        />
                      </div>

                      <div>
                        <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                          Category Badge Tag
                        </label>
                        <input
                          type="text"
                          value={newVideoTag}
                          onChange={(e) => setNewVideoTag(e.target.value)}
                          placeholder="e.g. AAMONTRON • THE INVITE"
                          className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                          Main Quote / Description
                        </label>
                        <textarea
                          rows={2}
                          value={newVideoQuote}
                          onChange={(e) => setNewVideoQuote(e.target.value)}
                          placeholder="e.g. “Mushroom truffle risotto with cream of shukto and charred zucchini.”"
                          className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-2xl p-3 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans"
                        />
                      </div>

                      <div>
                        <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                          Subtitle / Detail Note
                        </label>
                        <textarea
                          rows={2}
                          value={newVideoSubtitle}
                          onChange={(e) => setNewVideoSubtitle(e.target.value)}
                          placeholder="e.g. Harmonizing earthy wild mushrooms, delicate cream of shukto..."
                          className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-2xl p-3 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                        Video URL (Cloudinary / MP4 link)
                      </label>
                      <input
                        type="url"
                        value={newVideoUrl}
                        onChange={(e) => setNewVideoUrl(e.target.value)}
                        placeholder="https://res.cloudinary.com/..."
                        className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-4 py-2 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D] font-mono"
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (!newVideoTitle.trim() || !newVideoUrl.trim()) return;
                          const posterUrl = newVideoUrl.replace('/video/upload/', '/video/upload/so_1/').replace(/\.mp4$/i, '.jpg');
                          const newVid: HearthVideoItem = {
                            id: `hearth-${Date.now()}`,
                            url: newVideoUrl.trim(),
                            poster: posterUrl,
                            tag: newVideoTag.trim() || 'THE LIVING HEARTH',
                            title: newVideoTitle.trim(),
                            quote: newVideoQuote.trim() ? (newVideoQuote.startsWith('“') ? newVideoQuote.trim() : `“${newVideoQuote.trim()}”`) : '“Cooking from memory and instinct.”',
                            subtitle: newVideoSubtitle.trim() || 'Reflections on heritage and seasonal table storytelling.',
                          };
                          const updated = [...videos, newVid];
                          onUpdateVideos?.(updated);
                          setNewVideoTitle('');
                          setNewVideoTag('');
                          setNewVideoQuote('');
                          setNewVideoSubtitle('');
                          setNewVideoUrl('');
                        }}
                        className="px-6 py-2.5 rounded-full bg-[#28221D] hover:bg-[#1C1713] text-[#ECE5DA] text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-sm transition-transform active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#B58D59]" />
                        <span>Add Video Reel</span>
                      </button>
                    </div>
                  </div>

                  {/* Existing Videos List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#655B51] font-mono uppercase tracking-wider">
                      <span>Live Video Reels ({videos.length})</span>
                      <span>Edit below to update live site</span>
                    </div>

                    {videos.map((vid, idx) => (
                      <div
                        key={vid.id}
                        className="p-5 rounded-2xl bg-[#F7F3EC] border border-[#D5CBBD] space-y-3 shadow-xs"
                      >
                        <div className="flex items-center justify-between border-b border-[#D5CBBD] pb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono font-bold text-[#B58D59]">
                              Reel #{idx + 1}
                            </span>
                            <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#ECE5DA] text-[#655B51]">
                              {vid.tag}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const updated = videos.filter(v => v.id !== vid.id);
                              onUpdateVideos?.(updated);
                            }}
                            className="p-1.5 rounded-full text-rose-700 hover:bg-rose-100 hover:text-rose-900 transition-colors cursor-pointer"
                            title="Delete this video reel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              value={vid.title}
                              onChange={(e) => {
                                const updated = videos.map(v =>
                                  v.id === vid.id ? { ...v, title: e.target.value } : v
                                );
                                onUpdateVideos?.(updated);
                              }}
                              className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-3.5 py-1.5 text-xs text-[#28221D] font-medium focus:outline-none focus:border-[#28221D]"
                            />
                          </div>

                          <div>
                            <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                              Category Badge Tag
                            </label>
                            <input
                              type="text"
                              value={vid.tag}
                              onChange={(e) => {
                                const updated = videos.map(v =>
                                  v.id === vid.id ? { ...v, tag: e.target.value } : v
                                );
                                onUpdateVideos?.(updated);
                              }}
                              className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-3.5 py-1.5 text-xs text-[#28221D] font-mono focus:outline-none focus:border-[#28221D]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                              Quote / Description
                            </label>
                            <textarea
                              rows={2}
                              value={vid.quote}
                              onChange={(e) => {
                                const updated = videos.map(v =>
                                  v.id === vid.id ? { ...v, quote: e.target.value } : v
                                );
                                onUpdateVideos?.(updated);
                              }}
                              className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-2xl p-2.5 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D]"
                            />
                          </div>

                          <div>
                            <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                              Subtitle / Story Note
                            </label>
                            <textarea
                              rows={2}
                              value={vid.subtitle}
                              onChange={(e) => {
                                const updated = videos.map(v =>
                                  v.id === vid.id ? { ...v, subtitle: e.target.value } : v
                                );
                                onUpdateVideos?.(updated);
                              }}
                              className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-2xl p-2.5 text-xs text-[#28221D] focus:outline-none focus:border-[#28221D]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-sans text-[10.5px] uppercase tracking-wider font-semibold text-[#28221D] block mb-1">
                            Video URL
                          </label>
                          <input
                            type="url"
                            value={vid.url}
                            onChange={(e) => {
                              const posterUrl = e.target.value.replace('/video/upload/', '/video/upload/so_1/').replace(/\.mp4$/i, '.jpg');
                              const updated = videos.map(v =>
                                v.id === vid.id ? { ...v, url: e.target.value, poster: posterUrl } : v
                              );
                              onUpdateVideos?.(updated);
                            }}
                            className="w-full bg-[#ECE5DA] border border-[#D5CBBD] rounded-full px-3.5 py-1.5 text-xs text-[#28221D] font-mono focus:outline-none focus:border-[#28221D]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUBTAB 3: CURATOR DIALOGUES & Q&A EDITOR */}
              {settingsSubTab === 'dialogues' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="bg-[#ECE5DA] border border-[#D5CBBD] rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B58D59] font-bold">
                        CURATOR DIALOGUES • WEBSITE Q&A
                      </span>
                      <h3 className="font-marcellus text-xl sm:text-2xl text-[#28221D]">
                        Edit Curator & Guest Conversations
                      </h3>
                      <p className="text-xs text-[#655B51] font-light">
                        Customize questions and answers displayed in the "Curator Dialogues" section on the website.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onUpdateDialogues?.(DEFAULT_DIALOGUES)}
                      className="px-4 py-2 rounded-full border border-[#D5CBBD] bg-[#F7F3EC] hover:bg-[#28221D] hover:text-[#ECE5DA] text-xs font-medium text-[#655B51] flex items-center space-x-1.5 cursor-pointer transition-colors shrink-0"
                      title="Reset Q&A cards to default copy"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Defaults</span>
                    </button>
                  </div>

                  {/* Add New Dialogue */}
                  <div className="p-6 rounded-3xl bg-[#F7F3EC] border border-[#B58D59]/40 space-y-4 shadow-sm">
                    <div className="flex items-center space-x-2 border-b border-[#D5CBBD] pb-3">
                      <Plus className="w-4 h-4 text-[#B58D59]" />
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#28221D]">
                        Add a New Q&A Card
                      </h4>
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
                        className="px-6 py-2.5 rounded-full bg-[#28221D] hover:bg-[#1C1713] text-[#ECE5DA] text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-sm transition-transform active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#B58D59]" />
                        <span>Add Q&A Card</span>
                      </button>
                    </div>
                  </div>

                  {/* Existing Dialogues List */}
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
                </div>
              )}

              {/* SUBTAB 4: MENU NOTICE */}
              {settingsSubTab === 'notice' && (
                <div className="bg-[#ECE5DA] border border-[#D5CBBD] rounded-3xl p-6 sm:p-8 space-y-5 animate-in fade-in duration-150">
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
              )}

              {/* SUBTAB 5: QUESTIONS BUILDER */}
              {settingsSubTab === 'questions' && (
                <div className="bg-[#F7F3EC] border border-[#D5CBBD] rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
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
