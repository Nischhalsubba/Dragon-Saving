var glideService = new Glide('.glideservice', {
  type: 'carousel',
  autoplay: 3500,
  perView: 3
});

var glideadvertisement = new Glide('.glideadvertisement', {
  type: 'carousel',
  autoplay: 3500,
  perView: 1
});


var glide_hero = new Glide('.glide_hero', {
  type: 'carousel',
  hoverpause: true,
  autoplay: true,
  autoplay: 3500,
  perView: 1,
  arrows: true,
  navigation: true,
});



glide_hero.mount();
glideService.mount();
glideadvertisement.mount();


/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}