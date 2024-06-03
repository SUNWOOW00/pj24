var modal = document.getElementById('myModal');
var grid = new Array(3);
grid[0] = new Array(3);
grid[1] = new Array(3);
grid[2] = new Array(3);
var player = 0;

// Helper function to fill Map data structure
var numberMap = new Map([
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9]
]);

// Function that maps a number to its place in the grid
function evaluateMapping(squareNumber) {
    if (squareNumber >= 1 && squareNumber <= 3) {
        return [0, squareNumber - 1];
    }
    if (squareNumber >= 4 && squareNumber <= 6) {
        return [1, squareNumber - 4];
    }
    if (squareNumber >= 7 && squareNumber <= 9) {
        return [2, squareNumber - 7];
    }
}

// Utility function that handles Click on the Square
function handleSquareClick(squareVal) {
    let x, y, squareNumber;
    squareNumber = numberMap.get(squareVal);
    [x, y] = evaluateMapping(squareNumber);
    if (checkLegalMove(x, y)) {
        if (player == 0) {
            console.log('X turn');
            $('#square_' + squareVal + '_text').html("X");
            grid[x][y] = 'X';
            if (checkWin(1)) {
                endgame(1);
            }
        } else {
            console.log('O turn ');
            $('#square_' + squareVal + '_text').html("O");
            grid[x][y] = 'O';
            if (checkWin(2)) {
                endgame(2);
            }
        }
        // Switch player turns
        player = 1 - player;
    }
}

$("#square_one").click(function() { handleSquareClick("one"); });
$("#square_two").click(function() { handleSquareClick("two"); });
$("#square_three").click(function() { handleSquareClick("three"); });
$("#square_four").click(function() { handleSquareClick("four"); });
$("#square_five").click(function() { handleSquareClick("five"); });
$("#square_six").click(function() { handleSquareClick("six"); });
$("#square_seven").click(function() { handleSquareClick("seven"); });
$("#square_eight").click(function() { handleSquareClick("eight"); });
$("#square_nine").click(function() { handleSquareClick("nine"); });

function checkWin(playerNum) {
    // Check horizontal
    for (let i = 0; i < 3; i++) {
        if (grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2] && grid[i][0] !== undefined && grid[i][1] !== undefined && grid[i][2] !== undefined) {
            console.log("horizontal won");
            return true;
        }
    }
    // Check vertical
    for (let i = 0; i < 3; i++) {
        if (grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i] && grid[0][i] !== undefined && grid[1][i] !== undefined && grid[2][i] !== undefined) {
            console.log("vertical won");
            return true;
        }
    }
    // Check diagonal
    if ((grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] || grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0]) && grid[1][1] !== undefined) {
        console.log("diagonal won");
        return true;
    }
    // Check tie game
    let tieGame = true;
    for (let i = 0; i < 3; i++) {
        for (let x = 0; x < 3; x++) {
            if (grid[i][x] == null && grid[i][x] == undefined) {
                tieGame = false;
            }
        }
    }
    if (tieGame == true) {
        endgame(0);
    }
    return false;
}

function checkLegalMove(row, column) {
    console.log(grid[row][column]);
    if (grid[row][column] !== undefined && grid[row][column] !== null) {
        return false;
    } else {
        return true;
    }
}

function endgame(num) {
    if (num == 0) {
        $(".modal_text").html("Tie game!");
    }
    if (num == 1) {
        $(".modal_text").html("Player X Wins!");
    }
    if (num == 2) {
        $(".modal_text").html("Player O Wins!");
    }
    $("#myModal").css("display", "block");
    // Blurs the background when the modal pops up
    $("table").css("filter", "blur(8px)");
}

$("#restartBtn").click(function() {
    grid = new Array(3).fill(null).map(() => new Array(3).fill(null));
    player = 0;
    $("#square_one_text").html("");
    $("#square_two_text").html("");
    $("#square_three_text").html("");
    $("#square_four_text").html("");
    $("#square_five_text").html("");
    $("#square_six_text").html("");
    $("#square_seven_text").html("");
    $("#square_eight_text").html("");
    $("#square_nine_text").html("");
    modal.style.display = "none";
    // Remove filter property after game reset
    $("table").css("filter", "");
});
$("#restartBtn").click(function() {
    // 게임 판(grid) 초기화
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid[i][j] = undefined;
        }
    }

    player = 0; // 플레이어 초기화
    gameWon = 0; // 게임 승리 여부 초기화

    // 게임 보드의 텍스트 초기화
    $(".text").html("");

    modal.style.display = "none"; // 모달 숨기기

    // 게임 재시작 후 배경 필터 제거
    $("table").css("filter", "");
});
