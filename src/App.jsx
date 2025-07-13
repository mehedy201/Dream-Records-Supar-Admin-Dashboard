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
  activeUsersTable,
  albumTrackList,
  analyticsTable,
  artistsItems,
  artistSocialItems,
  artistTable,
  chartData,
  homeCardContent,
  labelSocialItems,
  labelsTable,
  newUsersTable,
  Release_Claim,
  releaseAlbumInfo,
  releaseCredits,
  releaseItems,
  releaseTrackDetails,
  settingsTeamMember,
  singleReleaseARevenueData,
  singleReleaseATrackData,
  support,
  suspendUsersTable,
  transactionInfo,
  transactions,
  transactionsHistory,
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
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Home
                homeCardContent={homeCardContent}
                releaseItems={releaseItems}
              />
            }
          />
          <Route
            path="/artists"
            element={<Artists artistTable={artistTable} />}
          />
          <Route
            path="/SingleArtist"
            element={<SingleArtist releaseItems={releaseItems} />}
          />
          <Route
            path="/edit-artist"
            element={<EditSingleArtist artistSocialItems={artistSocialItems} />}
          />
          <Route
            path="/labels"
            element={<Labels labelsTable={labelsTable} />}
          />
          <Route
            path="/single-lable"
            element={<SingleLable releaseItems={releaseItems} />}
          />
          <Route
            path="/edit-lable"
            element={<EditLable labelSocialItems={labelSocialItems} />}
          />
          <Route
            path="/distribution"
            element={<Distribution releaseItems={releaseItems} />}
          />
          <Route
            path="/ServiceRequest"
            element={
              <ServiceRequest
                artistsItems={artistsItems}
                Release_Claim={Release_Claim}
              />
            }
          />
          <Route
            path="/Transaction"
            element={<Transaction transactions={transactions} />}
          />
          <Route
            path="/single-transaction"
            element={
              <SingleTransaction
                transactionsHistory={transactionsHistory}
                transactionInfo={transactionInfo}
              />
            }
          />
          <Route path="/support" element={<Support support={support} />} />
          <Route path="/SupportMessageBox" element={<SupportMessageBox />} />
          <Route
            path="/Analytics"
            element={<Analytics analyticsTable={analyticsTable} />}
          />
          <Route
            path="/Settings"
            element={<Settings settingsTeamMember={settingsTeamMember} />}
          />
          <Route
            path="/single-release"
            element={
              <SingleRelease
                releaseAlbumInfo={releaseAlbumInfo}
                albumTrackList={albumTrackList}
                singleReleaseATrackData={singleReleaseATrackData}
                singleReleaseARevenueData={singleReleaseARevenueData}
                releaseTrackDetails={releaseTrackDetails}
                chartData={chartData}
                releaseCredits={releaseCredits}
              />
            }
          />
          <Route
            path="/Users"
            element={
              <Users
                newUsersTable={newUsersTable}
                activeUsersTable={activeUsersTable}
                suspendUsersTable={suspendUsersTable}
              />
            }
          />
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route
            path="/SingleUser"
            element={
              <SingleUser
                ArtistCard={ArtistCard}
                artistsItems={artistsItems}
                transactionsHistory={transactionsHistory}
              />
            }
          />
          <Route path="/Edit-User" element={<EditUser />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>

        {/* Route WITHOUT Sidebar & Navbar */}

        <Route path="/login" element={<LogIn />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route
          path="/VerificationEmailSent"
          element={<VerificationEmailSent />}
        />
      </Routes>
    </Router>
  );
}

export default App;
