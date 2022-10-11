const fetchEmails = () => {
  console.log('FetchEmails not realized yet.')
}

const putEmail = async email => {
  const body = JSON.stringify({
    // eslint-disable-next-line no-undef
    api_key: OCTOPUS_TOKEN,
    email_address: email,
  })

  // EmailOcropus returns statuses in the responses with code 200.
  const res = await fetch(
    'https://emailoctopus.com/api/1.6/lists/a803337d-9581-11ec-9258-0241b9615763/contacts',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    },
  )

  // FIX: Fix with utility function checks for json or stringified json.

  // This code covers EmailOctopus inconsistent api.
  // If status 200 it returns json()
  if (res.status === 200) {
    return res
  }

  // If status 409 it returns stringified json.
  if (res.status === 409) {
    return await res.json()
  }

  return new Response(null, {
    status: res.status,
  })
}

export { fetchEmails, putEmail }
