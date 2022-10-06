const fetchEmails = () => {
  console.log('FetchEmails not realized yet.')
}

const putEmail = async email => {
  const body = JSON.stringify({
    // eslint-disable-next-line no-undef
    api_key: OCTOPUS_TOKEN,
    email_address: email.trim(),
  })

  try {
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

    return res
  } catch (e) {
    throw Error('Fetch EmailOctopus Error: ', e.message || e)
  }
}

export { fetchEmails, putEmail }
