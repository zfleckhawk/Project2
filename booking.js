"use strict";

(function() {
  if (!('querySelector' in document && 'addEventListener' in document)) {
    return;
  }

  // Debounce function to limit calls on repeated events
  // See for e.g., https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
  var debounce = function debounce(func, delay) {
    var inDebounce;
    return function() {
      var context = this;
      var args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(function() {
        return func.apply(context, args);
      }, delay);
    };
  };

  document.addEventListener('DOMContentLoaded', function() {
    //Load form
    var form = document.querySelector('#form');

    //Set Restrictions
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    var goodDate = false;

    //Booking Portion
    var input_location = document.querySelector('#location');
    var input_date = document.querySelector('#date');
    var input_time = document.querySelector('#time');
    var input_tickets = document.querySelector('#tickets');
    var next = document.querySelector('#next');

    next.setAttribute('disabled', 'disabled');

    // Booking from local storage if available
    input_location.value = localStorage.getItem("tyc_loc");
    input_date.value = localStorage.getItem("tyc_date");
    input_time.value = localStorage.getItem("tyc_time");
    input_tickets.value = localStorage.getItem("tyc_tickets");

    next.addEventListener('click', function() {
      localStorage.setItem("tyc_loc", input_location.value);
      localStorage.setItem("tyc_date", input_date.value);
      localStorage.setItem("tyc_time", input_time.value);
      localStorage.setItem("tyc_tickets", input_tickets.value);
    });

    input_date.addEventListener('change', function() {
      if (input_date.value.localeCompare(today) >= 0) {
        goodDate = true;
      }
      else {
        goodDate = false;
        next.setAttribute('disabled', 'disabled');
      }
    });

    var checkbox = document.querySelectorAll('input[type="checkbox"]');

    for (var i=0; i < checkbox.length; i++) {
      checkbox[i].addEventListener('change', function() {
        if (document.querySelectorAll('input[type="checkbox"]:checked').length == input_tickets.value && goodDate) {
          next.removeAttribute('disabled');
          document.querySelector('#next').style.cursor = "pointer";
        }
        else {
          next.setAttribute('disabled', 'disabled');
        }
      });
    }

  });

}());
