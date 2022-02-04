import slugify from 'slugify'
import { fetchBlocks, fetchTable } from '../api/notion'

const getPage = async slug => {
  const results = await fetchTable()

  // Get page form the list
  const page = results.find(post => {
    const { Name } = post.properties
    const postTitle = Name.title[0].plain_text
    const postSlug = slugify(postTitle).toLowerCase()

    return postSlug === slug
  })

  // HACK: Not sure why it tries to call pai second time
  if (!page) return
  // --

  // get page props
  const { Name, Description } = page.properties
  const pageData = {
    title: Name.title[0].plain_text,
    description: Description.rich_text[0].plain_text,
    date: page.properties['Crated at'].created_time,
  }

  const blocks = await fetchBlocks(page.id)

  return { ...pageData, blocks: blocks }
}

const BlocksRoute = async req => {
  const slug = req.params.id
  return getPage(slug)
}

export { BlocksRoute }
