import timestamps from './data/timestamps.json' assert { type: "json" };
// const { timestamps } = data;

var link, comments, video, last_idx;
const FRAMERATE = 30;

window.onload = function(e){
    link = document.querySelector("#link");
    comments = document.querySelector("#comments");
    video = document.querySelector("#reel");
    setInterval(updateCaptions, 10);
}

function updateCaptions() {
    var idx = 0;
    var time = video.currentTime;

    for (var i = timestamps.length - 1; i >= 0; i--) {
        if (time > timestamps[i].time_s + timestamps[i].time_f / FRAMERATE) {
            idx = i;
            break;
        }
    }

    if (last_idx != idx) {
        last_idx = idx;
        link.href = timestamps[idx].link;
        link.innerHTML = timestamps[idx].title;
        comments.innerHTML = '(' + timestamps[idx].comments + ')';
    }
}