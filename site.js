"use strict";

(function() {
  if (!('querySelector' in document && 'addEventListener' in document)) {
    return;
  }

  function eq(value, condition) {
    return value === condition;
  }

  function whitespace(value) {
    return value.replace(/\s/g, '');
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

  function validate(value, check, condition) {
    if (eq(typeof(check.test), 'function')) {
      return check.test(value);
    } else if (eq(typeof(check), 'function')) {
      return check(value, condition);
    } else {
      return false;
    }
  }

  function validate_email(value) {
    var email = whitespace(value);
    return validate(email, /^[^@\s]+@[^@\s]+.[^@\s]+$/g);
  }

  function validate_cc_num(value) {
    var cc_num = whitespace(value);
    return validate(cc_num, /^[0-9]{16}$/g);
  }

  function validate_code(value) {
    var cvv = whitespace(value);
    return validate(cvv, /^[0-9]{3}$/g);
  }

  function validate_expire(value) {
    var date = whitespace(value);
    return validate(date, /^[0-9]{4}$/g);
  }

  function getTotalPrice() {
    var totalPrice = 0;
    totalPrice = 10*localStorage.getItem("tyc_tickets");

    var h3obj = document.getElementById('totalprice');
    h3obj.innerHTML = "Total: $" + totalPrice;
  }

  document.addEventListener('DOMContentLoaded', function() {
    //Display total prices
    getTotalPrice();

    //load in form
    var form = document.querySelector('#pay-form');

    //Payment Portion
    var input_cc_num = document.querySelector('#credit');
    var input_cvv = document.querySelector('#code');
    var input_expire = document.querySelector('#expire');
    var input_email = document.querySelector('#email');
    var submit = document.querySelector('#submit');

    submit.setAttribute('disabled', 'disabled');

    //clear localStorage only when form is submitted
    submit.addEventListener('click', function() {
      localStorage.clear();
    });

    //Payment Import from local storage if available
    input_email.value = localStorage.getItem("tyc_email");
    input_cc_num.value = localStorage.getItem("tyc_cc_num");
    input_cvv.value = localStorage.getItem("tyc_cvv");
    input_expire.value = localStorage.getItem("tyc_expire");

    form.addEventListener('keyup', function() {
      //Insert Payment into localStorage
      localStorage.setItem("tyc_email", input_email.value);
      localStorage.setItem("tyc_cc_num", input_cc_num.value);
      localStorage.setItem("tyc_cvv", input_cvv.value);
      localStorage.setItem("tyc_expire", input_expire.value);

      if (validate_email(input_email.value) && validate_cc_num(input_cc_num.value) && validate_code(input_cvv.value) && validate_expire(input_expire.value)) {
        submit.removeAttribute('disabled');
        document.querySelector('#submit').style.cursor = "pointer";
      } else {
        submit.setAttribute('disabled', 'disabled');
        document.querySelector('#submit').style.cursor = "default";
      }
    });

  });

}());
