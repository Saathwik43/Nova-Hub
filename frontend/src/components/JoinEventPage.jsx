import React, { useState } from 'react';
import FilterSection from './FilterSection';
import TournamentList from './TournamentList';
import TeamRosterForm from './TeamRosterForm';

export const JoinEventPage = ({ setCurrentPage }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (selectedEvent) {
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col items-start relative z-10 font-mono">
        <button 
          onClick={() => setSelectedEvent(null)}
          className="mb-8 bg-white border-[3px] border-[#1a1a1a] px-4 py-2 font-bold uppercase text-xs shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:shadow-[1px_1px_0px_rgba(26,26,26,1)] hover:translate-x-1 hover:translate-y-1 transition-all interactive-target"
        >
          &lt;- Back to Arenas
        </button>
        <TeamRosterForm tournament={selectedEvent} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col items-start relative z-10 font-mono">
      <button 
        onClick={() => setCurrentPage('buttonsPage')}
        className="mb-8 bg-white border-[3px] border-[#1a1a1a] px-4 py-2 font-bold uppercase text-xs shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:shadow-[1px_1px_0px_rgba(26,26,26,1)] hover:translate-x-1 hover:translate-y-1 transition-all interactive-target"
      >
        &lt;- Go Back
      </button>

      <h2 className="text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-[#1a1a1a] mb-12">
        Find Your Next Tournament
      </h2>

      <FilterSection />
      
      <div className="w-full mt-12">
        <TournamentList onSelectEvent={setSelectedEvent} />
      </div>
    </div>
  );
};

export default JoinEventPage;
