'use strict';

const searchURL = 'https://api.apixu.com/v1/current.json'; //weather api base url endpoint

function formatQueryParams(parameters) {
  const queryItems = Object.keys(parameters)
    .map(key => `${key}=${parameters[key]}`);
  return queryItems.join('&');
}

async function getLocationWeather(query) {
  const weatherParams = {
    q: query,
    key: config.weatherApiKey
  };

  const queryString = formatQueryParams(weatherParams)
  const finalWeatherUrl = searchURL + '?' + queryString;

  try {
    const response = await fetch (finalWeatherUrl);
    const responseJson = await response.json();
//---------------------------------------------------------------------------------------------------------Playlist Title_start
    let iconVal = responseJson.current.condition.icon; //assigning the weather icon to the playlist header
    let textVal = responseJson.current.condition.text; //assigning the weather text to the playlist header
    $('#playListClimate').closest('img').attr('src',iconVal);
    $('#mySidenav').find('h4').text(`${textVal} Playlist`);
//---------------------------------------------------------------------------------------------------------Playlist Title_end
    STORE.weatherData = responseJson;
    displayLocation();
  }
  catch(err) {
    console.error(err);
  }
}

/*David ------------------------------------------------------------------------------------------------------------*/
function renderWeatherHtml(){

  let screenInjection = `
                          <div class="weatherApiInfo">
                            <div class="placeAndDate">
                              <h3>${STORE.weatherData.location.name}, ${STORE.weatherData.location.region}<h3>
                              <p>${STORE.weatherData.location.localtime}, <span>${STORE.weatherData.current.condition.text}</span> </p>
                            </div>
                            <div class="tempAndIcon">
                              <img src="${STORE.weatherData.current.condition.icon}">
                              <h2>${STORE.weatherData.current.temp_f}F</h2>
                            </div>  
                          </div>
                          `;

  return screenInjection;
}
/*David----------------------------------------------------------------------------------------------------------------------*/
function displayLocation () {
  const lat = STORE.weatherData.location.lat;
  const lon = STORE.weatherData.location.lon;
  const category = getYelpQueries();
  let limit = 4
  if (category.length > 2) {
    const term = `${category[0]},${category[2]}`;
    const searchValue =  `${category[1]},${category[3]}`
    let limit = 6;
    fetchYelp(lat, lon, searchValue, term, limit);
  } else {
    fetchYelp(lat, lon, category[0], category[1], limit);
  }
  
}

async function fetchYelp (latitude, longitude, categories, term, limit) {
  const param = {
    term,
    categories,
    limit,
    latitude,
    longitude
  }

  const yelpParam = formatQueryParams(param);
  const searchUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
  const yelpUrl = `${searchUrl}?${yelpParam}`;
  const authorization = {
    headers: new Headers({
      'Authorization': `Bearer ${config.yelpApiKey}`
    })
  }

  try {
    const response = await fetch(yelpUrl, authorization);
    const responseJson = await response.json();
<<<<<<< HEAD
    console.log(responseJson);
    console.log(`here you goooo ${responseJson.businesses.length}`);

    for(let i = 0; i< responseJson.businesses.length; i++ ){
      $('.screens').append(`<div class ="flexBoxish"><p>${responseJson.businesses[i].name}</p>
                          <img class="yelpImg" src="${responseJson.businesses[i].image_url}" >
                          </div>`); //This is just temporary

    }

    renderResult(responseJson);
=======
    STORE.yelpData = responseJson;
    displayResults();
>>>>>>> fb8b6c62c51f7e328219000aa497ee8cf79a026d
  }
  catch(err) {
    console.log(err);
  }
}

function displayFoodServices(){
  return `<div class ="food-delivery">
  <a href="https://grubhub.com" target="blank"><img class="food-delivery-image" src="images/grubhub.jpg" ></a>
  <a href="https://ubereats.com" target="blank"><img class="food-delivery-image" src="images/ubereats.png" ></a>
  </div>`;
}

