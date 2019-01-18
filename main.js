var turn = 0;
var row = 6;
var col = 7;
var aiMove = -1;

function makeBoard() {
  for (var i = 0; i < 6; i++) {
    var rows = document.createElement("div");
    rows.classList.add("row");
    rows.id = i;
    document.getElementById("board").appendChild(rows)
    for (var j = 0; j < 7; j++) {
      var cols = document.createElement("div");
      cols.classList.add("col");
      cols.id = "col_" + i + "_" + j;
      cols.classList.add("empty");
      cols.onclick = function() {
        var empty = findEmpty(this.id, row);
        var colName = "col_" + empty + "_" + this.id.slice(6);
        /*if (turn == 0) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("red");
            turn = 1;
            checkIfWin(row, col);
          }
        } else */
        if (turn == 0) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("yellow");
            turn = 1;
            if (checkIfWin(row, col) == false) {
              minimax();
            }
          }
        }
      };
      rows.appendChild(cols);
    }
  }
}

function restartGame() {
  var size = document.getElementById("difficulty").selectedIndex;
  var filho = document.getElementById("board");
  var pai = document.getElementById("container");

  if (size == 0) {
    row = 4;
    col = 5;
    while (document.getElementById("board") != null) {
      pai.removeChild(filho);
    }
  }
  if (size == 1) {
    row = 6;
    col = 7;
    while(document.getElementById("board") != null) {
      pai.removeChild(filho);
    }
  }
  if (size == 2) {
    row = 9;
    col = 10;
    if (document.getElementById("board") != null) {
      pai.removeChild(filho);
    }
  }
  var board = document.createElement("div");
  console.log(row + " " + col);
  for (var i = 0; i < row; i++) {

    board.id = "board";
    var rows = document.createElement("div");
    rows.classList.add("row");
    rows.id = i;
    document.getElementById("container").appendChild(board);
    document.getElementById("board").appendChild(rows);
    for (var j = 0; j < col; j++) {
      var cols = document.createElement("div");
      cols.classList.add("col");
      cols.id = "col_" + i + "_" + j;
      cols.classList.add("empty");
      cols.onclick = function() {
        var empty = findEmpty(this.id, row);
        var colName = "col_" + empty + "_" + this.id.slice(6);
        /*if (turn == 0) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("red");
            turn = 1;
            checkIfWin(row, col);
          }
        } else*/
        if (turn == 0) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("yellow");
            turn = 1;
            if (checkIfWin(row, col) == false) {
              minimax();
            }
          }
        }
      };
      rows.appendChild(cols);
    }
  }
}

function findUtil(colN, rows) {
  for (var i = rows - 1; i >= 0; i--) {
    var id = "col_" + i + "_" + colN;
    if (document.getElementById(id).classList.contains("empty")) {
      return i;
    }
  }
  return -1;
}

function addPiece(colN, rows) {
  for (var i = rows - 1; i >= 0; i--) {
    var id = "col_" + i + "_" + colN;
    if (document.getElementById(id).classList.contains("empty")) {
      document.getElementById(id).classList.remove("empty");
      document.getElementById(id).classList.add("red");
      return i;
    }
  }
  return -1;
}

function removePiece(colN, rowN) {
  var id = "col_" + rowN + "_" + colN;
  document.getElementById(id).classList.add("empty");
  document.getElementById(id).classList.remove("red");
}

function minimax() {
  var v;
  v = max();
  console.log("MELHOR COLUNA " + aiMove);
  var empty = findUtil(aiMove, row);
  var colName = "col_" + empty + "_" + aiMove;
  document.getElementById(colName).classList.add("red");
  document.getElementById(colName).classList.remove("empty");
  turn = 0;
  checkIfWin(row, col);
  aiMove = -1;
}

