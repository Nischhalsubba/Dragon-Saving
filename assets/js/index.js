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

glideService.mount();
glideadvertisement.mount();
