  var maxDepth = 4;
  var row = 6;
  var col = 7;
  var aiMove = -1;
  var tie = 0;
  var b = [];
  var turn = -1;

  function changeDepth() {
    var val = document.getElementById("difficulty").selectedIndex;
    if (val == 0) {
      maxDepth = 2;
    } else if (val == 1) {
      maxDepth = 4;
    } else if (val == 2) {
      maxDepth = 6;
    } else {
      maxDepth = 8;
    }
    console.log(maxDepth);
  }

  function restartGame() {
    var hIndex = document.getElementById("height");
    row = hIndex.options[hIndex.selectedIndex].value;
    var wIndex = document.getElementById("width");
    col = wIndex.options[wIndex.selectedIndex].value;
    var depthId = document.getElementById("difficulty");
    maxDepth = depthId.options[depthId.selectedIndex].value;
    var starter = document.getElementById("starter");
    aiStarter = starter.options[starter.selectedIndex].value;
    turn = starter.options[starter.selectedIndex].value;
    console.log(turn);
    var filho = document.getElementById("board");
    var pai = document.getElementById("container");
    getName();
    while (document.getElementById("board") != null) {
      pai.removeChild(filho);
    }
    var board = document.createElement("div");
    board.id = "board";
    document.getElementById("container").appendChild(board);
    emptyBoard();
    tie = 0;
    console.log(b);
    if (turn == 1) {
      showTurn(0);
    }
    else if (turn == 0) {
      showTurn(0);
    }
    for (var i = 0; i < row; i++) {
      var rows = document.createElement("div");
      rows.classList.add("row");
      rows.id = i;

      document.getElementById("board").appendChild(rows);
      for (var j = 0; j < col; j++) {
        var cols = document.createElement("div");
        cols.classList.add("col");
        cols.id = "col_" + i + "_" + j;
        cols.classList.add("empty");
        cols.onclick = function() {
          var empty = findEmpty(this.id, row);
          var colName = "col_" + empty + "_" + this.id.slice(6);
          if (turn == 0) {
            showTurn(0);
            if (empty != -1) {
              document.getElementById(colName).classList.add("yellow");
              b[empty][this.id.slice(6)] = 'O';
              turn = 1;

              tie++;
              checkIfWin(row, col);
              setTimeout(showTurn,1000,0);
              if (tie == (row * col) && checkIfWin(row, col) == false) {
                var msg = document.getElementById("Page4");
                msg.style.display = "block";
                removeClick();
              }
            }

          }
          if (turn == 1) {
            showTurn(1);
            setTimeout(minimax,1000);


            if (tie == (row * col) && checkIfWin(row, col) == false) {
              var msg = document.getElementById("Page6");
              msg.style.display = "block";
              removeClick();
            }

          }
        };
        rows.appendChild(cols);
      }
    }
    if (aiStarter == 1) {
      minimax();
      aiStarter = null;
    }
    console.log(maxDepth);
  }

  function show(shown, hidden) {
    document.getElementById(shown).style.display = 'block';
    document.getElementById(hidden).style.display = 'none';
    return false;
  }

  function hide(id) {
    document.getElementById(id).style.display = 'none';
  }

  function showTurn(vez) {
    console.log("VEZ " + vez);
    if (vez == 1) {
          var pai = document.getElementById("showturn");
          pai.innerHTML = "Jogada: Computador";
    }
    else if (vez == 0) {
          var pai = document.getElementById("showturn");
          pai.innerHTML = "Jogada: "+ login.elements[0].value;
    }
  }

  function emptyBoard() {
    b = [];
    for (var i = 0; i < row; i++) {
      b[i] = [];
      for (var j = 0; j < col; j++) {
        b[i][j] = '-';
      }
    }
  }

  function cloneBoard(board) {
    var clone = [];
    for (var i = 0; i < row; i++) {
      clone[i] = [];
      for (var j = 0; j < col; j++) {
        clone[i][j] = '-';
      }
    }
    for (var i = 0; i < row; i++) {
      for (var j = 0; j < col; j++) {
        clone[i][j] = board[i][j];
      }
    }
    return clone;
  }

  function findUtil(game, colN, rows) {
    for (var i = rows - 1; i >= 0; i--) {
      if (game[i][colN] == '-') {
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

  function getName() {
    var form = document.getElementById("login");

    document.getElementById("test").rows[1].cells[0].innerHTML = login.elements[0].value;
  }

  function updateTable(player) {
    var currG = parseInt(document.getElementById("test").rows[1].cells[1].innerHTML);
    if (player === "ai") {
      document.getElementById("test").rows[2].cells[1].innerHTML = (currG + 1);
      document.getElementById("test").rows[1].cells[1].innerHTML = (currG + 1);
      var currW = parseInt(document.getElementById("test").rows[2].cells[2].innerHTML);
      document.getElementById("test").rows[2].cells[2].innerHTML = (currW + 1);
      document.getElementById("test").rows[2].cells[3].innerHTML = ((currW + 1)/(currG + 1) * 100) + "%";
    } else {
      document.getElementById("test").rows[2].cells[1].innerHTML = (currG + 1);
      document.getElementById("test").rows[1].cells[1].innerHTML = (currG + 1);
      var currW = parseInt(document.getElementById("test").rows[1].cells[2].innerHTML);
      document.getElementById("test").rows[1].cells[2].innerHTML = (currW + 1);
      document.getElementById("test").rows[1].cells[3].innerHTML = ((currW + 1)/(currG + 1) * 100) + "%";
    }
  }

  function quit() {
    updateTable("ai");
    restartGame();
  }

  function minimax() {
    var v;
    v = max(b, 0);
    if (aiMove == -1) {
      for (var i = 0; i < col; i++) {
        var free = findUtil(b, i, row);
        if (free != -1) {
          aiMove = i;
          break;
        }
      }
    }
    var empty = findUtil(b, aiMove, row);
    var colName = "col_" + empty + "_" + aiMove;
    document.getElementById(colName).classList.add("red");
    document.getElementById(colName).classList.remove("empty");
    b[empty][aiMove] = 'X';
    turn = 0;
    tie++;
    checkIfWin(row, col);
    aiMove = -1;
  }

  function max(game, depth) {
    if (depth == maxDepth) {
      return utilityVal(game);
    }
    var v = -99999;
    var max = -99999;

    for (var i = 0; i < col; i++) {

      if (findUtil(game, i, row) == -1) {
        break;
      }

      var s = cloneBoard(game);
      var empty = findUtil(s, i, row);
      s[empty][i] = 'X';
      v = Math.max(v, min(s, depth + 1));
      if (v > max) {
        max = v;
        aiMove = i;
      }

    }
    return v;
  }

  function min(game, depth) {
    if (depth == maxDepth) {
      return utilityVal(game);
    }
    var v = 99999;
    for (var i = 0; i < col; i++) {

      if (findUtil(game, i, row) == -1) {
        break;
      }
      var s = cloneBoard(game);
      var empty = findUtil(s, i, row);
      s[empty][i] = 'O';
      v = Math.min(v, max(s, depth + 1));
    }
    return v;
  }

  function utilityVal(game) {
    var totalUtility = 0;
    var nReds = 0;
    var nYellows = 0;
    //horizontal
    for (var i = row - 1; i >= 0; i--) {
      for (var j = 0; j < col - 3; j++) {
        if (game[i][j] != 'O' && game[i][j + 1] != 'O' && game[i][j + 2] != 'O' && game[i][j + 3] != 'O') {
          if (game[i][j] == 'X') {
            nReds++;
          }
          if (game[i][j + 1] == 'X') {
            nReds++;
          }
          if (game[i][j + 2] == 'X') {
            nReds++;
          }
          if (game[i][j + 3] == 'X') {
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

        if (game[i][j] != 'X' && game[i][j + 1] != 'X' && game[i][j + 2] != 'X' && game[i][j + 3] != 'X') {
          if (game[i][j] == 'O') {
            nYellows++;
          }
          if (game[i][j + 1] == 'O') {
            nYellows++;
          }
          if (game[i][j + 2] == 'O') {
            nYellows++;
          }
          if (game[i][j + 3] == 'O') {
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
        if (game[j][i] != 'O' && game[j - 1][i] != 'O' && game[j - 2][i] != 'O' && game[j - 3][i] != 'O') {
          if (game[j][i] == 'X') {
            nReds++;
          }
          if (game[j - 1][i] == 'X') {
            nReds++;
          }
          if (game[j - 2][i] == 'X') {
            nReds++;
          }
          if (game[j - 3][i] == 'X') {
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

        if (game[j][i] != 'X' && game[j - 1][i] != 'X' && game[j - 2][i] != 'X' && game[j - 3][i] != 'X') {
          if (game[j][i] == 'O') {
            nYellows++;
          }
          if (game[j - 1][i] == 'O') {
            nYellows++;
          }
          if (game[j - 2][i] == 'O') {
            nYellows++;
          }
          if (game[j - 3][i] == 'O') {
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
        if (j - 4 < 0) {
          break;
        }
      }
    }

    //diagonal1
    for (var i = row - 1; i > 2; i--) {
      for (var j = 0; j < col - 3; j++) {
        if (game[i][j] != 'O' && game[i - 1][j + 1] != 'O' && game[i - 2][j + 2] != 'O' && game[i - 3][j + 3] != 'O') {
          if (game[i][j] == 'X') {
            nReds++;
          }
          if (game[i - 1][j + 1] == 'X') {
            nReds++;
          }
          if (game[i - 2][j + 2] == 'X') {
            nReds++;
          }
          if (game[i - 3][j + 3] == 'X') {
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

        if (game[i][j] != 'X' && game[i - 1][j + 1] != 'X' && game[i - 2][j + 2] != 'X' && game[i - 3][j + 3] != 'X') {
          if (game[i][j] == 'O') {
            nYellows++;
          }
          if (game[i - 1][j + 1] == 'O') {
            nYellows++;
          }
          if (game[i - 2][j + 2] == 'O') {
            nYellows++;
          }
          if (game[i - 3][j + 3] == 'O') {
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
        if (game[i][j] != 'O' && game[i + 1][j + 1] != 'O' && game[i + 2][j + 2] != 'O' && game[i + 3][j + 3] != 'O') {
          if (game[i][j] == 'X') {
            nReds++;
          }
          if (game[i + 1][j + 1] == 'X') {
            nReds++;
          }
          if (game[i + 2][j + 2] == 'X') {
            nReds++;
          }
          if (game[i + 3][j + 3] == 'X') {
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

        if (game[i][j] != 'X' && game[i + 1][j + 1] != 'X' && game[i + 2][j + 2] != 'X' && game[i + 3][j + 3] != 'X') {
          if (game[i][j] == 'O') {
            nYellows++;
          }
          if (game[i + 1][j + 1] == 'O') {
            nYellows++;
          }
          if (game[i + 2][j + 2] == 'O') {
            nYellows++;
          }
          if (game[i + 3][j + 3] == 'O') {
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
    return totalUtility;
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

  function removeClick() {
    for (var i = 0; i < row; i++) {
      for (var j = 0; j < col; j++) {
        var id = "col_" + i + "_" + j;
        var element = document.getElementById(id);
        element.classList.add('noclick');
        element.onclick = function() {
          return false;
        }
      }
    }
  }

  function showWinner(player) {
    if (player === "ai") {
      updateTable(player);
      var pai = document.getElementById("showturn");
      pai.innerHTML = "Jogo Acabado!";
      var msg = document.getElementById("Page4");
      msg.style.display = "block";
      removeClick();
      return;
    } else {
      updateTable(player);
      var pai = document.getElementById("showturn");
      pai.innerHTML = "Jogo Acabado!";
      var msg = document.getElementById("Page5");
      msg.style.display = "block";
      removeClick();
      return;
    }
  }

  function checkIfWin(a, b) {
    var yellowC = false;
    var redC = false;
    var ai = "ai";
    var human = "human";
    for (var i = a - 1; i >= 0; i--) {
      for (var j = 0; j < b - 3; j++) {
        var id = "col_" + i + "_" + j;
        var id2 = "col_" + i + "_" + (j + 1);
        var id3 = "col_" + i + "_" + (j + 2);
        var id4 = "col_" + i + "_" + (j + 3);
        if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
          document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
          showWinner(ai);
          return true;
        }
        if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
          document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
          showWinner(human);
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
          showWinner(ai);
          return true;
        }
        if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
          document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
          showWinner(human);
          return true;
        }

        if (j - 4 < 0) {
          break;
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
          showWinner(ai);
          return true;
        }
        if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
          document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
          showWinner(human);
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
          showWinner(ai);
          return true;

        }
        if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
          document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
          showWinner(human);
          return true;

        }
      }
    }
    return false;
  }
