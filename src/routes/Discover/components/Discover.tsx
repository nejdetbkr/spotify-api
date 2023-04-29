import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";

import axios from "axios";

//TODO: Fix `any` types here

interface IDiscoverProps {}

interface IDiscoverState {
  newReleases: ISpotify[];
  playlists: ISpotify[];
  categories: ISpotify[];
  token: string | undefined;
}

interface ISpotify {
  images: Image[];
  icons: Image[];
  name: string;
  [key: string]: Image[] | string;
}

interface Image {
  url: string;
}

export default class Discover extends Component<
  IDiscoverProps,
  IDiscoverState
> {
  constructor(props: IDiscoverProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      token: undefined,
    };
  }

  //TODO: Handle APIs

  // API Services
  api = async (url: string) => {
    axios
      .create({
        baseURL: process.env.REACT_APP_SPOTIFY_API_URL,
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          "Content-Type": "application/json",
        },
      })
      .request({
        method: "GET",
        url: url,
      })
      .then((response) => {
        switch (url) {
          case "/new-releases":
            this.setState({ newReleases: response.data.albums.items });
            console.log("newReleases", response.data.albums.items);
            break;
          case "/featured-playlists":
            this.setState({ playlists: response.data.playlists.items });
            console.log("playlists", response.data.playlists.items);
            break;
          default:
            this.setState({ categories: response.data.categories.items });
            console.log("categories", response.data.categories.items);
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount(): void {
    // API Access Token
    axios
      .create({
        baseURL: process.env.REACT_APP_SPOTIFY_ACCOUNTS_URL,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .request({
        method: "POST",
        url: "/token",
        data:
          "grant_type=client_credentials&client_id=" +
          process.env.REACT_APP_SPOTIFY_CLIENT_ID +
          "&client_secret=" +
          process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
      })
      .then((response) => {
        this.setState({ token: response.data.access_token });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(
    prevProps: Readonly<IDiscoverProps>,
    prevState: Readonly<IDiscoverState>,
    snapshot?: any
  ): void {
    if (prevState.token !== this.state.token) {
      this.api("/new-releases");
      this.api("/featured-playlists");
      this.api("/categories");
    }
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
