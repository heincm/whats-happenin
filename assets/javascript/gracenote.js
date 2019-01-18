// Declaring variables to use for the api call. Will wrap all of this in a function and pass arguments based on input provided
function getMovies(lattitude, longitude, timeTokill) {
    let lat = lattitude;
    let lng = longitude;
    let apikey = "nkpdkxcq96bpkunwvw22bxdd";
    let date = moment().format("YYYY-MM-DD"); // setting the date for the current day
    let queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&lat=" + lat + "&lng=" + lng + "&radius=" + 5 + "&api_key=" + apikey;

    // api call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Pulls info for all local theaters returned within 5 miles provided they have a showtime later than the current time.
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
            let displayMessage = "Click to purchase tickets to this show";

            // parse out movie run time and push to runTimeArray to get relevant information
            runTimeArray.push(runTime.split(""));

            // convert hours and minutes into minutes to be used to calculate movie time availability
            let runTimeMath = ((parseInt(runTimeArray[0][3]) * 60) + (parseInt(runTimeArray[0][5]) * 10) + (parseInt(runTimeArray[0][6])));

            // Only display information if the movie is happening after the current time
            if (moment(showDate) > moment() && moment().utc().add(killTime, "h") > moment(showDate).utc().add(runTimeMath, "m") && (title !== undefined)) {

                let displayRunTime = runTimeArray[0][3] + " hrs " + runTimeArray[0][5] + runTimeArray[0][6] + " mins"

                // handle cases where there is no URL to purchae tickets
                if (ticketURL === undefined) {
                    displayMessage = "Sorry, there is no link to purchase tickets for this movie";
                    ticketURL = "";
                }

                // define what will be displayed on the page
                let movieResults = (`
                <h5><b>Title: </b>${title}</h5>
                <h6><b>Description: </b>${description}</h6>
                <h6><b>Theater: </b>${theater}</h6>
                <h6><b>Show Time: </b>${moment(showDate).format("h:mma")}</h6>
                <h6><b>Run Time: </b>${displayRunTime}</h6>
                <h6><b>Purchase Tickets: </b></h6><a href="${ticketURL}" target="_blank">${displayMessage}</a>
                `);

                // append information to the appropriate card
                $("#resultsList").append(`
                <div class='row center'>
                    <div class='content col s12'>
                        <div class='card-panel teal lighten-4'>
                <span class='black-text'>${movieResults}</span>
                        </div>
                    </div>
                </div>
                `);
            }
        }
        // Error message should something go wrong with the api call.
    }).catch(function (event) {
        $("#resultsList").prepend(`
    <div class="errorMessage">
        <p>Uh oh....something's not quite right. Try again later</p>
        <img src='https://media2.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy-downsized.gif'/>
    </div>
    `);
    })
};