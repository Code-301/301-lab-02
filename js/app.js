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
  $('section').addClass('audrena');
  console.log(html);
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
    });

}

function populateDropdown(page) {

  console.log(page);
  pageKeywords[page].forEach(element => {
    console.log(element);
    $('select').append(`<option class="page-${page}" value=${element}>${element}</option>)`);
    /// hide all image sections.
    //create a custom html datatype.
    /// once dropdown is selected unHide the objects with the correct keyword.
  });
}



$(function (index) {
  Animal.readJson('data/page-1.json', 0);
  Animal.readJson('data/page-2.json', 1)
});
$('section').toggle(false);
// event listener 
$('select').on('change', function () {
  $('section').toggle(false);
  let classGrab = $(this).find(':selected').attr('value');
  console.log('classGrab:', classGrab);
  $(`.${classGrab}`).toggle();
});

$('button').on('click', function () {
  var optionTag = $('option');
  console.log(optionTag.length);
  for (let i = 0; i < optionTag.length; i++) {
    console.log($(optionTag[i]).attr('class'));
    debugger;
    if ($(optionTag[i]).attr('class') === 'page0') {
    }
  }
  // let targetName = $(event.target).attr('name');
  // if (targetName === 'page0') {
  //   pageNumber = 0;
  //   ($('option')).forEach(data => {
  //     if (data.attr('class') === 'page0') {
  //       console.log('page0, click');
  //     }
  //   });
  //   console.log(options);
  // }
  // else if (targetName === 'page1') {
  //   pageNumber = 1;
  // }
});


// $( "#dataTable tbody" ).on( "click", "tr", function() {
//  console.log( $( this ).text() );
// });