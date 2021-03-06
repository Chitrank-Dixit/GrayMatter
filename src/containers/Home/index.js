/* @flow */
/**
 * The Home screen.
 * It's a simple screen, but it might seem complex in some part only because of animations.
 */
import React, { Component } from 'react';
import { LayoutAnimation, TextInput, Text } from 'react-native';
import { Image, View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Tile from '../../components/Tile';
import LogoImage from '../../images/logo.png';
import boardUtils from '../../utils/boardUtils';
import audioService from '../../services/audio';
import styles from './index.style';

type Props = {
  navigateToPlayground: () => any,
  navigateToEndgame: () => any,
};

type State = {
  tileNumber: number,
  tileColor: string,
  hasHeaderAppeared: boolean,
  hasPressedButton: boolean,
};

@inject(allStores => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  navigateToEndgame: allStores.router.navigateToEndgame,
  navigateToTrivia: allStores.router.navigateToTrivia,
}))
@observer
export default class App extends Component<Props, Props, State> {
  static defaultProps = {
    navigateToPlayground: () => null,
    navigateToEndgame: () => null,
    navigateToTrivia: () => null
  };

  _headerRef: any;
  _bodyRef: any;

  state = {
    tileNumber: 3,
    tileColor: boardUtils.getRandomTileColor(),
    hasHeaderAppeared: false,
    hasPressedButton: false,
    ageText: "Enter your age",
    age: "",
  };

  componentDidMount() {
    if (this._headerRef) {
      this._headerRef.bounceInRight(1000).then(() => {
        LayoutAnimation.spring();
        this.setState({ hasHeaderAppeared: true });
      });
    }
  }

  _handleTilePress = () => {
    const { tileNumber, tileColor } = this.state;
    this.setState({
      tileNumber: tileNumber === 99 ? 1 : tileNumber + 1,
      tileColor: boardUtils.getRandomTileColor([tileColor]),
    });

    
  };

  _handleButtonPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToPlayground();
  };

  _handleButtonPressQuiz = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    let age = parseInt(this.state.age);
    if ((age >= 5) && (age <=10)) {
      this.props.navigateToTrivia();
    }
    else if ((age >= 11) && (age <=15))
    { 
      this.props.navigateToPlayground();
    }
    else if ((age >= 16) && (age <=17))
    {
      this.props.navigateToPlayground();
    }
    else if ((age >= 18) && (age <=25))
    {
      this.props.navigateToPlayground();
    }
    else if ((age >= 25) && (age <=35))
    {
      this.props.navigateToPlayground();
    }

    //this.props.navigateToPlayground();
  };

  

  render() {
    const { tileNumber, tileColor, hasHeaderAppeared, hasPressedButton } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={styles.header}
          ref={ref => {
            this._headerRef = ref;
          }}
        >
          

          
        </View>

        <View>
          <TextInput style={styles.headerJustify}
            style={{height: 40}}
            placeholder="Enter yor age to begin!"
            onChangeText={(age) => this.setState({age})}
            value={this.state.age}
          />
        </View>

        {hasHeaderAppeared &&
          <View
            style={styles.body}
            ref={ref => {
              this._bodyRef = ref;
            }}
          >
            <Tile
              backgroundColor={tileColor}
              text={'Start Quiz'}
              style={styles.button}
              textStyle={styles.buttonText}
              onPressOut={this._handleButtonPressQuiz}
              isEnabled={!hasPressedButton}
              playSound={audioService.playButtonSound}
            />

            <Tile
              backgroundColor={tileColor}
              text={'Cooling Break'}
              style={styles.button}
              textStyle={styles.buttonText}
              onPressOut={this._handleButtonPress}
              isEnabled={!hasPressedButton}
              playSound={audioService.playButtonSound}
            />
          </View>}
      </View>
    );
  }
}
