import { fetchEmails, putEmail } from '../api/octopus'

const getEmails = async () => {
  return await fetchEmails()
}

const addEmail = async request => {
  try {
    const jsonBody = JSON.stringify(await request.json())
    const body = JSON.parse(jsonBody)
    return putEmail(body.email)
  } catch (error) {
    throw Error('Add email error', error.message || error)
  }
}

export { getEmails, addEmail }
