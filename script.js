"use strict";

let activePlayer;
let var_current_score_player_0;
let var_current_score_player_1;
let var_main_score_player_0;
let var_main_score_player_1;
let var_hold_player_0;
let var_hold_player_1;
let win;

let init = function () {
  activePlayer = 0;
  var_current_score_player_0 = 0;
  var_current_score_player_1 = 0;
  var_main_score_player_0 = 0;
  var_main_score_player_1 = 0;
  var_hold_player_0 = 8;
  var_hold_player_1 = 8;
  win = 0;
};

let changeFunction = function () {
  document.querySelector(".player-0").classList.toggle("active-player");
  document.querySelector(".player-1").classList.toggle("active-player");

  if (activePlayer == 0) {
    var_current_score_player_0 = 0;
    document.querySelector(
      `.current-score-player--${activePlayer}`
    ).textContent = var_current_score_player_0;
    document.querySelector(`.main-score-player--${activePlayer}`).textContent =
      var_main_score_player_0;

    activePlayer = 1;
  } else {
    var_current_score_player_1 = 0;
    document.querySelector(
      `.current-score-player--${activePlayer}`
    ).textContent = var_current_score_player_1;
    document.querySelector(`.main-score-player--${activePlayer}`).textContent =
      var_main_score_player_1;

    activePlayer = 0;
  }
};

let draw_match = function () {
  if (win === 0 && var_hold_player_0 === 0 && var_hold_player_1 === 0) {
    win = 1;
    document.querySelector(".main-score-player--0").textContent = "🛑";
    document.querySelector(".main-score-player--1").textContent = "🛑";
  }
};

init();

document.querySelector(".roll-dice").addEventListener("click", function () {
  draw_match();

  if (win != 1) {
    let diceValue = Math.trunc(Math.random() * 6) + 1;
    document.querySelector(".dice-image").src = `images/dice-${diceValue}.png`;

    if (diceValue === 1) {
      changeFunction();
    } else {
      if (activePlayer == 0) {
        var_current_score_player_0 = var_current_score_player_0 + diceValue;
        document.querySelector(
          `.current-score-player--${activePlayer}`
        ).textContent = var_current_score_player_0;
      } else {
        var_current_score_player_1 = var_current_score_player_1 + diceValue;
        document.querySelector(
          `.current-score-player--${activePlayer}`
        ).textContent = var_current_score_player_1;
      }
    }
  }
});

document.querySelector(".hold").addEventListener("click", function () {
  draw_match();

  if (win !== 1) {
    if (activePlayer == 0 && var_hold_player_0 >= 1) {
      var_main_score_player_0 =
        var_main_score_player_0 + var_current_score_player_0;

      var_hold_player_0--;
      document.querySelector(".hold-chances-player--0").textContent =
        var_hold_player_0;

      changeFunction();

      if (var_main_score_player_0 >= 100) {
        document.querySelector(".player-1").classList.remove("active-player");
        document.querySelector(".player-0").classList.add("win-msg");
        document.querySelector(".main-score-player--0").textContent = "💥";
        win = 1;
      }
    } else if (activePlayer == 1 && var_hold_player_1 >= 1) {
      var_main_score_player_1 =
        var_main_score_player_1 + var_current_score_player_1;

      var_hold_player_1--;
      document.querySelector(".hold-chances-player--1").textContent =
        var_hold_player_1;

      changeFunction();

      if (var_main_score_player_1 >= 100) {
        document.querySelector(".player-0").classList.remove("active-player");
        document.querySelector(".player-1").classList.add("win-msg");
        document.querySelector(".main-score-player--1").textContent = "💥";
        win = 1;
      }
    }
  }
});

document.querySelector(".reset").addEventListener("click", function () {
  document.querySelector(".main-score-player--0").textContent = "0";
  document.querySelector(".main-score-player--1").textContent = "0";
  document.querySelector(".dice-image").src = `images/dice-1.png`;
  document.querySelector(".hold-chances-player--0").textContent = 8;
  document.querySelector(".hold-chances-player--1").textContent = 8;

  document.querySelector(".player-0").classList.add("active-player");
  document.querySelector(".player-1").classList.remove("active-player");
  document.querySelector(".player-0").classList.remove("win-msg");
  document.querySelector(".player-1").classList.remove("win-msg");

  init();
});
