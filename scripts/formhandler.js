(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(bandName,fn) {
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var data = {"postDate": new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;

      });
      data.bandName = bandName;
      data.username = $.cookie("username");
      fn(data);
      this.reset();
      //this.elements[0].focus();
    });
  };

  FormHandler.prototype.addLoginHandler = function(fn){
    this.$formElement.on("submit", function(event){
      event.preventDefault();
      var user = {};
      $(this).serializeArray().forEach(function(item){
        user[item.name] = item.value;
      });
      fn(user);
    });
  };

  FormHandler.prototype.addSignupHandler = function(fn){
    this.$formElement.on("submit", function(event){
      event.preventDefault();
      var user = {};
      $(this).serializeArray().forEach(function(item){
        user[item.name] = item.value;
      });
      fn(user);
    });
  };

  FormHandler.prototype.addVideoUploader = function(fn){
    this.$formElement.on("submit",function(event){
      event.preventDefault();
      var bandInfo = {};
      $(this).serializeArray().forEach(function(item){
        bandInfo[item.name] = item.value;
      });
      fn(bandInfo);
    });
  };

  FormHandler.prototype.addInputHandler = function() {
    this.$formElement.on("input", "[name=\"vote\"]", function(event) {
      var isChecked = $("input[name=vote]:checked").val();
      var message = "";
      if (isChecked) {
        event.target.setCustomValidity("");
      } else {
        message = "Please select the rating thumbs";
        event.target.setCustomValidity(message);
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
