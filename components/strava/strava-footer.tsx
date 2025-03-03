import React, { Suspense } from 'react'
import StravaAthlete from './strava-athlete'
import { StravaAthleteSkeleton } from './strava-skeleton'

function StravaFooter() {
  return (
    <div className='w-full max-w-3xl mx-auto space-y-6'>
      {/* <div className="text-center">
        <h2 className='font-medium text-2xl text-muted-foreground'>
          Road to 100 m
        </h2>
      </div> */}
      <div className="relative">
        <Suspense fallback={<StravaAthleteSkeleton />}>
          <StravaAthlete />
        </Suspense>
      </div>
    </div>
  )
}

export default StravaFooter