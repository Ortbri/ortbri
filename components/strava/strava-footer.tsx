import React, { Suspense } from 'react';
import StravaAthlete from './strava-athlete';
import {
  StravaActivitiesSkeleton,
  StravaAthleteSkeleton,
  StravaAthleteStatsSkeleton,
} from './strava-skeleton';
import StravaActivities from './strava-activities';
import StravaAthleteStats from './strava-athlete-stats';

function StravaFooter() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 md:px-4">
      <Suspense fallback={<StravaAthleteSkeleton />}>
        <StravaAthlete />
      </Suspense>
      <Suspense fallback={<StravaActivitiesSkeleton />}>
        <StravaActivities />
      </Suspense>
      <Suspense fallback={<StravaAthleteStatsSkeleton />}>
        <StravaAthleteStats />
      </Suspense>
      <a
        href={`https://www.strava.com/athletes/${process.env.STRAVA_BRIAN}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#fc4c02] px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-[#e34402]"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
        </svg>
        Follow on Strava
      </a>
    </div>
  );
}

export default StravaFooter;
