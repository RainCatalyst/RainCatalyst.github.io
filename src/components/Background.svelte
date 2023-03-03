<script>
</script>

<!-- <div class="background bg-black"> -->
<!-- <div ckass="background"> -->
    <!-- <video autoplay loop muted id="reel" class="video">
        <source src="video/reel_games_hq.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video> -->
<!-- </div> -->

    <!-- <img src="img/background.png"> -->
<!-- </div> -->
<div class="video-container">
  <video autoplay muted loop>
    <source src="video/reel_games_hq.mp4" type="video/mp4">
  </video>
</div>
<style>
    .video-container {
        position: fixed;
        top: 0;
        left: 0;
        min-width: 100vw;
        min-height: 100vh;
        z-index: -10;
    }

    .video-container video {
        width: 100vw;
        height: 100vh;
        object-fit: cover;
    }
</style>