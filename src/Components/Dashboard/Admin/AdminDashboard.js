import React from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import ListeUsers from "./ListeUsers";
import ListeMaps from "./ListeMaps";
import CreerUtilisateur from "./CreerUser";
import HomePage from "../../HomePage/HomaPage";
import NavbarAdmin from "./NavbarAdmin";

function AdminDashboard() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/dashboard" component={AdminDashboardHome} />
        <Route exact path="/dashboard/listmaps" component={ListeMaps} />
        <Route exact path="/dashboard/listusers" component={ListeUsers} />
        <Route exact path="/dashboard/creeruser" component={CreerUtilisateur} />
      </Switch>
    </BrowserRouter>
  );
}
function AdminDashboardHome() {
  const history = useHistory();
  return (
    <div>
      <NavbarAdmin />
      <div>A heatmap is a graphical representation of data that uses a system of color-coding to represent different values. Heatmaps are used in various forms of analytics but are most commonly used to show user behaviour on specific webpages or webpage templates.
</div>
    </div>
  );
}
export default AdminDashboard;
