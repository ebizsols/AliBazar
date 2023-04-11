import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Scale, Languages, Constants } from 'common';
import { ScreenLoader } from 'components/UI';
import { SearchDialogHeader } from 'components';
import { clientHome } from 'api/client';

import NotFoundView from './NotFoundView';
import SearchItem from './SearchItem';
import { DeviceStorage } from 'services';
import { LazyHOC } from 'HOCs';
import axios from 'axios';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ArticleSearchDialogScreen = (props) => {

    const [searchResultGoods, setSearchResultGoods] = useState(null);
    const [filterText, setFilterText] = useState("");
    const [screenData, setScreenData] = useState({
        isLoading: false,
        canceltoken: null
    });

    const getSearchDialogSearchs = (filter) => {
        try {
            if (typeof screenData.canceltoken != typeof undefined && screenData.canceltoken != null) {
                screenData.canceltoken.cancel("[SearchDialogScreen] Operation canceled due to new request.");
            }
        } catch (error) {

        }


        const newCancelToken = axios.CancelToken.source();
        setScreenData({
            canceltoken: newCancelToken,
            isLoading: true
        });

        clientHome.helpAutoComplete(filter, newCancelToken)
            .then((response) => {
                if (response === undefined)
                    return;
                const res = response.data;

                let arr = [
                    { articleId: 9, subject: "ماذا يعني «eeeeeeeeeP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «OTP»؟", topic: "حسابي" },
                    { articleId: 9, subject: "ماذا يعني «PPPPP»؟", topic: "حسابي" },
                ];

                // console.log(arr);
                setSearchResultGoods(res.result);

                setScreenData((prev) => ({
                    ...prev,
                    isLoading: false
                }));
            }).catch((err) => {
                console.log('[SearchDialogScreen | getSearchDialogSearchs()]', err);
                setScreenData((prev) => ({
                    ...prev,
                    isLoading: false
                }));
            })
    };

    const onInputTextChangeHandler = (value) => {
        setFilterText(value);
        if (value?.length > 0) {
            getSearchDialogSearchs(value);
        }
        else {
            if (searchResultGoods?.length > 0) {
                setSearchResultGoods(null);
            }
        }
    };

    const onPressSearchItemHandler = (searchItem) => {
        props.navigation.navigate('ArticleDetail', { articleId: searchItem.articleId })
    };

    const handlerBackPress = () => {
        props.navigation.goBack();
    }

    return (
        <LazyHOC>
            <KeyboardAvoidingView
                behavior={'padding'}
                // style={{ flex: 1, backgroundColor: 'red' }}
                enabled={Platform.OS == 'ios'}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}
                    style={{ height: '100%' }} >
                    <View style={{ height: '100%' }}>
                        <SearchDialogHeader
                            backPressHandler={() => handlerBackPress()}
                            onTextChange={onInputTextChangeHandler} showBackIcon={true} />
                        <View style={[styles.container]}>
                            {screenData.isLoading == true && filterText.length > 0 ?
                                <ScreenLoader />
                                :
                                null}

                            {
                                searchResultGoods?.length > 0 && filterText.length > 0 ?
                                    <View>
                                        <FlatList
                                            keyboardShouldPersistTaps='handled'
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            data={searchResultGoods}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View>
                                                        <SearchItem
                                                            onPress={onPressSearchItemHandler}
                                                            data={item} />
                                                    </View>

                                                )
                                            }}
                                            keyExtractor={(item, index) => item.articleId.toString()}
                                            contentInset={{ // iOS ONLY
                                                top: 0,
                                                left: 0, // Left spacing for the very first card
                                                bottom: Scale.moderateScale(20),
                                                right: 0 // Right spacing for the very last card
                                            }}
                                            contentContainerStyle={{ // contentInset alternative for Android
                                                paddingBottom: Platform.OS === 'android' ? Scale.moderateScale(20) : 0 // Horizontal spacing before and after the ScrollView
                                            }}
                                        />
                                    </View>
                                    :
                                    null
                            }

                            {searchResultGoods?.length == 0 && filterText.length > 0 && screenData.isLoading == false ?
                                <View style={styles.notResultContainer}>
                                    <NotFoundView />
                                </View>
                                :
                                null
                            }

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </LazyHOC>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        // height: '90%',
        flex: 1,
        paddingHorizontal: Scale.moderateScale(15)
    },
    RecentSearchesSection: {

    },
    recentHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Scale.moderateScale(15),
        marginTop: Scale.moderateScale(15),
    },
    recentHeaderTitleText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE,
    },
    recentHeaderClearText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.LOCHMARA,
    },
    notResultContainer: {
        height: '100%',
        alignItems: "center",
        justifyContent: "center"
    }
});

export default ArticleSearchDialogScreen;