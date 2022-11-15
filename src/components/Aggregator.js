import Typography from '@mui/material/Typography';
import HikeTile from './HikeTile.js';

export default function Aggregator(props) {
    const filterAdded = (hike) => {
        if (props.hikeTracker.hikes[hike.name].added) {
            return true;
        } else {
            return false;
        }
    } 

    return (
        <div className="aggregator">
            <Typography variant="h4" sx={{ margin: '12px' }}>Distance Hiked: {props.hikeTracker.distance}mi</Typography>
            {props.list.filter(filterAdded).map((hike) => <HikeTile hike={hike} updateHikes={props.updateHikes} added={props.hikeTracker.hikes[hike.name].added}></HikeTile>)}
        </div>
    );
}