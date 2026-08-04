'use client';

import React, { useState } from 'react';
import { Globe, Search, Volume2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import COUNTRIES_DATA from '@/data/countries';
import { speak } from '../../utils/pronunciationUtils';

export default function CountriesTab() {
  const [countryRegionFilter, setCountryRegionFilter] = useState<string>('all');
  const [countrySearch, setCountrySearch] = useState<string>('');

  const regions = ['all', 'Đông Nam Á', 'Châu Á', 'Châu Âu', 'Châu Mỹ', 'Châu Úc', 'Châu Phi'];

  const filteredCountries = (COUNTRIES_DATA || []).filter((c: any) => {
    const matchRegion = countryRegionFilter === 'all' || c.region === countryRegionFilter;
    const q = countrySearch.trim().toLowerCase();
    const matchSearch = !q || c.country.toLowerCase().includes(q) || c.vi.toLowerCase().includes(q) || c.nationality.toLowerCase().includes(q);
    return matchRegion && matchSearch;
  });

  return (
      
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="premium-card p-6 bg-gradient-to-r from-emerald-50 dark:from-emerald-950/30 to-teal-50 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800">
            <h3 className="text-lg font-black text-emerald-800 flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Tên Quốc Gia & Quốc Tịch (Countries & Nationalities)
            </h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed font-medium">
              Luyện phát âm chuẩn xác tên các quốc gia lớn trên thế giới và danh từ chỉ quốc tịch/ngôn ngữ tương ứng kèm phiên âm quốc tế IPA.
            </p>
          </div>

          {/* Search & Region Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Tìm quốc gia hoặc quốc tịch..."
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:outline-none placeholder-slate-400 text-slate-800 dark:text-slate-100"
              />
            </div>

            {/* Region Filter Buttons */}
            <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
              {['All', 'Asia', 'Middle East', 'Europe', 'Americas', 'Africa', 'Oceania'].map(reg => (
                <button
                  key={reg}
                  onClick={() => setCountryRegionFilter(reg)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                    countryRegionFilter === reg
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  {reg === 'All' ? 'Tất cả' : reg}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Countries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {COUNTRIES_DATA.filter(c => {
              const matchesSearch = c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
                c.nationality.toLowerCase().includes(countrySearch.toLowerCase()) ||
                c.vi.toLowerCase().includes(countrySearch.toLowerCase());
              const matchesRegion = countryRegionFilter === 'All' || c.region === countryRegionFilter;
              return matchesSearch && matchesRegion;
            }).map((c, idx) => (
              <div
                key={idx}
                className="premium-card p-5 flex flex-col justify-between hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                {/* Header Flag & Vietnamese translation */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl filter drop-shadow-sm select-none">{c.flag}</span>
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 px-2 py-0.5 rounded-full uppercase tracking-wider">{c.region}</span>
                </div>

                {/* Country section */}
                <div className="space-y-4">
                  <div className="text-left">
                    <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-0.5 text-left">Quốc Gia (Country)</span>
                    <button
                      onClick={() => speak(c.country)}
                      className="group flex items-center gap-2 hover:text-emerald-600 transition-colors text-left cursor-pointer"
                    >
                      <span className="text-base font-black text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">{c.country}</span>
                      <Play className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 fill-slate-100 group-hover:fill-emerald-100 transition-all flex-shrink-0" />
                    </button>
                    <p className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium mt-0.5 text-left">{c.countryIpa}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1 text-left">({c.vi})</p>
                  </div>

                  {/* Nationality section */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-left">
                    <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-0.5 text-left">Quốc Tịch / Ngôn Ngữ</span>
                    <button
                      onClick={() => speak(c.nationality)}
                      className="group flex items-center gap-2 hover:text-blue-600 transition-colors text-left cursor-pointer"
                    >
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">{c.nationality}</span>
                      <Play className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 fill-slate-100 group-hover:fill-blue-100 transition-all flex-shrink-0" />
                    </button>
                    <p className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium mt-0.5 text-left">{c.nationalityIpa}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {COUNTRIES_DATA.filter(c => {
            const matchesSearch = c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
              c.nationality.toLowerCase().includes(countrySearch.toLowerCase()) ||
              c.vi.toLowerCase().includes(countrySearch.toLowerCase());
            const matchesRegion = countryRegionFilter === 'All' || c.region === countryRegionFilter;
            return matchesSearch && matchesRegion;
          }).length === 0 && (
              <div className="text-center py-12 premium-card bg-slate-50/50">
                <p className="text-slate-400 dark:text-slate-500 font-medium text-sm">Không tìm thấy quốc gia phù hợp với từ khóa.</p>
              </div>
            )}
        </div>
        );
}
