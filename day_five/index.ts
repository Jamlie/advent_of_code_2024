const file = Bun.file("data.txt");
const input = await file.text();

function findMiddleSum(
    part: "part_one" | "part_two",
): (input: string) => number {
    return (input: string) => {
        const [rulesSection, updatesSection] = input.trim().split("\n\n");

        const rules = rulesSection
            .split("\n")
            .map((rule) => rule.split("|").map(Number));

        const updates = updatesSection
            .split("\n")
            .map((rule) => rule.split(",").map(Number));

        const rulesGraph: Map<number, Set<number>> = new Map();

        for (const [pageIndex, producedByUpdate] of rules) {
            if (!rulesGraph.has(pageIndex)) {
                rulesGraph.set(pageIndex, new Set());
            }
            rulesGraph.get(pageIndex)!.add(producedByUpdate);
        }

        function isValidOrder(update: number[]): boolean {
            const updateMap = new Map<number, number>();
            update.forEach((page, index) => updateMap.set(page, index));

            for (const [pageNumber, producedByUpdate] of rules) {
                if (
                    updateMap.has(pageNumber) &&
                    updateMap.has(producedByUpdate)
                ) {
                    if (
                        updateMap.get(pageNumber)! >=
                        updateMap.get(producedByUpdate)!
                    ) {
                        return false;
                    }
                }
            }

            return true;
        }

        function getMiddleValue(update: number[]): number {
            return update[Math.floor(update.length / 2)];
        }

        let sum = 0;

        for (const update of updates) {
            if (part === "part_one" && isValidOrder(update)) {
                sum += getMiddleValue(update);
            } else if (part === "part_two") {
                if (isValidOrder(update)) {
                    continue;
                }

                update.sort((a, b) => (rulesGraph.get(a)?.has(b) ? -1 : 1));

                if (isValidOrder(update)) {
                    sum += getMiddleValue(update);
                }
            }
        }

        return sum;
    };
}

console.log(findMiddleSum("part_one")(input));
console.log(findMiddleSum("part_two")(input));
