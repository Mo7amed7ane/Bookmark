var siteName = document.getElementById('bookMarkN');
var siteURL = document.getElementById('bookmarkURL');
var sumbitBtn = document.getElementById('submitBtn');
var tableContent = document.getElementById('tableContent')
var visitBtns;
var deleteBtns;

var bookMarks = [];

if (localStorage.getItem('bookmarksList'))
{
    bookMarks = JSON.parse(localStorage.getItem('bookmarksList'));
    for (var x = 0; x < bookMarks.length; x++) {
      displayBookmark(x);
      }
}



function displayBookmark(indexOfWebsite) {
  var userURL = bookMarks[indexOfWebsite].siteURL;
  var httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
      .split("")
      .splice(validURL.match(httpsRegex)[0].length)
      .join("");
  } else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
  }
}



var newBookmark = `
<tr>
    <td>${indexOfWebsite + 1}</td>
    <td>${bookMarks[indexOfWebsite].siteName}</td>
    <td><button class="btn btn-outline-warning btn-sm" data-index='${indexOfWebsite}'>visit</button></td>
    <td><button class="btn btn-outline-danger btn-sm"  data-index='${indexOfWebsite}'>Delete</button></td>
</tr>
`;
tableContent.innerHTML += newBookmark;




// function clearInput() {
//   siteName.value = "";
//   siteURL.value = "";
// }



sumbitBtn.addEventListener("click", function () {
  {
    var bookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value,
    };
    bookMarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookMarks.length - 1);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  }
});


deleteBtns = document.querySelectorAll(".btn-delete");
if (deleteBtns) {
  for (var j = 0; j < deleteBtns.length; j++) {
    deleteBtns[j].addEventListener("click", function (e) {
      deleteBookmark(e);
    });
  }
}



visitBtns = document.querySelectorAll(".btn-visit");
if (visitBtns) {
  for (var l = 0; l < visitBtns.length; l++) {
    visitBtns[l].addEventListener("click", function (e) {
      visitWebsite(e);
    });
  }
}





function deleteBookmark(e) {
  tableContent.innerHTML = "";
  var deletedIndex = e.target.dataset.index;
  bookMarks.splice(deletedIndex, 1);
  for (var k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}