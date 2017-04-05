const http = require('http');
module.exports = {
    getSuggestions(req, res) {
        let limit = 20;
        let search = encodeURI(req.params.search);
        let apiPath = '/api/similar?k=228946-moviegur-14IA4LWB&q=' + search + '&type=movies&limit=' + limit;
        var options = {
            host: 'www.tastekid.com',
            port: 80,
            path: apiPath,
            method: 'GET'
        };

        http.request(options).on('response', function(response) {
            var data = '';
            response.on("data", function(chunk) {
                data += chunk;
            });
            response.on('end', function() {
                var results = JSON.parse(data);
                if (!results.Similar.Results.length) {
                    return res.status(404).send('No Results');
                }
                return res.status(200).json(results.Similar.Results);
            });
        }).end();
    }
}
