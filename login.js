function renderView(){
  const bodyHtml = setView(); 
  $('body').html(bodyHtml);
}

function clickOnIcon () {
  $('.overlay').on('click', 'img', function (event) {
    window.location=`https://accounts.spotify.com/authorize?client_id=40fb8cf91894461186ea39861c0c1710&response_type=code&redirect_uri=http://127.0.0.1:5500/index.html&scope=user-top-read&show_dialog=true`;
    STORE.view = 'app';
    console.log(STORE.view);
    renderView();
  })
}


function setView(){
  if (STORE.view === 'login'){
    return `
    <div class="overlay">
      <h1>Login with Spotify!</h1>
      <img class="spotify-img" src="images/spotify.png" alt="">
      <button class="notUsingSpot">No Thanks</button>
    </div>
    `
  }
  return `
  <main role="main" class="site">

  <span id="playListOpen" onclick="openNav()">☰ music</span>

  <section>
      <h2 class="le-projects"><img src="images/logo.png"></img>

        <!--this is the CLOUD anim svg-->
      <svg class="clouds" preserveAspectRatio="xMidYMid" viewBox="0 0 100 100" width="100%"
        xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0 18)">
          <path ng-attr-fill="{{config.c1}}"
            d="M53.2,30.3c0.4-1.3,0.6-2.7,0.6-4.2c0-1.2-0.1-2.3-0.4-3.4c-1.5-6-7-10.5-13.5-10.5 c-5.3,0-9.9,3-12.3,7.4c-0.9-0.3-1.8-0.4-2.8-0.4c-5.1,0-9.3,4.1-9.3,9.3c0,0.6,0.1,1.3,0.2,1.9c-4.7,0.7-8.3,4.8-8.3,9.7 c0,5.4,4.4,9.8,9.8,9.8h34.2c3.8,0,7.1-2.2,8.8-5.4c0.7-1.3,1.1-2.9,1.1-4.5C61.4,35.2,57.8,31.1,53.2,30.3z"
            fill="rgba(71.4657258064516%,71.4657258064516%,71.4657258064516%,0.513)"
            transform="translate(2.74606 0)">
            <animateTransform attributeName="transform" type="translate" values="-3 0;3 0;-3 0" keyTimes="0;0.5;1"
              ng-attr-dur="{{config.speed1}}" repeatCount="indefinite" calcMode="spline"
              keySplines="0.5 0 0.5 1;0.5 0 0.5 1" dur="5">
            </animateTransform>
          </path>

          <defs>
            <path id="cpp"
              d="M0,0v100h100V0H0z M62.9,44.4c-1.7,3.4-5.3,5.8-9.4,5.8H17c-5.8,0-10.5-4.7-10.5-10.5 c0-5.2,3.8-9.6,8.9-10.4c-0.1-0.6-0.2-1.3-0.2-2c0-5.5,4.4-9.9,9.9-9.9c1,0,2,0.2,3,0.5c2.5-4.7,7.4-7.9,13.1-7.9 c6.9,0,12.8,4.8,14.4,11.2c0.3,1.2,0.4,2.4,0.4,3.6c0,1.6-0.2,3.1-0.7,4.5c5,0.8,8.7,5.2,8.7,10.3C64,41.3,63.6,43,62.9,44.4z"
              transform="translate(2.74606 0)">
              <animateTransform attributeName="transform" type="translate" values="-3 0;3 0;-3 0"
                keyTimes="0;0.5;1" ng-attr-dur="{{config.speed1}}" repeatCount="indefinite" calcMode="spline"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1" dur="5">
              </animateTransform>
            </path>

            <clipPath id="cp">
              <use href="#cpp">
              </use>
            </clipPath>
          </defs>

          <g clip-path="url(#cp)">
            <path ng-attr-fill="{{config.c2}}"
              d="M84.9,28.9c0.4-1.1,0.6-2.3,0.6-3.5c0-1-0.1-1.9-0.4-2.8 c-1.3-5-6.1-8.7-11.8-8.7c-4.6,0-8.7,2.5-10.7,6.1c-0.8-0.2-1.6-0.4-2.4-0.4c-4.5,0-8.1,3.4-8.1,7.6c0,0.5,0.1,1,0.2,1.5 c-4.1,0.6-7.2,4-7.2,8c0,4.5,3.8,8.1,8.6,8.1h29.8c3.3,0,6.2-1.8,7.7-4.4c0.6-1.1,0.9-2.3,0.9-3.7C92,32.9,88.9,29.6,84.9,28.9z"
              fill="rgba(88.23991935483872%,88.23991935483872%,88.23991935483872%,0.672)"
              transform="translate(-0.804338 0)">
              <animateTransform attributeName="transform" type="translate" values="-3 0;3 0;-3 0"
                keyTimes="0;0.5;1" ng-attr-dur="{{config.speed2}}" repeatCount="indefinite" calcMode="spline"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1" dur="3.3000000000000003">
              </animateTransform>
            </path>
          </g>
        </g>
      </svg>
</h2>

<div class="formContainer">

  <form id="js-form">
      <label for="search-term">Enter Location</label>
      <input type="text" name="search-term" id="js-location" required>

      <input class="goButton" type="submit" value="Go!">
  </form>
  <button class="pageLogin" onclick="loginSpot()">Login with Spotify</button>
  <p id="js-error-message" class="error-message"></p>

</div>
<container class="screens">
      <p>Enter your location in the bar above to receive a playlist for your current weather and a list of recommended activities and local services!</p>
      <!-- <div class="slider hidden"></div> -->
    
</container>
<container class="food-delivery"></container>
      
<hr>
<footer role="contentinfo">
      <ul>
          <li>powered by:<a href="https://www.apixu.com/" title="Free Weather API"><img class="footerImage" src='//cdn.apixu.com/v4/images/apixu-logo-1.png' alt="Weather data by Apixu.com"></a>
          </li>
      </ul>

  </footer>


  </section>
 
      

</main>

</footer>

  `
}

function displayPage(){
  renderView();
  clickOnIcon();
}

$(displayPage());