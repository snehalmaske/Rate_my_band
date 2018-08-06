(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    console.log("calling RemoteDataStore.add()");
    $.post(this.serverUrl, val);
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log("In getAll method:" + serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.getByKey = function(key,value, cb) {
    $.get(this.serverUrl + "?"+ key+"=" + value, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.authenticateDpd = function(data,cb){
    $.ajax({
      url: "http://localhost:2403/users/login",
      type: "POST",
      data: {username: data.username, password: data.password},
      cache: false,
      xhrFields:{
        withCredentials: true
      },
      success: function (data, textStatus, xhr) {
        //location.reload();
        //cb("success");
        console.log("Success-Service response code : " + xhr.status);
        cb(xhr.status);
      },
      error: function(xhr, textStatus) {
        //console.log(xhr.responseText);
        //error message modal
        //$("#badcredentials-modal").modal();
        console.log("Error-Service response code : " + xhr.status);
        console.log("Error-Service response text : " + textStatus);
        cb(xhr.status);
      }
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    console.log("calling RemoteDataStore.remove()");
    $.get(this.serverUrl + "?username=" + key, function(serverResponse) {
      var myID = (serverResponse[0].id);

      console.log(this.serverUrl);
      //$.ajax("http://localhost:2403/coffeeorders" + "/" + myID, {
      $.ajax(this.serverUrl + "/" + myID, {
        type: "DELETE"
      }, function() {
        //console.log(this.serverUrl);
      });
    }.bind(this));
  };
  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
