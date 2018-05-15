$(document).ready(() => {
  $("#open-search").on('click', () => {
    if($("#search-icon").attr("class") === "svg-inline--fa fa-search-plus fa-w-16") {
      $("#open-search").attr("title", "Click to reset the search");
      $("#search-icon").attr("class", "fas fa-search-minus");
      $("#search-input").removeClass('hide');
      $("#search-input").focus();
      $("#search-btn").removeClass('hide');
    } else {
      $("#open-search").attr("title", "Click to search for a Wikipedia page");
      $("#search-icon").attr("class", "fas fa-search-plus");
      $("#search-input").addClass('hide');
      $("#search-input").val("");
      $("#search-btn").addClass('hide');
      $("#search-results").empty();
    }
  });
  $("#search-btn").on("click", () => {
    if($("#search-input").val() === "") {
      return null;
    }
    $.ajax( {
      url: "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + encodeURIComponent($("#search-input").val()),
      success: (data) => {
        for(var i = 0; i < data[1].length; i++) {
          $("#search-results").append('<a href="' + data[3][i] + '" class="btn btn-dark btn-block" role="button" target="_blank" rel="noopener">' + '<h3 class="link-title">' + data[1][i] + '</h3><p class="link-text">' + data[2][i] + '</p></a>')
        }
      }
    });
  });
  
  $("#search-input").keypress((e) => {
    var key = e.which;
    if(key === 13) {
      if($("#search-input").val() === "") {
        return null;
      } else {
        $.ajax( {
          url: "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + encodeURIComponent($("#search-input").val()),
          success: (data) => {
            for(var i = 0; i < data[1].length; i++) {
              $("#search-results").append('<a href="' + data[3][i] + '" class="btn btn-dark btn-block" role="button" target="_blank" rel="noopener">' + '<h3 class="link-title">' + data[1][i] + '</h3><p class="link-text">' + data[2][i] + '</p></a>')
            }
          }
        });
      }
    }
  });
});