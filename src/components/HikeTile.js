import '../HikeTile.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 47,
        top: 287
    },
}));

export default function HikeTile(props) {
    const handleClick = () => {
        props.updateHikes(hike.name, !props.added);
    }

    const hike = props.hike;
    let time = <Typography variant="body1">Time: {hike.hours}h {hike.minutes}m</Typography>
    if (hike.hours === 0) {
        time = <Typography variant="body1">Time: {hike.minutes}m</Typography>
    }

    return (
        <StyledBadge
            badgeContent={hike.difficulty}
            color={hike.difficulty === "Easy" ? "success" : (hike.difficulty === "Medium" ? "secondary" : "error")}
            sx={{
                width: 360,
                margin: 1.5
            }}>
            <Card>
                <CardMedia
                    component="img"
                    height="194"
                    image={hike.image}
                    alt={hike.name}
                    sx={{ width: 350 }}
                />
                <CardContent sx={{ padding: '12px' }}>
                    <div className="tile-content">
                        <div>
                            <Typography variant="h6">
                                {hike.name}
                            </Typography>
                            <Typography variant="body1">
                                Distance: {hike.distance}
                            </Typography>
                            {time}
                        </div>
                        <Tooltip title={props.added ? "Remove From Completed" : "Mark as Complete"} placement="top">
                            <IconButton color="primary" aria-label="add hike" component="label" onClick={handleClick}>
                                {props.added ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                            </IconButton>
                        </Tooltip>    
                    </div>
                </CardContent>
            </Card>
        </StyledBadge>
    );
}