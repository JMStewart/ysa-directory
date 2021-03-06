require('./styles/app.css');
var $ = require('jquery');
var parse = require('dank-csv');
var Vue = require('vue');


$.get('data/directory.csv')
  .then(function(res) { return parse(res.replace(/\r/g, '\n'));})
  .then(createAllPhotoUrls)
  .then(groupByApt)
  .then(init);

function createAllPhotoUrls(people) {
  return people.map(createPhotoUrl);
}

function createPhotoUrl(person) {
  person.photoUrl = 'photos/' + person.photo + '.jpg';
  return person;
}

function groupByApt(people) {
  var apts = {};
  people.forEach(function(person) {
    var addr = person.addr1 + '-' + person.addr2;
    if (!apts[addr]) {
      apts[addr] = {
        addr1: person.addr1,
        addr2: person.addr2,
        people: []
      };
    }
    apts[addr].people.push(person);
  });
  return apts;
}

function init(data) {
  new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js!',
      apts: data
    }
  });
}