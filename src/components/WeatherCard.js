import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import LocationEntry from './LocationEntry';
import LocationWeather from './LocationWeather';

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column"
    },
    content: { flex: 1 }
}));

const WeatherCard = ({ location, canDelete, onDelete, onUpdate }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.content}>
                {!location && <LocationEntry onUpdate={onUpdate} />}
                {location && <LocationWeather location={location} />}
            </CardContent>
            <CardActions>
                <Button 
                    disabled={!canDelete} 
                    onClick={onDelete} 
                    size="small" 
                    color="primary"
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
}

export default WeatherCard;
