import { Client } from '@notionhq/client'

const NOTION_API = 'https://api.notion.com/v1'
const NOTION_DB = '7d773a91d3614c28a6292d2f8cc919cf'

const notion = new Client({
  auth: NOTION_TOKEN,
})

const fetchTable = async () => {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DB,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
    })

    return response.results
  } catch (e) {
    throw Error('Fetch Table: ', e.message || e)
  }
}

const fetchBlocks = async blockId => {
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 50,
    })

    return response.results
  } catch (e) {
    throw Error('Fetch Table: ', e.message || e)
  }
}

export { fetchBlocks, fetchTable }
