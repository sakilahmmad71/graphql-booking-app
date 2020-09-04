const getAvailableEvents = () => {
    const requestBody = {
        query: `
            query {
                events {
                    _id
                    title
                    description
                    price
                    date
                    creator {
                        _id
                        email
                    }
                }
            }
        `,
    }

    fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json()
        })
        .then((resData) => {
            console.log(resData)
            const allEvents = resData.data.events
            return allEvents
        })
        .catch((error) => {
            throw error
        })
}

export default getAvailableEvents
