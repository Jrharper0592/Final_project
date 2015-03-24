;
(function() {

    // each model stores some data
    Parse.Movie = Parse.Object.extend({
        className: 'movie',
        initialize: function() {
            this.on("change", function() {
                this.save();
            })
        }
    });

    // a collection stores models of the specified type
    Parse.MovieCollection = Parse.Collection.extend({
        model: Parse.Movie,
        url: function() {
            return [
                'https://jsonp.afeld.me/?url=http%3A%2F%2Fapi.rottentomatoes.com%2Fapi%2Fpublic%',
                '2Fv1.0%2Fmovies.json%3Fapikey%3D7trjhvhmtd3cwu6dnrth5axs%26q%3D',
                this.keywords
            ].join('')
        },
        fetchMovies: function(keywords) {
            var self = this
            this.keywords = keywords

            return $.get(this.url()).then(function(data) {
                self.reset(data.movies)
            })
        }
    });

    window.parseMovies = function(responseText) {
        // var text = responseText.replace(/\n/g , '')
        // var response = JSON.parse(text.substr(2 ,text.length-4 ))
        debugger;
        return response
    }

}());
