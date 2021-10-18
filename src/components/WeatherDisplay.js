import React, { useMemo } from 'react';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const WeatherDisplay = ({ weatherData }) => {
    const { temp, description, icon, windTransform, windSpeed } = useMemo(() => { 
        const [weather] = weatherData.weather || [];

        return {
            temp: weatherData.main && weatherData.main.temp ? Math.round(weatherData.main.temp).toString() : '',
            description: weather ? weather.description : '',
            icon: weather ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png` : '',
            windTransform: weatherData.wind ? weatherData.wind.deg - 90 : null,
            windSpeed: weatherData.wind ? Math.round(weatherData.wind.speed) : 0,
        };
    }, [weatherData]);

    return (
        <>
            {temp && 
                <Typography variant="h6">
                    {temp}&deg;C
                </Typography>
            }
            {icon && (
                <Tooltip 
                    title={description} 
                    aria-label={description}
                >
                    <Avatar 
                        style={{ 
                            width: "spacing(7)", 
                            height: "spacing(7)"
                        }} 
                        alt={description} 
                        src={icon} 
                    />
                </Tooltip>
            )}
            {windSpeed > 0 && (
                <>
                    <Typography variant="h6">
                        {`${windSpeed} km/h`}
                    </Typography>
                    {windTransform !== null && (
                        <ArrowRightAltIcon style={{ transform: `rotateZ(${windTransform}deg)` }} />
                    )}
                </>
            )}
        </>
    );
}

export default WeatherDisplay;
