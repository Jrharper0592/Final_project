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
        	'upcoming-movies':'loadUpcomingMovies',
        	'opening-movies':'loadOpeningMovies',
        	'in-theaters':'loadTheaters',
        	'box-office':'loadBoxOffice',
        	'top-movie-rentals':"loadTopMovies",
            'login': 'login',
            'info/:id': 'details',
            'search/:keywords': 'search',
            '*default': 'home'
        },

        login: function() {
            this.userView.render();
        },

        home: function() {
            var self = this;
            this.collection = new Parse.MovieCollection();
            console.log(this.collection)
            this.collection.fetchInTheatersMovies(/*?keywords?*/).then(function(data){
       
                self.homeView.collection = self.collection
                self.homeView.render();
            })
        },

        details: function(id) {
            // this.detailview.model = ...

            // var movieModel = this.collection.get(id)
            var movieModel = new Parse.Movie({id: id})
            var self = this
            movieModel.fetchDataFromRottenTomatoes().then(function(){
            	self.detailview.model= movieModel
	            self.detailview.render();	
            })
            
            // self.drawDetails(id);
            // console.log(id);
        },

        loadTopMovies:function(){
        	var self = this;
        	this.collection = new Parse.MovieCollection();
        	console.log(this.collection)
        	this.collection.fetchTopMovies(/*?keywords?*/).then(function(data){
       
        		self.homeView.collection = self.collection
        		self.homeView.render();
        	})
        },

        loadBoxOffice:function(){
        	var self = this;
        	this.collection = new Parse.MovieCollection();
        	console.log(this.collection)
        	this.collection.fetchBoxOfficeMovies(/*?keywords?*/).then(function(data){
       
        		self.homeView.collection = self.collection
        		self.homeView.render();
        	})
        },
        
        loadTheaters:function(){
        	var self = this;
        	this.collection = new Parse.MovieCollection();
        	console.log(this.collection)
        	this.collection.fetchInTheatersMovies(/*?keywords?*/).then(function(data){
       
        		self.homeView.collection = self.collection
        		self.homeView.render();
        	})
        },

        loadOpeningMovies:function(){
        	var self = this;
        	this.collection = new Parse.MovieCollection();
        	console.log(this.collection)
        	this.collection.fetchOpeningMovies(/*?keywords?*/).then(function(data){
       
        		self.homeView.collection = self.collection
        		self.homeView.render();
        	})
        },

        loadUpcomingMovies:function(){
        	var self = this;
        	this.collection = new Parse.MovieCollection();
        	console.log(this.collection)
        	this.collection.fetchUpcomingMovies(/*?keywords?*/).then(function(data){
       
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