function checkWeather(){
  if (STORE.weatherData.current.condition.code < 1010 && STORE.weatherData.current.temp_f > 38 && STORE.weatherData.current.is_day === 1){
    return 'good';
  } 
  if (STORE.weatherData.current.condition.code < 1010 && STORE.weatherData.current.is_day === 0){
    return 'good-night';
  }
  return 'bad';
}

function renderResults(){
  const weather = renderWeatherHtml();
  const title = displayTitle();
  const yelpResults = renderYelpResults();
  const foodServices = displayFoodServices();
  let html = ``;

  if (checkWeather() === 'good'){
    html = weather + title + yelpResults;
  } else if (checkWeather() === 'good-night'){
    html = weather + title + yelpResults;
  } else {
    html = weather + title + yelpResults + foodServices;
  }
  
  return html
}

function displayResults(){
  $('.screens').html((renderResults()));
}

<<<<<<< HEAD

function displayYelpStuff(someData){
  console.log(`here you goooo ${someData.businesses[0].alias}`);
  let yelpInjection = `<p>${someData.businesses[0].alias}</p>`;
=======
function getYelpQueries(){
  if (checkWeather() === 'good'){
    return ['parks', 'parks', 'food', 'food'];
  }
  if (checkWeather() === 'good-night'){
    return ['bars', 'bars'];
  }
  return ['coffee', 'coffee'];
}
>>>>>>> fb8b6c62c51f7e328219000aa497ee8cf79a026d

function displayTitle(){
  if (checkWeather() === 'good'){
    return `<h3>It's a nice day out, check out some local food or parks!</h3>`;
  }
  if (checkWeather() === 'good-night'){
    return `<h3>It's a clear night, how about checking out some of these local bars!</h3>`;
  }
  return `<h3>It's not so nice out, check out some of these local coffee shops or order food from these delivery services</h3>`;
}

function renderYelpResults() {
 let results = STORE.yelpData.businesses.map(i => (
  `<div class ="flexBoxish"><p>${i.name}</p>
  <img class="yelpImg" src="${i.image_url}" >
  </div>`));

  return results;
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const location = $('#js-location').val(); //taking user input and assigning to "location" variable
    getLocationWeather(location); //calling the getLocationWeather and passing user's location in
  });
}

$(watchForm);
<<<<<<< HEAD




/*David--------------------------------------------------------------------------------------------------------------------------------------*/
// let appTitle = $('.le-projects'); //This code cycles through the RBB values of the shadow-text changing their colors over time

//         function runColorsAnm(){
//
//         $({'r':27,'g':213,'b':255, }).animate({'r':31,'g':255,'b':69},{queue:false,duration:3000, easing:'swing',
//           step: function(now) {
//             appTitle.css('text-shadow', '0 0 9px rgb('+this.r+','+this.g+','+this.b+')');

//           }, complete:function(){
//             $({'r':31,'g':255,'b':69}).animate({'r':255,'g':15,'b':15},{queue:false,duration:3000, easing:'swing',
//               step: function(now) {
//                   appTitle.css('text-shadow', '0 0 9px rgb('+this.r+','+this.g+','+this.b+')');

//               }, complete:function(){
//                 $({'r':255,'g':15,'b':15}).animate({'r':255,'g':15,'b':248},{queue:false,duration:3000, easing:'swing',
//                   step: function(now) {
//                       appTitle.css('text-shadow', '0 0 9px rgb('+this.r+','+this.g+','+this.b+')');

//                   }, complete:function(){
//                       //loop here
//                       console.log('restart');
//                       runColorsAnm();
//                   } //NEXT-SUB-SEQUENCE-.
//                 });
//               } //NEXT-SUB-SEQUENCE-.
//             });
//           } //NEXT-SUB-SEQUENCE-.
//         });

//         };//endloop

//         runColorsAnm(); //iife immediately invoked function event
=======
>>>>>>> fb8b6c62c51f7e328219000aa497ee8cf79a026d
