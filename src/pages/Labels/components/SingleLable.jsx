import { Button, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReleaseCard from "../../../components/ReleaseCard";
import PropTypes from "prop-types";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { GoPencil } from "react-icons/go";
import Modal from "../../../components/Modal";
import { AiOutlineDelete } from "react-icons/ai";
import { ChevronRight } from "lucide-react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import SelectDropdown from "../../../components/SelectDropdown";

function SingleLable({ releaseItems }) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [lable, setLable] = useState(null);
  const [socialItems, setSocialItems] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dropdownItem = (
    <>
      <SelectDropdown
        options={["Option 1", "Option 2", "Option 3"]}
        placeholder="All time"
      />

      {isMobile && <br />}
      <SelectDropdown
        options={["Option 1", "Option 2", "Option 3"]}
        placeholder="All Releases"
      />
    </>
  );
  useEffect(() => {
    if (location.state?.lable) {
      setLable(location.state.lable);
    }
  }, [location.state]);

  useEffect(() => {
    const stored = localStorage.getItem("labelSocialUrl");
    if (stored) {
      const parsed = JSON.parse(stored);
      const filtered = parsed.filter((item) => item.url.trim() !== "");
      setSocialItems(filtered);
    }
  }, []);
  return (
    <div className="main-content">
      <div className="lable-details">
        {lable?.type === "Reject" && (
          <>
            <div className="home-notice" style={{ fontSize: "12px" }}>
              <InfoCircledIcon />
              <p>
                We are upgrading our platform to enhance your experience. You
                may notice new user interfaces appearing periodically. Thank you
                for your patience as we make these improvements.
              </p>
            </div>
            <br />
          </>
        )}
        <Flex className="lable-img-row">
          <div>
            {" "}
            <img
              src="src/assets/Avatar.png"
              className="singleLabel-image"
              alt=""
            />
          </div>
          <div className="lable-img-txt">
            <div>
              <br />
              <span
                className={`card-type-txt status ${lable?.status.toLowerCase()}`}
              >
                {lable?.status}
              </span>

              <h1>Warner Music Group</h1>
              <h4>Created on Sept 21, 2024</h4>
            </div>
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="dropdown-trigger singleLabel-dropdown-btn">
                <img src="src/assets/icons/vertical-threeDots.png" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align="left"
              side="bottom"
              className="dropdown-content singleArtist-dropdown-content"
            >
              <DropdownMenu.Item className="dropdown-item">
                <Link
                  to="/edit-lable"
                  // state={{ artistSocialItems }}
                  style={{
                    cursor: "pointer",
                    color: "#202020",
                    textDecoration: "none",
                  }}
                >
                  <GoPencil /> Edit Label
                </Link>
              </DropdownMenu.Item>
              <hr />

              <DropdownMenu.Item
                className="dropdown-item"
                onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing
              >
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <span>
                      <AiOutlineDelete /> Delete Lebel
                    </span>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="dialog-overlay" />
                    <Dialog.Content className="dialog-content">
                      <Modal title="Delete Artist Profile?">
                        <p className="modal-description">
                          Are you sure you want to delete this artist profile?
                          This action is irreversible, and all associated data,
                          including music releases and analytics, will be
                          permanently removed.
                        </p>
                        <br />
                        <div className="singleArtist-deleteModal-btns">
                          <Button>No</Button>
                          <Button>Yes, Delete</Button>
                        </div>
                      </Modal>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
        <div className="singleLabel-social-row">
          <div className="singleArtist-info" style={{ marginBottom: 0 }}>
            <h4>Total Releases</h4>
            <h1>122</h1>
            <Button className="singleArtist-pg-allRelease-btn">
              All Releases &nbsp;&nbsp; <ChevronRight />
            </Button>
          </div>
          <div className="singleArtist-social-div" style={{ marginBottom: 0 }}>
            <h4>label Profiles</h4>
            <div className="d-flex single-pg-social">
              {socialItems.map((item, index) => (
                <div key={index} className="social-div">
                  <img src={`src/assets/social/${item.img}`} alt={item.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* </> */}
        {/* ) : (
          <p>No artist found! Try selecting an label first.</p>
        )} */}
      </div>
      <h4
        style={{
          color: "#838383",
          fontSize: "20px",
          fontWeight: "500",
          margin: "24px 0 0 0",
        }}
      >
        Releases under this artist
      </h4>
      <div className="search-setion">
        <input type="text" placeholder="Search..." />
        {isMobile ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="dropdown-trigger"
                style={{
                  width: "56px",
                  justifyContent: "center",
                  marginRight: "0",
                }}
              >
                <HiOutlineAdjustmentsHorizontal
                  style={{ width: "24px", height: "24px" }}
                />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align="center"
              side="bottom"
              className="dropdown-content"
            >
              {dropdownItem}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          dropdownItem
        )}
      </div>
      <ReleaseCard releaseItems={releaseItems.slice(0, 5)} />
      <br />
      <br />
    </div>
  );
}
SingleLable.propTypes = {
  releaseItems: PropTypes.array.isRequired, // Ensure artistsItems is an array
};
export default SingleLable;
