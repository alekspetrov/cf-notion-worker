import { fetchEmails, putEmail } from '../api/octopus'

const getEmails = async () => {
  return await fetchEmails()
}

const addEmail = async request => {
  const jsonBody = JSON.stringify(await request.json())
  const body = JSON.parse(jsonBody)

  return await putEmail(body.email)
}

export { getEmails, addEmail }
