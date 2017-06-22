

template = '<div class="card">' +
            '<img class="img-fluid"  src="{{model.images.standard_resolution.url}}" height="280" alt="{{caption}}">' +
            '<p class="card-text"></p>' +
          '</div>';

template = '<div class="col-lg-4 col-sm-6 col-xs-12">' +
        '<a href="#">' +
             '<img src="{{model.images.standard_resolution.url}}" height="280" alt="{{caption}}" class="img-thumbnail img-responsive">' +
        '</a>' +
    '</div>' ;


template =  '<figure class="figure col-lg-4 col-sm-6 col-xs-12">' +
            '<img src="{{model.images.standard_resolution.url}}" class="figure-img img-fluid rounded" alt="{{caption}}">' +
            '<figcaption class="figure-caption"> <i class="fa fa-heart-o" aria-hidden="true"></i> {{likes}}<br />{{caption}}<br /><a href="{{link}} " target="_blank">View on instagram</a> </figcaption>' +
            '</figure>';

var feed = new Instafeed({
    get: 'user',
    userId: instagramUserID,
    //clientId: instagramClientId,
    accessToken: instagramAccessToken,
    resolution: 'low_resolution',
    sortBy: 'most-recent',
    limit: 50,
    template: template,
    after: function() {
      $("#loader").addClass('hidden');

      
    },

});

feed.run();


jQuery(document).ready(function(){
  $(window).scroll(function() {
    $("#loader").removeClass('hidden');
    if($(window).scrollTop() + $(window).height() >= $(document).height()) {
      console.log("grab next set");
      feed.next();
    }
  });



});





