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
  return validate(cc_num, /^[0-9]{16}$/g)
}

function validate_code(value) {
  var cvv = whitespace(value);
  return validate(cvv, /^[0-9]{3}$/g)
}

function validate_expire(value) {
  var date = whitespace(value);
  return validate(date, /^[0-9]{6}$/g)
}

function validate_date(value) {
  return validate(value, /^[0-9]{2}+-[0-9]{2}+-[0-9]{2}$/g)
}

  document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('#pay-form');
    var submit = document.querySelector('#submit');
    var input_email = document.querySelector('#email');
    var input_cc_num = document.querySelector('#credit');
    var input_cvv = document.querySelector('#code');
    var input_expire = document.querySelector('#expire');

    submit.setAttribute('disabled', 'disabled');

    form.addEventListener('keyup', function() {
      if (validate_email(input_email.value)&&validate_cc_num(input_cc_num.value)&&validate_code(input_cvv.value)&&validate_expire(input_expire.value)) {
        submit.removeAttribute('disabled');
        document.querySelector('#submit').style.cursor = "pointer";
      } else {
        submit.setAttribute('disabled', 'disabled');
        document.querySelector('#submit').style.cursor = "default";
      }
});

  });

}());
