/* @flow */
/**
 * This components just renders the tiles in their correct positions.
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native-animatable';
import {FlatList} from 'react-native';
import type { Tile } from '../../../types';
import { observer } from 'mobx-react/native';
import BoardTile from '../../../containers/Playground/BoardTile';
import QuestionsGroupA from '../Questions/age5to10';
import styles from './index.style';

type Props = {
  tiles: Array<Tile>,
  onTilePress: (tileId: any) => any,
  isEnabled: boolean,
  questions: Array<QuestionsGroupA>,
};

@observer
export default class TilesCarousel extends Component<void, Props, void> { 

  _tileRefs = [];
  
  constructor()
  {
    super();
    this.state={questions: [
      {question:"If you freeze water, you get what?", options:["Ice", "Water", "Steam", "None"]},
      {question:"Which ocean is off the California coast?", options: ["Pacific Ocean", "Indian Ocean", "Atlantic Ocean", "Arctic Ocean"]},
      {question:"Evaluate '(12 * 9) / 0' ", options: ["0", "108", "Division not possible 0", "Infinity"]},
      {question:"How many planets are in our solar system?", options: ["9", "8", "10", "7"]},
      {question:"Which would be most attracted to a magnet? ", options: ["Copper", "Iron", "Aluminium", "Steel"]}
    ]}
  }
  
  animateFailure = () => {
    this._tileRefs.forEach(ref => {
      if (ref) {
        ref.animateFailure();
      }
    });
  };

  render() {
    
    this._tileRefs = [];
    return (
      <FlatList
        data={[
      {question:"If you freeze water, you get what?", options:["Ice", "Water", "Steam", "None"]},
      {question:"Which ocean is off the California coast?", options: ["Pacific Ocean", "Indian Ocean", "Atlantic Ocean", "Arctic Ocean"]},
      {question:"Evaluate '(12 * 9) / 0' ", options: ["0", "108", "Division not possible 0", "Infinity"]},
      {question:"How many planets are in our solar system?", options: ["9", "8", "10", "7"]},
      {question:"Which would be most attracted to a magnet? ", options: ["Copper", "Iron", "Aluminium", "Steel"]}
    ]}
        renderItem={({item}) =>
        <View>
          <Text>{item.question}</Text>
          <Text>{item.options}</Text>
        </View>
        }
      />
    ) 
  }
}

  


