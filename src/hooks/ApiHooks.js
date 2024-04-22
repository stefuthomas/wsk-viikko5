import {useEffect, useState} from "react";
import {fetchData} from "../../lib/fetchData.js";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {getUserById} = useUser();
  const getMedia = async () => {
    const mediaResult = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');

    const mediaWithUser = await Promise.all(mediaResult.map(async (item) => {
      const userResult = await getUserById(item.user_id);
      return {...item, username: userResult.username};
    }));
    setMediaArray(mediaWithUser);
  }

  useEffect(() => {
    getMedia();
  }, [])
  return {mediaArray};
};

const useUser = () => {
  const getUserById = async (id) => {
    const userResult = await fetchData(import.meta.env.VITE_AUTH_API + '/users/' + id);
    return userResult;
  }

  const getUserByToken = async (token) => {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    }
    const tokenResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      options
    );
    return tokenResult;
    }
  const register = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    }
    const registerResult = await fetchData(import.meta.env.VITE_AUTH_API + '/users', options);
    return registerResult;

  }
  return {getUserById, getUserByToken, register};
}


const useAuthentication = () => {
  const login = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    }
    const loginResult = await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', options);
    return loginResult;
  }
  return {login}
}

export {useMedia, useUser, useAuthentication};
