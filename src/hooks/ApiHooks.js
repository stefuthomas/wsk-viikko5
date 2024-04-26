import {useEffect, useState} from 'react';
import {fetchData} from '/lib/fetchData.js';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {getUserById} = useUser();

  const getMedia = async () => {
    try {
      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
      );

      const mediaWithUser = await Promise.all(
        mediaResult.map(async (mediaItem) => {
          const userResult = await getUserById(mediaItem.user_id);
          return {...mediaItem, username: userResult.username};
        }),
      );

      setMediaArray(mediaWithUser);
    } catch (error) {
      // console.log(error);
    }
  };

  const postMedia = async (file, inputs, token) => {

    const input = {
      title: inputs.title,
      description: inputs.description,
      filename: file.filename,
      media_type: file.media_type,
      filesize: file.filesize,
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    };

    const response = await fetch(import.meta.env.VITE_MEDIA_API + '/media', options);

    if (!response.ok) {
      throw new Error('Media post failed');
    }

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getMedia();
  }, []);

  return {mediaArray, postMedia};
};

const useUser = () => {
  const getUserById = async (id) => {
    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/' + id,
    );
    return userResult;
  };

  const getUserByToken = async (token) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const tokenResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      options,
    );
    return tokenResult;
  };

  const register = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    return await fetchData(import.meta.env.VITE_AUTH_API + '/users', options);
  };

  return {getUserById, getUserByToken, register};
};

const useAuthentication = () => {
  const login = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      options,
    );
    return loginResult;
  };
  return {login};
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    console.log(token)
    formData.append('file', file);
    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      body: formData,
    };

    console.log(options);

    return await fetchData(import.meta.env.VITE_UPLOAD_SERVER + '/upload', options);

  };

  return { postFile };
};

export {useMedia, useUser, useAuthentication, useFile};
