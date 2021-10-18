import React, { useState, useEffect, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';
import WeatherDisplay from './WeatherDisplay';
import { getWeatherData } from '../api/getWeatherData';

const useStyles = makeStyles((theme) => ({
    headerLine: {
        display: "flex",
        alignItems: "center"
    },
    location: {
        flex: 1
    },
    detailLine: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    description: {
        flex: 1
    }
}));

function LoadingIndicator({ isLoading }) {
    return isLoading ? <CircularProgress /> : null;
}

function ErrorMessage({ apiError }) {
    if (!apiError) return null;

    return (
        <>
            <ErrorIcon color="error" />
            <Typography color="error" variant="h6">
                {apiError}
            </Typography>
        </>
    );
}

function LocationWeather({ location }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        const loadingIndicatorTimeout = setTimeout(
            () => setIsLoading(true), 500
        )
        const getWeather = async () => {
            const result = await getWeatherData(location);
            clearTimeout(loadingIndicatorTimeout);
            setIsLoading(false);
            setWeatherData(result.success ? result.data : {});
            setApiError(result.success ? "" : result.error);
        }

        getWeather();
        return () => clearTimeout(loadingIndicatorTimeout);
    }, [location]);

    const { flagIcon, countryCode } = useMemo(() => {
        return {
            flagIcon: weatherData.sys ? `https://www.countryflags.io/${weatherData.sys.country}/shiny/32.png` : '',
            countryCode: weatherData.sys ? weatherData.sys.country : ''
        };
    }, [weatherData]);

    return (
        <>
            <div className={classes.headerLine}>
                <Typography className={classes.location} variant="h5">
                    {location}
                </Typography>
                {flagIcon && 
                    <img alt={countryCode} src={flagIcon} />
                }
            </div>
            <div className={classes.detailLine}>
                <LoadingIndicator isLoading={isLoading} />
                <ErrorMessage apiError={apiError} />
                <WeatherDisplay weatherData={weatherData} />
            </div>
        </>
    );
}

export default LocationWeather
