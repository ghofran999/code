import React, { useEffect } from "react";
import AdminDashboard from "./Admin/AdminDashboard";
import UserDashboard from "./User/UserDashboard";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const history = useHistory();

  useEffect(() => {
    if (!window.sessionStorage.getItem("id_token")) {
      history.push("/");
    }
  }, []);
  if (window.sessionStorage.getItem("role") == 0) {
    return <UserDashboard />;
  } else {
    return <AdminDashboard />;
  }
}
export default Dashboard;
