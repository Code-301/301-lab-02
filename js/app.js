'use strict';
function Animal(animal) {
  this.img_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}

Animal.prototype.render = function () {
  let $hornClone = $('.photo-template').clone();
  $('main').append($hornClone);

  $hornClone.find('h2').text(this.title);
  $hornClone.find('img').attr('src', this.img_url);
  $hornClone.find('p').text(this.description);
  $hornClone.removeClass('photo-template');
}

Animal.readJson = () => {
  const ajaxSettings = { method: 'get', dataType: 'json' };
  $.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(element => {
        let animalObject = new Animal(element);
        animalObject.render();
      });
    })
}

$(() => Animal.readJson());