(function(window) {
  "use strict";
  var GENRE_LIST_SELECTOR = "[data-band-left=\"genre-list\"]";
  var LOGIN_FORM_SELECTOR = "[data-signin=\"login\"]";
  var SIGNIN_FORM_SELECTOR = "[data-signin=\"form\"]";
  var SIGNUP_FORM_SELECTOR = "[data-signup=\"form\"]";
  var CREATE_ACCOUNT_FORM_SELECTOR = "[data-create-account=\"form\"]";

  var SERVER_URL_COMMENTS = "http://localhost:2403/user-comments";
  var SERVER_URL_BANDS = "http://localhost:2403/bands";
  var SERVER_URL_USERS = "http://localhost:2403/users";

  var App = window.App;
  var Band = App.Band;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var User = App.User;
  var $ = window.jQuery;

  var remoteDSComments = new RemoteDataStore(SERVER_URL_COMMENTS);
  var remoteDSBands = new RemoteDataStore(SERVER_URL_BANDS);
  var remoteDSUsers = new RemoteDataStore(SERVER_URL_USERS);

  var myBandComments = new Band(remoteDSComments);
  var bandDetails = new Band(remoteDSBands);
  var userDetails = new User(remoteDSUsers);

  var signinFormHandler = new FormHandler(SIGNIN_FORM_SELECTOR);
  var signupFormHandler = new FormHandler(SIGNUP_FORM_SELECTOR);
  var loginFormHandler = new FormHandler(LOGIN_FORM_SELECTOR);
  var createAccountFormHandler = new FormHandler(CREATE_ACCOUNT_FORM_SELECTOR);

  window.myBandComments = myBandComments;
  window.bandDetails = bandDetails;
  window.userDetails = userDetails;

  $(document).ready(function() {
    bandDetails.getAllBands.call(bandDetails, function(serverResponse) {
      bandDetails.displayAllBands.call(bandDetails, serverResponse, GENRE_LIST_SELECTOR);

    });

    if (!($.cookie("username") === null || $.cookie("username") === "" ||
        $.cookie("username") === "null" || $.cookie("username") === undefined)) {
      var username = $.cookie("username");
      if(username == "admin"){
        $("#UploadButton").removeClass("hide");
      }
      $("#display-username").text("Welcome " + username +"!");
      $("#LogoutButton").removeClass("hide");
      $("#SignupButton").addClass("hide");
      $("#LoginButton").addClass("hide");
    }
  });

  $(document).on("click", ".band-comments-div a", function(event) {
    event.preventDefault();
    //$("#band-comments").attr("href");
    if ($.cookie("username") === null || $.cookie("username") === "" ||
      $.cookie("username") === "null" || $.cookie("username") === undefined) {
      $(".form-signin").trigger("reset");
      $("#login-error").addClass("hide");
      $("#signin-modal").modal();
    } else {
      window.location.href = event.currentTarget;
    }

  });

  //Login on landing page
  loginFormHandler.addLoginHandler.call(loginFormHandler, function(user) {
    userDetails.authenticate.call(userDetails, user, function(loginStatus) {
      console.log("Login status is : " + loginStatus);
      if (loginStatus == "success") {
        $.cookie("username", user.username);
        window.location.href = "/";

      } else if (loginStatus == "signup") {
        $("#signup-modal").modal();
      } else {
        $("#login-error").removeClass("hide");
      }
    });
  });

  // Sign in before landing on second page
  signinFormHandler.addLoginHandler.call(signinFormHandler, function(user) {
    userDetails.authenticate.call(userDetails, user, function(loginStatus) {
      console.log("Login status is : " + loginStatus);
      if (loginStatus == "success") {
        $.cookie("username", user.username);
        window.location.href = $(".band-comments-div a").attr("href");
      } else if (loginStatus == "signup") {
        $("#signup-modal").modal();
      } else {
        $("#signin-error").removeClass("hide");
      }
    });
    /*userDetails.authenticateDpd.call(userDetails, user, function(loginStatus) {
      console.log("The login service returned status is : " + loginStatus);
      if (loginStatus == "200") {
        //$.cookie("username", user.username);
        window.location.href = $(".band-comments-div a").attr("href");
      } else if (loginStatus == "404") {
        $("#signup-modal").modal();
      } else {
        $("#login-error").removeClass("hide");
      }
    });*/
  });

  signupFormHandler.addSignupHandler.call(signupFormHandler, function(user) {
    userDetails.register.call(userDetails, user);
    $.cookie("username", user.username);
    window.location.href = $(".band-comments-div a").attr("href");
  });

  //Create account button on first page
  createAccountFormHandler.addSignupHandler.call(createAccountFormHandler, function(user) {
    userDetails.register.call(userDetails, user);
    $.cookie("username", user.username);
    window.location.href = "/";
  });

  $("#UploadButton").click(function() {
    $("#upload-modal").modal();
  });

  $("#LoginButton").click(function() {
    $("#login-modal").modal();
  });

  $("#SignupButton").click(function() {
    $("#create-account-modal").modal();
  });

  $("#LogoutButton").on("click", function() {
    $.removeCookie("username");
    window.location.href = "/";
  });
})(window);
