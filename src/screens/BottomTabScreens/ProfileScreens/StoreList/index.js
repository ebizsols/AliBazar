/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    FlatList,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { clientForm, clientHome } from 'api/client';
import { LazyHOC } from 'HOCs';
import BottomSheet from 'reanimated-bottom-sheet';
import LottieView from 'lottie-react-native';

import styles from './style'

import {
    FilterHeader,
    SearchHeader,
    BottomSheetHeader,
    BottomSheetBackView,
    ProductRowShimmer,
    StoreListHeader,
    StoreItemShimmer
} from 'components';
import { ProductItem, TextWithRadio, ScreenLoader } from 'components/UI';
import { Constants, Languages, Scale, Tools } from 'common';

import Animated, { Easing } from 'react-native-reanimated';
import FilterModal from 'components/Modals/FilterModal';
import NotFoundIcon from 'assets/icons/not-found.svg';
const { Value, timing } = Animated;
import axiosClient from 'api/axios';
import StoreItem from './StoreItem';
import StoreListFilterHeader from './StoreListFilterHeader';
import axios from 'axios';
import StoreFilterModal from './StoreFilterModal';

const filterHeaderHeight = Scale.moderateScale(40);

const sortsDataUsedForLength = Tools.getStoreListSortTypes();


const StoreListScreen = (props) => {

    const currency = axiosClient.getCurrency();

    // const { filter, type, id } = props.route.params;
    // console.log('filter', filter);
    // console.log('type', type);
    // console.log('id', id);

    const [_scroll_y, set_scroll_y] = useState(new Value(0));
    const childRef = useRef();
    const filterModalRef = useRef();
    const bottomSheetRef = useRef(null);

    const [fall, setFall] = useState(new Animated.Value(1));
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedSort, setSelectedSort] = useState(null);
    const [filterCount, setFilterCount] = useState(0);
    const [stores, setStores] = useState([]);

    const [isLoading, setIsLoading] = useState(null);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const [showShimmer, setShowShimmer] = useState(false);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
    const [shouldLoadMore, setShouldLoadMore] = useState(true);
    const [isInputChanged, setIsInputChanged] = useState(false);

    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);

    const [canceltoken, setCanceltoken] = useState(true);

    const [filterModel, setFilterModel] = useState({
        storeName: null,
        sort: 0,
        categoryId: null,
        countryId: null,
        provinceId: null,
        cityId: null,
        pageNumber: 1,
        pageSize: 50
    });

    const onApplyPressHandler = (selectedIds) => {

        // setFilterCount(filterCount);


        const tempFilterModel = { ...filterModel };

        // if (selectedIds.categoryId != null) {
        tempFilterModel.categoryId = selectedIds.categoryId;
        // }

        if (selectedIds.countryId != null) {
            tempFilterModel.countryId = selectedIds.countryId;
        } else {
            tempFilterModel.countryId = selectedIds.countryId;
        }

        // if (selectedIds.cityId != null) {
        tempFilterModel.cityId = selectedIds.cityId;
        // }

        tempFilterModel.provinceId = selectedIds.provinceId;

        tempFilterModel.pageNumber = 1;

        setFilterModel(tempFilterModel);

        getShopList(tempFilterModel, true);
        setFilterModalVisible(false);
    }

    const getShopList = (filterModel, resetData = false) => {
        console.log(filterModel);
        try {
            if (typeof canceltoken != typeof undefined && canceltoken != null) {
                canceltoken.cancel("[StoreList] Operation canceled due to new request.");
            }
        } catch (error) {

        }

        const newCancelToken = axios.CancelToken.source();
        setCanceltoken(newCancelToken);

        if (resetData == true)
            setShowShimmer(true);
        setIsLoading(true);
        // console.log(filterModel);
        clientHome.getShopList(filterModel, newCancelToken)
            .then((response) => {
                const res = response.data;

                // console.log(res.result.data);

                setStores(resetData ? res.result.data : stores.concat(res.result.data));

                setIsLoading(false);
                if (resetData == true) {
                    setShowShimmer(false);
                    setShouldLoadMore(true);
                }
                if (res.result.data.length < filterModel.pageSize) {
                    setShouldLoadMore(false);
                }

            }).catch((err) => {
                console.log('err', err);
                if (resetData == true)
                    setShowShimmer(false);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getShopList(filterModel, true);
        getAciveCountries();
        getParentAcitveCategory();
    }, []);

    const onSelectSortPresshandler = () => {
        bottomSheetRef.current.snapTo(0)
    }

    const onFilterPressHandler = () => {
        const tempData = JSON.parse(JSON.stringify(filterModel));
        filterModalRef.current.setSelectedData(tempData.categoryId, tempData.countryId, tempData.cityId);
        setFilterModalVisible(!filterModalVisible);
    }

    const closeFilterModalHandler = () => {
        setFilterModalVisible(false);
    }

    const _diff_clamp_scroll_y = Animated.diffClamp(_scroll_y, 0, filterHeaderHeight)

    const _filter_header_height = Animated.interpolate(_diff_clamp_scroll_y, {
        inputRange: [0, filterHeaderHeight],
        outputRange: [filterHeaderHeight, 0],
        extrapolate: 'clamp'
    })

    const filter_header_translate_y = Animated.interpolate(_diff_clamp_scroll_y, {
        inputRange: [0, filterHeaderHeight],
        outputRange: [0, -filterHeaderHeight],
        extrapolate: 'clamp'
    })

    const _filter_header_opacity = Animated.interpolate(_diff_clamp_scroll_y, {
        inputRange: [0, filterHeaderHeight],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })

    const closeEnd = () => {
        childRef.current.closeEnd()
    };

    const openEnd = () => {
        childRef.current.openEnd()
    };

    const backPresshandler = () => {
        props.navigation.goBack();
    }

    const onChangeSortHandler = (item) => {
        setSelectedSort(item);

        const tempFilterModel = { ...filterModel }
        tempFilterModel.sort = item.id;
        tempFilterModel.pageNumber = 1;

        setFilterModel(tempFilterModel);
        bottomSheetRef.current.snapTo(1)
        childRef.current.closeEnd();
        getShopList(tempFilterModel, true);
    }

    const onInputTextChangeHandler = (value) => {
        const tempFilter = { ...filterModel };
        tempFilter.storeName = value;
        setFilterModel(tempFilter);

        if (isInputChanged === true)
            getShopList(tempFilter, true);
        else {
            if (isInputChanged === false) {
                setIsInputChanged(true);
            }
        }
    };

    const RenderContent = () => {

        const sortsData = Tools.getStoreListSortTypes();

        return (
            <View style={styles.bottomSheetContentContainer}>
                <View style={styles.sortByContainer}>
                    <Text style={styles.sortByText}>{Languages.Sorts.SortBy}</Text>
                </View>
                {
                    sortsData.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.bottomSheetItem} onPress={() => onChangeSortHandler(item)} key={index}>
                                <View style={styles.sortItemContainer}>
                                    <TextWithRadio
                                        isSelected={item.id == selectedSort?.id}
                                        onPress={() => onChangeSortHandler(item)}
                                        title={item.title} />
                                </View>
                                {index != sortsData.length - 1 ?
                                    <View style={styles.bottomSheetItemLine}></View>
                                    :
                                    null
                                }
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    };

    const loadMoreHandler = () => {
        console.log('load moree...');
        if (shouldLoadMore) {
            console.log('make request in load more');
            const tempFilterModal = { ...filterModel };
            tempFilterModal.pageNumber = tempFilterModal.pageNumber + 1;
            setFilterModel(tempFilterModal);

            getShopList(tempFilterModal);
        }

        // if (!onEndReachedCalledDuringMomentum && shouldLoadMore) {
        //     console.log('Load more send request...');
        //     const tempFilterModal = {...filterModel};
        //     tempFilterModal.pageNumber = tempFilterModal.pageNumber + 1;
        //     console.log(tempFilterModal);
        //     setFilterModel(tempFilterModal);

        //     getShopList(tempFilterModal);
        // }
    };

    const EmptyView = () => {
        return (
            <View style={[styles.emptyViewContainer, {

            }]}>
                <NotFoundIcon
                    width={Scale.moderateScale(200)}
                    height={Scale.moderateScale(200)}
                />
                <Text style={styles.emptyViewText}>{Languages.Common.NothingFound}</Text>
            </View>
        )
    };

    const RenderFooter = () => {
        // if (isLoading == false) {
        //     return null;
        // }
        return (
            <View style={[styles.footerLoaderContainer, isLoading == false ? { opacity: 0 } : {}]} >
                <LottieView
                    imageAssetsFolder="lottie"
                    style={styles.lottie}
                    autoPlay={true}
                    loop={true}
                    speed={1}
                    // resizeMode='cover'
                    source={require('./../../../../assets/animations/pagination-loader.json')}
                />
            </View>
        )
    }

    const getAciveCountries = () => {
        setIsLoadingModal(true);
        clientForm.getAciveCountries()
            .then((response) => {
                const res = response.data;
                setCountries(res.result);
                setIsLoadingModal(false);
            }).catch(() => {
                setIsLoadingModal(false);
            });
    };

    const getActiveCities = (countryId) => {
        setIsLoadingModal(true);
        clientForm.getActiveCities(countryId)
            .then((response) => {
                const res = response.data;
                setCities(res.result);
                setIsLoadingModal(false);
            }).catch(() => {
                setIsLoadingModal(false);
            });
    };

    const getParentAcitveCategory = () => {
        setIsLoadingModal(true);
        clientForm.getParentAcitveCategory()
            .then((response) => {
                const res = response.data;
                setCategories(res.result);
                setIsLoadingModal(false);
            }).catch(() => {
                setIsLoadingModal(false);
            });
    };

    const countryChangedHandler = (countryId) => {
        // console.log(countryId);
        if (countryId == null) {
            setProvinces([]);
            return
        };
        getActiveProvinces(countryId);
    }

    const getActiveProvinces = (countryId) => {
        setIsLoadingModal(true);
        clientForm.getActiveProvince(countryId)
            .then((response) => {
                const res = response.data;
                console.log(res.result);
                let result = res.result;
                setProvinces(result);
                setIsLoadingModal(false);
            }).catch((err) => {
                console.log(err);
                setIsLoadingModal(false);
            });
    };

    const provinceChangedHandler = (provinceId) => {
        // console.log(countryId);
        if (provinceId == null) {
            setCities([]);
            return;
        };
        getActiveCities(provinceId);
    }

    const onVisitStorePressHandler = (store) => {
        // console.log(store);
        props.navigation.navigate('Provider', { storeName: store.vendorUrlid, type: 2 });
    };

    return (
        <LazyHOC>
            <StoreListHeader backPressHandler={() => backPresshandler()}
                onTextChange={onInputTextChangeHandler} showBackIcon={true} />

            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.header,
                        {
                            height: _filter_header_height,
                            transform: [{ translateY: filter_header_translate_y }],
                            opacity: _filter_header_opacity
                        }
                    ]}>
                    <StoreListFilterHeader
                        filterCount={filterCount}
                        selectedSort={selectedSort}
                        onFilterPress={onFilterPressHandler}
                        onSelectSortPress={onSelectSortPresshandler}
                    // showType={flatListSettingData.itemShowType}
                    // onChangeShowTypePress={onChangeShowTypeHandler}
                    />
                </Animated.View>

                {showShimmer == true ?
                    <View style={styles.shimmerPlaceHolderWrapper}>
                        <StoreItemShimmer />
                    </View>
                    :
                    null}

                {isLoading != null && showShimmer == false && stores?.length > 0 ?
                    <FlatList
                        data={stores}
                        keyExtractor={(item) => item.shopId.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.storeItemContainer}>
                                    <StoreItem onVisitStorePress={onVisitStorePressHandler} data={item} />
                                </View>
                            )
                        }}
                        // renderScrollComponent={(props) => <ScrollView
                        //     bounces={false}
                        //     scrollEventThrottle={5}
                        //     {...props}
                        // />}
                        // renderScrollComponent={(props) => <Animated.ScrollView
                        //     bounces={false}
                        //     scrollEventThrottle={5}
                        //     {...props}
                        //     onScroll={Animated.event([
                        //         {
                        //             nativeEvent: { contentOffset: { y: _scroll_y } }
                        //         }
                        //     ])} />}
                        onEndReached={loadMoreHandler}
                        onEndReachedThreshold={0.5}
                        onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false); }}
                        contentInset={{ // iOS ONLY
                            top: 0,
                            left: 0, // Left spacing for the very first card
                            bottom: Scale.moderateScale(80),
                            right: 0 // Right spacing for the very last card
                        }}
                        ListFooterComponent={<RenderFooter />}
                        contentContainerStyle={{ // contentInset alternative for Android
                            paddingBottom: Platform.OS === 'android' ? Scale.moderateScale(80) : 0, // Horizontal spacing before and after the ScrollView
                            paddingTop: Platform.OS === 'android' ? filterHeaderHeight : filterHeaderHeight // Horizontal spacing before and after the ScrollView
                        }}
                    />
                    :
                    null
                }
                {isLoading != null && showShimmer == false && stores?.length == 0 ?
                    <EmptyView />
                    :
                    null
                }
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                initialSnap={1}
                snapPoints={[sortsDataUsedForLength?.length * Scale.verticalScale(55) + Scale.verticalScale(60), 0]}
                onCloseEnd={closeEnd}
                onOpenEnd={openEnd}
                callbackNode={fall}
                renderHeader={() => <BottomSheetHeader />}
                renderContent={() => <RenderContent />}
            />

            <BottomSheetBackView
                bottomSheetRef={bottomSheetRef} ref={childRef}
                fall={fall} />

            <StoreFilterModal
                ref={filterModalRef}
                currency={currency}
                onApplyPressHandler={onApplyPressHandler}
                countries={countries}
                provinces={provinces}
                cities={cities}
                categories={categories}
                countryChanged={countryChangedHandler}
                provinceChanged={provinceChangedHandler}
                // specs={JSON.parse(JSON.stringify(stores.specs))}
                // brands={JSON.parse(JSON.stringify(stores.brands))}
                // childCategory={JSON.parse(JSON.stringify(stores.childCategory))}
                // maxPrice={}
                onRequestClose={closeFilterModalHandler}
                onCloseModal={closeFilterModalHandler}
                visible={filterModalVisible} />
        </LazyHOC>
    );
};

export default StoreListScreen;