import { useState } from "react";
import Select from "react-select";
import { BsSearch } from "react-icons/bs";

function Menu({
  surveys,
  allSurveys,
  userSurveys,
  onlyActive,
  onlyInActive,
  wordsToSearch,
  handleChange,
  searchSurvey,
  sortArr,
  sortBy,
}) {
  const [open, setOpen] = useState(false);

  const selectStyles = (open) => ({
    singleValue: (provided) => ({ ...provided, color: "#666" }),
    menu: (provided) => ({
      ...provided,
      marginTop: 0,
      borderwidth: 10,
      fontSize: 12,
      height: open ? "208px" : "0px",
      overflow: "hidden",
      opacity: open ? 1 : 0,
      transition: "all 0.5s ease-in-out",
      visibility: open ? "visible" : "hidden",
    }),
  });
  const options = [
    { value: "1", label: "Upload date (oldest to newest)" },
    { value: "2", label: "Upload date (newest to oldest)" },
    { value: "3", label: "Number of participant (high to low)" },
    { value: "4", label: "Number of participant (low to high)" },
    { value: "5", label: "Expired date (early to later)" },
    { value: "6", label: "Expired date (later to early)" },
  ];

  return (
    <div className="menu">
      <div className="div-options">
        <button onClick={allSurveys} className={surveys.classAll}>
          All Surveys
        </button>
        <button onClick={userSurveys} className={surveys.classMy}>
          My Surveys
        </button>
      </div>

      <div className="div-options">
        <button
          onClick={onlyActive}
          className={surveys.active ? "clicked" : "default"}
        >
          Active Surveys
        </button>
        <button
          onClick={onlyInActive}
          className={surveys.inActive ? "clicked" : "default"}
        >
          Inactive Surveys
        </button>
      </div>

      <div className="div-search">
        <input
          type="text"
          name="search"
          value={wordsToSearch}
          onChange={handleChange}
          placeholder="Survey search"
          className="shadow-none searchInput"
        />
        <button className="button-search" onClick={searchSurvey}>
          <BsSearch className="icon-search" />
        </button>
      </div>
      <div
        className="div-sortBy"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Select
          placeholder={options[sortArr - 1].label}
          onChange={sortBy}
          value={sortArr}
          options={options}
          isSearchable={false}
          onBlur={() => setOpen(false)}
          menuIsOpen
          styles={selectStyles(open)}
          className="select-main"
        />
      </div>
    </div>
  );
}

export default Menu;
