;
(function() {

    "use strict";

    Parse.Detailsview = Parse.TemplateView.extend({
        el: '.container',
        view: 'DetailsScreen',
        events: {
            // 'click .listed': 'Infoview'
        }
    })


}());




// drawDetails: function(listing_id){
//             $.when(
//                 this.getData("", listing_id),
//                 this.loadTemplate("detailed")
//             ).then(function(apidata, template){
//                 var templatingFun = _.template(template);
//                 document.querySelector(".container").innerHTML = templatingFun(apidata.results[0]);
//             });
//         },
