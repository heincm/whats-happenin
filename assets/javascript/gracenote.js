// Delcaring variables to use for the api call. Will wrap all of this in a function and pass arguments based on input provided
let apikey = "nkpdkxcq96bpkunwvw22bxdd";
let date = moment().format("YYYY-MM-DD"); // setting the date for the current day
let zip = "30306"; // place holder zip code for now. Have to supply either zip code or coordinates for this api
let queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&zip=" + zip + "&radius=" + 5 + "&api_key=" + apikey;

// api call
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    
    // Pulls info for the first 5 local theaters returned provided they have a showtime later than the current time.
    for (let g = 0; g < 5; g++) {

        let title = response[g].title;
        let firstShowTime = response[g].showtimes[0];
        let showDate = firstShowTime["dateTime"];
        let theater = firstShowTime["theatre"]["name"];
        let description = response[g]["shortDescription"];
        let runTime = response[g]["runTime"];
        let ticketURL = firstShowTime["ticketURI"];
        let runTimeArray = [];

        // Only display information if the movie is happening after the current time
        if (moment(showDate) > moment() && (title !== undefined)) {
    
            runTimeArray.push(runTime.split(""));
            console.log(response);
            console.log("Title: " + title);
            console.log("Show Date: " + moment(showDate).format("h:mma"));
            console.log("Theater: " + theater);
            console.log("Description: " + description);

            // Provides a URL to purchase tickets (if one exists)
            if (ticketURL !== undefined) {
                console.log("Ticket URL " + ticketURL);

                // This message will display if the theater doesn't provide a URL to purchase tickets
            } else {
                console.log("Sorry, there's no link available to purchase tickets for this show. Please check with the theater for tickets");
            }
            console.log("Run Time: " + runTimeArray[0][3] + " hrs " + runTimeArray[0][5] + runTimeArray[0][6] + " mins")
        } 
    }
    // Error message should something go wrong with the api call. Prepends to the body for now until there is a div to place it in
}).catch(function (event) {
    $("body").prepend(`
    <div class="errorMessage">
        <p>Uh oh....something's not quite right. Try again later</p>
        <img src='https://media2.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy-downsized.gif'/>
    </div>
    `);
});