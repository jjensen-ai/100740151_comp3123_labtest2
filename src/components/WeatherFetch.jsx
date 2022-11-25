import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import '../css/App.css';

export default function WeatherFetch() {
  const [fetching, setFetching] = useState(true);
  const [fetch5, setFetch5] = useState(true);
  const [weatherReport, setWeather] = useState([]);
  const [fiveDayReport, setFiveDay] = useState([]);
  const dayName = new Date().toLocaleString('default', { weekday: 'long' });
  const monthName = new Date().toLocaleString('default', { month: 'long' });
  const dateNumber = new Date().toLocaleString('default', { day: 'numeric' });
  const yearNumber = new Date().toLocaleString('default', { year: 'numeric' });

  useEffect(() => {
    getWeather();
  }, [setWeather]);

  useEffect(() => {
    getFiveDay();
  }, [setFiveDay]);

  const getWeather = async () => {
    await axios
      .get(
        'http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=6ebf40244ff553d08e0af6a37e3408b5&units=metric'
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
        setFetching(false);
      })
      .catch((error) => console.error(error));
  };

  const getFiveDay = async () => {
    await axios
      .get(
        'http://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=6ebf40244ff553d08e0af6a37e3408b5&units=metric'
      )
      .then((response) => {
        console.log(response.data);
        setFiveDay(response.data);
        setFetch5(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {fetching && fetch5 && <div>Fetching</div>}
      {!fetching && !fetch5 && (
        <div>
          <div className='grid grid-rows-6 gap-2 grid-flow-col mt-20 border-4 border-fuchsia-200 shadow-2xl shadow-slate-700 mx-auto gridContainer p-3 rounded-2xl'>
            <div className='row-span-6'>
              <div className='flex flex-col dailyWeatherStyle p-3 gap-3 shadow-lg shadow-black'>
                <div className='text-lg font-bold tracking-widest'>
                  {dayName}
                </div>
                <div className='text-xl font-thin'>
                  {monthName} {dateNumber} {yearNumber}
                </div>
                <div className='self-center'>
                  <img
                    className='scale-150'
                    src={`http://openweathermap.org/img/wn/${weatherReport.weather[0].icon}@2x.png`}
                  />
                </div>
                <div className='text-5xl font-extrabold'>
                  {Math.round(weatherReport.main.temp)} &#8451;
                </div>
                <div className='font-extrabold tracking-widest'>
                  {weatherReport.weather[0].description.toUpperCase()}
                </div>
              </div>
            </div>
            <div className='row-span-3'>
              <div className='gap-2 p-3 dailyInfo rounded-xl text-lg shadow-md shadow-black'>
                <div className='flex flex-row justify-between'>
                  <div>City</div>
                  <div>{weatherReport.name}</div>
                </div>
                <div className='flex flex-row justify-between'>
                  <div>Humidity</div>
                  <div>{weatherReport.main.humidity} %</div>
                </div>
                <div className='flex flex-row justify-between'>
                  <div>Feels Like</div>
                  <div>{Math.round(weatherReport.main.feels_like)} &#8451;</div>
                </div>
                <div className='flex flex-row justify-between'>
                  <div>Wind</div>
                  <div>{weatherReport.wind.speed} kM/h</div>
                </div>
                <div className='flex flex-row justify-between'>
                  <div>Max Temp</div>
                  <div>{Math.round(weatherReport.main.temp_max)} &#8451;</div>
                </div>
                <div className='flex flex-row justify-between'>
                  <div>Min Temp</div>
                  <div>{Math.round(weatherReport.main.temp_min)} &#8451;</div>
                </div>
              </div>
            </div>
            <div className='row-span-3'>
              <div className='flex flex-row justify-evenly mt-1'>
                <div className='forecastCard rounded-2xl text-center p-2 shadow-md shadow-black'>
                  <img
                    className='scale-100'
                    src={`http://openweathermap.org/img/wn/${fiveDayReport.list[0].weather[0].icon}@2x.png`}
                  />
                  <div>
                    {new Date(fiveDayReport.list[0].dt * 1000).toLocaleString(
                      'en-US',
                      { weekday: 'short' }
                    )}
                  </div>
                  <div className='text-2xl'>
                    {Math.round(fiveDayReport.list[0].main.temp)} &#8451;
                  </div>
                </div>

                <div className='forecastCard rounded-2xl text-center p-2 shadow-md shadow-black'>
                  <img
                    className='scale-100'
                    src={`http://openweathermap.org/img/wn/${fiveDayReport.list[8].weather[0].icon}@2x.png`}
                  />
                  <div>
                    {new Date(fiveDayReport.list[8].dt * 1000).toLocaleString(
                      'en-US',
                      { weekday: 'short' }
                    )}
                  </div>
                  <div className='text-2xl'>
                    {Math.round(fiveDayReport.list[8].main.temp)} &#8451;
                  </div>
                </div>

                <div className='forecastCard rounded-2xl text-center p-2 shadow-md shadow-black'>
                  <img
                    className='scale-100'
                    src={`http://openweathermap.org/img/wn/${fiveDayReport.list[16].weather[0].icon}@2x.png`}
                  />
                  <div>
                    {new Date(fiveDayReport.list[16].dt * 1000).toLocaleString(
                      'en-US',
                      { weekday: 'short' }
                    )}
                  </div>
                  <div className='text-2xl'>
                    {Math.round(fiveDayReport.list[16].main.temp)} &#8451;
                  </div>
                </div>

                <div className='forecastCard rounded-2xl text-center p-2 shadow-md shadow-black'>
                  <img
                    className='scale-100'
                    src={`http://openweathermap.org/img/wn/${fiveDayReport.list[24].weather[0].icon}@2x.png`}
                  />
                  <div>
                    {new Date(fiveDayReport.list[24].dt * 1000).toLocaleString(
                      'en-US',
                      { weekday: 'short' }
                    )}
                  </div>
                  <div className='text-2xl'>
                    {Math.round(fiveDayReport.list[24].main.temp)} &#8451;
                  </div>
                </div>

                <div className='forecastCard rounded-2xl text-center p-2 shadow-md shadow-black'>
                  <img
                    className='scale-100'
                    src={`http://openweathermap.org/img/wn/${fiveDayReport.list[32].weather[0].icon}@2x.png`}
                  />
                  <div>
                    {new Date(fiveDayReport.list[32].dt * 1000).toLocaleString(
                      'en-US',
                      { weekday: 'short' }
                    )}
                  </div>
                  <div className='text-2xl'>
                    {Math.round(fiveDayReport.list[32].main.temp)} &#8451;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
