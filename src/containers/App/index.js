/* @flow */
/**
 * Main application component, handles the routing.  
 */
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Image, View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import backgroundImg from '../../images/bg.jpg';
import Playground from '../../containers/Playground';
import Trivia from '../../containers/Trivia';
import Scoreboard from '../../containers/Scoreboard';
import Story from '../../containers/Story';
import Home from '../../containers/Home';
import Endgame from '../../containers/Endgame';
import styles from './index.style';

type Props = {
  currentScreen: string,
};

@inject(allStores => ({
  currentScreen: allStores.router.currentScreen,
}))
@observer
export default class App extends Component<Props, Props, void> {
  static defaultProps = {
    currentScreen: 'HOME',
  };

  render() {
    let content;
    switch (this.props.currentScreen) {
      case 'HOME':
        content = <Home />;
        break;
      case 'PLAYGROUND':
        content = <Playground />;
        break;
      case 'ENDGAME':
        content = <Endgame />;
        break;
      case 'STORY':
        content = <Story />;
        break;
      case 'TRIVIA':
        content = <Trivia />;
        break;
      case 'SCOREBOARD':
        content = <Scoreboard />;
        break;
      default:
        content = <View />;
        break;
    }
    return (
      <Image source={backgroundImg} style={styles.container}>
        <StatusBar hidden={true} />
        {content}
      </Image>
    );
  }
}
