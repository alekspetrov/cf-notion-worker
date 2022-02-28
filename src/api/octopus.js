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
    const res = await fetch(
      'https://emailoctopus.com/api/1.5/lists/a803337d-9581-11ec-9258-0241b9615763/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      },
    )

    return await res
  } catch (error) {
    throw Error('Can not add email to Octopus', error)
  }
}

export { fetchEmails, putEmail }
