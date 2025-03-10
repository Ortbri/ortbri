import type { Athlete } from '@/types/strava';
import React from 'react';
import Image from 'next/image';
import { getValidStravaToken } from '@/utils/strava';

export const revalidate = 3600;

async function StravaAthlete() {
  try {
    // Get a valid access token
    const accessToken = await getValidStravaToken();

    const response = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
    /* --------------------------------- ui here -------------------------------- */
    return (
      <div className="flex flex-row space-x-2">
        <div className="group relative h-14 w-14">
          <Image
            src={profileStats.profile}
            alt={`${profileStats.firstname} ${profileStats.lastname}`}
            fill
            className="rounded-full object-cover transition-all duration-300 group-hover:ring-4"
          />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">
            {profileStats.firstname} {profileStats.lastname}
          </h2>
          <p className="text-muted-foreground text-sm">
            {profileStats.city}
            {profileStats.city && profileStats.state ? ', ' : ''}
            {profileStats.state}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in StravaPosts:', error);
    return <div className="text-sm text-red-500">Failed to load Strava activities</div>;
  }
}

export default StravaAthlete;