function max() {
  var v = -99999;
  var max = 99999;
  for (var i = 0; i < col; i++) {
    if (findUtil(i, row) == -1) {
      break;
    }
    console.log(i);
    var cenas = utilityVal(i);
    if (v < cenas) {
      v = cenas;
      aiMove = i;
    }
  }
  return v;
}

function utilityVal(colN) {
  var totalUtility = 0;
  var nReds = 0;
  var nYellows = 0;
  console.log("INICIAL " + totalUtility);
  var line = addPiece(colN, row);

  for (var i = row - 1; i >= 0; i--) {
    for (var j = 0; j < col - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + i + "_" + (j + 1);
      var id3 = "col_" + i + "_" + (j + 2);
      var id4 = "col_" + i + "_" + (j + 3);
      if (!document.getElementById(id).classList.contains("yellow") && !document.getElementById(id2).classList.contains("yellow") &&
        !document.getElementById(id3).classList.contains("yellow") && !document.getElementById(id4).classList.contains("yellow")) {
        if (document.getElementById(id).classList.contains("red")) {
          nReds++;
        }
        if (document.getElementById(id2).classList.contains("red")) {
          nReds++;
        }
        if (document.getElementById(id3).classList.contains("red")) {
          nReds++;
        }
        if (document.getElementById(id4).classList.contains("red")) {
          nReds++;
        }
        if (nReds == 1) {
          totalUtility = totalUtility + 1;
        }
        if (nReds == 2) {
          totalUtility = totalUtility + 10;
        }
        if (nReds == 3) {
          totalUtility = totalUtility + 50;
        }
        if (nReds == 4) {
          totalUtility = totalUtility + 512;
        }
        nReds = 0;
      }

      if (!document.getElementById(id).classList.contains("red") && !document.getElementById(id2).classList.contains("red") &&
        !document.getElementById(id3).classList.contains("red") && !document.getElementById(id4).classList.contains("red")) {
        if (document.getElementById(id).classList.contains("yellow")) {
          nYellows++;
        }
        if (document.getElementById(id2).classList.contains("yellow")) {
          nYellows++;
        }
        if (document.getElementById(id3).classList.contains("yellow")) {
          nYellows++;
        }
        if (document.getElementById(id4).classList.contains("yellow")) {
          nYellows++;
        }
        if (nYellows == 1) {
          totalUtility = totalUtility - 1;
        }
        if (nYellows == 2) {
          totalUtility = totalUtility - 10;
        }
        if (nYellows == 3) {
          totalUtility = totalUtility - 50;
        }
        if (nYellows == 4) {
          totalUtility = totalUtility - 512;
        }
        nYellows = 0;
      }
    }
  }

  //vertical
  for (var i = 0; i < col; i++) {
    for (var j = row - 1; j >= row - 3; j--) {
      var id = "col_" + j + "_" + i;
      var id2 = "col_" + (j - 1) + "_" + i;
      var id3 = "col_" + (j - 2) + "_" + i;
      var id4 = "col_" + (j - 3) + "_" + i;
      console.log(id + " " + id2 + " " + id3 + " " + id4);
      if (!document.getElementById(id).classList.contains("yellow") && !document.getElementById(id2).classList.contains("yellow") &&
        !document.getElementById(id3).classList.contains("yellow") && !document.getElementById(id4).classList.contains("yellow")) {
        if (document.getElementById(id).classList.contains("red")) {
          nReds++;
        }
        if (document.getElementById(id2).classList.contains("red")) {
          nReds++;
        }
        if (document.getElementById(id3).classList.contains("red")) {
          nReds++;
        }
        if (document.getElementById(id4).classList.contains("red")) {
          nReds++;
        }
        if (nReds == 1) {
          totalUtility = totalUtility + 1;
        }
        if (nReds == 2) {
          totalUtility = totalUtility + 10;
        }
        if (nReds == 3) {
          totalUtility = totalUtility + 50;
        }
        if (nReds == 4) {
          totalUtility = totalUtility + 512;
        }
        nReds = 0;
      }

      if (!document.getElementById(id).classList.contains("red") && !document.getElementById(id2).classList.contains("red") &&
        !document.getElementById(id3).classList.contains("red") && !document.getElementById(id4).classList.contains("red")) {
        if (document.getElementById(id).classList.contains("yellow")) {
          nYellows++;
        }
        if (document.getElementById(id2).classList.contains("yellow")) {
          nYellows++;
        }
        if (document.getElementById(id3).classList.contains("yellow")) {
          nYellows++;
        }
        if (document.getElementById(id4).classList.contains("yellow")) {
          nYellows++;
        }
        if (nYellows == 1) {
          totalUtility = totalUtility - 1;
        }
        if (nYellows == 2) {
          totalUtility = totalUtility - 10;
        }
        if (nYellows == 3) {
          totalUtility = totalUtility - 50;
        }
        if (nYellows == 4) {
          totalUtility = totalUtility - 512;
        }
        nYellows = 0;
      }
      if (j - 4 <  0) {
        break;
      }
    }
  }

  //diagonal1
  for (var i = row - 1; i > 2; i--) {
    for (var j = 0; j < col - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + (i - 1) + "_" + (j + 1);
      var id3 = "col_" + (i - 2) + "_" + (j + 2);
      var id4 = "col_" + (i - 3) + "_" + (j + 3);
      if (!document.getElementById(id).classList.contains("yellow") && !document.getElementById(id2).classList.contains("yellow") &&
        !document.getElementById(id3).classList.contains("yellow") && !document.getElementById(id4).classList.contains("yellow")) {
        if (document.getElementById(id).classList.contains("red")) {
          nReds++;
        }
        if (document.getElementById(id2).classList.contains("red")) {
          nReds++;
        }
        if (document.getElementById(id3).classList.contains("red")) {
          nReds++;
        }
        if (document.getElementById(id4).classList.contains("red")) {
          nReds++;
        }
        if (nReds == 1) {
          totalUtility = totalUtility + 1;

        }
        if (nReds == 2) {
          totalUtility = totalUtility + 10;
        }
        if (nReds == 3) {
          totalUtility = totalUtility + 50;
        }
        if (nReds == 4) {
          totalUtility = totalUtility + 512;
        }
        nReds = 0;
      }

      if (!document.getElementById(id).classList.contains("red") && !document.getElementById(id2).classList.contains("red") &&
        !document.getElementById(id3).classList.contains("red") && !document.getElementById(id4).classList.contains("red")) {
        if (document.getElementById(id).classList.contains("yellow")) {
          nYellows++;
        }
        if (document.getElementById(id2).classList.contains("yellow")) {
          nYellows++;
        }
        if (document.getElementById(id3).classList.contains("yellow")) {
          nYellows++;
        }
        if (document.getElementById(id4).classList.contains("yellow")) {
          nYellows++;
        }
        if (nYellows == 1) {
          totalUtility = totalUtility - 1;
        }
        if (nYellows == 2) {
          totalUtility = totalUtility - 10;
        }
        if (nYellows == 3) {
          totalUtility = totalUtility - 50;
        }
        if (nYellows == 4) {
          totalUtility = totalUtility - 512;
        }
        nYellows = 0;
      }
    }
  }

  //diagonal2
  for (var i = 0; i < row - 3; i++) {
    for (var j = 0; j < col - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + (i + 1) + "_" + (j + 1);
      var id3 = "col_" + (i + 2) + "_" + (j + 2);
      var id4 = "col_" + (i + 3) + "_" + (j + 3);
      if (!document.getElementById(id).classList.contains("yellow") && !document.getElementById(id2).classList.contains("yellow") &&
        !document.getElementById(id3).classList.contains("yellow") && !document.getElementById(id4).classList.contains("yellow")) {
        if (document.getElementById(id).classList.contains("red")) {
          nReds++;
        }
        if (document.getElementById(id2).classList.contains("red")) {
          nReds++;
        }
        if (document.getElementById(id3).classList.contains("red")) {
          nReds++;
        }
        if (document.getElementById(id4).classList.contains("red")) {
          nReds++;
        }
        if (nReds == 1) {
          totalUtility = totalUtility + 1;
        }
        if (nReds == 2) {
          totalUtility = totalUtility + 10;
        }
        if (nReds == 3) {
          totalUtility = totalUtility + 50;
        }
        if (nReds == 4) {
          totalUtility = totalUtility + 512;
        }
        nReds = 0;
      }

      if (!document.getElementById(id).classList.contains("red") && !document.getElementById(id2).classList.contains("red") &&
        !document.getElementById(id3).classList.contains("red") && !document.getElementById(id4).classList.contains("red")) {
        if (document.getElementById(id).classList.contains("yellow")) {
          nYellows++;
        }
        if (document.getElementById(id2).classList.contains("yellow")) {
          nYellows++;
        }
        if (document.getElementById(id3).classList.contains("yellow")) {
          nYellows++;
        }
        if (document.getElementById(id4).classList.contains("yellow")) {
          nYellows++;
        }
        if (nYellows == 1) {
          totalUtility = totalUtility - 1;
        }
        if (nYellows == 2) {
          totalUtility = totalUtility - 10;
        }
        if (nYellows == 3) {
          totalUtility = totalUtility - 50;
        }
        if (nYellows == 4) {
          totalUtility = totalUtility - 512;
        }
        nYellows = 0;
      }
    }
  }
  console.log("FINAL " + totalUtility);
  removePiece(colN, line);
  return totalUtility;
}


