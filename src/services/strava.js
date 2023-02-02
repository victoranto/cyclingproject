import axios from "axios";
import { setUser } from '../redux/actions/userActions'
import store from '../redux/store'

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

export const getParamValues = (url) => {
    return url
        .slice(1)
        .split("&")
        .reduce((prev, curr) => {
            const [title, value] = curr.split("=");
            prev[title] = value;
            return prev;
        }, {});
};

export const cleanUpAuthToken = (str) => {
    return str.split("&")[2].slice(5);
};

export const testAuthGetter = async (authTok) => {
    try {
        const response = await axios.post(
            `https://www.strava.com/api/v3/oauth/token?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&code=${authTok}&grant_type=authorization_code`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserData = async (userID, accessToken) => {
  try {
      const response = await axios.get(
          `https://www.strava.com/api/v3/athletes/${userID}/stats`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return response;
  } catch (error) {
      console.log(error);
  }
};

export const getUserInfo = async (accessToken) => {
  try {
      const response = await axios.get(
          `https://www.strava.com/api/v3/athlete`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      store.dispatch(setUser(response.data));
      return response;
  } catch (error) {
      console.log(error);
  }
};

export const getActivities = async (accessToken) => {
    try {
        const response = await axios.get(
            `https://www.strava.com/api/v3/athlete/activities`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
  };

  export const getActivitiesByDate = async (accessToken, from, to) => {
    try {
        console.log('to:', to, 'from:', from)
        const response = await axios.get(
            `https://www.strava.com/api/v3/athlete/activities`,
            { headers: { Authorization: `Bearer ${accessToken}` }, params: { 'before': from, 'after':to } }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
  };

export const getActivity = async (accessToken, id) => {
    try {
        const response = await axios.get(
            `https://www.strava.com/api/v3/activities/${id}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
  };