angular.module('contactsApp', ['ionic'])
.controller('MainCtrl', function($scope, $ionicScrollDelegate, filterFilter) {
  var letters = $scope.letters = [];
  var contacts = $scope.contacts = [];
  var currentCharCode = 'A'.charCodeAt(0) - 1;

  //window.CONTACTS is defined below
  window.CONTACTS
    .sort(function(a, b) {
      return a.last_name > b.last_name ? 1 : -1;
    })
    .forEach(function(person) {
      //Get the first letter of the last name, and if the last name changes
      //put the letter in the array
      var personCharCode = person.last_name.toUpperCase().charCodeAt(0);
      //We may jump two letters, be sure to put both in
      //(eg if we jump from Adam Bradley to Bob Doe, add both C and D)
      var difference = personCharCode - currentCharCode;
      for (var i = 1; i <= difference; i++) {
        addLetter(currentCharCode + i);
      }
      currentCharCode = personCharCode;
      contacts.push(person);
    });

  //If names ended before Z, add everything up to Z
  for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {
    addLetter(i);
  }

  function addLetter(code) {
    var letter = String.fromCharCode(code);
    contacts.push({
      isLetter: true,
      letter: letter
    });
    letters.push(letter);
  }

  //Letters are shorter, everything else is 52 pixels
  $scope.getItemHeight = function(item) {
    return item.isLetter ? 40 : 100;
  };
  $scope.getItemWidth = function(item) {
    return '100%';
  };

  $scope.scrollBottom = function() {
    $ionicScrollDelegate.scrollBottom(true);
  };

  var letterHasMatch = {};
  $scope.getContacts = function() {
    alert("Hello")
    letterHasMatch = {};
    //Filter contacts by $scope.search.
    //Additionally, filter letters so that they only show if there
    //is one or more matching contact
    return contacts.filter(function(item) {
      var itemDoesMatch = !$scope.search || item.isLetter ||
        item.first_name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
        item.last_name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

      //Mark this person's last name letter as 'has a match'
      if (!item.isLetter && itemDoesMatch) {
        var letter = item.last_name.charAt(0).toUpperCase();
        letterHasMatch[letter] = true;
      }

      return itemDoesMatch;
    }).filter(function(item) {
      //Finally, re-filter all of the letters and take out ones that don't
      //have a match
      if (item.isLetter && !letterHasMatch[item.letter]) {
        return false;
      }
      return true;
    });
  };

  $scope.clearSearch = function() {
    $scope.search = '';
  };
});

window.CONTACTS = [
{"id":1,"first_name":"Patrick","last_name":"Rogers","country":"Cyprus","ip_address":"153.88.89.148","email":"progers@yata.net"},
{"id":2,"first_name":"Janet","last_name":"Gordon","country":"Croatia","ip_address":"209.73.121.212","email":"jgordon@skivee.biz"},
{"id":3,"first_name":"Kathy","last_name":"Hamilton","country":"Armenia","ip_address":"164.214.217.162","email":"khamilton@rhynyx.biz"},
{"id":4,"first_name":"Stephanie","last_name":"Johnson","country":"Mauritius","ip_address":"8.199.242.67","email":"sjohnson@jabbertype.mil"},
{"id":5,"first_name":"Jerry","last_name":"Palmer","country":"Thailand","ip_address":"230.207.100.163","email":"jpalmer@avamm.org"},
{"id":6,"first_name":"Lillian","last_name":"Franklin","country":"Germany","ip_address":"150.190.116.1","email":"lfranklin@eare.mil"},
{"id":7,"first_name":"Melissa","last_name":"Gordon","country":"Serbia","ip_address":"162.156.29.99","email":"mgordon@flashset.org"},
{"id":8,"first_name":"Sarah","last_name":"Burns","country":"Grenada","ip_address":"13.177.156.223","email":"sburns@eimbee.info"},
{"id":9,"first_name":"Willie","last_name":"Burton","country":"Croatia","ip_address":"115.133.81.82","email":"wburton@dynazzy.info"},
{"id":10,"first_name":"Tina","last_name":"Simmons","country":"United States Virgin Islands","ip_address":"113.49.63.18","email":"tsimmons@devpulse.mil"},
{"id":11,"first_name":"Kenneth","last_name":"Larson","country":"Mexico","ip_address":"92.89.76.196","email":"klarson@browseblab.info"},
{"id":12,"first_name":"Philip","last_name":"Welch","country":"Cuba","ip_address":"223.180.48.70","email":"pwelch@skippad.edu"},
{"id":13,"first_name":"Nicholas","last_name":"Parker","country":"British Indian Ocean Territory","ip_address":"200.150.119.13","email":"nparker@twitternation.net"},
{"id":14,"first_name":"Nicole","last_name":"Webb","country":"Moldova","ip_address":"47.66.237.205","email":"nwebb@midel.biz"},
{"id":15,"first_name":"Clarence","last_name":"Schmidt","country":"China","ip_address":"134.84.246.67","email":"cschmidt@dazzlesphere.net"},
{"id":16,"first_name":"Jessica","last_name":"Murray","country":"Sao Tome and Principe","ip_address":"211.30.32.109","email":"jmurray@jumpxs.net"},
{"id":17,"first_name":"Willie","last_name":"Schmidt","country":"US Minor Outlying Islands","ip_address":"158.40.109.208","email":"wschmidt@babbleset.edu"},
{"id":18,"first_name":"Margaret","last_name":"Evans","country":"Bhutan","ip_address":"252.123.77.101","email":"mevans@voolia.info"},
{"id":19,"first_name":"Arthur","last_name":"Morales","country":"Faroe Islands","ip_address":"116.5.126.29","email":"amorales@brainlounge.biz"},
{"id":20,"first_name":"Charles","last_name":"Perez","country":"Italy","ip_address":"10.43.255.4","email":"cperez@avaveo.net"},
{"id":21,"first_name":"Jeffrey","last_name":"Webb","country":"Liechtenstein","ip_address":"55.140.114.8","email":"jwebb@mynte.net"},
{"id":22,"first_name":"Andrea","last_name":"Simpson","country":"Nauru","ip_address":"22.243.12.86","email":"asimpson@browsetype.mil"},
{"id":23,"first_name":"Steve","last_name":"Reynolds","country":"Morocco","ip_address":"21.166.38.112","email":"sreynolds@topiclounge.biz"},
{"id":24,"first_name":"Gerald","last_name":"Reyes","country":"Isle of Man","ip_address":"235.115.15.46","email":"greyes@voolith.biz"}];