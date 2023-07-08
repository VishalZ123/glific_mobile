import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Storage from './asyncStorage';

function useAppResources(setToken, setURL, setUser) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        SplashScreen.preventAutoHideAsync();

        const sessionValue = await Storage.getData('session');
        if (sessionValue !== null) {
          const parsedSessionValue = JSON.parse(sessionValue);
          setToken(parsedSessionValue.access_token);
        }

        const orgURL = await Storage.getData('orgnisationUrl');
        if (orgURL !== null) {
          setURL(orgURL);
        }

        const user = await Storage.getData('glific_user');
        if (user !== null) {
          const parsedUser = JSON.parse(user);
          setUser(parsedUser);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  return appIsReady;
}

export default useAppResources;
