import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import {DiscoverAPI} from '../../../api';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  loadData = async (key, loadData) => {
    let data = await loadData()
    this.setState({ [key]: data });
  };

  componentDidMount = async () => {
    await this.loadData('newReleases', DiscoverAPI.getNewReleases);
    await this.loadData('playlists', DiscoverAPI.getFeaturedPlaylists);
    await this.loadData('categories', DiscoverAPI.getCategories);
  };

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}