(function() {
    'use strict';

    $('.key').on('mousedown touchstart',function(e){
      e.stopPropagation();
      e.preventDefault();
      $(this).addClass('pushed');
    });

    $('.key').on('mouseup touchend',function(e){
      e.stopPropagation();
      e.preventDefault();
      $(this).removeClass('pushed');
    });

    $(function() {
      $('.toggle').click(function() {
        $(this).toggleClass("active");
        if($(this).hasClass('active')) {
          $('.global_nav').addClass('active');
        } else {
          $('.global_nav').removeClass('active');
        }
      });
    });

    $(function() {
      $('.key_q').keypress(function() {
        if($(this).hasClass('pushed')) {
          $('.key_q').removeClass('pushed');
        } else {
          $('.key_q').addClass('pushed');
        }
      });
    });

    // window.addEventListener('keypress', function(e) {
    //   var keyMap = {
    //     113:'q', 119:'w', 101:'e', 114:'r', 116:'t', 121:'y', 117:'u', 105:'i', 111:'o', 112:'p', 64:'alpha', 91:'kako_l',
    //     97:'a', 115:'s', 100:'d', 102:'f', 103:'g', 104:'h', 106:'j', 107:'k', 108:'l', 59:'tt', 58:'ll', 93:'kako_r',
    //     112:'z', 120:'x', 99:'c', 118:'v', 98:'b', 110:'n', 109:'m', 44:'com', 46:'dot'
    //   }

      // if(e.keyCode in keyMap){
      //   $('.key_' + keyMap[e.keyCode]).toggleClass("pushed");
      // }

    // var keyMap = {
    //   81:'Q', 87:'W', 69:'E', 82:'R', 84:'T', 85:'U', 73:'I', 79:'O', 8:'del',
    //   65:'A', 83:'S', 68:'D', 70:'F', 71:'G', 76:'L', 13:'enter',
    //   90:'Z', 88:'X', 78:'N', 77:'M', 188:'lt', 190:'gt', 191:'slash',
    //   32:'space'
    // }
    // $(window).on('keydown', function(e){
    //   if(e.keyCode in keyMap){
    //     $('.key_' + keyMap[e.keyCode]).trigger('mousedown');
    //   }
    //   e.preventDefault();
    // });


    // $(window).on('keyup', function(e){
    //   if(e.keyCode in keyMap){
    //     $('.key_' + keyMap[e.keyCode]).trigger('mouseup');
    //   }
    // });

    $(function() {
      $('.other').click(function() {
        $(this).toggleClass("active");
        if($(this).hasClass('active')) {
          $('.global_nav').addClass('active');
        } else {
          $('.global_nav').removeClass('active');
        }
      });
    });
  })();
