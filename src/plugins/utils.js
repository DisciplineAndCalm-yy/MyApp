export const getLocalTime = function (timestamp) {
    if (timestamp) {
      var date = new Date(timestamp.time);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate();
      return Y + M + D;
    }
  }
  
  export const delayed = function (time) {
    return new Promise((r) => {
      setTimeout(() => {
        r(true)
      }, time)
    })
  }

  export const binaryInsertionSort = function (array) {
    for (var i = 1; i < array.length; i++) {
      var key = array[i],
        left = 0,
        right = i - 1;
      while (left <= right) {
        var middle = parseInt((left + right) / 2);
        if (key < array[middle]) {
          right = middle - 1;
        } else {
          left = middle + 1;
        }
      }
      for (var j = i - 1; j >= left; j--) {
        array[j + 1] = array[j];
      }
      array[left] = key;
    }
    return array;
  }
  
  export const videoDimensions = function (video) {
    // Ratio of the video's intrisic dimensions
    var videoRatio = video.videoWidth / video.videoHeight;
    // The width and height of the video element
    var width = video.offsetWidth,
      height = video.offsetHeight;
    // The ratio of the element's width to its height
    var elementRatio = width / height;
    // If the video element is short and wide
    if (elementRatio > videoRatio) width = height * videoRatio;
    // It must be tall and thin, or exactly equal to the original ratio
    else height = width / videoRatio;
    return {
      width: width,
      height: height
    };
  }