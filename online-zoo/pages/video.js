const videoElem = document.querySelectorAll('.video_screen');
const videoRow = document.querySelector('.video_row');
const videoInCarousel = document.querySelectorAll('.video_row_screen');
const likeButton = document.querySelector('.like_button');
const heart = document.querySelector('.like_heart');
const mainVideo = document.querySelector('.video_screen_big');

let videos = Array.from(videoElem).map(video => {
    return {
        name: video.classList[1],
        link: video.childNodes[1].src,
        like: false
    }
});
console.log(videos);

likeButton.addEventListener('click', (e) => {
    heart.classList.toggle('like_heart_fill');
    videos.map(video => {
        if (video.name === 'video_screen_big') {
            if (video.like) {
                video.like = false;
            } else {
                video.like = true;
            }
        }
        return video;
    })
});

videoRow.addEventListener('click', handleVideoChange);
videoRow.addEventListener('touchstart', handleVideoChange);

function handleVideoChange(e) {
    console.log(e.touches);
    const elemName = e.path[1].classList[1];
    const link = e.path[1].childNodes[1].src;

    const prevLink = mainVideo.childNodes[1].src;

    const like = checkLike(link);

    checkElem(elemName, link, prevLink, like);
    
    mainVideo.childNodes[1].src = link;
     
    if(like.like){
        heart.classList.add('like_heart_fill');
    }else {
        heart.classList.remove('like_heart_fill');
    }

    const currVideos = Array.from(videoInCarousel);

    for (const video of currVideos) {
        if (video.childNodes[1].src === link) {
            video.childNodes[1].src = prevLink;
        }
    }
}

function checkElem(elem, link, prevLink, like) {
    
     for (const video of videos) {
         if (video.name === elem) {
             video.link = prevLink;
             video.like = like.prevLike;
         }

         if(video.name === "video_screen_big") {
             video.link = link;
             video.like = like.like;
         }
     }
     console.log(videos);
}

function checkLike(elem) {
    let like = false;
    let prevLike = false;
    
    for (const video of videos) {

        if(video.link === elem) {
            like = video.like;
        }

        if(video.name === "video_screen_big") {
            prevLike = video.like;
        }

    }

        return {like: like,
                prevLike: prevLike}
    }

