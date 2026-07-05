import React from 'react';

export const FilterSection = () => {
  return (
    <div className="w-full bg-white border-[3px] border-[#1a1a1a] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] flex flex-col lg:flex-row items-end gap-6 rounded-xl">
      <div className="flex-1 w-full flex flex-col gap-2">
        <label className="text-xs font-bold uppercase opacity-80">Search Sport</label>
        <input 
          type="text" 
          placeholder="e.g., Cricket, Basketball" 
          className="w-full border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-sm font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
        />
      </div>

      <div className="flex-1 w-full flex flex-col gap-2">
        <label className="text-xs font-bold uppercase opacity-80">Location</label>
        <select className="w-full border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-sm font-bold focus:border-white transition-colors interactive-target cursor-pointer">
          <option value="offline">Offline / Local</option>
          <option value="online">Online</option>
        </select>
      </div>

      <div className="flex-1 w-full flex flex-col gap-2">
        <label className="text-xs font-bold uppercase opacity-80">Max Entry Fee</label>
        <div className="flex items-baseline">
          <span className="font-bold mr-2">₹</span>
          <input 
            type="number" 
            placeholder="1000" 
            className="w-full border-b-[3px] border-black bg-transparent outline-none py-2 font-mono text-sm font-bold focus:border-white transition-colors interactive-target placeholder-[#1a1a1a]/40"
          />
        </div>
      </div>

      <button className="w-full lg:w-auto bg-[#fcebb6] hover:bg-[#ffe17a] border-[3px] border-[#1a1a1a] px-8 py-3.5 rounded-lg font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all interactive-target whitespace-nowrap">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSection;
