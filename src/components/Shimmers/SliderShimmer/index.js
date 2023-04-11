import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ViewPropTypes,
    Platform
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';
import PropTypes from 'prop-types';
import Shimmer from 'react-native-shimmer';

const SliderShimmer = (props) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // This Fixed ios not animating shimmers
        if (Platform.OS === 'android')
            return;
        setTimeout(() => {
            setLoading(true)
        }, 200)
    }, [])


    return (
        <Shimmer animating={Platform.OS === 'android' ? true : loading}>
            <View style={styles.container}>
            </View>
        </Shimmer>
    );
};

SliderShimmer.propTypes = {

};

SliderShimmer.defaultProps = {

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.MERCURY,
        width: '100%',
        height: Scale.moderateScale(140),
    }
});

export default SliderShimmer;