var MAX_ROW = 40, // 20
	MAX_COL = 150, // 60
	grid,
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
	neighborCount = function (row, col) {
		var i, j, count = 0;
		for (i = (row - 1); i <= (row + 1); i += 1) {
			for (j = (col - 1); j <= (col + 1); j += 1) {
				count += grid[i][j];
			}
		}
		count -= grid[row][col];
		return count;
	};

exports.initialize = function () {
	var row, col,
		getRandom = function (min, max) {
			// Returns a random integer between min and max
			// Using Math.round() will give you a non-uniform distribution!
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

	grid = makeZeroGrid();
	// grid[5][5] = 1;
	// grid[5][6] = 1;
	// grid[6][4] = 1;
	// grid[6][5] = 1;
	// grid[7][5] = 1;

	// grid[5][5] = 1;
	// grid[5][6] = 1;
	// grid[5][7] = 1;

	// grid[5][5] = 1;
	// grid[5][6] = 1;
	// grid[6][5] = 1;
	// grid[6][6] = 1;
	// grid[7][7] = 1;
	// grid[7][8] = 1;
	// grid[8][7] = 1;
	// grid[8][8] = 1;

	for (row = 1; row <= MAX_ROW; row += 1) {
		for (col = 1; col <= MAX_COL; col += 1) {
			grid[row][col] = getRandom(0, 1);
		}
	}
};

exports.print = function () {
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
};

exports.update = function () {
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
