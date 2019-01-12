
let apikey = "nkpdkxcq96bpkunwvw22bxdd"
let date = moment().format("YYYY-MM-DD")
console.log(date)

let zip = "30306"

let queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&zip=" + zip + "&radius=" + 5 + "&api_key=" + apikey;
console.log(queryURL)

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    for (let g = 0; g < 5; g++) {
        let firstShowTime = response[g].showtimes[0]

        let title = response[g].title
        let showtimes = firstShowTime["dateTime"]
        let theater = firstShowTime["theatre"]["name"]
        let description = response[g]["shortDescription"]
        let runTime = response[g]["runTime"]
        let ticketURL = firstShowTime["ticketURI"]

        console.log(response)
        console.log("title " + title)
        console.log("showtimes " + showtimes)
        console.log("theater " + theater)
        console.log("description " + description)
        console.log("Runtime " + runTime)
        console.log("Ticket URL " + ticketURL)
    }

}).catch(function (event) {
    $(".gifHolder").prepend(`
    <div class="gifDiv mb-1">
        <p>Uh oh....something's not quite right. Try again later</p>
        <img class="mb-2" src='https://media2.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy-downsized.gif'/>
    </div>
    `);
});