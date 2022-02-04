import { fetchTable } from '../api/notion'

const TableRoute = async () => {
  return await fetchTable()
}

export { TableRoute }
