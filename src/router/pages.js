import { fetchTable, fetchBlocks } from '../api/notion'
import slugify from 'slugify'

const getPageBlocks = async slug => {
  const pages = await getPages()

  // Get page form the list
  const page = pages.find(post => {
    const { Name } = post.properties
    const postTitle = Name.title[0].plain_text
    const postSlug = slugify(postTitle, {
      remove: /[:+~*.()'"!@]/g,
      lower: true,
    }).toLowerCase()

    return postSlug === slug
  })

  // HACK: Not sure why it tries to call pai second time
  if (!page) return
  // --

  // get page props
  const { Name, Description, Tags } = page.properties
  const pageData = {
    title: Name.title[0].plain_text,
    description: Description.rich_text[0].plain_text,
    date: page.properties['Created at'].created_time,
    tags: Tags.multi_select,
  }

  const blocks = await fetchBlocks(page.id)

  return { ...pageData, blocks: blocks }
}

const getPages = async () => {
  return await fetchTable()
}

const getPage = async req => {
  const slug = req.params.id
  return getPageBlocks(slug)
}

export { getPages, getPage }
