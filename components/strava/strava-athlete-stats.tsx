import React from 'react'
import { AthleteStats } from '@/types/strava'


async function StravaAthlete() {
  try {
    console.log('Fetching Strava activities...')
    if (!process.env.STRAVA_BRIAN) {
      console.warn("! no strava brian")
      return 
    }
    const response = await fetch(`https://www.strava.com/api/v3/athletes/${process.env.STRAVA_BRIAN}/stats`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAVA_ACCESS_TOKEN}`,
      },
      next: { revalidate: 3600 } // Revalidate every hour
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Strava API Error:', errorData)
      throw new Error(`Failed to fetch Strava activities: ${response.status}`)
    }

    const profileStats: AthleteStats = await response.json()
    

    if (!profileStats) {
      return (
        <div className="text-sm text-muted-foreground">
          No recent stats
        </div>
      )
    }
    return (
      <div>
        testing
     </div>
    )
  } catch (error) {
    console.error('Error in StravaPosts:', error)
    return (
      <div className="text-sm text-red-500">
        Failed to load Strava activities
      </div>
    )
  }
}

export default StravaAthlete