function quitGame() {
  alert("O jogador desistiu do jogo!");
  location.reload();
}

function findEmpty(x, rows) {
  var colN = x.slice(6);
  for (var i = rows - 1; i >= 0; i--) {
    var id = "col_" + i + "_" + colN;
    if (document.getElementById(id).classList.contains("empty")) {
      document.getElementById(id).classList.remove("empty");
      return i;
    }
  }
  return -1;
}

function checkIfWin(a, b) {
  var yellowC = false;
  var redC = false;
  for (var i = a - 1; i >= 0; i--) {
    for (var j = 0; j < b - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + i + "_" + (j + 1);
      var id3 = "col_" + i + "_" + (j + 2);
      var id4 = "col_" + i + "_" + (j + 3);
      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        alert("O jogador vermelho ganhou!");
        return true;
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        alert("O jogador amarelo ganhou!");
        return true;
      }
    }
  }

  for (var i = 0; i < b; i++) {
    for (var j = a - 1; j >= a - 3; j--) {
      var id = "col_" + j + "_" + i;
      var id2 = "col_" + (j - 1) + "_" + i;
      var id3 = "col_" + (j - 2) + "_" + i;
      var id4 = "col_" + (j - 3) + "_" + i;
      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        alert("O jogador vermelho ganhou!");
        return true;
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        alert("O jogador amarelo ganhou!");
        return true;
      }
    }
  }
  for (var i = a - 1; i > 2; i--) {
    for (var j = 0; j < b - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + (i - 1) + "_" + (j + 1);
      var id3 = "col_" + (i - 2) + "_" + (j + 2);
      var id4 = "col_" + (i - 3) + "_" + (j + 3);

      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        alert("O jogador vermelho ganhou!");
        return true;
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        alert("O jogador amarelo ganhou!");
        return true;

      }
    }
  }

  for (var i = 0; i < a - 3; i++) {
    for (var j = 0; j < b - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + (i + 1) + "_" + (j + 1);
      var id3 = "col_" + (i + 2) + "_" + (j + 2);
      var id4 = "col_" + (i + 3) + "_" + (j + 3);

      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        alert("O jogador vermelho ganhou!");
        return true;

      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        alert("O jogador amarelo ganhou!");
        return true;

      }
    }
  }
  return false;
}

/*function popupInst() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}*/
