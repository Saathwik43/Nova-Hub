import React from 'react';

export const HostForm = ({ setCurrentPage }) => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-start relative z-10">
      <button 
        onClick={() => setCurrentPage('buttonsPage')}
        className="mb-8 bg-white border-[3px] border-[#1a1a1a] px-4 py-2 font-bold uppercase text-xs shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:shadow-[1px_1px_0px_rgba(26,26,26,1)] hover:translate-x-1 hover:translate-y-1 transition-all interactive-target"
      >
        &lt;- Go Back
      </button>

      <div className="bg-[#fcebb6] border-[3px] border-[#1a1a1a] p-10 md:p-16 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] w-full font-mono text-[#1a1a1a] relative">
        <h2 className="text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-[#1a1a1a] mb-12 border-b-[3px] border-[#1a1a1a] pb-6">
          Set Up Local Match.
        </h2>

        <form className="space-y-12">
          {/* SECTION 1: Basic Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black uppercase border-b-2 border-[#1a1a1a] pb-2 inline-block">1. Core Details</h3>
            
            <div className="flex flex-col md:flex-row md:items-baseline gap-4">
              <label className="text-sm font-bold uppercase w-1/3">Event Name</label>
              <input
                type="text"
                placeholder="e.g., Summer Cricket Clash"
                className="w-full md:w-2/3 border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-4">
              <label className="text-sm font-bold uppercase w-1/3">Sport Category</label>
              <select className="w-full md:w-2/3 border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target cursor-pointer">
                <option>Cricket</option>
                <option>Football</option>
                <option>Basketball</option>
                <option>Badminton</option>
                <option>Tennis</option>
              </select>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-baseline gap-4">
              <label className="text-sm font-bold uppercase w-1/3">Tournament Format</label>
              <select className="w-full md:w-2/3 border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target cursor-pointer">
                <option>Single Elimination (Knockout)</option>
                <option>Double Elimination</option>
                <option>Round Robin (League)</option>
                <option>Group Stage + Knockout</option>
              </select>
            </div>
          </div>

          {/* SECTION 2: Logistics */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black uppercase border-b-2 border-[#1a1a1a] pb-2 inline-block">2. Time & Location</h3>

            <div className="flex flex-col md:flex-row md:items-baseline gap-4">
              <label className="text-sm font-bold uppercase w-1/3">Exact Venue / Ground</label>
              <input
                type="text"
                placeholder="e.g., Central Park, Pitch B"
                className="w-full md:w-2/3 border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-4">
              <label className="text-sm font-bold uppercase w-1/3">Start Date</label>
              <input
                type="date"
                className="w-full md:w-2/3 border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-4">
              <label className="text-sm font-bold uppercase w-1/3">End Date</label>
              <input
                type="date"
                className="w-full md:w-2/3 border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
              />
            </div>
          </div>

          {/* SECTION 3: Entries & Prizes */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black uppercase border-b-2 border-[#1a1a1a] pb-2 inline-block">3. Slots & Economics</h3>

            <div className="flex flex-col md:flex-row md:items-baseline gap-4">
              <label className="text-sm font-bold uppercase w-1/3">Max Entry Slots (Teams)</label>
              <input
                type="number"
                placeholder="16"
                className="w-full md:w-2/3 border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-4">
              <label className="text-sm font-bold uppercase w-1/3">Entry Fee (Per Team)</label>
              <div className="w-full md:w-2/3 flex items-baseline">
                <span className="text-lg font-bold mr-2">₹</span>
                <input
                  type="number"
                  placeholder="500"
                  className="w-full border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-4">
              <label className="text-sm font-bold uppercase w-1/3">Total Prize Pool</label>
              <div className="w-full md:w-2/3 flex items-baseline">
                <span className="text-lg font-bold mr-2">₹</span>
                <input
                  type="number"
                  placeholder="10000"
                  className="w-full border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Contact & Rules */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black uppercase border-b-2 border-[#1a1a1a] pb-2 inline-block">4. Operations</h3>

            <div className="flex flex-col md:flex-row md:items-baseline gap-4">
              <label className="text-sm font-bold uppercase w-1/3">Organizer Contact No.</label>
              <input
                type="text"
                placeholder="+91 9999999999"
                className="w-full md:w-2/3 border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
              />
            </div>

            <div className="flex flex-col md:flex-start gap-4 pt-4">
              <label className="text-sm font-bold uppercase">Tournament Rules & Guidelines</label>
              <textarea
                placeholder="List equipment rules, referee decisions, reporting times, etc..."
                rows="4"
                className="w-full border-[3px] border-[#1a1a1a] bg-white outline-none p-4 font-mono text-sm font-bold focus:bg-[#baffc9] transition-colors interactive-target shadow-[4px_4px_0px_rgba(26,26,26,1)] resize-none"
              ></textarea>
            </div>
          </div>

          <button
            type="button"
            className="w-full mt-16 bg-white hover:bg-[#baffc9] border-[3px] border-[#1a1a1a] py-6 rounded-xl font-black uppercase tracking-widest text-xl shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[6px] hover:translate-y-[6px] transition-all interactive-target"
          >
            Launch Tournament Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default HostForm;
