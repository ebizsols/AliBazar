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
    ScrollView,
    Keyboard
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
    ProductRowShimmer
} from 'components';
import { ProductItem, TextWithRadio, ScreenLoader } from 'components/UI';
import { Constants, Languages, Scale, Tools } from 'common';

import Animated, { Easing } from 'react-native-reanimated';
import FilterModal from './../../../components/Modals/FilterModal';
import NotFoundIcon from 'assets/icons/not-found.svg';
const { Value, timing } = Animated;
import axiosClient from 'api/axios';
import Axios from 'axios';
import { CommonActions } from '@react-navigation/native';

const filterHeaderHeight = Scale.moderateScale(40);

const sortsDataUsedForLength = Tools.getSortTypes(); // not worked for language


const SearchScreen = (props) => {

    const currency = axiosClient.getCurrency();

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const { filter, type, id } = props.route.params;
    // console.log('=======================================');
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
    const [screenData, setScreenData] = useState({
        goods: [],
        specs: null,
        brands: null,
        childCategory: null,
        maxPrice: null,
        highPrice: 0,
        lowPrice: 0,
        allGoodsCount: 0
    });

    const [isLoading, setIsLoading] = useState(null);
    const [showShimmer, setShowShimmer] = useState(false);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
    const [shouldLoadMore, setShouldLoadMore] = useState(true);

    const [filterModel, setFilterModel] = useState({
        brandId: [],
        fromPrice: 0,
        getAllCount: true,
        getBrand: true,
        getChild: true,
        getMaxPrice: true,
        getParent: true,
        getSpecs: true,
        goodsCreatedDay: 0,
        id: id || 0,
        justExist: false,
        optionIds: [],
        orderByType: 0,
        pageNumber: 1,
        pageSize: 50,
        search: filter || null,
        toPrice: 0,
        type: type
    });

    const [filterBrandsModel, setFilterBrandsModel] = useState({
        pageSize: 50,
        pageNumber: 1,
        id: null,
        filter: null,
        brandIds: []
    });
    const [isAnyMoreBrands, setIsAnyMoreBrands] = useState(true);
    const [isLoadingBrands, setIsLoadingBrands] = useState(false);
    const [brandSearchText, setBrandSearchText] = useState(null);
    const [canceltoken, setCanceltoken] = useState(true);

    const onApplyPressHandler = (filterModalScreenData, selectedBrandsParam) => {
        setScreenData((prev) => ({
            ...prev,
            brands: filterModalScreenData.brands,
            specs: filterModalScreenData.specs,
            highPrice: filterModalScreenData.highPrice,
            lowPrice: filterModalScreenData.lowPrice,
            // maxPrice: filterModalScreenData.maxPrice
        }));

        const brandIds = [...selectedBrandsParam];
        // // const selectedBrands = selectedBrandsParam.brands?.filter(x => x.isSelected == true);
        // for (let index = 0; index < selectedBrandsParam?.length; index++) {
        //     brandIds.push(selectedBrandsParam[index].brandId);
        // }

        const optionIds = [];
        for (let index = 0; index < filterModalScreenData.specs?.length; index++) {
            const spec = filterModalScreenData.specs[index];
            const selectedOptions = spec.options.filter(x => x.isSelected == true);
            for (let i = 0; i < selectedOptions.length; i++) {
                const option = selectedOptions[i];
                optionIds.push(option.optionId);
            }
        }

        let fromPrice = 0;
        let toPrice = 0;

        toPrice = filterModalScreenData.highPrice;
        filterModalScreenData.lowPrice

        let filterCount = brandIds.length + optionIds.length;
        setFilterCount(filterCount);

        if (filterModalScreenData.lowPrice != 0) {
            fromPrice = filterModalScreenData.lowPrice;
        }

        // console.log('brandIds', brandIds);
        // console.log('optionIds', optionIds);
        // console.log('fromPrice', fromPrice);
        // console.log('toPrice', toPrice);

        const tempFilterModel = { ...filterModel };
        tempFilterModel.fromPrice = fromPrice;
        tempFilterModel.toPrice = toPrice;
        tempFilterModel.getBrand = false;
        tempFilterModel.getChild = false;
        tempFilterModel.getMaxPrice = false;
        tempFilterModel.getParent = false;
        tempFilterModel.getSpecs = false;
        tempFilterModel.getAllCount = true;
        tempFilterModel.brandId = brandIds;
        tempFilterModel.optionIds = optionIds;
        tempFilterModel.justExist = filterModalScreenData.justExist;
        tempFilterModel.pageNumber = 1;

        setFilterModel(tempFilterModel);

        getFilterGoods(tempFilterModel, true);
        setFilterModalVisible(false);
    }

    const [flatListSettingData, setFlatListSettingData] = useState(
        {
            itemShowType: 'row', // col , row
            numColumns: 1
        }
    );

    const getFilterGoods = (filterModel, resetGoods = false) => {
        if (isLoading === true)
            return;
        if (resetGoods == true)
            setShowShimmer(true);
        setIsLoading(true);
        clientHome.filterGoods(filterModel)
            .then((response) => {
                console.log('in Request .......');
                console.log('pageNumber:', filterModel.pageNumber)
                console.log('pageSize:', filterModel.pageSize)
                const res = response.data;
                // console.log(res.result.goods.data);
                // console.log(res.result.allGoodsCount);
                // res.result.goods.data[0].discountPercentage = 10;
                // res.result.goods.data[0].discountAmount = 8;

                setScreenData((prev) => (
                    {
                        ...prev,
                        goods: resetGoods === true ? res.result.goods.data : screenData.goods.concat(res.result.goods.data),
                        specs: filterModel.getSpecs ? res.result.specs : prev.specs,
                        // brands: filterModel.getBrand ? res.result.brands : prev.brands,
                        childCategory: filterModel.getChild ? res.result.childCategory : prev.childCategory,
                        maxPrice: filterModel.getMaxPrice ? Math.ceil(res.result.maxPrice) : Math.ceil(prev.maxPrice),
                        highPrice: filterModel.getMaxPrice ? Math.ceil(res.result.maxPrice) : Math.ceil(prev.highPrice),
                        allGoodsCount: filterModel.getAllCount ? res.result.allGoodsCount : prev.allGoodsCount
                    }
                ));
                setIsLoading(false);
                if (resetGoods == true) {
                    setShowShimmer(false);
                    setShouldLoadMore(true);
                }
                if (res.result.goods.data.length < filterModel.pageSize) {
                    setShouldLoadMore(false);
                }

            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    const getBrandForWebsiteWithFillter = (brandFilterModel, resetBrands = false) => {
        try {
            if (typeof canceltoken != typeof undefined && canceltoken != null) {
                canceltoken.cancel("[Search] Operation canceled due to new request.");
            }
        } catch (error) {

        }


        const newCancelToken = Axios.CancelToken.source();
        setCanceltoken(newCancelToken);

        setIsLoadingBrands(true);

        clientForm.getBrandForWebsiteWithFillter(brandFilterModel, newCancelToken)
            .then((response) => {
                if (response === undefined) {
                    setIsLoadingBrands(false);
                    return;
                }
                const res = response.data;
                // return;
                setScreenData((prev) => (
                    {
                        ...prev,
                        brands: resetBrands ? res.result : (Array.isArray(screenData.brands) ? screenData.brands.concat(res.result) : res.result),
                    }
                ));

                // Todo: Find better way instead of setTimeout (maybe after filterModal is rendereds)
                setTimeout(() => {
                    filterModalRef.current?.setBrands(resetBrands ? res.result : (Array.isArray(screenData.brands) ? screenData.brands.concat(res.result) : res.result));
                }, 500);

                if (res.result?.length < filterBrandsModel.pageSize || res.result === null || res.result === undefined) {
                    setIsAnyMoreBrands(false);
                } else {
                    if (isAnyMoreBrands == false) {
                        setIsAnyMoreBrands(true);
                    }
                };
                setIsLoadingBrands(false);

            }).catch((err) => {
                console.log(err);
                setIsLoadingBrands(false);
            });
    };

    const loadMoreBrandsHandler = () => {
        const tempFilterBrand = { ...filterBrandsModel };
        tempFilterBrand.pageNumber = tempFilterBrand.pageNumber + 1;
        tempFilterBrand.brandIds = [...filterModel.brandId];

        setFilterBrandsModel(tempFilterBrand);
        getBrandForWebsiteWithFillter(tempFilterBrand, false);
    }

    useEffect(() => {
        getFilterGoods(filterModel, true);
        const tempBrandFilterModel = { ...filterBrandsModel };

        tempBrandFilterModel.id = id;
        tempBrandFilterModel.brandIds = [...filterModel.brandId];

        setFilterBrandsModel(tempBrandFilterModel);
        getBrandForWebsiteWithFillter(tempBrandFilterModel, true);
    }, []);

    const onBrandSearchTextChangeHandler = (filter, selectedBrands) => {
        const tempFilterBrand = { ...filterBrandsModel };
        tempFilterBrand.pageNumber = 1;
        tempFilterBrand.brandIds = [...selectedBrands];
        tempFilterBrand.filter = filter;

        setBrandSearchText(filter);
        setFilterBrandsModel(tempFilterBrand);

        getBrandForWebsiteWithFillter(tempFilterBrand, true);
    }

    const onChangeShowTypeHandler = () => {
        if (flatListSettingData.itemShowType == 'row') {
            setFlatListSettingData((prev) => ({
                itemShowType: 'col',
                numColumns: 2
            }))
        } else {
            setFlatListSettingData((prev) => ({
                itemShowType: 'row',
                numColumns: 1
            }))
        }
    }

    const onSelectSortPresshandler = () => {
        bottomSheetRef.current.snapTo(0)
    }

    const response = [
        {
            "goodsId": 8,
            "title": "10 Cups Drip Coffee Maker With Glass Carafe 1.25L 8 the best",
            "goodsImage": "eaf641b0-5eaa-4b97-988d-9c01a862ea7f.jpg",
            "price": 200.50,
            "discountPercentage": 0,
            "discountAmount": 10,
            "finalPrice": 180.50,
            "likedCount": 0,
            "surveyScore": 4,
            "surveyCount": 15,
            "goodsLiked": null,
            "inventoryCount": 2,
            "providerId": 6,
            "shippingPossibilities": true,
            "inCart": false
        },
        {
            "goodsId": 9,
            "title": "test 2",
            "goodsImage": "21899e79-9d9a-4034-821a-00b525b0159d.jpg",
            "price": 100000,
            "discountPercentage": 0,
            "discountAmount": 0,
            "finalPrice": 100000,
            "likedCount": 0,
            "surveyScore": null,
            "surveyCount": null,
            "goodsLiked": null,
            "inventoryCount": 3,
            "providerId": 5,
            "shippingPossibilities": true,
            "inCart": false
        },
        {
            "goodsId": 10,
            "title": "iphone",
            "goodsImage": "40229e99-e39e-4adf-abe2-3c73456e99c3.jpg",
            "price": 100000,
            "discountPercentage": 0,
            "discountAmount": 0,
            "finalPrice": 100000,
            "likedCount": 0,
            "surveyScore": null,
            "surveyCount": null,
            "goodsLiked": null,
            "inventoryCount": 2,
            "providerId": 4,
            "shippingPossibilities": true,
            "inCart": false
        },
        {
            "goodsId": 11,
            "title": "10 Cups Drip Coffee Maker With Glass Carafe 1.25L 8 the best",
            "goodsImage": "96b558bd-4464-41ed-bb7f-935c9a7c4345.jpg",
            "price": 100,
            "discountPercentage": 0,
            "discountAmount": 0,
            "finalPrice": 100,
            "likedCount": 0,
            "surveyScore": 4,
            "surveyCount": 14,
            "goodsLiked": null,
            "inventoryCount": 1,
            "providerId": 3,
            "shippingPossibilities": true,
            "inCart": false
        },
        {
            "goodsId": 12,
            "title": "iphone 12",
            "goodsImage": "b2ac96ca-4a7d-40b5-a58e-04eb37e1934d.jpg",
            "price": 20000,
            "discountPercentage": 0,
            "discountAmount": 0,
            "finalPrice": 20000,
            "likedCount": 0,
            "surveyScore": null,
            "surveyCount": null,
            "goodsLiked": null,
            "inventoryCount": 3,
            "providerId": 7,
            "shippingPossibilities": true,
            "inCart": false
        },
        {
            "goodsId": 13,
            "title": "air pod",
            "goodsImage": "b7d49150-9ed3-4fce-bd15-57aceb5aa481.jpg",
            "price": 10000,
            "discountPercentage": 0,
            "discountAmount": 0,
            "finalPrice": 10000,
            "likedCount": 0,
            "surveyScore": null,
            "surveyCount": null,
            "goodsLiked": null,
            "inventoryCount": 1,
            "providerId": 8,
            "shippingPossibilities": true,
            "inCart": false
        },
        {
            "goodsId": 14,
            "title": "apple watch",
            "goodsImage": "e8247e88-eeae-4e7a-86a6-9d733802cac2.jpg",
            "price": 120000,
            "discountPercentage": 0,
            "discountAmount": 0,
            "finalPrice": 120000,
            "likedCount": 0,
            "surveyScore": null,
            "surveyCount": null,
            "goodsLiked": null,
            "inventoryCount": 12,
            "providerId": 9,
            "shippingPossibilities": true,
            "inCart": false
        }];

    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);

        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true, goodsId: `blank-${numberOfElementsLastRow}` });
            numberOfElementsLastRow++;
        }
        console.log('**************', data.length, '***************');
        return data;
    };

    const onProductPresshandler = (product) => {
        props.navigation.navigate('GoodsDetail', {
            goodsId: product.goodsId,
            providerId: product.providerId
        })
    };

    const renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <ProductItem
                checkInventory={true}
                inventoryCount={item.inventoryCount}
                currency={currency}
                checkSaleWithCall={true}
                saleWithCall={item.saleWithCall}
                onPress={onProductPresshandler}
                showType={flatListSettingData.itemShowType}
                data={item} />
        );
    };

    const onFilterPressHandler = () => {
        const tempData = JSON.parse(JSON.stringify(screenData));
        const tempfilterModel = JSON.parse(JSON.stringify(filterModel));
        filterModalRef.current.setData(tempData.specs, tempData.brands, tempData.childCategory,
            tempData.maxPrice, tempData.highPrice, tempData.lowPrice, tempfilterModel.justExist);
        filterModalRef.current.setSelectedBrands(JSON.parse(JSON.stringify(filterModel.brandId)));

        // filterModalRef.current.setSelectedBrands(filterModel.brandId);
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
        tempFilterModel.getBrand = false;
        tempFilterModel.getChild = false;
        tempFilterModel.getMaxPrice = false;
        tempFilterModel.getParent = false;
        tempFilterModel.getSpecs = false;
        tempFilterModel.orderByType = item.id;
        tempFilterModel.pageNumber = 1;

        setFilterModel(tempFilterModel);
        bottomSheetRef.current.snapTo(1)
        childRef.current.closeEnd();
        getFilterGoods(tempFilterModel, true);
    }

    const RenderContent = () => {

        const sortsData = Tools.getSortTypes();

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

            getFilterGoods(tempFilterModal);
        }

        // if (!onEndReachedCalledDuringMomentum && shouldLoadMore) {
        //     console.log('Load more send request...');
        //     const tempFilterModal = {...filterModel};
        //     tempFilterModal.pageNumber = tempFilterModal.pageNumber + 1;
        //     console.log(tempFilterModal);
        //     setFilterModel(tempFilterModal);

        //     getFilterGoods(tempFilterModal);
        // }
    };

    const EmptyView = () => {
        return (
            <View style={[styles.emptyViewContainer, {

            }]}>
                <NotFoundIcon
                    width={Scale.moderateScale(130)}
                    height={Scale.moderateScale(130)}
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
                    source={require('./../../../assets/animations/pagination-loader.json')}
                />
            </View>
        )
    };

    const onCategoryPressHandler = (category) => {
        props.navigation.push('Search', { type: Constants.SearchScreenTypes.Category, id: category.categoryId, resetBefore: Math.random() + 1 });
        // props.navigation.dispatch(state => {
        //     // Remove the home route from the stack
        //     const routes = state.routes;
        //     routes[routes.length - 1].params = { type: Constants.SearchScreenTypes.Category, id: category.categoryId };
        //     routes[routes.length - 1].key = (Math.random() * 1000 + 1).toString();
        //     console.log(routes);

        //     return CommonActions.reset({
        //         ...state,
        //         routes,
        //         index: routes.length - 1,
        //     });
        // });
        // props.navigation.navigate({
        //     routeName: 'Search',
        //     params: { type: Constants.SearchScreenTypes.Category, id: category.categoryId },
        //     key: 'APage' + 232323
        // });
        // props.navigation.dispatch(CommonActions.setParams({ type: Constants.SearchScreenTypes.Category, id: category.categoryId }));
        // props.navigation.dispatch(
        //     CommonActions.navigate({
        //         name: 'Search',
        //         params: {
        //             type: Constants.SearchScreenTypes.Category,
        //             id: category.categoryId,
        //             resetBefore: Math.random() + 1
        //         },
        //         key: 'APage' + (Math.random() + 1)
        //     })
        // );
        // props.navigation.navigate({
        //     routeName: 'Search',
        //     params: {
        //         type: Constants.SearchScreenTypes.Category,
        //         id: category.categoryId
        //     },
        //     key: 'Category' + category.categoryId
        // });
        setFilterModalVisible(false);
    }

    useEffect(() => {
        if (props.route.params?.resetBefore) {
            setTimeout(() => {
                props.navigation.dispatch(state => {
                    const tempStateRoutes = [...state.routes]

                    const removeIndex = state.routes.length - 2

                    const routesdsfsdfdfsf = state.routes.splice(removeIndex, 1);
                    const routes = tempStateRoutes.splice(removeIndex, 1);

                    return CommonActions.reset({
                        ...state,
                        tempStateRoutes,
                        index: tempStateRoutes.length - 1,
                    });
                });
            }, 250);
        }
    }, [props.route.params?.resetBefore]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <LazyHOC>
            <SearchHeader
                allGoodsCount={screenData.allGoodsCount}
                resultForText={filterModel.type == Constants.SearchScreenTypes.Search ?
                    screenData?.childCategory?.categoryTitle : filterModel.type == Constants.SearchScreenTypes.Module ?
                        screenData?.childCategory?.categoryTitle : filterModel.type == Constants.SearchScreenTypes.Category ?
                            screenData?.childCategory?.categoryTitle : type == Constants.SearchScreenTypes.Deals ? Languages.Profile.Deals : null}
                onPressBack={backPresshandler}
                showBackIcon={true} />
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
                    <FilterHeader
                        showSort={type != Constants.SearchScreenTypes.Deals}
                        filterCount={filterCount}
                        selectedSort={selectedSort}
                        onFilterPress={onFilterPressHandler}
                        onSelectSortPress={onSelectSortPresshandler}
                        showType={flatListSettingData.itemShowType}
                        onChangeShowTypePress={onChangeShowTypeHandler} />
                </Animated.View>

                {showShimmer == true ?
                    <View style={styles.shimmerPlaceHolderWrapper}>
                        <ProductRowShimmer />
                    </View>
                    :
                    null}

                {isLoading != null && showShimmer == false && screenData.goods?.length > 0 ?
                    <FlatList
                        key={flatListSettingData.numColumns}
                        data={formatData(screenData.goods, flatListSettingData.numColumns)}
                        keyExtractor={(item) => item.goodsId.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        numColumns={flatListSettingData.numColumns}
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
                {isLoading != null && showShimmer == false && screenData.goods?.length == 0 ?
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

            <FilterModal
                ref={filterModalRef}
                currency={currency}
                onApplyPressHandler={onApplyPressHandler}
                brandSearchText={brandSearchText}
                onCategoryPress={onCategoryPressHandler}
                // fireBrandChange={fireBrandChange}
                // specs={JSON.parse(JSON.stringify(screenData.specs))}
                // brands={JSON.parse(JSON.stringify(screenData.brands))}
                // childCategory={JSON.parse(JSON.stringify(screenData.childCategory))}
                // maxPrice={}
                isKeyboardVisible={isKeyboardVisible}
                // selectedBrandIds={JSON.parse(JSON.stringify(filterModel.brandId))}
                onRequestClose={closeFilterModalHandler}
                onCloseModal={closeFilterModalHandler}
                isAnyMoreBrands={isAnyMoreBrands}
                loadMoreBrandsHandler={loadMoreBrandsHandler}
                onBrandSearchTextChange={onBrandSearchTextChangeHandler}
                isLoadingBrands={isLoadingBrands}
                visible={filterModalVisible}
            />
        </LazyHOC>
    );
};

export default SearchScreen;