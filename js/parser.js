let ag1 = '{"latestnews":[{"title":"title 1","Content":"content 1","rating":"5/10","datetime":"Mon, 14 Dec 2020 2:01:59 +0000","author":"ag1"},{"title":"title 2 ","Content":"content 2 ","rating":"9/10","datetime":"Mon, 14 Dec 2020 14:02:59 +0000","author":"ag1"},{"title":"title 3 ","Content":"content 3","rating":"2/10","datetime":"Mon, 14 Dec 2020 6:04:59 +0000","author":"ag1"}]}';
let ag2 = '{"latestnews":[{"title":"title 4","Content":"content 4","rating":"3/10","datetime":"Mon, 14 Dec 2020 13:01:59 +0000","author":"ag2"},{"title":"title 5","Content":"content 5","rating":"9/10","datetime":"Mon, 14 Dec 2020 00:02:59 +0000","author":"ag2"},{"title":"title 6","Content":"content 6","rating":"6/10","datetime":"Mon, 14 Dec 2020 0:00:00 +0000","author":"ag2"}]}';
let ag3 = '{"latestnews":[{"title":"title 7","Content":"content 7","rating":"6/10","datetime":"Mon, 14 Dec 2020 08:01:59 +0000","author":"ag3"},{"title":"title 8 ","Content":"content 8","rating":"8/10","datetime":"Mon, 14 Dec 2020 03:02:59 +0000","author":"ag3"},{"title":"title 9","Content":"content 9","rating":"1/10","datetime":"Mon, 14 Dec 2020 12:00:00 +0000","author":"ag3"}]}';
/* Here I am, trying to work on only one array so I used the string methods to concat these 3 JSON Responses togther*/
let parsedJson1 = JSON.parse(ag1, ag2, ag3);
let parsedJson2 = JSON.parse(ag2);
let parsedJson3 = JSON.parse(ag3);

parsedJson1.latestnews = parsedJson1.latestnews.concat(parsedJson2.latestnews.concat(parsedJson3.latestnews));
const arr = Array.from(parsedJson1.latestnews);
let tempArr = parsedJson1.latestnews;
createContent(parsedJson1.latestnews);

// let parsedResponse = JSON.parse("")
let eventA = document.getElementById('sortBy');
eventA.addEventListener('change', function () {
	let value = this.value;
	if (value === "Ratings ascending Order") {
		document.querySelector("#newshandler").innerHTML = "";
		createContent(parsedJson1.latestnews.sort(function (a, b) {
			return parseFloat(a["rating"]) - parseFloat(b["rating"]);
		}));

	}
	if (value === "Ratings descending Order") {
		document.querySelector("#newshandler").innerHTML = "";
		createContent(parsedJson1.latestnews.sort(function (a, b) {
			return parseFloat(b["rating"]) - parseFloat(a["rating"]);
		}));

	}
	if (value === "Most Recent") {
		document.querySelector("#newshandler").innerHTML = "";
		createContent(parsedJson1.latestnews.sort(function (a, b) {
			return new Date(b.datetime) - new Date(a.datetime);
		}));

	}
	if (value === "Most Old") {
		document.querySelector("#newshandler").innerHTML = "";
		createContent(parsedJson1.latestnews.sort(function (a, b) {
			return new Date(a.datetime) - new Date(b.datetime);
		}));

	}
}, false);

let eventB = document.getElementById("reset");
eventB.addEventListener('click', function () {
	document.querySelector("#newshandler").innerHTML = "";
	createContent(arr);
}, false);

function createContent(arg) {

	for (i of arg) {
		let innerHTMl = `<h2>${i["title"]}</h2><p> Content: ${i["Content"]}</p><p>rating: ${i["rating"]}</p><p>datetime: ${i["datetime"]} </p><p>author: ${i["author"]}</p>`;
		let newshandler = document.querySelector('#newshandler');
		let fragment = new DocumentFragment();
		let createdDiv = document.createElement('div');
		createdDiv.innerHTML = innerHTMl;
		fragment.appendChild(createdDiv);
		newshandler.appendChild(fragment);
	}
}