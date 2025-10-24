import { useState } from "react";
import PropTypes from "prop-types";
import * as Popover from "@radix-ui/react-popover";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ChevronDown } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "./Modal";
import demoImg from '../assets/artists/artist4.png'
import CreateRelease from "../pages/Release/components/CreateRelease";
import { cdnLink } from "../hooks/cdnLink";
const SearchDropdownRelease = ({
  items,
  onSelect,
  value,
  searchTxt = "Search...",
}) => {
  // const [data, setData] = useState(items)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState(value ? value : []);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleItemClick = (item) => {
    if (
      !selectedItems.some(
        (selectedItem) => selectedItem._id === item._id
      )
    ) {
      setSelectedItems([...selectedItems, item]);
      const selectItem = [...selectedItems, item];
      onSelect(selectItem)
    }

    // Slight delay to ensure input is cleared properly
    setTimeout(() => {
      setSearchQuery("");
      setShowResults(false);
    }, 0);
  };
  const handleRemoveItem = (keyValue) => {
    const updatedItems = selectedItems.filter(
      (item) => item._id !== keyValue
    );
    setSelectedItems(updatedItems);
    onSelect(updatedItems);
  };

const filteredItems = items?.filter((item) =>  item.releaseTitle?.toLowerCase().includes(searchQuery.toLowerCase()));




  return (
    <div>
      <div style={{ display: "flex", position: "relative", width: "100%" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={searchTxt}
          className="service-modal-search"
        />
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="service-modal-search-trigger dropdown-trigger">
              <ChevronDown />
            </button>
          </Popover.Trigger>

          <Popover.Content className="popover-content">
            {items?.map((item, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleItemClick(item)}
              >
                <span>{item?.releaseTitle}</span>
              </div>
            ))}
          </Popover.Content>
        </Popover.Root>
        {/* Search results dropdown */}
        {searchQuery && showResults && (
          <div className="search-results-dropdown">
            {filteredItems?.length > 0 ? (
              filteredItems?.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleItemClick(item)}
                >
                  {/* <span>{item[itemKey]}</span> */}
                  <span>{item?.releaseTitle}</span>
                </div>
              ))
            ) : (
              <div className="searchDropdown-notFound-div">
                <p className="no-items">Release Not Found ?</p>
                  {/* <Dialog.Root open={artistIsOpen} onOpenChange={setArtistIsOpen}> */}
                  <Dialog.Root>
                    <Dialog.Trigger className="theme-btn">
                      Create New Release +
                    </Dialog.Trigger>
                    <Modal className="searchDropdown-modal-content">
                      <CreateRelease/>
                    </Modal>
                  </Dialog.Root>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Display selected items */}
      {value && (
        <div className="selected-items-list">
          <div className="selected-items">
            {value.map((item, index) => (
              <div key={index} className="selected-item">
                  <img
                    style={{borderRadius: '50%', objectFit: 'cover', objectPosition: 'center'}}
                    src={item?.key ? cdnLink(item?.key) : demoImg}
                    alt=''
                    className="item-image"
                  />
                <div className="item-details">
                  <p>{item?.releaseTitle}</p>
                  <small>{item?.artist?.map(artist => artist.artistName).join(', ')}</small>
                </div>
                <span onClick={() => handleRemoveItem(item._id)}>
                  <Cross1Icon />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Add PropTypes validation
SearchDropdownRelease.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      artistName: PropTypes.string,
      labelName: PropTypes.string,
      imgUrl: PropTypes.string,
      _id: PropTypes.string,
    })
  ).isRequired,
  itemKey: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  searchTxt: PropTypes.string,
  itemName: PropTypes.string,
};

export default SearchDropdownRelease;
