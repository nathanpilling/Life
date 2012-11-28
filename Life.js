(function () {
	// "use strict";

	var MAX_ROW = 20,
		MAX_COL = 60,
		makeZeroGrid = function () {
			var grid = [], row, col;
			for (row = 0; row < (MAX_ROW + 2); row += 1) {
				grid[row] = [];
				for (col = 0; col < (MAX_COL + 2); col += 1) {
					grid[row][col] = 0;
				}
			}
			return grid;
		},
		configuration = (function () {
			var grid = makeZeroGrid(),
				neighborCount = function (row, col) {
					var i, j, count = 0;
					for (i = (row - 1); i <= (row + 1); i += 1) {
						for (j = (col - 1); j <= (col + 1); j += 1) {
							count += grid[i][j];
						}
					}
					count -= grid[row][col];
					return count;
				},
				initialize = function () {
					grid[5][5] = 1;
					grid[5][6] = 1;
					grid[6][4] = 1;
					grid[6][5] = 1;
					grid[7][5] = 1;
				},
				print = function () {
					var row, col, line;
					console.log('\033[2J\033[0f');
					console.log('\nThe current Life configuration is:\n');
					for (row = 1; row <= MAX_ROW; row += 1) {
						line = '';
						for (col = 1; col <= MAX_COL; col += 1) {
							if (grid[row][col] === 1) {
								line += '*';
							} else {
								line += ' ';
							}
						}
						console.log(line);
					}
				},
				update = function () {
					var c, row, col, nextGrid = makeZeroGrid();
					for (row = 1; row <= MAX_ROW; row += 1) {
						for (col = 1; col <= MAX_COL; col += 1) {
							c = grid[row][col];
							switch (neighborCount(row, col)) {
							case 0:
							case 1:
								c = 0;
								break;
							case 2:
								break;
							case 3:
								c = 1;
								break;
							default:
								c = 0;
							}
							nextGrid[row][col] = c;
						}
					}
					for (row = 1; row <= MAX_ROW; row += 1) {
						for (col = 1; col <= MAX_COL; col += 1) {
							grid[row][col] = nextGrid[row][col];
						}
					}
				};

			return {
				"initialize": initialize,
				"print": print,
				"update": update
			};
		}()),
		user_says_yes = (function () {
			var MAX_YES = 100, yesCount = 0;
			return function () {
				yesCount += 1;
				if (yesCount <= MAX_YES) {
					return true;
				}
				return false;
			};
		}()),
		instructions = function () {

		};

	instructions();
	configuration.initialize();
	configuration.print();
	console.log("Continue viewing new generations? ");
	setInterval(function () {
		configuration.update();
		configuration.print();
	}, 1000);
}());
