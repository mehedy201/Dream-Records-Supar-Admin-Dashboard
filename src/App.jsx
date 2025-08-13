import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/home/Home";
import "@fontsource/inter"; // Default 400 weight
import "@fontsource/inter/400.css"; // Specific weight
import "@fontsource/inter/700.css"; // Bold weight

import Navbar from "./components/Navbar";

import LogIn from "./pages/LogIn/LogIn";
import ResetPassword from "./pages/LogIn/ResetPassword";
import NewPassword from "./pages/LogIn/NewPassword";
// import CreateRelease from "./pages/Release/components/CreateRelease";
// import SingleRelease from "./pages/Release/components/SingleRelease";

import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import {
  analyticsTable,
  artistsItems,
  artistSocialItems,
  artistTable,
  labelSocialItems,
  Release_Claim,
  releaseItems,
  settingsTeamMember,
  support,
  // transactionsHistory,
} from "./data";
import Artists from "./pages/Artists/Artists";
import Labels from "./pages/Labels/Labels";
import Distribution from "./pages/Distribution/Distribution";
import Support from "./pages/Support/Support";
import SupportMessageBox from "./pages/Support/SupportMessageBox";
import VerificationEmailSent from "./pages/LogIn/VerificationEmailSent";
import ServiceRequest from "./pages/ServiceRequest/ServiceRequest";
import Transaction from "./pages/Transaction/Transaction";
import SingleTransaction from "./pages/Transaction/components/SingleTransaction";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import SingleArtist from "./pages/Artists/components/SingleArtist";
import EditSingleArtist from "./pages/Artists/components/EditSingleArtist";
import SingleLable from "./pages/Labels/components/SingleLable";
import EditLable from "./pages/Labels/components/EditLable";
import SingleRelease from "./pages/Distribution/components/SingleRelease";
import Users from "./pages/Users/Users";
import SingleUser from "./pages/Users/components/SingleUser";
import ArtistCard from "./components/ArtistCard";
import Profile from "./pages/Profile/Profile";
import EditUser from "./pages/Users/components/EditUser";
import CreateUser from "./pages/Users/components/CreateUser";
import MobileMenu from "./components/MobileMenu";
import MobileFooter from "./components/MobileFooter";
import Authorization from "./Authorization/Authorization";
function Layout() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 830);
  const hideSidebarNavbar = location.pathname === "/login";
  const [loading, setLoading] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [location.pathname]); // run when path changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 830);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="app-wrapper">
      {!hideSidebarNavbar && !isMobile && <Sidebar />}
      <div
        className="main-content-wrapper"
        style={{
          marginLeft:
            hideSidebarNavbar || window.innerWidth <= 830 ? "0px" : "237px",
        }}
      >
        {!hideSidebarNavbar && (
          <Navbar toggleMobileMenu={() => setShowMobileMenu(true)} />
        )}
        {showMobileMenu && (
          <MobileMenu closeMenu={() => setShowMobileMenu(false)} />
        )}
        {isMobile && <MobileFooter />}
        {loading ? <LoadingScreen /> : <Outlet />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes inside Layout (with Sidebar & Navbar) */}
        <Route path="/" element={<Authorization><Layout /></Authorization>}>
          <Route
            path="/"
            element={
              <Home/>
            }
          />
          <Route
            path="/artists"
            element={<Artists artistTable={artistTable} />}
          />
          <Route
            path="/artists/:id/:pageNumber/:perPageItem"
            element={<SingleArtist releaseItems={releaseItems} />}
          />
          <Route
            path="/edit-artist"
            element={<EditSingleArtist artistSocialItems={artistSocialItems} />}
          />
          <Route
            path="/labels/:pageNumber/:perPageItem/:status"
            element={<Labels/>}
          />
          <Route
            path="/labels/:id/:pageNumber/:perPageItem/:status"
            element={<SingleLable releaseItems={releaseItems} />}
          />
          <Route
            path="/edit-label/:id"
            element={<EditLable labelSocialItems={labelSocialItems} />}
          />
          {/* Distribution Route End_________________________________________ */}
          {/* _______________________________________________________________ */}
          <Route
            path="/distribution"
            element={<Distribution releaseItems={releaseItems} />}
          />
          <Route
            path="/distribution/queue/:status/:pageNumber/:perPageItem"
            element={<Distribution releaseItems={releaseItems} />}
          />
          <Route
            path="/release/:id"
            element={ <SingleRelease/> }
          />
          {/* Distribution Route End_________________________________________ */}
          {/* _______________________________________________________________ */}
          {/* Service Request Route Start____________________________________ */}
          {/* _______________________________________________________________ */}
          <Route
            path="/service-request/:request/:pageNumber/:perPageItem/:status"
            element={
              <ServiceRequest
                artistsItems={artistsItems}
                Release_Claim={Release_Claim}
              />
            }
          />
          {/* Service Request Route End______________________________________ */}
          {/* _______________________________________________________________ */}
          {/* Transection Route Start________________________________________ */}
          {/* _______________________________________________________________ */}
          <Route
            path="/transaction/:status/:pageNumber/:perPageItem"
            element={<Transaction/>}
          />
          <Route
            path="/single-transaction/:id/:pageNumber/:perPageItem"
            element={
              <SingleTransaction/>
            }
          />
          {/* Transection Route End__________________________________________ */}
          {/* _______________________________________________________________ */}


      
          <Route path="/support" element={<Support support={support} />} />
          <Route path="/SupportMessageBox" element={<SupportMessageBox />} />
          <Route
            path="/analytics/:pageNumber/:perPageItem"
            element={<Analytics analyticsTable={analyticsTable} />}
          />



          {/* Settings Route Start___________________________________________ */}
          {/* _______________________________________________________________ */}
          <Route
            path="/settings"
            element={<Settings settingsTeamMember={settingsTeamMember}/>}
          />

          {/* Users Route Start_________________________________________ */}
          {/* __________________________________________________________ */}
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route
            path="/users/:status/:pageNumber/:perPageItem"
            element={ <Users/> }
          />
          <Route
            path="/user/:id/:item/:pageNumber/:perPageItem"
            element={
              <SingleUser/>
            }
          />
          <Route path="/edit-User/:id" element={<EditUser />} />
          {/* Users Route End+__________________________________________ */}
          {/* __________________________________________________________ */}
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Route WITHOUT Sidebar & Navbar */}

        <Route path="/login" element={<LogIn />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/set-new-password/:email" element={<NewPassword />} />
        <Route
          path="/VerificationEmailSent"
          element={<VerificationEmailSent />}
        />
      </Routes>
    </Router>
  );
}

export default App;
