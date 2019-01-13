
// delcaring variables to use for the api call. Will wrap all of this in a function and pass arguments based on input provided
let apikey = "nkpdkxcq96bpkunwvw22bxdd";
let date = moment().format("YYYY-MM-DD"); // setting the date for the current day
let zip = "30306"; // place holder zip code for now. Have to supply either zip code or coordinates for this api
let queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&zip=" + zip + "&radius=" + 5 + "&api_key=" + apikey;

// api call
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    for (let g = 0; g < 5; g++) {

        let title = response[g].title;
        let firstShowTime = response[g].showtimes[0];
        let showtimes = firstShowTime["dateTime"];
        let theater = firstShowTime["theatre"]["name"];
        let description = response[g]["shortDescription"];
        let runTime = response[g]["runTime"];
        let ticketURL = firstShowTime["ticketURI"];
        let runTimeArray = [];


        if (moment(showtimes) > moment()) {
            console.log("you got the math right or something")
        }

        runTimeArray.push(runTime.split(""));

        console.log(response);
        console.log("title " + title);
        console.log("showtimes " + moment(showtimes).format("hh:mm a"));
        console.log("theater " + theater);
        console.log("description " + description);
        //console.log("Raw Runtime " + runTimeArray.push(runTime.split("")));
        if (ticketURL !== undefined) {
            console.log("Ticket URL " + ticketURL);
        } else {
            console.log("Sorry, no link available for this show");
        }
        console.log("Run Time Array " + runTimeArray);
        console.log("Run Time: " + runTimeArray[0][2] + runTimeArray[0][3] + " hrs " + runTimeArray[0][5] + runTimeArray[0][6] + " mins")

        $("body").prepend(`
        <div>
            
            <p>Uh oh....something's not quite right. Try again later</p>
            <img src='https://media2.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy-downsized.gif'/>
        </div>
        `
        )
    }

}).catch(function (event) {
    $("body").prepend(`
    <div class="errorMessage">
        <p>Uh oh....something's not quite right. Try again later</p>
        <img src='https://media2.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy-downsized.gif'/>
    </div>
    `);
});