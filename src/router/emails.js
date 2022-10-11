const addEmail = async request => {
  // request is a str json
  const requestJson = JSON.stringify(await request.json())
  const { email } = JSON.parse(requestJson)

  // EmailOctopus data requires: api_key, email_address
  const body = JSON.stringify({
    // eslint-disable-next-line no-undef
    api_key: OCTOPUS_TOKEN,
    email_address: email,
    fields: {
      FirstName: '',
      LastName: '',
      Birthday: '',
    },
    tags: [],
    status: '',
  })

  try {
    const res = await fetch(
      'https://emailoctopus.com/api/1.5/lists/a803337d-9581-11ec-9258-0241b9615763/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      },
    )

    const jsonResp = {
      data: await res.json(),
      status: res.status,
    }

    return jsonResp
  } catch (error) {
    throw new Error('EmailOctopus Error: ', error.message || error)
  }
}

export { addEmail }
