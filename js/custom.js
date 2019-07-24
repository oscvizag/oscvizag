 /*--------------------------[Custome Style Css File]-------------------------------
       Project       :  Costa
       Version       :  1.0
       Author        :  Mohamed Hany
       Primary Use   :  Portfolio
-----------------------------------------------------------------------------------*/

  /* global  $,  jquery, console, alert*/
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
       /*------------[mix it up on]-----------------*/
        $('#gallery').mixItUp(); 
        /*------------[counter on]-----------------*/
        $('.timer').countTo();

        $('.modal').modal();
        
        html_body.on("click",function(){
          "use strict";
          $(this).css("overflow","auto")
        })
        

        /*------------[about and clent sections slider]-----------------*/
        $('.about .owl-carousel , .client .owl-carousel').owlCarousel({
        loop:true,
        autoplay:true,
        margin:0,
        nav    : true,
        navText : ["<i class='ti-angle-left'></i>","<i class='ti-angle-right'></i>"],
        responsive:{
              0:{items:1,},
            600:{items:1,},
           1000:{items:1}
        }
       })

        /*------------[blog slider]-----------------*/

         $('.blog .owl-carousel').owlCarousel({
        loop:true,
        autoplay:true,
        margin:20,
        responsive:{
              0:{items:1,},
            600:{items:2,},
           1000:{items:3}
        }
       });

      /*------------[up icon]-----------------*/
        $('.up').on('click',function() {
        $('html, body').animate({
        scrollTop: -690
        }, 1500)});

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




// preloader
$(window).on('load',function(){
  "use strict";
    $("body").css("overflow-y","auto")
    $('.preloader').fadeOut(1000); // set duration in brackets    
});





