import { useEffect } from "react";
import { useUser } from "../hooks/ApiHooks.js";
import { useUserContext } from "../contexts/UserContext.jsx";
import UserData from "../components/UserData.jsx";

export const Profile = () => {
const { setUser } = useUserContext(null);
const { getUserByToken } = useUser();

const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token)
    const userData = await getUserByToken(token);
    setUser(userData.user);
  } catch (e) {
    console.log(e.message);
  }
};

useEffect(() => {
  getUser();
}, []);

return (
  <>
    Tämä on Profiilisivu
    <div>
      <UserData />
    </div>
  </>
);
};
