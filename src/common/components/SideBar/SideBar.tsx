import React from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faHeadphonesAlt,
  faHeart,
  faPlayCircle,
  faSearch,
  faStream,
} from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Avatar } from "../../../assets/images/avatar.svg";
import "./_sidebar.scss";

//TODO: Fix types here
interface ISelected {
  selected: boolean;
}

const renderSideBarOption = (
  link: string,
  icon: IconDefinition,
  text: string,
  { selected } = {} as ISelected
) => {
  return (
    <div
      className={cx("sidebar__option", {
        "sidebar__option--selected": selected,
      })}
    >
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  );
};

export default class SideBar extends React.Component {
  render = () => (
    <div className="sidebar">
      <div className="sidebar__profile">
        <Avatar />
        <p>Bob Smith</p>
      </div>
      <div className="sidebar__options">
        {renderSideBarOption("/", faHeadphonesAlt, "Discover", {
          selected: true,
        })}
        {renderSideBarOption("/search", faSearch, "Search")}
        {renderSideBarOption("/favourites", faHeart, "Favourites")}
        {renderSideBarOption("/playlists", faPlayCircle, "Playlists")}
        {renderSideBarOption("/charts", faStream, "Charts")}
      </div>
    </div>
  );
}
