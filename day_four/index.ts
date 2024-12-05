const file = Bun.file("data_test.txt");
const content = await file.text();

const contentArr = content.split("\n").map((row) => row.split(""));
contentArr.pop();

class Chrismas {
    private results: string[];
    constructor(private matrix: string[][]) {
        this.results = [];
    }

    partOne() {
        this.findHorizontally(this.matrix);
        this.searchVertically();
        this.searchDiagonally();

        return this.results.length;
    }

    partTwo() {
        this.findXShapedMAS();

        return this.results.length;
    }

    private findHorizontally(matrix: string[][]) {
        const wordsToFind = ["XMAS", "SAMX"];
        for (const row of matrix) {
            const rowString = row.join("");
            for (const word of wordsToFind) {
                this.results.push(...this.countOccurrences(rowString, word));
            }
        }
    }

    private countOccurrences(text: string, word: string): string[] {
        const findings = [];
        for (let i = 0; i <= text.length - word.length; i++) {
            if (text.slice(i, i + word.length) === word) {
                findings.push(word);
            }
        }
        return findings;
    }

    private searchVertically() {
        const transposed = this.moveMatrixCounterClockwise(this.matrix);
        this.findHorizontally(transposed);
    }

    private searchDiagonally() {
        const diagonals = this.getDiagonals();
        this.findHorizontally(diagonals);
    }

    private getDiagonals(): string[][] {
        const diagonals = [];
        const numRows = this.matrix.length;
        const numCols = this.matrix[0].length;

        for (let i = 0; i < numRows + numCols - 1; i++) {
            const diagonal = [];
            for (let row = 0; row < numRows; row++) {
                const col = i - row;
                if (col >= 0 && col < numCols) {
                    diagonal.push(this.matrix[row][col]);
                }
            }
            diagonals.push(diagonal);
        }

        for (let i = 0; i < numRows + numCols - 1; i++) {
            const diagonal = [];
            for (let row = 0; row < numRows; row++) {
                const col = i - (numRows - row - 1);
                if (col >= 0 && col < numCols) {
                    diagonal.push(this.matrix[row][col]);
                }
            }
            diagonals.push(diagonal);
        }

        return diagonals;
    }

    private moveMatrixCounterClockwise(matrix: string[][]) {
        return matrix[0].map((_, colIndex) =>
            matrix.map((row) => row[colIndex]),
        );
    }

    private findXShapedMAS() {
        const numRows = this.matrix.length;
        const numCols = this.matrix[0].length;
        const wordsToFind = ["MAS", "SAM"];

        for (let i = 1; i < numRows - 1; i++) {
            for (let j = 1; j < numCols - 1; j++) {
                const topLeft = this.checkDiagonal(
                    this.matrix,
                    i,
                    j,
                    -1,
                    -1,
                    wordsToFind,
                );
                const topRight = this.checkDiagonal(
                    this.matrix,
                    i,
                    j,
                    -1,
                    1,
                    wordsToFind,
                );
                const bottomLeft = this.checkDiagonal(
                    this.matrix,
                    i,
                    j,
                    1,
                    -1,
                    wordsToFind,
                );
                const bottomRight = this.checkDiagonal(
                    this.matrix,
                    i,
                    j,
                    1,
                    1,
                    wordsToFind,
                );

                if ((topLeft && bottomRight) || (topRight && bottomLeft)) {
                    this.results.push("X-MAS");
                }
            }
        }
    }

    private checkDiagonal(
        matrix: string[][],
        row: number,
        col: number,
        rowStep: number,
        colStep: number,
        wordsToFind: string[],
    ): boolean {
        const diagonal = [];
        for (let k = 0; k < 3; k++) {
            const r = row + k * rowStep;
            const c = col + k * colStep;
            if (r < 0 || r >= matrix.length || c < 0 || c >= matrix[0].length) {
                return false;
            }
            diagonal.push(matrix[r][c]);
        }
        const diagonalStr = diagonal.join("");
        return wordsToFind.includes(diagonalStr);
    }
}

function countXmasInXShape(contentArr: string[][]): number {
    const rows = contentArr.length;
    const cols = contentArr[0].length;
    let count = 0;

    // Directions for the diagonals of the "X" shape (top-left to bottom-right and bottom-left to top-right)
    const directions: [number, number][] = [
        [-1, -1], // top-left to bottom-right
        [1, 1], // bottom-left to top-right
        [-1, 1], // top-right to bottom-left
        [1, -1], // bottom-right to top-left
    ];

    // Iterate over every possible center of the X shape
    for (let i = 1; i < rows - 1; i++) {
        for (let j = 1; j < cols - 1; j++) {
            // For each direction, check if it forms an "X-MAS" shape
            for (const [dx, dy] of directions) {
                try {
                    // Check if we can form "MAS" in the specified direction or its reverse "SAM"
                    if (
                        contentArr[i + dx][j + dy] === "M" &&
                        contentArr[i][j] === "S" &&
                        contentArr[i - dx][j - dy] === "M"
                    ) {
                        count++;
                    }
                } catch (e) {
                    // Continue if out of bounds
                    continue;
                }
            }
        }
    }

    return count;
}

console.log(countXmasInXShape(contentArr));

// const chrismas = new Chrismas(contentArr);
// console.log(chrismas.partOne());
// console.log(chrismas.partTwo());
