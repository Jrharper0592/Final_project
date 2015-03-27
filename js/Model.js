;
(function() {

    // each model stores some data
    Parse.Movie = Parse.Object.extend({
        className: 'movie',
        url: function() {
            return "https://jsonp.afeld.me/?url=http%3A%2F%2Fapi.rottentomatoes.com%2Fapi%2Fpublic%2Fv1.0%2Fmovies%2F" + this.id + ".json%3Fapikey%3D7trjhvhmtd3cwu6dnrth5axs"
        },
        fetchDataFromRottenTomatoes: function() {
            var self = this;
            return $.get(this.url()).then(function(data) {
                self.set(data)
            })
        },
        initialize: function() {
            // this.on("change", function() {
            //     this.save();
            // })
        }
    });

    // a collection stores models of the specified type
    Parse.MovieCollection = Parse.Collection.extend({
        model: Parse.Movie,
        urlSearchMovies: function() {
            return [
                'https://jsonp.afeld.me/?url=http%3A%2F%2Fapi.rottentomatoes.com%2Fapi%2Fpublic%',
                '2Fv1.0%2Fmovies.json%3Fapikey%3D7trjhvhmtd3cwu6dnrth5axs%26q%3D',
                this.keywords
            ].join('')
        },
        fetchMovies: function(keywords) {
            var self = this
            this.keywords = keywords

            return $.get(this.urlSearchMovies()).then(function(data) {
                self.reset(data.movies)
                console.log(data)
            })
        },

        urlTopMovies: function() {
            return 'https://jsonp.afeld.me/?url=http%3A%2F%2Fapi.rottentomatoes.com%2Fapi%2Fpublic%2Fv1.0%2Flists%2Fdvds%2Ftop_rentals.json%3Flimit%3D10%26country%3Dus%26apikey%3D7trjhvhmtd3cwu6dnrth5axs'


        },

        fetchTopMovies: function() {
            var self = this

            return $.get(this.urlTopMovies()).then(function(data) {
                self.reset(data.movies)
                    // console.log(data)
            })
        },

        urlBoxOffice: function() {
            return 'https://jsonp.afeld.me/?url=http%3A%2F%2Fapi.rottentomatoes.com%2Fapi%2Fpublic%2Fv1.0%2Flists%2Fmovies%2Fbox_office.json%3Flimit%3D16%26country%3Dus%26apikey%3D7trjhvhmtd3cwu6dnrth5axs'
        },

        fetchBoxOfficeMovies: function() {
            var self = this

            return $.get(this.urlBoxOffice()).then(function(data) {
                self.reset(data.movies)
                    // console.log(data)
            })
        },

        urlInTheaters: function() {
            return 'https://jsonp.afeld.me/?url=http%3A%2F%2Fapi.rottentomatoes.com%2Fapi%2Fpublic%2Fv1.0%2Flists%2Fmovies%2Fin_theaters.json%3Fpage_limit%3D16%26page%3D1%26country%3Dus%26apikey%3D7trjhvhmtd3cwu6dnrth5axs'
        },

        fetchInTheatersMovies: function() {
            var self = this

            return $.get(this.urlInTheaters()).then(function(data) {
                self.reset(data.movies)
                    // console.log(data)
            })
        },

        urlOpeningMovies: function() {
            return 'https://jsonp.afeld.me/?url=http%3A%2F%2Fapi.rottentomatoes.com%2Fapi%2Fpublic%2Fv1.0%2Flists%2Fmovies%2Fopening.json%3Flimit%3D16%26country%3Dus%26apikey%3D7trjhvhmtd3cwu6dnrth5axs'
        },

        fetchOpeningMovies: function() {
            var self = this

            return $.get(this.urlOpeningMovies()).then(function(data) {
                self.reset(data.movies)
                    // console.log(data)
            })
        },

        urlUpcomingMovies: function() {
            return 'https://jsonp.afeld.me/?url=http%3A%2F%2Fapi.rottentomatoes.com%2Fapi%2Fpublic%2Fv1.0%2Flists%2Fmovies%2Fupcoming.json%3Fpage_limit%3D16%26page%3D1%26country%3Dus%26apikey%3D7trjhvhmtd3cwu6dnrth5axs'
        },

        fetchUpcomingMovies: function() {
            var self = this

            return $.get(this.urlUpcomingMovies()).then(function(data) {
                self.reset(data.movies)
                    // console.log(data)
            })
        },
    });

    window.parseMovies = function(responseText) {
        // var text = responseText.replace(/\n/g , '')
        // var response = JSON.parse(text.substr(2 ,text.length-4 ))
        // debugger;
        return response
    }

}());
