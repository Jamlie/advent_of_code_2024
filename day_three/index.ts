const file = Bun.file("data.txt");
const content = (await file.text()).trim();

function partOne() {
    const matches = content.match(/mul\(\d+,\d+\)/g);

    const numbers = matches?.map((multiplication) => {
        return numberExtracter(multiplication);
    });

    const num = numbers?.map((nums) => {
        return nums.reduce((a, b) => a * b, 1);
    });

    console.log(num?.reduce((a, b) => a + b, 0));
}

function partTwo() {
    const matches = content.match(/(do|don't)\(\)|mul\(\d+,\d+\)/g);

    const numbersResult: number[][] = [];

    let isEnabled = true;

    matches?.forEach((str, i) => {
        if (i === 0 && str.startsWith("mul")) {
            const numbers = numberExtracter(str);
            if (numbers && numbers.length === 2) {
                numbersResult.push(numbers);
            }
            return;
        }

        if (str === "do()") {
            isEnabled = true;
        } else if (str === "don't()") {
            isEnabled = false;
        } else if (str.startsWith("mul") && isEnabled) {
            const numbers = numberExtracter(str);
            if (numbers && numbers.length === 2) {
                numbersResult.push(numbers);
            }
        }
    });

    const num = numbersResult.map((nums) => {
        return nums.reduce((a, b) => a * b, 1);
    });

    console.log(num?.reduce((a, b) => a + b, 0));
}

partOne();
partTwo();

function numberExtracter(regex: string): number[] {
    return regex.match(/\d+/g)?.map(Number) || [];
}
