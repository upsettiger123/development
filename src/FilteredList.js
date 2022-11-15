import HikeTile from "./components/HikeTile";

export default function FilteredList(props) {
    
    const filterOnTime = (condition, hrs) => {
        if ((condition === "<1hr" && hrs === 0) ||
            (condition === "1hr-2hr" && hrs === 1) ||
            (condition === "2hr+" && hrs >= 2)) {
            return true
        } else {
            return false;
        }
    };

    const filterOnDifficulty = (condition, difficulty) => {
        return (condition === difficulty);
    };

    const matchesFilters = item => {
        if (props.difficulty === "All" && props.time === "All") {
            return true
        } else if (props.difficulty !== "All") {
            if (props.time !== "All") {
                // both filters active
                return filterOnTime(props.time, item.hours) && filterOnDifficulty(props.difficulty, item.difficulty);
            } else {
                // only difficulty active
                return filterOnDifficulty(props.difficulty, item.difficulty);
            }
        } else if (props.time !== "All") {
            // only time active
            return filterOnTime(props.time, item.hours);
        } else {
            return false
        }
    }

    const sortByDistance = (a,b) => {
        if (a.distance < b.distance) {
            return -1
        } else if (a.distance > b.distance) {
            return 1
        } else {
            return 0;
        }
    }

    return (
        <div>
            <div>
                {(props.sortBy === "None") ?
                    props.list.filter(matchesFilters).map((hike) => <HikeTile hike={hike} updateHikes={props.updateHikes} added={props.addTracker[hike.name].added}></HikeTile>) :
                    props.list.filter(matchesFilters).sort(sortByDistance).map((hike) => <HikeTile hike={hike} updateHikes={props.updateHikes} added={props.addTracker[hike.name].added}></HikeTile>)}
            </div>
        </div>
    );
}