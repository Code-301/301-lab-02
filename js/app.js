'use strict';
let dropOptions = [];
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
  $hornClone.attr('class', this.keyword);
  $hornClone.removeClass('photo-template');
}

Animal.readJson = () => {
  const ajaxSettings = { method: 'get', dataType: 'json' };
  $.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(element => {
        if (!dropOptions.includes(element.keyword)) {
          dropOptions.push(element.keyword);

        }
        let animalObject = new Animal(element);
        animalObject.render();
      });
      populateDropdown();
    })

}

function populateDropdown() {
  dropOptions.forEach(element => {
    console.log(element);
    $('select').append(`<option value=${element}>${element}</option>)`);
    /// hide all image sections.
    //create a custom html datatype.
    /// once dropdown is selected unHide the objects with the correct keyword.
  });
}



$(function () {
  Animal.readJson()
});
$('section').toggle(false);

$('select').on('change', function () {
  $('section').toggle(false);
  let classGrab = $(this).find(':selected').attr('value');
  console.log('classGrab:', classGrab);
  $(`.${classGrab}`).toggle();
});

// $( "#dataTable tbody" ).on( "click", "tr", function() {
//  console.log( $( this ).text() );
// });