const fetchEmails = () => {
  console.log('FetchEmails')
}

const putEmail = async email => {
  const body = JSON.stringify({
    // eslint-disable-next-line no-undef
    api_key: OCTOPUS_TOKEN,
    email_address: email,
  })

  try {
    const response = await fetch(
      'https://emailoctopus.com/api/1.5/lists/a803337d-9581-11ec-9258-0241b9615763/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      },
    )

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export { fetchEmails, putEmail }
