import { stringArrayToIntArray } from "../utils/utils.ts";

const content = await Deno.readTextFile("data.txt");

function partOne() {
  const cppOrRust = {
    rust: 0,
    cpp: 0,
  };

  content
    .trim()
    .split("\n")
    .forEach((row) => {
      const processedRow = stringArrayToIntArray(row.split(" "));

      if (isRowSafe(processedRow)) {
        cppOrRust.rust++;
      } else {
        cppOrRust.cpp++;
      }
    });

  console.log(cppOrRust);
}

function partTwo() {
  const cppOrRust = {
    rust: 0,
    cpp: 0,
  };

  content
    .trim()
    .split("\n")
    .forEach((row) => {
      const processedRow = stringArrayToIntArray(row.split(" "));

      if (isRowSafe(processedRow)) {
        cppOrRust.rust++;
        return;
      }

      let safeMaker = false;
      for (let i = 0; i < processedRow.length; i++) {
        const modifiedRow = [...processedRow];
        modifiedRow.splice(i, 1);

        if (isRowSafe(modifiedRow)) {
          safeMaker = true;
          break;
        }
      }

      if (safeMaker) {
        cppOrRust.rust++;
      } else {
        cppOrRust.cpp++;
      }
    });

  console.log(cppOrRust);
}

partTwo();

function isRowSafe(processedRow: number[]) {
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 0; i < processedRow.length - 1; i++) {
    const diff = processedRow[i] - processedRow[i + 1];

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }

    if (diff > 0) {
      isDecreasing = false;
    } else if (diff < 0) {
      isIncreasing = false;
    }
  }

  return isDecreasing || isIncreasing;
}
