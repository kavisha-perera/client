import {useContext, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import UserContext from "../../types/UserContext";
import {API, TOKEN_KEY} from "../../constants";


function LoginRedirect() {
  const [searchParams] = useSearchParams();
  const userProfile = useContext(UserContext);

  useEffect(() => {
    if (userProfile) {
      window.location.href = `/profile/${userProfile.id}`;
    } else {
      const sessionString = searchParams.get('session');
      if (sessionString) {
        localStorage.setItem(TOKEN_KEY, sessionString);
        window.location.reload();
      }
    }
  }, [userProfile, searchParams]);


  return (
    <div>Loading...</div>
  );
}

export default LoginRedirect;
