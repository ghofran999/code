import React from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import HomePage from "../../HomePage/HomaPage";
import CreateHeatMap from "./CreateHeatMap";
import ListHeatMap from "./ListHeatMap";
import NavbarUser from "./NavbarUser";
import { Carousel } from "react-bootstrap";
import First from "./img/1.png";
import Second from "./img/2.png";
import Third from "./img/3.jpg";

function UserDashboard() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/dashboard" component={UserDashboardHome} />
        <Route exact path="/dashboard/create" component={CreateHeatMap} />
        <Route exact path="/dashboard/list" component={ListHeatMap} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}
function UserDashboardHome() {
  const history = useHistory();
  return (
    <div class="container-flex">
      <NavbarUser />
      <div>
        <Carousel>
          <Carousel.Item interval={3000} className="back-img">
            <img
              className="d-block w-100 carousel-imgg "
              src={First}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Welcome to HOT HEATMAPPER</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100 carousel-imgg"
              src={Second}
              alt="Second slide"
            />

            <Carousel.Caption>
              
              <h3>Get your heat map</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100 carousel-imgg"
              src={Third}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>follow the steps below to get your heat map</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}
export default UserDashboard;
