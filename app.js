//***** DOM selection *****/
const videosContainerMain = document.getElementById("videos-container");
const searchInput = document.getElementById("search-input");
const clearBtn = document.getElementById("clear-btn");

//***** variable declartion *****/
let allVideos = [];

//***** funtion declaration *****/

async function fetchAllVideos() {
  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/public/youtube/videos"
    );

    if (!response.ok) {
      alert("Error while fetching videos");
    }

    const { data } = await response.json();

    allVideos = data.data;
    allVideos.forEach((video) => {
      renderVideo(video);
    });
  } catch (error) {
    alert(error.message);
  }
}

function renderVideo(video) {
  //creating variable
  const thumbnailUrl = video.items.snippet.thumbnails.maxres.url;
  const videoUrl = `https://www.youtube.com/watch?v=${video.items.id}`;
  const title = video.items.snippet.title;
  const channelName = video.items.snippet.channelTitle;
  const viewCount = convertViews(video.items.statistics.viewCount);
  const publishedAt = convertTime(video.items.snippet.publishedAt);

  //creating element
  const videoHolder = document.createElement("a");
  videoHolder.className = "video-holder";
  videoHolder.setAttribute("href", videoUrl);
  videoHolder.setAttribute("target", "_blank");

  //setting attribute
  const thumbnailHolder = document.createElement("div");
  thumbnailHolder.className = "video-thumnail-holder";
  const thumbnail = document.createElement("img");
  thumbnail.className = "video-thumbnail";
  thumbnail.src = thumbnailUrl;
  thumbnail.alt = "";
  thumbnailHolder.appendChild(thumbnail);

  const detailHolder = document.createElement("div");
  detailHolder.className = "video-detail-holder";
  detailHolder.innerHTML = `
    <div class="user-image-holder">
      <img class="user-image" src="./assets/images/hitesh-sir.png" alt="" />
    </div>
    <div class="video-details">
      <p class="video-title">${title}</p>
      <div class="video-channel-and-detail">
        <p class="video-channel-name">${channelName}</p>
        <div class="class-reviews-holder">
          <p class="views-count">${viewCount} views</p>
          <p class="time">${publishedAt}</p>
        </div>
      </div>
    </div>
  `;

  videoHolder.appendChild(thumbnailHolder);
  videoHolder.appendChild(detailHolder);

  videosContainerMain.appendChild(videoHolder);
}

//to find the video and render it
function searchVideo(input) {
  console.log(input, "in");
  const videos = allVideos.filter((vid) =>
    vid.items.snippet.title.toLowerCase().includes(input.toLowerCase())
  );

  console.log(videos);

  videosContainerMain.innerHTML = "";

  videos.forEach((video) => {
    renderVideo(video);
  });
}

//clear input value
function clearInput() {
  searchInput.value = "";
  allVideos.forEach((vid) => renderVideo(vid));
}

//to convert time day, month,year format
function convertTime(time) {
  const now = new Date();
  const publishedTime = new Date(time);

  let timeIs = "";

  const differenceInMilliecond = (now - publishedTime).toFixed(0);

  if (differenceInMilliecond > 31556952000) {
    time = `${Math.ceil(differenceInMilliecond / 3131556952000)} year ago`;
  } else if (differenceInMilliecond > 2629746000) {
    time = `${Math.ceil(differenceInMilliecond / 2629746000)} month ago`;
  } else if (differenceInMilliecond > 604800000) {
    time = `${Math.ceil(differenceInMilliecond / 604800000)} week ago`;
  } else {
    `${Math.ceil(differenceInMilliecond / 86400000)} days ago`;
  }
  return time;
}

//to convert view in k,m,b format
function convertViews(view) {
  let viewIs = "";

  if (view > 100000) {
    view = `${(view / 1000000).toFixed(2)}m`;
  } else if (view > 1000) {
    view = `${(view / 1000).toFixed(2)}k`;
  } else {
    viewIs = view;
  }
  return view;
}

//make any funtion a debounce funtion ;delay = second
function functionDebouncer(cb, delay) {
  let id = null;
  return function (...args) {
    clearTimeout(id);

    id = setTimeout(() => {
      cb.apply(this, args);
    }, delay * 1000);
  };
}

const debounceSearchVideo = functionDebouncer(searchVideo, 1);

fetchAllVideos();

//***** Assigning funtion to related element *****/

searchInput.addEventListener("input", (e) => {
  debounceSearchVideo(e.target.value);
});
clearBtn.addEventListener("click", clearInput);
