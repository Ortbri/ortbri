import { Athlete } from '@/types/strava';
import React from 'react';
import Image from 'next/image';

export const revalidate = 3600;

async function StravaAthlete() {
  try {
    const response = await fetch(`https://www.strava.com/api/v3/athlete`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAVA_ACCESS_TOKEN}`,
      },
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Strava API Error:', errorData);
      throw new Error(`Failed to fetch Strava activities: ${response.status}`);
    }
    const profileStats: Athlete = await response.json();
    console.log(JSON.stringify(profileStats, null, 2));

    if (!profileStats) {
      return <div className="text-muted-foreground text-sm">No Profile here</div>;
    }
    return (
      <div className="flex flex-col items-center space-y-4 rounded-3xl border p-6">
        <div className="group relative h-24 w-24">
          <Image
            src={profileStats.profile}
            alt={`${profileStats.firstname} ${profileStats.lastname}`}
            fill
            className="rounded-full object-cover ring-2 ring-orange-500/20 transition-all duration-300 group-hover:ring-4"
          />
          {/* <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
            Active
          </div> */}
        </div>
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">
            {profileStats.firstname} {profileStats.lastname}
          </h2>
          <p className="text-muted-foreground text-sm">
            {profileStats.city}
            {profileStats.city && profileStats.state ? ', ' : ''}
            {profileStats.state} {profileStats.country}
          </p>
        </div>
        {profileStats.bio && (
          <p className="text-muted-foreground max-w-md text-center text-sm">{profileStats.bio}</p>
        )}
        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-2 text-sm">
          {profileStats.sex && (
            <span className="bg-secondary/50 rounded-full px-2 py-1 backdrop-blur-sm">
              {profileStats.sex === 'M' ? 'Male' : 'Female'}
            </span>
          )}
          {profileStats.premium && (
            <span className="rounded-full bg-orange-500/10 px-2 py-1 text-orange-600 dark:text-orange-400">
              Premium Member
            </span>
          )}
        </div>
        <a
          href={`https://www.strava.com/athletes/${profileStats.id}`}
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
  } catch (error) {
    console.error('Error in StravaPosts:', error);
    return <div className="text-sm text-red-500">Failed to load Strava activities</div>;
  }
}

export default StravaAthlete;
