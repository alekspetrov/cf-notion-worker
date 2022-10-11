import { Router } from 'itty-router'
import { getPages, getPage } from '../src/router/pages'
import { addEmail } from '../src/router/emails'

const router = Router()

router
  .get('/pages', getPages)
  .get('/pages/:id', getPage)
  .post('/emails/add', addEmail)
  .get('*', () => new Response('Not found', { status: 404 }))

// Hanlder to cache fetch data
const handleRequest = async event => {
  const { request } = event

  // Emails
  if (request.method === 'POST') {
    let response = await router.handle(request)
    response = new Response(JSON.stringify(response), response)
    response.headers.set('Content-Type', 'application/json')

    return response
  }

  // Notion
  const cacheUrl = new URL(request.url)
  const cache = caches.default
  const cacheKey = new Request(cacheUrl.toString(), request)

  let response = await cache.match(cacheKey)

  if (!response) {
    response = await router.handle(request)

    // Return json in response with content-type application/json
    response = new Response(JSON.stringify(response), response)
    response.headers.set('Cache-Control', 'max-age=7200')
    response.headers.set('Content-Type', 'application/json')

    event.waitUntil(cache.put(cacheKey, response.clone()))
  }

  return response
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event))
})
