import axios from 'axios';
import stateNames from './stateNames.js';


export const getBasicData = async () => {

  const request = await axios.get('https://covidtracking.com/api/us');

  const [covidInfo] = request.data;

  return covidInfo;
};

export const getStatesData = async () => {

  const request = await axios.get('https://covidtracking.com/api/states');

  const stateData = request.data;
  const data = stateData.map((data) => {
    const fullStateName = stateNames.find((s) => s.abbreviation == data.state)
      .name;

    return { ...data, fullStateName };
  });

  return data;
};

export const getUsHistoricData = async () => {

  const request = await axios.get('https://covidtracking.com/api/us/daily');

  const data = request.data;

  return data;
};

export const getHistoricStatesData = async () => {

  const request = await axios.get('https://covidtracking.com/api/states/daily');

  const data = request.data;

  return data;
};

export const getHistoricStateData = async (state) => {
  const info = await getHistoricStatesData();

  return info.filter((d) => d.state === state);
};

export const getStateData = async (state) => {
  const states = await getStatesData();

  return states.find((s) => s.state === state);
};

