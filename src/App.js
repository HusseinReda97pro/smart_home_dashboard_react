import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./pages/login";
import Navbar from "./components/Navbar";
import CreateCourse from "./pages/courses/CreateCourse";
import SingleCourse from "./pages/courses/SingleCourse";
import CreateUniversity from "./pages/universities/CreateUniversity";
import CreateFaculty from "./pages/faculties/CreateFaculty";
import History from "./pages/history/History";
import UserHistory from "./pages/users/UserHistory";
import Home from "./pages/home";
import User from "./pages/users/User";
import Teacher from "./pages/teachers/Teacher";
import CourseStudents from "./pages/courses/CourseStudents";
import CreateType from "./pages/type/CreateType";
import EnrollRequest from "./pages/enrollRequests/EnrollRequest";
import CreateProduct from "./pages/products/create_product";
import ItemList from "./pages/items/item_list";
import AppAds from "./pages/app_ads/app_ads_page";
import FirmwareList from "./pages/products/firmware_list";
require('dotenv').config()
// const admin = require('firebase-admin');
// import { initializeApp } from 'firebase/app';

// const serviceAccount = require('./service_account.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // Add any other Firebase configuration options here if needed
// });
const App = () => {
  console.log(process.env.REACT_APP_API);
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/products" component={CreateProduct} />
        =<Route exact path="/products/:productId" component={SingleCourse} />
        <Route exact path="/app_ads" component={AppAds} />

        <Route
          exact
          path="/products/:productId/items"
          component={ItemList}
        />

        <Route
          exact
          path="/products/:productId/firmware"
          component={FirmwareList}
        />
        {/*
        <Route exact path="/requests" component={EnrollRequest} />
        <Route exact path="/universities" component={CreateUniversity} />
        <Route exact path="/faculties" component={CreateFaculty} />
        <Route exact path="/history" component={History} />
        <Route exact path="/users/:userId" component={UserHistory} />
        <Route exact path="/users" component={User} />
        <Route exact path="/teachers" component={Teacher} />
        <Route exact path="/types" component={CreateType} /> */}
      </Switch>
    </Fragment>
  );
};

export default App;
