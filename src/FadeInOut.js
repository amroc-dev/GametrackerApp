import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';

export const DEFAULT_DURATION = 250;

export default class FadeInOut extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    visible: PropTypes.bool.isRequired,
    onFadedIn: PropTypes.func,
    duration: PropTypes.number,
    style: PropTypes.object,
  };

  state = {
    fadeAnim: new Animated.Value(this.props.visible ? 1 : 0),
  };

  componentDidUpdate(prevProps) {
    const {duration} = this.props;

    if (prevProps.visible !== this.props.visible) {
      Animated.timing(this.state.fadeAnim, {
        toValue: prevProps.visible ? 0 : 1,
        duration: duration ? duration : DEFAULT_DURATION,
        useNativeDriver: true,
      }).start(() => {if (this.props.onFadeComplete) this.props.onFadeComplete()});
    }
  }

  render() {
    const {fadeAnim} = this.state;
  
    return (
      <Animated.View style={{...this.props.style, opacity: fadeAnim}}>
        {this.props.children}
      </Animated.View>
    );
  }
}