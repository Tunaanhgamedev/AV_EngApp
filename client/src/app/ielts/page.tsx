'use client';

import React, { Suspense, lazy } from 'react';

const IeltsHeroSection = lazy(() => import('./components/IeltsHeroSection'));
const IeltsSkillsSection = lazy(() => import('./components/IeltsSkillsSection'));
const IeltsPackagesSection = lazy(() => import('./components/IeltsPackagesSection'));
const IeltsAiPlannerSection = lazy(() => import('./components/IeltsAiPlannerSection'));
const IeltsBandDescriptorsSection = lazy(() => import('./components/IeltsBandDescriptorsSection'));
const IeltsPlatformsSection = lazy(() => import('./components/IeltsPlatformsSection'));
const IeltsKnowledgeSection = lazy(() => import('./components/IeltsKnowledgeSection'));
const IeltsCtaSection = lazy(() => import('./components/IeltsCtaSection'));

const SectionLoader = () => (
  <div className="p-8 text-center bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 animate-pulse">
    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto mb-2" />
    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2 mx-auto" />
  </div>
);

export default function IELTSPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      <Suspense fallback={<SectionLoader />}>
        <IeltsHeroSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <IeltsSkillsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <IeltsPackagesSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <IeltsAiPlannerSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <IeltsBandDescriptorsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <IeltsPlatformsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <IeltsKnowledgeSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <IeltsCtaSection />
      </Suspense>
    </div>
  );
}
