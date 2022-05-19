export enum VoteAverage {
  lte = 'vote_average.lte',
  gte = 'vote_average.gte',
}

export interface movieDiscoverProps {
  with_genres?: number[]
  sort_by?: string
  [VoteAverage.lte] : number
  [VoteAverage.gte] : number
}