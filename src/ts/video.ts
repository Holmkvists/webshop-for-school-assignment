// export function delayVideoPlay() {
//   let video: HTMLVideoElement = document.getElementById(
//     "video"
//   ) as HTMLVideoElement;
//   let beforeVideoImage = document.getElementById("beforeVideoImage");
//   let afterVideoText = document.getElementById("afterVideoText");
//   let videoTextContainer = document.getElementById("videoTextContainer");

//   let seconds = 5;
//   let playTimeout = setTimeout(function () {
//     beforeVideoImage.style.display = "none";
//     videoTextContainer.style.backgroundColor = "transparent";
//     video.play();
//   }, seconds * 1000);

//   beforeVideoImage.addEventListener("click", function () {
//     clearTimeout(playTimeout);
//     beforeVideoImage.style.display = "none";
//     video.play();
//   });

//   video.addEventListener("ended", function () {
//     afterVideoText.classList.remove("d-none");
//   });
// }
