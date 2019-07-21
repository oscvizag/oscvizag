
  $(function(){
    "use strict";
    var home_content = $(".home .home-content"),
        home = $(".home"),
        down = $(".home .btn-down"),
        slide_btn = $(".slide-nav-btn"),
        btn_active = "slide-nav-btn-active",
        nav_right = $(".slide-nav-left"),
        slide_nav = $(".slide-nav"),
        slide_active = "slide-nav-active",
        slide_list = $(".slide-nav ul"),
        html_body = $("html, body"),
        post = $(".post-cover"),
        post_header = $(".post-cover .header");


        home.height($(window).height())
        home_content.css("top",(home.height() - home_content.height()) / 2)
        down.css("right",(home.width() - down.width()) / 2)
        slide_list.css("top",(slide_nav.height() - slide_list.height()) / 2)
        nav_right.css("top",(home.height() -  nav_right.height()) / 2)
        /*---------------[post header] ----------------*/
        post_header.css("top",(post.height() - post_header.height()) / 2)
        /*------------[slide nav btn]-----------------*/
        slide_btn.on('click',function(){
          "use strict";
          $(this).toggleClass(btn_active);
          slide_nav.toggleClass(slide_active)
        })
     
        /*------------[smoothscroll]-----------------*/
        $('a').smoothScroll({
        speed:500,
        });
        $('.event .owl-carousel').owlCarousel({
          autoplay:true,
          margin:20,
          responsive:{
                0:{items:1,},
              600:{items:2,},
             1000:{items:3}
          }
         });
        
        html_body.on("click",function(){
          "use strict";
          $(this).css("overflow","auto")
        })
        

     
    

});


// up to page fadeIn fadeOut
$(document).on('scroll',function() {
  "use strict";
  var y = $(this).scrollTop();
  if (y > 800) {
    $('.up').css("right","2%");
  } else {
    $('.up').css("right","-200px");
  }
});



(function($) {
  "use strict";
  $(window).on("load", function() {
    if ($(".preloader").length > 0) {
      $(".preloader").fadeOut("slow");
    }
  });
})(jQuery);

$(document).ready(function() {
  $(".main-carousel").flickity({
    // options
    wrapAround: true,
    autoPlay: true,
    autoPlay: 3000
  });
});




$(document).ready(function(){
  $('.carousel').carousel();
});