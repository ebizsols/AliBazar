import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { Typography, Colors } from 'styles';
import { Scale, Languages, Constants } from 'common';
import { ScreenLoader } from 'components/UI';
import { SearchDialogHeader } from 'components';
import { clientHome } from 'api/client';

import RecentSearchItem from './RecentSearchItem';
import NotFoundView from './NotFoundView';
import SearchItem from './SearchItem';
import { DeviceStorage } from 'services';
import { LazyHOC } from 'HOCs';
import axios from 'axios';

const SearchDialogScreen = (props) => {

    const [searchResultGoods, setSearchResultGoods] = useState(null);
    const [recentSearchGoods, setRecentSearchGoods] = useState(null);
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

        clientHome.getSearchDialogSearchs(filter, newCancelToken)
            .then((response) => {
                const res = response.data;

                setSearchResultGoods(res.result.goods);

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

    const getRecentSearchedHanler = () => {
        DeviceStorage.getJsonData(Constants.StorageKeys.SearchDialogItems)
            .then((res) => {
                setRecentSearchGoods(res);
            })
    };

    const clearRecentSearchesHandler = () => {
        DeviceStorage.clearItem(Constants.StorageKeys.SearchDialogItems);
        setRecentSearchGoods([]);
    };

    const onPressSearchItemHandler = (searchItem) => {
        searchItem.filter = filterText;
        // Add item to recent searches (just 5 item)
        DeviceStorage.getJsonData(Constants.StorageKeys.SearchDialogItems).
            then((res) => {
                const findIndex = res?.findIndex(x => x.goodsId == searchItem.goodsId);
                if (Array.isArray(res) && res?.length > 0) {
                    if (res.length == 5) {
                        if (findIndex == -1) {
                            res.splice(res.length - 1, 1);
                            res.unshift(searchItem);
                            DeviceStorage.storeJsonData(Constants.StorageKeys.SearchDialogItems, res);
                        } else {
                            res.splice(findIndex, 1);
                            res.unshift(searchItem);
                            DeviceStorage.storeJsonData(Constants.StorageKeys.SearchDialogItems, res);
                        }
                    } else {
                        if (findIndex == -1) {
                            res.unshift(searchItem);
                            DeviceStorage.storeJsonData(Constants.StorageKeys.SearchDialogItems, res);
                        } else {
                            res.splice(findIndex, 1);
                            res.unshift(searchItem);
                            DeviceStorage.storeJsonData(Constants.StorageKeys.SearchDialogItems, res);
                        }
                    }
                } else {
                    const recentSearchArray = [];
                    recentSearchArray.push(searchItem);
                    DeviceStorage.storeJsonData(Constants.StorageKeys.SearchDialogItems, recentSearchArray)
                }
            });

        props.navigation.navigate('Search', { filter: filterText, type: Constants.SearchScreenTypes.Search, id: searchItem.categoryId });
    };

    const onPressRecentItemHandler = (recentItem) => {
        props.navigation.navigate('Search', { filter: recentItem.filter, type: Constants.SearchScreenTypes.Search, id: recentItem.categoryId });
    };

    const removeRecentSearchItemHandler = (recentSearchItem) => {
        DeviceStorage.getJsonData(Constants.StorageKeys.SearchDialogItems).
            then((res) => {
                const findIndex = res?.findIndex(x => x.goodsId == recentSearchItem.goodsId);
                if (findIndex != -1) {
                    res.splice(findIndex, 1);
                    DeviceStorage.storeJsonData(Constants.StorageKeys.SearchDialogItems, res)
                }

                const findIndexInRecentSearchesGoodsState = recentSearchGoods.findIndex(x => x.goodsId == recentSearchItem.goodsId);
                if (findIndexInRecentSearchesGoodsState != -1) {
                    const temp = [...recentSearchGoods];
                    temp.splice(findIndexInRecentSearchesGoodsState, 1);
                    setRecentSearchGoods(temp);
                }
            });
    };

    const handlerBackPress = () => {
        props.navigation.goBack();
    }

    useEffect(() => {
        getRecentSearchedHanler();
    }, []);

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
                        <View style={styles.container}>
                            {
                                recentSearchGoods?.length > 0 && filterText.length == 0 ?
                                    <View style={styles.RecentSearchesSection}>
                                        <View style={styles.recentHeaderContainer}>
                                            <Text style={styles.recentHeaderTitleText}>{Languages.SearchDialog.RecentSearches}</Text>
                                            <TouchableOpacity onPress={clearRecentSearchesHandler}>
                                                <Text style={styles.recentHeaderClearText}>{Languages.Common.ClearAll}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <FlatList
                                                keyboardShouldPersistTaps='handled'
                                                showsHorizontalScrollIndicator={false}
                                                data={recentSearchGoods}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <View>
                                                            <RecentSearchItem
                                                                onPress={onPressRecentItemHandler}
                                                                onRemovePress={removeRecentSearchItemHandler}
                                                                data={item} />
                                                        </View>
                                                    )
                                                }}
                                                keyExtractor={(item, index) => item.goodsId.toString() + '-' + item.title}
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
                                    </View>
                                    :
                                    null
                            }

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
                                            keyExtractor={(item, index) => item.goodsId.toString() + '-' + item.title}
                                            contentInset={{ // iOS ONLY
                                                top: 0,
                                                left: 0, // Left spacing for the very first card
                                                bottom: Scale.moderateScale(80),
                                                right: 0 // Right spacing for the very last card
                                            }}
                                            contentContainerStyle={{ // contentInset alternative for Android
                                                paddingBottom: Platform.OS === 'android' ? Scale.moderateScale(80) : 0 // Horizontal spacing before and after the ScrollView
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
        // height: '100%',
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

export default SearchDialogScreen;