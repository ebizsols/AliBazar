import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Scale, Languages } from 'common';

import SearchIcon from 'assets/icons/search-with-close.svg';

const NotFoundView = (props) => {

    return (
        <View style={styles.container}>
            <SearchIcon
                width={Scale.moderateScale(50)}
                height={Scale.moderateScale(50)} />
            <Text style={styles.firstText}>{Languages.Common.NoResultsFound}</Text>
            <Text style={styles.secText}>{Languages.Common.TryWithDifferentWords}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    firstText: {
        marginTop: Scale.moderateScale(15),
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.FIORD,
    },
    secText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD,
    }
});

export default NotFoundView;