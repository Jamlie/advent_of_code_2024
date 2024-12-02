import { stringArrayToIntArray } from "../utils/utils.ts";

const content = await Deno.readTextFile("data.txt");

const firstColumnStr = content.split("\n").map((row) => row.split(/\s+/)[0]);
const secondColumnStr = content.split("\n").map((row) => row.split(/\s+/)[1]);

const firstColumn = stringArrayToIntArray(firstColumnStr).sort();
const secondColumn = stringArrayToIntArray(secondColumnStr).sort();

function firstPart() {
  const result: number[] = firstColumn.map((v, i) =>
    Math.abs(v - secondColumn[i]),
  );

  console.log(result.reduce((a, b) => a + b, 0));
}

function secondPart() {
  const secondColumnOccurrences = new Map<number, number>();

  secondColumn.forEach((v) => {
    secondColumnOccurrences.set(v, (secondColumnOccurrences.get(v) || 0) + 1);
  });

  let similarityScore = 0;
  firstColumn.forEach((v) => {
    const occurrences = secondColumnOccurrences.get(v) || 0;
    similarityScore += v * occurrences;
  });

  console.log(similarityScore);
}

firstPart();
secondPart();
