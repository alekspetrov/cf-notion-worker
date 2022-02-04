import slugify from 'slugify'
import { fetchBlocks, fetchTable } from '../api/notion'

const getPageBlocks = async slug => {
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
  const blocks = await fetchBlocks(page.id)

  return blocks
}

const BlocksRoute = async req => {
  const slug = req.params.id
  return getPageBlocks(slug)
}

export { BlocksRoute }
