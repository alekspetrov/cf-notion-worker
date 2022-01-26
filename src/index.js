import { Client } from '@notionhq/client'
import { Router } from 'itty-router'

const NOTION_API = 'https://api.notion.com/v1'
const NOTION_DB = '7d773a91d3614c28a6292d2f8cc919cf'

const notion = new Client({
  auth: NOTION_TOKEN,
})

const router = Router()

// API Requests
const fetchDatabase = async () => {
  const response = await notion.databases.query({
    database_id: NOTION_DB,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
    },
    headers: {},
  })

  return response.results
}

// Router
const databaseRoute = async () => {
  const response = await fetchDatabase()

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// Hanlder
const handleRequest = event => {
  // const request = event.request
  // const cacheUrl = new URL(request.url)
  // const cache = caches.default

  return router.handle(event.request)
}

// Routes
router.get('/database', databaseRoute)

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event))
})
