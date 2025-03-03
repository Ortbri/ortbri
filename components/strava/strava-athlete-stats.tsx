import React from 'react';
import { AthleteStats } from '@/types/strava';

async function StravaAthleteStats() {
  try {
    console.log('Fetching Strava activities...');
    if (!process.env.STRAVA_BRIAN) {
      console.warn('! no strava brian');
      return <div className="text-muted-foreground text-sm">No Strava ID</div>;
    }
    const response = await fetch(
      `https://www.strava.com/api/v3/athletes/${process.env.STRAVA_BRIAN}/stats`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAVA_ACCESS_TOKEN}`,
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Strava API Error:', errorData);
      throw new Error(`Failed to fetch Strava activities: ${response.status}`);
    }

    const profileStats: AthleteStats = await response.json();

    if (!profileStats) {
      return <div className="text-muted-foreground text-sm">No recent stats</div>;
    }

    return (
      <div className="w-full">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Recent Run Stats */}
          <div className="bg-card text-card-foreground rounded-3xl border p-6">
            <h3 className="text-lg font-semibold mb-4">Recent (4 weeks)</h3>
            <div className="space-y-4">
              <StatItem
                label="Runs"
                value={profileStats.recent_run_totals.count.toString()}
              />
              <StatItem
                label="Distance"
                value={`${(profileStats.recent_run_totals.distance / 1609.34).toFixed(1)} mi`}
              />
              <StatItem
                label="Time"
                value={`${(profileStats.recent_run_totals.moving_time / 3600).toFixed(1)}h`}
              />
            </div>
          </div>

          {/* YTD Run Stats */}
          <div className="bg-card text-card-foreground rounded-3xl border p-6">
            <h3 className="text-lg font-semibold mb-4">Year to Date</h3>
            <div className="space-y-4">
              <StatItem
                label="Runs"
                value={profileStats.ytd_run_totals.count.toString()}
              />
              <StatItem
                label="Distance"
                value={`${(profileStats.ytd_run_totals.distance / 1609.34).toFixed(1)} mi`}
              />
              <StatItem
                label="Time"
                value={`${(profileStats.ytd_run_totals.moving_time / 3600).toFixed(1)}h`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in StravaPosts:', error);
    return <div className="text-sm text-red-500">Failed to load Strava activities</div>;
  }
}

interface StatItemProps {
  label: string;
  value: string;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default StravaAthleteStats;
