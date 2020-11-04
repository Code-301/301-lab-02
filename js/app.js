'use strict';
let animalPages = [];
let pageKeywords = [];
function Animal(animal, page) {
  for (let key in animal) {
    this[key] = animal[key];
  }
  animalPages[page].push(this);
}

// Animal.prototype.render = function () {
// let $hornClone = $('.photo-template').clone();
// $('main').append($hornClone);

// $hornClone.find('h2').text(this.title);
// $hornClone.find('img').attr('src', this.img_url);
// $hornClone.find('p').text(this.description);
// $hornClone.attr('class', this.keyword);
// $hornClone.removeClass('photo-template');
//   let $template = ('#animalTemplate').html();
//   let html = Mustache.render($template, this);
//   return html;
// }

Animal.readJson = (filePath, page) => {
  let dropOptions = [];
  const ajaxSettings = { method: 'get', dataType: 'json' };
  $.ajax(filePath, ajaxSettings)
    .then(data => {
      data.forEach(element => {
        if (!dropOptions.includes(element.keyword)) {
          dropOptions.push(element.keyword);

          console.log(element.keyword);
        }
        let animalObject = new Animal(element, page);
        // animalObject.render();
      });
      pageKeywords.push(dropOptions);
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



$(function (index) {
  Animal.readJson('data/page-1.json', 0);
  console.log(pageKeywords);
});
$('section').toggle(false);
// event listener 
$('select').on('change', function () {
  $('section').toggle(false);
  let classGrab = $(this).find(':selected').attr('value');
  console.log('classGrab:', classGrab);
  $(`.${classGrab}`).toggle();
});

// populateDropdown();
// $( "#dataTable tbody" ).on( "click", "tr", function() {
//  console.log( $( this ).text() );
// });