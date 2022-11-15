# Development

### Link to Deployed Website
https://upsettiger123.github.io/development/

### Goal and Value of the Application
The goal of this application is  to serve as the user's to do list of hikes. 
The value for users is that this application can keep track of which hikes users have completed and how many miles they have already hiked.
The filtering and sorting would be useful to view what hikes users want to complete and determine their next hike given different user preferences.

### Usability Principles Considered
- The aggregator is displayed at the same time as the list item so that there is immediate feedback when a user checks off a hike as completed. This way, the (system) status of their to do list is always visible.
- The option to view completed hikes as tiles through the menu represents a second way to view some of the same information in the aggregator. 
- The menu is also sitcky to facilitate user interaction since the menu remains close to where it needs to be used rather than requiring the user to scroll back up each time they want to change filter or sorting conditions.
- When no hikes are completed, there is a default tile displayed instructing the user of the purpose of the aggregator.
- When a hike is marked as complete, the button changes from outlined to filled in to display its change of status. On hover, a tooltip appears explaining what the button does (mark as complete or undo the action).
- The colors of the banners with hike difficulty match user intuition that green is easy and red is hard.

### Organization of Components
There are 3 main components outside of the App component: AggregatorBanner, FilteredList, and HikeTile. The App component includes both the AggregatorBanner and FilteredList (as well as a menu that isn't a component), and the FilteredList component filters/sorts the hike data and maps it to HikeTile compoennts. The AggregatorBanner component displays the aggregated value (distance) and the names of hikes aggregated (marked as completed).

### How the User Triggers State Changes
Because App houses the menu, its state is what keeps track of what filters and sorting conditions are checked off/clicked through menu interaction (time, difficulty, added, sortBy). The way this filtering happens is documented in the below section. Its state also keeps track of the list of hikes (hikeList) aggregated and its aggregator value, distance. This hikeList state is a JSON which has a list of all the hikes (each hike is assinged an index that matches their index in hike-data.json and a 0 or 1 depending on if it is added to the aggregator) and the aggregate distance. The method to update hikeList is passsed through components until it hits hikeList, which houses a button that triggers a change to the hikeList state.

### How Data is Passed Down Through Components
The state is detailed above. 

The AggregatorBanner component is passed data from App through the list and hikeTracker props. The list is the original hike data from hike-data.json. The hikeTracker is the App's hikeList state variable. When the hikeList is modified (ie the aggregator data is modified), the props change and thus the aggregator is re-rendered with the updated data.

The FilteredList component is passed data from App through the list and tracker like in AggregatorBanner. It is also passed the rest of the state variables that reflect the sorting and filtering conditions the user has applied via the menu: difficulty, time, sortBy, and added (to the aggregator). Using these props, FilteredList filters and sorts the list it was given. updateHikes, the method that can update the aggregated data, is also passed to it. App defines this updateHikes() and uses setHikeList that sets the hikeList state.

The HikeTile component is passed the individual hike item data, updateHike, and whether the tile has already been added from FilteredList. The HikeTile component includes a button that calls the updateHikes method and adds/removes that specific hike's data so that the aggregator can use the updated information. The individual hike item data is displayed as a card and the type of button (outlined or colored) is determined by the added prop (which is true if added to the aggregator and false otherwise).
