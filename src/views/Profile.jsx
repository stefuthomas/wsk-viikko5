import { Link } from "react-router-dom"
import {useUser} from "../hooks/ApiHooks.js";
import {useEffect, useState} from "react";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const {getUserByToken} = useUser();
  const getUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const userData = await getUserByToken(token)
      setUser(userData.user)
    } catch (e) {
      alert(e.message)
    }
  }
  useEffect(() => {
    getUser();
  }, [])
  return <div>
    <h2>Tämä on minun profiilisivu</h2>

    <p>
      <Link to="/">Navigoi takaisin etusivulle</Link>
    </p>
    <div>
      {user &&
      <p>
        Käyttäjänimi: {user.username}
      </p>
      }
    </div>
  </div>
}
