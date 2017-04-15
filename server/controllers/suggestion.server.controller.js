const request = require('request');
module.exports = {
    getSuggestions(req, res) {
      let limit = 20;
      let search = encodeURI(req.params.search);
      let apiPath = 'https://tastedive.com/api/similar?k=228946-moviegur-14IA4LWB&q=' + search + '&type=movies&limit=' + limit;
        var options = {
            uri: apiPath,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };
        request(options,
            function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    return res.status(200).json(body.Similar.Results);
                } else {
                    return res.status(404).json(error);
                }
            });
    }
}
