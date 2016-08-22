import React from 'react';
import {
  Container,
  List,
  NavBar,
  Group,
  View,
  Slider,
  Badge
} from 'amazeui-touch';
import {
  Link,
} from 'react-router';

export default class Index extends React.Component {
  static defaultProps = {
    transition: 'rfr'
  };

  constructor(props) {
    super(props);
    this.state = {
      albums: []
    };
    $.getJSON('http://yulonh.com/api/games?filter=%7B%22where%22:%7B%7D,%22order%22:%22popularity%20DESC%22%7D', (list)=>this.setState({albums: list}));
  }

  render() {
    return (
      <Container scrollable={true}>
        <Slider controls={false}>
          {this.state.albums.slice(0, 4).map((album, i)=> {
            return <Slider.Item key={i}>
              <a href={album.link}>
                <div className="slider-img">
                  <img src={album.cover}/>
                </div>
              </a>
            </Slider.Item>
          })}
        </Slider>
        <List className="margin-v-xs">
          {this.state.albums.map((album)=> {
            return {
              title: <strong>{album.name}</strong>,
              subTitle: <div><span className="text-warning">约{album.time}分钟</span></div>,
              desc: album.desc,
              href: album.link,
              media: <img width="180" src={album.cover}/>,
              after: <Badge amStyle="primary">{album.time * 2}元/次</Badge>
            };
          }).map((album, i) => {
            return (
              <List.Item
                {...album}
                target="_blank"
                key={i}
              />
            );
          })}
        </List>
      </Container>
    );
  }
}
