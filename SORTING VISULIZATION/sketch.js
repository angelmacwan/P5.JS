let arr = [];
let w = 30;
let offset = w + 0.2;
let dataSize = 0;

// 0=nothing
// 1=active
// 2=swapped
// 9=SORTED

function setup() {
	createCanvas(window.innerWidth - 150, window.innerHeight - 150);

	dataSize = floor(width / offset) - 1;

	createNewArray();
}
function draw() {
	background(240);

	translate(0, height);

	noStroke();
	showArray();
}

function updateArray() {
	let arrLen = document.querySelector("#arrLen").value;
	w = ceil(arrLen);
	offset = w + 0.2;
	dataSize = floor(width / offset) - 1;
	console.log(dataSize);
	createNewArray();
}

function showArray() {
	let x = offset,
		y = 0;
	for (let i of arr) {
		if (i[0] == 0) fill(230, 57, 70);
		else if (i[0] == 1) fill(69, 123, 157);
		else if (i[0] == 2) fill(230, 57, 70);
		else if (i[0] == 9) fill(42, 157, 143);

		rect(x, y, w, -i[1]);
		x += offset;
	}
}

function createNewArray() {
	arr = [];
	for (let i = 0; i < dataSize; i++) {
		let num = floor(random(5, height));
		arr.push([0, num]);
	}
}

function BubbleSort() {
	let n = arr.length;

	let i = 0,
		j = 0;

	let loop = setInterval(function () {
		if (i > n - 1) {
			for (let i = 0; i < n; i++) {
				arr[i][0] = 9;
			}

			clearInterval(loop);
		}
		for (let j = 0; j < n - i - 1; j++) {
			arr[j][0] = 2;
			arr[j + 1][0] = 1;
			if (arr[j][1] > arr[j + 1][1]) {
				let temp = arr[j][1];
				arr[j][1] = arr[j + 1][1];
				arr[j + 1][1] = temp;
			}
		}
		i++;
	}, 30);
}

function SelectionSort() {
	let n = arr.length;

	let i = 0;

	let loop = setInterval(function () {
		if (i > n - 1) {
			for (let i = 0; i < n; i++) {
				arr[i][0] = 9;
			}
			clearInterval(loop);
		}

		let min_idx = i;
		for (let j = i + 1; j < n; j++) {
			arr[j][0] = 2;
			arr[min_idx][0] = 1;
			if (arr[j][1] < arr[min_idx][1]) min_idx = j;
		}

		// swap(&arr[min_idx], &arr[i]);
		let temp = arr[min_idx][1];
		arr[min_idx][1] = arr[i][1];
		arr[i][1] = temp;

		i++;
	}, 30);
}

function ShellSort() {
	alert("i got bored.....");
}
