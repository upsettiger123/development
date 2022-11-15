import '../AggregatorBanner.css'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function AggregatorBanner(props) {
    const filterAdded = (hike) => {
        if (props.hikeTracker.hikes[hike.name].added) {
            return true;
        } else {
            return false;
        }
    } 

    const listToRender = props.list.filter(filterAdded);
    const hikeStyle = {
        fontSize: 16, 
        height: 20, 
        textAlign: "center", 
        backgroundColor: '#1976d2', 
        color: 'white'
    }

    return (
        <div className = "aggregator">
            <Typography variant="h6" sx={{ margin: '12px' }}>Distance Hiked: {props.hikeTracker.distance}mi</Typography>
            <div className="hike-list">
                <Typography variant="h6" sx={{ margin: '12px', width: 175, height: 30 }}>Completed Hikes:</Typography>
                {listToRender.length === 0 ? <Paper sx={{...hikeStyle, backgroundColor: '#949494'}}>&ensp;Complete A Hike!&ensp;</Paper> :
                listToRender.map((hike) => <Paper sx={hikeStyle}>&ensp;{hike.name}&ensp;</Paper>)}
            </div>
        </div>
    );
}