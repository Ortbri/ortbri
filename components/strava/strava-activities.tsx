import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { StravaActivity } from '@/types/strava'
import Image from 'next/image'

interface ActivityPhoto {
  urls: {
    '800': string;
  };
}

interface ActivityWithPhotos extends StravaActivity {
  photos?: ActivityPhoto[];
}

async function getActivityPhotos(activityId: number, accessToken: string): Promise<ActivityPhoto[]> {
  const response = await fetch(
    `https://www.strava.com/api/v3/activities/${activityId}/photos?size=800`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );
  
    if (!response.ok) return [];
    // console.log(JSON.stringify(response.json, null, 2))
  return response.json();
}

async function StravaActivities() {
  try {
    console.log('Fetching Strava activities...')
    if (!process.env.STRAVA_ACCESS_TOKEN) {
      console.warn("No Strava access token found")
      return null
    }

    const now = Math.floor(Date.now() / 1000)
    const oneMonthAgo = now - (30 * 24 * 60 * 60) // 30 days ago in seconds

    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?before=${now}&after=${oneMonthAgo}&page=1&per_page=3`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.STRAVA_ACCESS_TOKEN}`,
        },
        next: { revalidate: 3600 } // Revalidate every hour
      }
    )
    
    if (!response.ok) {
      const errorData = await response.text()
      console.error('Strava API Error:', errorData)
      throw new Error(`Failed to fetch Strava activities: ${response.status}`)
    }

    const activities: StravaActivity[] = await response.json()
    // console.log('Strava Activities:', JSON.stringify(activities, null, 2))

    // Fetch photos for activities that have them
    const activitiesWithPhotos = await Promise.all(
      activities.map(async (activity) => {
        if (activity.total_photo_count > 0) {
          const photos = await getActivityPhotos(activity.id, process.env.STRAVA_ACCESS_TOKEN!)
          return { ...activity, photos }
        }
        return activity
      })
    )

    const runs = activitiesWithPhotos.filter(activity => activity.type === 'Run') as ActivityWithPhotos[]
    // console.log('Filtered Runs:', runs.length)

    if (!runs.length) {
      return (
        <div className="text-sm text-muted-foreground">
          No recent runs
        </div>
      )
    }

    return (
      <div className="flex flex-col space-y-4 w-full max-w-4xl mx-auto">
        <h3 className="text-sm font-medium text-muted-foreground">Recent Runs</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {runs.map((run) => (
            <div key={run.id} className="rounded-3xl border bg-card p-4 text-card-foreground ">
              {run.photos?.[0] ? (
                <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={run.photos[0].urls['800']}
                    alt={run.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                          <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden bg-gradient-to-br bg-accent/20 flex items-center justify-center">
                              didnt upload
          
                </div>
              )}
              <h4 className="font-medium">{run.name}</h4>
              <div className="mt-2 text-sm text-muted-foreground">
                <p>{(run.distance / 1000).toFixed(2)} km</p>
                <p>{Math.floor(run.moving_time / 60)} minutes</p>
                <p className="mt-1 text-xs">
                  {formatDistanceToNow(new Date(run.start_date), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in StravaActivities:', error)
    return (
      <div className="text-sm text-red-500">
        Failed to load Strava activities
      </div>
    )
  }
}

export default StravaActivities