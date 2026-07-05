import React from 'react';

export const HostEventForm = () => {
  return (
    <div className="bg-[#ffb3ba] border-[3px] border-[#1a1a1a] p-10 md:p-16 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] max-w-3xl mx-auto font-mono text-[#1a1a1a] relative">
      <div className="absolute -top-4 -right-4 bg-white border-[3px] border-[#1a1a1a] px-4 py-2 font-bold uppercase shadow-[4px_4px_0px_rgba(26,26,26,1)] rotate-6 text-xs">
        Form #001
      </div>

      <h2 className="text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-[#1a1a1a] mb-12 border-b-[3px] border-[#1a1a1a] pb-6">
        Set Up Local Match.
      </h2>

      <form className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-baseline gap-4">
          <label className="text-sm font-bold uppercase w-1/3">Tournament Name</label>
          <input
            type="text"
            placeholder="e.g., Summer Cricket Clash"
            className="w-full md:w-2/3 border-b-[3px] border-[#1a1a1a] bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline gap-4">
          <label className="text-sm font-bold uppercase w-1/3">Ground Coordinates/Address</label>
          <input
            type="text"
            placeholder="e.g., Central Park, Pitch B"
            className="w-full md:w-2/3 border-b-[3px] border-[#1a1a1a] bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline gap-4">
          <label className="text-sm font-bold uppercase w-1/3">Entry Slots (Teams)</label>
          <input
            type="number"
            placeholder="8"
            className="w-full md:w-2/3 border-b-[3px] border-[#1a1a1a] bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline gap-4">
          <label className="text-sm font-bold uppercase w-1/3">Entry Fee (Per Team)</label>
          <div className="w-full md:w-2/3 flex items-baseline">
            <span className="text-lg font-bold mr-2">₹</span>
            <input
              type="number"
              placeholder="500"
              className="w-full border-b-[3px] border-[#1a1a1a] bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline gap-4">
          <label className="text-sm font-bold uppercase w-1/3">Referee Payout</label>
          <div className="w-full md:w-2/3 flex items-baseline">
            <span className="text-lg font-bold mr-2">₹</span>
            <input
              type="number"
              placeholder="2000"
              className="w-full border-b-[3px] border-[#1a1a1a] bg-transparent outline-none py-2 font-mono text-lg font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
            />
          </div>
        </div>

        <button
          type="button"
          className="w-full mt-8 bg-[#fcebb6] hover:bg-[#ffe17a] border-[3px] border-[#1a1a1a] py-5 rounded-xl font-black uppercase tracking-widest text-lg shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all interactive-target"
        >
          Broadcast Event
        </button>
      </form>
    </div>
  );
};
export default HostEventForm;
