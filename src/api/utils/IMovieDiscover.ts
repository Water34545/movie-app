export enum IVoteAverage {
  lte = 'vote_average.lte',
  gte = 'vote_average.gte',
}

export interface IMovieDiscover {
  with_genres?: number[]
  sort_by?: string
  [IVoteAverage.lte] : number
  [IVoteAverage.gte] : number
}