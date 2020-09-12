const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let missHits = 0;

function round() {
  $(".game-field").removeClass("target");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);

  if (hits === 0) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $("#button-start").hide();
  $(".main-game").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
  $("#totalHits").text(hits - missHits);
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".game-field").text("");
    round();
  } else {
    missHits = missHits + 1;
    $(event.target).addClass("miss");

  }
}

function init() {
 $("#button-start").click(function() {
    round();
    $("#button-start").hide();
  });

 $(".game-field").click(handleClick);
  
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
