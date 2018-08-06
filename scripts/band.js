(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function Band(db) {
    this.db = db;
  }

  Band.prototype.getBandInfo = function(bandName, cb) {
    this.db.getByKey("bandName", bandName, function(serverResponse) {
      if (serverResponse.length != 0) {
        cb(serverResponse[0]);
      }
    });
  }

  Band.prototype.saveComment = function(order) {
    this.db.add(order.emailAddress, order);
  };


  Band.prototype.getAllBands = function(cb) {
    this.db.getAll(function(serverResponse) {
      if (serverResponse.length != 0) {
        cb(serverResponse);
      }
    });
  }

  Band.prototype.displayAllBands = function(bandInfoList, selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }
    this.bandInfoList = bandInfoList;
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }

    var genrelist = getUniqueGenres(this.bandInfoList);

    $.each(genrelist, function(i, genre) {
      console.log("The genre name is :" + genre);
      var $div = $("<div></div>", {
        "class":"panel panel-footer",
        "data-band-left": "genre"
      });

      var $header = $("<h4></h4");
      $header.append(genre);

      var $genreDiv = $("<div></div>",{
        "data-band-genre": genre,
        "class":"kellys-container"
      });

      var rowElement = thumbnailRow(this.bandInfoList,genre,$genreDiv)

      $div.append($header);
      $div.append(rowElement);
      this.$element.append($div);

    }.bind(this));
  };

  Band.prototype.displayComments = function(bandName, cb) {
    /*this.db.getAll(function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });*/
    this.db.getByKey("bandName", bandName, function(serverResponse) {
      if (serverResponse.length != 0) {
        console.log("The list of comments is :" + serverResponse);
        cb(serverResponse);
      }
    });
  };

  Band.prototype.addVideo = function(bandInfo){
    this.db.add(bandInfo.bandName,bandInfo);
  };

  function getUniqueGenres(bandInfoList){
    var lookup = {};
    var items = bandInfoList;
    var genrelist = [];

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var genre = item.genre;

      if (!(genre in lookup)) {
        lookup[genre] = 1;
        genrelist.push(genre);
      }
    }

    return genrelist;
  }

  function thumbnailRow(bandInfoList,genre,$genreDiv){

    $.each(bandInfoList, function(i, bandInfo) {
      if (genre == bandInfo.genre) {
        var $div = $("<div></div>", {
          "data-videos-list": "listelement",
          "class":"band-comments-div",

        });

        var $label = $("<label></label>");

        var $iframe = $("<iframe></iframe>",{
          "src":bandInfo.bandVideo
        });

        var description = "<br>Performance by <font color=\"black\"> <i>"+ bandInfo.bandName + "</i></font><br>" + bandInfo.performanceDay + "<br>" + bandInfo.location + "<br />";
        var $a = $("<a></a>",{
          "class":"band-comments",
          "href": "review.html?bandName=" + bandInfo.bandName
        });
        $a.append("Click to comment");

        $label.append($iframe);
        $label.append(description);
        $label.append($a);
        $div.append($label);

        $genreDiv.append($div);
      }
    });

    return $genreDiv;
  }

  App.Band = Band;
  window.App = App;

})(window);
