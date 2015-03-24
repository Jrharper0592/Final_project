;
(function() {

    "use strict";

    Parse.Homeview = Parse.TemplateView.extend({
        el: '.container',
        view: 'HomeScreen',
        events: {
            'click .homeicon': 'home',
            'click .loginicon': 'Logging',
            'submit .SC': 'handleEvents'
        },
        home: function(e) {
            e.preventDefault();
            window.location.hash = "#home"
        },

        Logging: function(e) {
            e.preventDefault();
            window.location.hash = "login"
        },

        handleEvents: function() {
            $('body').on("submit", "form", function(event) {
                event.preventDefault();
                window.location.hash = 'search/' + this.querySelector('input').value;
            });
        },

    })


}());





//Search api
// 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?page_limit=50&apikey=7trjhvhmtd3cwu6dnrth5axs&q=horror'
