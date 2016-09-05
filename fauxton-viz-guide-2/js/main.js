//main.js
$(document).ready(function(){
    replaceSVGs();
    toggleSidebar();
    clickSidebarItemListener();
    usingFauxtonNavigationListener();
    onLoadJumpToAnchor();
});

function onLoadJumpToAnchor () {
  var hash = window.location.hash;

  switch (hash) {
    case '' : 
      $('#redsidebar .getting-started').click();
      break;
    case '#getting-started' : 
      $('#redsidebar .getting-started').click();
      break;
    case '#answers' :
      $('#redsidebar .answers').click();
      break;
    default: 
      $('#redsidebar .using-fauxton').click();
      if (location.hash) {
        location.href = location.hash;
      }
  }
}

function toggleSidebar() {
  $('#hamburger, #redsidebar .header').click(function () {
    $('#content').toggleClass('showSideBar');
    $('#hamburger').toggleClass('showSideBar');
  });
}

function clickSidebarItemListener () {

  //makes the CSS changes
  $('#redsidebar .section').click(function () {
    clearAll();
    var sectionChosen = $(this).data('nav');

    $('#' + sectionChosen).addClass('shown');
    $('.' + sectionChosen + ' .big-nav-subtitle')
      .css({
        'color': '#750f34',
        'font-weight': 'bold'
      });
    $('.section.' + sectionChosen + ' .large-icon')
      .css('background-image', 'url("imgs/'+ sectionChosen +'-dark.png")');
  });

  //makes the CSS default
  function clearAll () {
    $('#getting-started').removeClass('shown');
    $('#using-fauxton').removeClass('shown');
    $('#answers').removeClass('shown');
    $('.big-nav-subtitle')
      .css({
        'color': '',
        'font-weight': ''
      });
    $('.getting-started .large-icon, .using-fauxton .large-icon, .answers .large-icon')
      .css('background-image', '');
  }
}

function usingFauxtonNavigationListener () {
  $('#using-fauxton .toc a, .fauxton-toc .icon-menu a').click(function () {
    clearAll();
    var href = $(this).attr('href');
    var address = href.substring(1);

    $('#toc-' + address).addClass('selected');
    $('.icon-menu-'+ address).addClass('selected');
  });

  function clearAll () {
    $('.toc .heading, .fauxton-toc .icon-menu a').each(function () {
      $(this).removeClass('selected');
    })
  }
}

/*
 * Replace all SVG images with inline SVG
 * from http://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement
 */
function replaceSVGs () {
  jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if(typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');  
  });
}
