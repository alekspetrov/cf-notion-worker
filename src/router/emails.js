import { fetchEmails, putEmail } from '../api/octopus'

const getEmails = async () => {
  return await fetchEmails()
}

const addEmail = async request => {
  const jsonBody = JSON.stringify(await request.json())
  const body = JSON.parse(jsonBody)
  const res = await putEmail(body.email)

  return res
}

export { getEmails, addEmail }
