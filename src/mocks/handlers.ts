import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.get('https://api.themoviedb.org/3/genre/movie/list?language=en', () => {
    return HttpResponse.json([{id: 1, name: "action"}, {id: 2, name: "comedy"}, {id: 3, name: "romance"}])
  }),
  http.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', () => {
    return HttpResponse.json([{id: 1, name: "action"}, {id: 2, name: "comedy"}, {id: 3, name: "romance"}])
  }),
  http.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US', () => {
    return HttpResponse.json([{id: 1, name: "action"}, {id: 2, name: "comedy"}, {id: 3, name: "romance"}])
  }),
]