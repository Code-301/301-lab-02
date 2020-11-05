'use strict';
let animalPages = [];
let pageKeywords = [];
let pageNumber = 0;
function Animal(animal, page) {
  for (let key in animal) {
    this[key] = animal[key];
  }
  this.page = `page${page}`;
  animalPages.push(this);
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

//event listener for radio buttons
//radioValue = $("input[name='gender']:checked").val();
$('form').on('change', function () {
  let checkedValue = $("input:checked").val();
  if (checkedValue === 'title') {
    console.log('title');
    animalPages.sort((a, b) => (a.title > b.title) ? 1 : -1)

  }
  else if (checkedValue === 'horns') {
    console.log('horns');
    animalPages.sort((a, b) => (a.horns > b.horns) ? 1 : -1)
  }

})

// event listener  for dropdown
$('select').on('change', function () {
  $('section').toggle(false);
  let classGrab = $(this).find(':selected').attr('value');
  $(`.${classGrab}`).toggle();
  $('main').find(`.page${pageNumber}`).toggle(false);
});

//event listener for page buttons
$('button').on('click', function () {
  $('main').children('section').remove();

  animalPages.forEach(data => {
    console.log('data: ', data);

    $('main').append(data.render());
  })
  var optionTag = $('option');
  let buttonChoice = $(this).attr('name');
  $('section').toggle(false);
  if (buttonChoice === 'page0') {
    pageNumber = 1;
    for (let i = 1; i < optionTag.length; i++) {
      if ($(optionTag[i]).attr('class') === 'page-0') {
        $(optionTag[i]).toggle(true);
      } else {
        $(optionTag[i]).toggle(false);
      }
    }
  } else if (buttonChoice === 'page1') {
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
