'use strict';
let animalPages = [[], []];
let pageKeywords = [];
let pageNumber = 0;
function Animal(animal, page) {
  for (let key in animal) {
    this[key] = animal[key];
  }
  this.page = `page${page}`;
  animalPages[page].push(this);
}

Animal.prototype.render = function () {
  let $template = $('#animalTemplate').html();
  let html = Mustache.render($template, this);
  return html;
}

Animal.readJson = (filePath, page) => {
  let dropOptions = [];
  const ajaxSettings = { method: 'get', dataType: 'json' };
  $.ajax(filePath, ajaxSettings)
    .then(data => {
      data.forEach(element => {
        if (!dropOptions.includes(element.keyword)) {
          dropOptions.push(element.keyword);
        }
        let animalObject = new Animal(element, page);
        $('main').append(animalObject.render());
      });
      pageKeywords.push(dropOptions);
      populateDropdown(page);
      $('section').toggle(false);
    });

}

function populateDropdown(page) {
  pageKeywords[page].forEach(element => {
    $('select').append(`<option class="page-${page}" value=${element}>${element}</option>)`);
  });
}



$(function (index) {
  Animal.readJson('data/page-1.json', 0);
  Animal.readJson('data/page-2.json', 1);
});
// event listener 
$('select').on('change', function () {
  $('section').toggle(false);
  let classGrab = $(this).find(':selected').attr('value');
  $(`.${classGrab}`).toggle();
  $('main').find(`.page${pageNumber}`).toggle(false);
});

$('button').on('click', function () {
  var optionTag = $('option');
  let buttonChoice = $(this).attr('name');
  $('section').toggle(false);
  if(buttonChoice === 'page0'){
    pageNumber = 1;
    for (let i = 1; i < optionTag.length; i++) {
      if ($(optionTag[i]).attr('class') === 'page-0') {
        $(optionTag[i]).toggle(true);
      } else {
        $(optionTag[i]).toggle(false);
      }
    }
  }else if (buttonChoice === 'page1') {
    pageNumber = 0;
    for (let i = 1; i < optionTag.length; i++) {
      if ($(optionTag[i]).attr('class') === 'page-1') {
        $(optionTag[i]).toggle(true);
      } else {
        $(optionTag[i]).toggle(false);
      }
    }
  }
});
