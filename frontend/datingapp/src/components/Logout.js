import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const LogOut = (props) => {
  console.log("works");
  const history = useHistory();
  const handleRedirect = () => {
    history.push("/");
  };
  const { handleUserStatus } = props;

  useEffect(() => {
    fetch("http://localhost:9090/logout", {
      method: "post",
      async: true,
      crossDomain: true,
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("userId", data.res);
      });
    handleUserStatus();
    handleRedirect();
  });

  return null;
};
export default LogOut;
