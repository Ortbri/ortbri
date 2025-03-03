import { Skeleton } from "../ui/skeleton";

export function StravaAthleteSkeleton() {
    return (
        <Skeleton className="h-12 w-12 rounded-full" />
    )
}

export function StravaAthleteStatsSkeleton() {
    return (
        <Skeleton className="h-4 w-[250px]" />
    )
}


export function StravaActivitiesSkeleton() {
    return (
        <Skeleton className="h-4 w-[200px]" />
    )
}
