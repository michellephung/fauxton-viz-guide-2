//main.js
$(document).ready(function(){
    replaceSVGs();
    toggleSidebar();
    clickSidebarItemListener();

});



function toggleSidebar() {
  $('#hamburger, #redsidebar .header').click(function () {
    $('#content').toggleClass('showSideBar');
    $('#hamburger svg').toggleClass('showSideBar');
  });
}

function clickSidebarItemListener () {
  $('#redsidebar .section').click(function () {

    hideAll();
    var sectionChosen = $(this).data('nav');

    $('#' + sectionChosen).addClass('shown');

    console.log('.' + sectionChosen);
  });


  function hideAll () {
    $('#getting-started').removeClass('shown');
    $('#using-fauxton').removeClass('shown');
    $('#answers').removeClass('shown');
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
