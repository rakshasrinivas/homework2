var DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]";
var DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role=\"trigger\"]";
var ARROW_CLICK_RIGHT = "[seeker-type=\"right\"]";
var ARROW_CLICK_LEFT = "[seeker-type=\"left\"]";

function getImageTitle() {
  "use strict";
  return document.querySelector(DETAIL_TITLE_SELECTOR);
}


function changeImg() {
  var lArrow = document.querySelector(ARROW_CLICK_LEFT);
  var rArrow = document.querySelector(ARROW_CLICK_RIGHT);
  var pos = null;
  var arr = getThumbnailsArray();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].getAttribute("data-image-title") == getImageTitle().textContent) {
      pos = i;
    }

  }
  lArrow.addEventListener("click", function() {
    pos--;
    if (pos < 0) {
      pos = arr.length - 1;
    }
    setDetails(arr[pos].getAttribute("data-image-url")), (arr[pos].getAttribute("data-image-title"));

  });
  rArrow.addEventListener("click", function() {
    pos++;
    if (pos > arr.length - 1) {
      pos = 0;
    }
    setDetails(arr[pos].getAttribute("data-image-url"), arr[pos].getAttribute("data-image-title"));

  });

}

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
  alert(titleText);
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}
initializeEvents();
changeImg();
