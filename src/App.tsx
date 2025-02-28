import { Route, BrowserRouter as Router, Routes } from "react-router";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Blank from "./pages/Blank";
import Calendar from "./pages/Calendar";
import Ecommerce from "./pages/Dashboard/ECommerce";
import FormElements from "./pages/Forms/FormElements";
import NotFound from "./pages/OtherPage/NotFound";
import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import UserProfiles from "./pages/UserProfiles";
import AddCarrier from "./pages/Master/AddCarrier";
import Trailer from "./pages/Master/AddTrailer";
import TrackVehicle from "./pages/Tracking/TrackVehicle";
import { filterMneus } from "./layout/AppSidebar";
import Counter from "./pages/redux-test/Counter";
import AddDrivers from "./pages/Master/AddDrivers";

//testing
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/dashboard" element={<Ecommerce />} />
            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/redux-test" element={<Counter />} />

            {/* {filterMneus.map((items, _) => {
              //console.log(items.subItems);
              return (
                <Route key={_}>
                  {items?.subItems?.map((path, index) => {
                    return (
                      <Route
                        key={index}
                        path={path?.path}
                        element={<AddCarrier />}
                      />
                    );
                  })}
                </Route>
              );
            })} */}

            <Route path="/fleet/carrier" element={<AddCarrier />} />
            <Route path="/fleet/trailer" element={<Trailer />} />
            <Route path="/fleet/drivers" element={<AddDrivers />} />

            <Route path="/tracking/trackvehicle" element={<TrackVehicle />} />
          </Route>

          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
