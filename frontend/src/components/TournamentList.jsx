import React from 'react';

const dummyTournaments = [
  { id: '1', title: 'Weekend Cricket Bash', venue: 'Central Park, Pitch B', slots: '2/8 slots left', bg: '#ffffff' },
  { id: '2', title: 'Downtown Hoops', venue: 'Downtown Indoor Court', slots: '5/16 slots left', bg: '#baffc9' },
  { id: '3', title: 'Sunday League Football', venue: 'Greenfield Arena', slots: '1/4 slots left', bg: '#ffffff' },
  { id: '4', title: 'Corporate Badminton', venue: 'Smash Club, Court 3', slots: '10/32 slots left', bg: '#baffc9' },
];

export const TournamentList = ({ onSelectEvent }) => {
  return (
    <div className="w-full flex flex-col gap-6 font-mono">
      {dummyTournaments.map((t) => (
        <div 
          key={t.id}
          className="w-full flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 rounded-xl border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-all duration-200 gap-6"
          style={{ backgroundColor: t.bg }}
        >
          <div className="flex flex-col gap-3">
            <h3 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight text-[#1a1a1a]">
              {t.title}
            </h3>
            <div className="flex flex-wrap gap-4 items-center font-bold text-xs uppercase opacity-80">
              <span className="bg-[#1a1a1a] text-white px-3 py-1 rounded-sm shadow-[2px_2px_0px_rgba(26,26,26,0.3)]">{t.venue}</span>
              <span>{t.slots}</span>
            </div>
          </div>
          
          <button
            onClick={() => onSelectEvent(t)}
            className="w-full md:w-auto bg-white hover:bg-yellow-200 border-[3px] border-[#1a1a1a] px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all interactive-target whitespace-nowrap"
          >
            Join Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default TournamentList;
