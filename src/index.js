import { Router } from 'itty-router'
import { TableRoute } from '../src/router/table'
import { BlocksRoute } from '../src/router/blocks'

const router = Router()

router.get('/database', TableRoute)
router.get('/blocks/:id', BlocksRoute)

// Hanlder to cache fetch data
const handleRequest = async event => {
  const request = event.request
  const cacheUrl = new URL(request.url)
  const cache = caches.default
  const cacheKey = new Request(cacheUrl.toString(), request)

  let response = await cache.match(cacheKey)

  if (!response) {
    response = await router.handle(event.request)
    response = new Response(JSON.stringify(response), response)
    response.headers.set('Cache-Control', 'max-age=600')
    response.headers.set('Content-Type', 'application/json')

    event.waitUntil(cache.put(cacheKey, response.clone()))
  }

  return response
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event))
})
