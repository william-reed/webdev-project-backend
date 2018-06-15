const axios = require('axios');

module.exports = function (app) {
    app.get('/api/recurring', getRecurringReminders);
    app.get('/api/recurring/:title', getRecurringExample);

    var recurring = [
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
        }
    ];

    function getRecurringReminders(req, res) {
        res.send(recurring);
    }

    function getRecurringExample(req, res) {
        let title = req.params['title'];
        recurring.find((element) => element.title === title).fetch()
            .then(apiRes => res.send(apiRes));
    }
}