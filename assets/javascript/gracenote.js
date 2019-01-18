// Declaring variables to use for the api call. Will wrap all of this in a function and pass arguments based on input provided
function getMovies(lat, lng, timeTokill) {
    let apikey = "nkpdkxcq96bpkunwvw22bxdd";
    let date = moment().format("YYYY-MM-DD"); // setting the date for the current day
    let queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&lat=" + lat + "&lng=" + lng + "&radius=" + 5 + "&api_key=" + apikey;

    // api call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Pulls info for the first 5 local theaters returned provided they have a showtime later than the current time.
        for (let g = 0; g < response.length; g++) {

            // delcaring variables for relevant movie information
            let title = response[g].title;
            let firstShowTime = response[g].showtimes[0];
            let showDate = firstShowTime["dateTime"];
            let theater = firstShowTime["theatre"]["name"];
            let description = response[g]["shortDescription"];
            let runTime = response[g]["runTime"];
            let ticketURL = firstShowTime["ticketURI"];
            let runTimeArray = [];
            let killTime = timeTokill;

            // parse out movie run time and push to runTimeArray to get relevant information
            runTimeArray.push(runTime.split(""));

            // convert hours and minutes into minutes to be used to calculate movie time availability
            let runTimeMath = ((parseInt(runTimeArray[0][3]) * 60) + (parseInt(runTimeArray[0][5]) * 10) + (parseInt(runTimeArray[0][6])));

            // Only display information if the movie is happening after the current time
            if (moment(showDate) > moment() && moment().utc().add(killTime, "h") > moment(showDate).utc().add(runTimeMath, "m") && (title !== undefined)) {

                let displayRunTime = runTimeArray[0][3] + " hrs " + runTimeArray[0][5] + runTimeArray[0][6] + " mins"

                // append information to the appropriate card
                let movieResults = (`
                <h3><b>Title: </b>${title}</h3>
                <h4><b>Description: </b>${description}</h4>
                <h4><b>Theater: </b>${theater}</h4>
                <h4><b>Show Time: </b>${moment(showDate).format("h:mma")}</h4>
                <h4><b>Run Time: </b>${displayRunTime}</h4>
                <h4><b>Purchase Tickets: </b></h4><a href="${ticketURL}" target="_blank">${ticketURL}</a>
                `)
                $("#resultsList").append(`
                <div class=“row center”>
                    <div class=“content col s12">
                        <div class=“card-panel teal lighten-4”>
                <span class=“black-text”>${movieResults}</span>
                        </div>
                    </div>
                </div>
                `);
            }
        }
        // Error message should something go wrong with the api call.
    }).catch(function (event) {
        $(".gracenotesResults").prepend(`
    <div class="errorMessage">
        <p>Uh oh....something's not quite right. Try again later</p>
        <img src='https://media2.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy-downsized.gif'/>
    </div>
    `);
    })
};

navigator.geolocation.getCurrentPosition(function (position) {
    let lat = "";
    let lng = "";
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    getMovies(lat, lng)
});

