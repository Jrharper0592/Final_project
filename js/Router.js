;
(function() {
    "use strict";

    Parse.MovieRouter = Parse.Router.extend({
        initialize: function(options) {
            if (!options.token && !this.token) {
                throw new Error("Rotten Tomatoes token must be provided")
            }

            // store the rottentomatoes token
            this.token = options.token;

            // some collection of Movies
            this.collection = new Parse.MovieCollection()

            // home view
            this.homeView = new Parse.Homeview({
                collection: this.collection
            })

            // profile view
            this.userView = new Parse.UserView({});
            // details / info view
            this.detailview = new Parse.Detailsview({
            });

            //  start the router
            Parse.history.start();
        },

        routes: {
        	'top-movies':"loadTopMovies",
            'login': 'login',
            'info/:id': 'details',
            'search/:keywords': 'search',
            '*default': 'home'
        },

        login: function() {
            this.userView.render();
        },

        home: function() {
            this.homeView.render();
        },

        details: function(id) {
            // this.detailview.model = ...

            var movieModel = this.collection.get(id)
            this.detailview.model= movieModel
            this.detailview.render();
            // self.drawDetails(id);
            // console.log(id);
        },

        loadTopMovies:function(){
        	var self = this;
        	this.collection = new Parse.TopMoviesCollection()

        	this.collection.fetchMovies(/*?keywords?*/).then(function(topMoviesResponse){
        		self.homeView.collection = self.collection
        		self.homeView.render();
        	})


        },
        

        search: function(keywords) {
        	var self = this;
        	this.collection.fetchMovies(keywords).then(function(data){
        		self.homeView.render();
        	})
        }
    });
	

    var stuff = {
        URLs: {
            Movies: 'http://api.rottentomatoes.com/api/public/v1.0/movies.json'
        },

        access_token: function() {
            return "?api_key=" + this.token;
        },

        drawDetails: function(id) {
            console.log("Drawing Dets")
            console.log(id)
            debugger;
            $.when(
                this.getData(id),
                this.loadTemplate("DetailsScreen")
            ).then(function(apidataPromise, templatePromise) {

                var text = apidataPromise[0].replace(/\n/g, '')
                var response = JSON.parse(text.substr(2, text.length - 4))

                var templatingFn = _.template(templatePromise[0]);
                document.querySelector(".container").innerHTML = templatingFn(response[0]);
            });
            alert('ID WOOT')
        },

        draw: function(keywords) {


            $.when(
                    // 1-get api data 
                    this.getData(keywords),
                    this.loadTemplate("Gridscreen")
                )
                .then(function(apidataPromise, templatePromise) {

                    var text = apidataPromise[0].replace(/\n/g, '')
                    var response = JSON.parse(text.substr(2, text.length - 4))

                    var templatingFn = _.template(templatePromise[0]);
                    document.querySelector(".HowTo").innerHTML = templatingFn({
                        data: response
                    });
                    // console.log(apidata[0])
                });
        }
    };

})();
