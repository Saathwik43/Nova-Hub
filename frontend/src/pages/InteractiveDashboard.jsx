import React, { useState } from 'react';
import HostEventForm from '../components/HostEventForm';
import JoinEventList from '../components/JoinEventList';
import TeamRosterForm from '../components/TeamRosterForm';

export const InteractiveDashboard = () => {
  const [view, setView] = useState('selection'); // 'selection' | 'hostForm' | 'joinList' | 'rosterForm'
  const [selectedTournament, setSelectedTournament] = useState(null);

  const handleSelectTournament = (tournament) => {
    setSelectedTournament(tournament);
    setView('rosterForm');
  };

  return (
    <div className="min-h-screen bg-[#c4e4e3] text-[#1a1a1a] font-mono selection:bg-yellow-300 py-32 px-8">
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {view !== 'selection' && (
          <button
            onClick={() => setView('selection')}
            className="mb-12 bg-white border-[3px] border-[#1a1a1a] px-4 py-2 font-bold uppercase text-xs shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:shadow-[1px_1px_0px_rgba(26,26,26,1)] hover:translate-x-1 hover:translate-y-1 transition-all interactive-target"
          >
            ← Back to Selection
          </button>
        )}

        {view === 'selection' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <button
              onClick={() => setView('hostForm')}
              className="text-left bg-[#fef08a] border-[3px] border-[#1a1a1a] p-12 md:p-16 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group interactive-target flex flex-col justify-between min-h-[400px]"
            >
              <div>
                <span className="bg-white border-2 border-[#1a1a1a] px-3 py-1 text-xs font-bold uppercase shadow-[2px_2px_0px_rgba(26,26,26,1)] mb-8 inline-block">
                  For Organizers
                </span>
                <h2 className="text-5xl md:text-7xl font-black font-display leading-[1.1] text-[#1a1a1a] mt-4">
                  HOST<br />EVENTS
                </h2>
              </div>
              <p className="text-sm font-bold opacity-80 max-w-sm mt-8">
                Configure ground coordinates, set entry slots, and manage referee stakes.
              </p>
            </button>

            <button
              onClick={() => setView('joinList')}
              className="text-left bg-[#baffc9] border-[3px] border-[#1a1a1a] p-12 md:p-16 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group interactive-target flex flex-col justify-between min-h-[400px]"
            >
              <div>
                <span className="bg-white border-2 border-[#1a1a1a] px-3 py-1 text-xs font-bold uppercase shadow-[2px_2px_0px_rgba(26,26,26,1)] mb-8 inline-block">
                  For Players
                </span>
                <h2 className="text-5xl md:text-7xl font-black font-display leading-[1.1] text-[#1a1a1a] mt-4">
                  JOIN<br />TEAMS
                </h2>
              </div>
              <p className="text-sm font-bold opacity-80 max-w-sm mt-8">
                Find local physical tournaments, submit rosters, and get private match passes.
              </p>
            </button>
          </div>
        )}

        {view === 'hostForm' && <HostEventForm />}
        {view === 'joinList' && <JoinEventList onSelectEvent={handleSelectTournament} />}
        {view === 'rosterForm' && <TeamRosterForm tournament={selectedTournament} />}

      </div>
    </div>
  );
};
export default InteractiveDashboard;
