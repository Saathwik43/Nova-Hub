import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HostForm from '../components/HostForm';
import JoinEventPage from '../components/JoinEventPage';

export const Dashboard = ({ apiBaseUrl, user, onRoleToggle }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get('tab');
  
  const [currentPage, setCurrentPage] = useState(
    tab === 'host' ? 'hostPage' : tab === 'join' ? 'joinPage' : 'buttonsPage'
  );

  useEffect(() => {
    if (tab === 'host') setCurrentPage('hostPage');
    if (tab === 'join') setCurrentPage('joinPage');
  }, [tab]);

  const isHost = user?.role === 'host';
  const isParticipant = user?.role === 'participant';

  return (
    <div className={`min-h-screen bg-[#c4e4e3] flex flex-col items-center pt-32 pb-20 px-8 relative font-mono ${currentPage === 'buttonsPage' ? 'justify-center overflow-hidden' : 'justify-start'}`}>
      {currentPage === 'buttonsPage' && (
        <div className="flex flex-col md:flex-row gap-12 w-full max-w-5xl justify-center items-stretch relative z-10">
          
          {/* Removed vertical text as it overlaps and belongs to the landing page */}

          {(isHost || !user) && (
            <button
              onClick={() => setCurrentPage('hostPage')}
              className="flex-1 text-left bg-[#fcebb6] border-[3px] border-[#1a1a1a] p-10 md:p-14 rounded-2xl shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group interactive-target"
            >
              <div className="bg-white border-[3px] border-[#1a1a1a] p-2 w-max rounded-lg mb-6 shadow-[2px_2px_0px_rgba(26,26,26,1)] group-hover:rotate-12 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-black font-display uppercase text-[#1a1a1a] mb-6">
                Host Events
              </h2>
              <p className="text-xs md:text-sm font-bold opacity-80 leading-relaxed font-mono">
                Set up local matches. Capture physical ground coordinates, specify entry slots, verify list stakes, set referee payouts, and issue private address passes to captain check-ins.
              </p>
            </button>
          )}

          {(isParticipant || !user) && (
            <button
              onClick={() => setCurrentPage('joinPage')}
              className="flex-1 text-left bg-[#baffc9] border-[3px] border-[#1a1a1a] p-10 md:p-14 rounded-2xl shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group interactive-target"
            >
              <div className="bg-white border-[3px] border-[#1a1a1a] p-2 w-max rounded-lg mb-6 shadow-[2px_2px_0px_rgba(26,26,26,1)] group-hover:-rotate-12 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pin"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-black font-display uppercase text-[#1a1a1a] mb-6">
                Join Teams
              </h2>
              <p className="text-xs md:text-sm font-bold opacity-80 leading-relaxed font-mono">
                Submit team rosters. Provide details for up to 6 players, verify age bounds, accept guidelines, and check private coordinate lobby access immediately.
              </p>
            </button>
          )}

        </div>
      )}

      {currentPage === 'hostPage' && <HostForm setCurrentPage={setCurrentPage} />}
      {currentPage === 'joinPage' && <JoinEventPage setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default Dashboard;
