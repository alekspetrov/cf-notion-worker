import { fetchEmails, putEmail } from '../api/octopus'

const getEmails = async () => {
  return await fetchEmails()
}

const addEmail = async request => {
  try {
    const jsonBody = JSON.stringify(await request.json())
    const body = JSON.parse(jsonBody)
    return await putEmail(body.email)
  } catch (e) {
    throw new Error('Fetch Table: ', e.message || e)
  }
}

export { getEmails, addEmail }
