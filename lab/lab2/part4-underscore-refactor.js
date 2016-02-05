(function(){

  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  /* =====================

  # Lab 2, Part 4 — (Optional, stretch goal)

  ## Introduction

    You've already seen this file organized and refactored. In this lab, you will
    try to refactor this code to be cleaner and clearer - you should use the
    utilities and functions provided by underscore.js. Eliminate loops where possible.

  ===================== */

  // Mock user input
  // Filter out according to these zip codes:
  var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  var minEnrollment = 300;

  var CleanData = function(school){
    if (typeof school.ZIPCODE === 'string') {
      split = school.ZIPCODE.split(' ');
      normalized_zip = parseInt(split[0]);
      school.ZIPCODE = normalized_zip;
    }
    if (typeof school.GRADE_ORG === 'number') {  // if number
      school.HAS_KINDERGARTEN = school.GRADE_LEVEL < 1;
      school.HAS_ELEMENTARY = 1 < school.GRADE_LEVEL < 6;
      school.HAS_MIDDLE_SCHOOL = 5 < school.GRADE_LEVEL < 9;
      school.HAS_HIGH_SCHOOL = 8 < school.GRADE_LEVEL < 13;
    } else {  // otherwise (in case of string)
      school.HAS_KINDERGARTEN = school.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      school.HAS_ELEMENTARY = school.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      school.HAS_MIDDLE_SCHOOL = school.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      school.HAS_HIGH_SCHOOL = school.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
  };

  var FilterData = function(school){
    isOpen = school.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (school.TYPE.toUpperCase() !== 'CHARTER' ||
                school.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (school.HAS_KINDERGARTEN ||
                school.HAS_ELEMENTARY ||
                school.HAS_MIDDLE_SCHOOL ||
                school.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = school.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(school.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);
    return filter_condition;
  };

  var AddToMap = function(school){
    var color;

      isOpen = school.ACTIVE.toUpperCase() == 'OPEN';
      isPublic = (school.TYPE.toUpperCase() !== 'CHARTER' ||
                  school.TYPE.toUpperCase() !== 'PRIVATE');
      meetsMinimumEnrollment = school.ENROLLMENT > minEnrollment;

      // Constructing the styling  options for our map
      if (school.HAS_HIGH_SCHOOL){
        color = '#0000FF';
      } else if (school.HAS_MIDDLE_SCHOOL) {
        color = '#00FF00';
      } else {
        color = '##FF0000';
      }
      // The style options
      var pathOpts = {'radius': school.ENROLLMENT / 30,
                      'fillColor': color};
      L.circleMarker([school.Y, school.X], pathOpts)
        .bindPopup(school.FACILNAME_LABEL)
        .addTo(map);

  };

  // clean data
  _.each(schools,CleanData);

  // filter data
  var filtered_data = _.filter(schools,FilterData);

  console.log('Included:', filtered_data.length);
  console.log('Excluded:', schools.length-filtered_data.length);

  // main loop
  _.each(filtered_data,AddToMap);

})();
