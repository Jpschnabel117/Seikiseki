# Seikiseki
Seikiseki is a web application that displays information about space launches around the world. The application uses data from the [RocketLaunch.live](https://www.rocketlaunch.live/api) API to display launches on a map and in a table, and provides additional visualizations of launch data.

## Technologies Used

- React.js
- D3.js
- Redux
- Node.js
- Express.js
- MySQL

## Features

- Displays space launches on a world map projected with D3.js, using data from the RocketLaunch.Live API
- Condenses the launch data from the API into a format suitable for the frontend using a MySQL database and a Node.js/Express.js server
- Groups launches by date and launch site, and displays a circle on the map for each group whose radius is proportional to the number of launches in that group
- Displays a histogram of total launches per month, with the x axis represented by months and the y axis represented by the number of launches in each month
- Includes a D3.js brush feature on the histogram that adjusts the mapped launch circles based on the new range calculated by the brush
- Clicking on any of the launch circles on the map displays a table with all of the launches at that location for the given date range determined by the brush
- The table includes a link to the RocketLaunch.Live webpage for each launch

## Usage

When you first open the Seikiseki Website, it will display a world map with circles indicating the locations of space launches. You can use the histogram below the map to filter the launches by date range. Dragging the brush on the histogram will update the circles on the map to show only the launches that fall within the selected date range.

Clicking on any of the launch circles on the map will display a table with all of the launches at that location for the selected date range. The table includes a link to the RocketLaunch.Live webpage for each launch. 

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Note that the full api being used is not free, please support the creators of the api, you can get your own key here [RocketLaunch.live](https://www.rocketlaunch.live/api)
