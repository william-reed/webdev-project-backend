const axios = require('axios');

module.exports = [
    {
        title: 'Quotes',
        description: 'Inspiring quotes from famous scholars, leaders, and figures of the world',
        fetch: () => axios.get('https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1')
            .then(response => String(response.data[0].content).replace('<p>', '').replace('</p>', '')
                + ' - ' + response.data[0].title)
    },
    {
        title: 'Chuck Norris Facts',
        description: 'Get random facts about Chuck Norris and his seemingly infinite skills',
        fetch: () => axios.get('https://api.chucknorris.io/jokes/random')
            .then(response => response.data.value)
    },
    {
        title: 'Cat Facts',
        description: 'Receive random cat facts',
        fetch: () => axios.get('https://catfact.ninja/fact')
            .then(response => response.data.fact)
    },
    {
        title: 'Ron Swanson Quotes',
        description: 'Get quotes from Park and Recreations infamous Ron Swanson (Nick Offerman) sent to your phone',
        fetch: () => axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
            .then(response => response.data[0])
    },
    {
        title: 'Dad Jokes',
        description: 'Get some eye-rolling Dad inspired jokes.',
        fetch: () => axios.get('https://icanhazdadjoke.com/', {
            headers: {
                'accept': 'application/json',
            }
        }).then(response => response.data.joke)
    },
    {
        title: 'Random Trivia',
        description: 'Get random trivia sent to your phone',
        fetch: () => axios.get('http://numbersapi.com/random/trivia')
            .then(response => response.data)
    },
    {
        title: 'Year Trivia',
        description: 'Get random trivia about a random year',
        fetch: () => axios.get('http://numbersapi.com/random/year')
            .then(response => response.data)
    },
    {
        title: 'Date Trivia',
        description: 'Get trivia about a random date in history',
        fetch: () => axios.get('http://numbersapi.com/random/date')
            .then(response => response.data)
    },
    {
        title: 'Math Trivia',
        description: 'Get random math based facts',
        fetch: () => axios.get('http://numbersapi.com/random/math')
            .then(response => response.data)
    }

];