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
    Dimensions,
    Image,
    Touchable,
    Animated as ReactAnimated,
    I18nManager
} from 'react-native';
import { clientHome } from 'api/client';
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
    FilterModal,
    ProviderSlider,
    CommonHeader
} from 'components';
import {
    ProductItem,
    TextWithRadio,
    ScreenLoader,
    ProgressiveImage,
    IconRow,
    Stars
} from 'components/UI';
import { Constants, Languages, PathHelper, Scale, Tools } from 'common';

import Animated, { Easing } from 'react-native-reanimated';
import NotFoundIcon from 'assets/icons/not-found.svg';
const { Value, timing } = Animated;
import axiosClient from 'api/axios';
import FastImage from 'react-native-fast-image';
const screenWidth = Dimensions.get('window').width;

const filterHeaderHeight = Scale.moderateScale(40);

const sortsDataUsedForLength = Tools.getSortTypes();

import StorIcon from 'assets/icons/store.svg';
import CalenderIcon from 'assets/icons/calender.svg';
import PhoneIcon from 'assets/icons/phone-colory.svg';
import LocationIcon from 'assets/icons/location-colory.svg';
import CountryIcon from 'assets/icons/country.svg';
import RateIcon from 'assets/icons/rate.svg';
import SoldIcon from 'assets/icons/sold.svg';
import TermsIcon from 'assets/icons/terms.svg';
import Collapsible from 'react-native-collapsible';
import ArrowIcon from 'assets/icons/up-arrow.svg'
import { Colors } from 'styles';


const ProviderScreen = (props) => {

    const currency = axiosClient.getCurrency();

    const { filter, type, id, storeName } = props.route.params; // type 2 if categorySelected
    // console.log('filter', filter);
    // console.log('type', type);
    // console.log('id', id);
    // console.log('storeName', storeName);

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
        allGoodsCount: 0,
        shop: null
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

    const [logoImageData, setLogoImageData] = useState({
        imagePath: null,
        isCalculated: false,
    });
    const [logoImageHeight, setLogoImageHeight] = useState(null);

    const [sliderImageHeight, setSliderImageHeight] = useState(0);
    const [shop, setShop] = useState(null);

    const [isStoreDetailCollapsed, setIsStoreDetailCollapsed] = useState(true);
    const _animatedRotate = useRef(new ReactAnimated.Value(isStoreDetailCollapsed ? 1 : 0)).current;

    useEffect(() => {
        ReactAnimated.timing(_animatedRotate, {
            toValue: (isStoreDetailCollapsed) ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isStoreDetailCollapsed]);

    const rotateStyle = {
        transform: [
            {
                rotate: _animatedRotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', I18nManager.isRTL ? '180deg' : '180deg'],
                }),
            }
        ]
    };

    const onApplyPressHandler = (filterModalScreenData) => {
        setScreenData((prev) => ({
            ...prev,
            brands: filterModalScreenData.brands,
            specs: filterModalScreenData.specs,
            highPrice: filterModalScreenData.highPrice,
            lowPrice: filterModalScreenData.lowPrice,
            // maxPrice: filterModalScreenData.maxPrice
        }));

        const brandIds = [];
        const selectedBrands = filterModalScreenData.brands?.filter(x => x.isSelected == true);
        for (let index = 0; index < selectedBrands?.length; index++) {
            brandIds.push(selectedBrands[index].brandId);
        }

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

        console.log('brandIds', brandIds);
        console.log('optionIds', optionIds);
        console.log('fromPrice', fromPrice);
        console.log('toPrice', toPrice);

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
    };

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
        clientHome.getShopGoods(storeName, filterModel)
            .then((response) => {
                const res = response.data;

                // console.log(res.result.goods.data);
                // console.log(res.result);
                // res.result.goods.data[0].discountPercentage = 10;
                // res.result.goods.data[0].discountAmount = 100;

                console.log(res.result);

                setScreenData((prev) => (
                    {
                        ...prev,
                        goods: resetGoods ? res.result.goods.data : screenData.goods.concat(res.result.goods.data),
                        specs: filterModel.getSpecs ? res.result.specs : prev.specs,
                        brands: filterModel.getBrand ? res.result.brands : prev.brands,
                        childCategory: filterModel.getChild ? res.result.childCategory : prev.childCategory,
                        // maxPrice: filterModel.getMaxPrice ? res.result.maxPrice : prev.maxPrice,
                        // highPrice: filterModel.getMaxPrice ? res.result.maxPrice : prev.highPrice,
                        maxPrice: filterModel.getMaxPrice ? Math.ceil(res.result.maxPrice) : Math.ceil(prev.maxPrice),
                        highPrice: filterModel.getMaxPrice ? Math.ceil(res.result.maxPrice) : Math.ceil(prev.highPrice),
                        allGoodsCount: filterModel.getAllCount ? res.result.allGoodsCount : prev.allGoodsCount,

                    }
                ));

                if (shop == null) {
                    setShop(res.result.shop);
                }

                if (logoImageData.isCalculated == false) {
                    let imageUrl = null;
                    if (res.result.shop?.logoImage) {
                        if (res.result.shop?.isDefualtImage) {
                            imageUrl = PathHelper.getImageInLogoFolderPath(res.result.shop?.logoImage, res.result.shop?.shopId);
                        } else {
                            imageUrl = PathHelper.getShopImagePath(res.result.shop?.logoImage, res.result.shop?.shopId);
                        }
                        Image.getSize(imageUrl, (width, height) => {
                            let h = Tools.getImageHeight(screenWidth, width, height);
                            setLogoImageHeight(h);
                        });
                    }
                    if (res.result.shop?.shopSlider?.length > 0) {
                        const sliderImageUrl = PathHelper.getShopSliderImagePath(res.result.shop?.shopSlider[0].imageUrl, res.result.shop?.shopSlider[0].fkShopId);
                        console.log('sliderImageUrl', sliderImageUrl);
                        Image.getSize(sliderImageUrl, (width, height) => {
                            let h = Tools.getImageHeight(screenWidth, width, height);
                            setSliderImageHeight(h);
                        });
                    }
                    setLogoImageData({
                        imagePath: imageUrl,
                        isCalculated: true
                    })
                }

                setIsLoading(false);
                if (resetGoods == true) {
                    setShowShimmer(false);
                    setShouldLoadMore(true);
                }
                if (res.result.goods.data.length < filterModel.pageSize) {
                    setShouldLoadMore(false);
                }

            }).catch((err) => {
                console.log('err', err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getFilterGoods(filterModel, true);
    }, []);

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
    };

    const onSelectSortPresshandler = () => {
        bottomSheetRef.current.snapTo(0)
    };

    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);

        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true, goodsId: `blank-${numberOfElementsLastRow}` });
            numberOfElementsLastRow++;
        }

        return data;
    };

    const onProductPresshandler = (product) => {
        props.navigation.push('GoodsDetail', {
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
        setFilterModalVisible(!filterModalVisible);
    };

    const closeFilterModalHandler = () => {
        setFilterModalVisible(false);
    };

    const _diff_clamp_scroll_y = Animated.diffClamp(_scroll_y, 0, filterHeaderHeight)

    const _filter_header_height = Animated.interpolate(_diff_clamp_scroll_y, {
        inputRange: [0, filterHeaderHeight],
        outputRange: [filterHeaderHeight, 0],
        extrapolate: 'clamp'
    });

    const filter_header_translate_y = Animated.interpolate(_diff_clamp_scroll_y, {
        inputRange: [0, filterHeaderHeight],
        outputRange: [0, -filterHeaderHeight],
        extrapolate: 'clamp'
    });

    const _filter_header_opacity = Animated.interpolate(_diff_clamp_scroll_y, {
        inputRange: [0, filterHeaderHeight],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    const closeEnd = () => {
        childRef.current.closeEnd()
    };

    const openEnd = () => {
        childRef.current.openEnd()
    };

    const backPresshandler = () => {
        props.navigation.goBack();
    };

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
    };

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
        if (isLoading != null && showShimmer == false && screenData.goods?.length == 0) {
            return (<EmptyView />)
        }

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
                    source={require('./../../assets/animations/pagination-loader.json')}
                />
            </View>
        )
    };

    const termsPressHandler = () => {
        props.navigation.navigate('ProviderTermAndCondition', { storeName: storeName });
    };

    const onCategoryPress = (item) => {
        console.log(item);
        if (item) {
            setFilterModalVisible(false);

            const tempFilterModel = { ...filterModel };
            tempFilterModel.id = item.categoryId;
            setFilterModel(tempFilterModel);
            getFilterGoods(tempFilterModel, true);
        }
    };

    const toggleStorDetailCollapse = () => {
        setIsStoreDetailCollapsed(!isStoreDetailCollapsed);
    };

    return (
        <LazyHOC>
            <CommonHeader
                onPressBack={backPresshandler}
                showBackIcon={true}
                title={storeName}
            />

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

                {isLoading != null && showShimmer == false ?
                    <View>
                        <>
                            <FlatList
                                key={flatListSettingData.numColumns}
                                data={formatData(screenData.goods, flatListSettingData.numColumns)}
                                keyExtractor={(item) => item.goodsId.toString()}
                                showsVerticalScrollIndicator={false}
                                ListHeaderComponent={() => {
                                    return (
                                        <View>
                                            {
                                                logoImageData.imagePath ?
                                                    <View>
                                                        <ProgressiveImage
                                                            borderRadius={Scale.moderateScale(1)}
                                                            imageStyle={{ width: '100%' }}
                                                            height={logoImageHeight}
                                                            source={logoImageData.imagePath}
                                                            resizeMode={FastImage.resizeMode.contain}
                                                        />
                                                    </View>
                                                    :
                                                    null
                                            }

                                            <View>
                                                <View style={styles.providerSection}>
                                                    <View style={styles.providerContainer}>
                                                        <TouchableOpacity onPress={toggleStorDetailCollapse} style={[styles.textRowContainer, styles.marginBottomWrapper, styles.withArrowIconTextRowContianer]}>
                                                            <IconRow clickable={false} icon={StorIcon} containerStyle={{ flex: 1 }} >
                                                                <View style={styles.providerTextsContainer}>
                                                                    {/* <Text style={styles.soldByText}>{Languages.GoodsDetail.SoldBy}:  </Text> */}
                                                                    <Text style={styles.providerTitle}>{shop?.storeName}</Text>
                                                                </View>
                                                            </IconRow>
                                                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                                                <ReactAnimated.View style={[rotateStyle]}>
                                                                    <ArrowIcon style={{ color: Colors.BIGSTONE }}
                                                                        width={Scale.moderateScale(12)}
                                                                        height={Scale.moderateScale(12)} />
                                                                </ReactAnimated.View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <Collapsible collapsed={isStoreDetailCollapsed}>
                                                            <View>
                                                                <View style={[styles.textRowContainer, styles.marginBottomWrapper]}>
                                                                    <IconRow clickable={false} icon={CalenderIcon} >
                                                                        <View style={styles.providerTextsContainer}>
                                                                            <Text style={styles.sinceText}>{Languages.Common.SinceDate(styles.dateText, shop?.registeryDateTime)}</Text>
                                                                        </View>
                                                                    </IconRow>
                                                                </View>
                                                                <View style={[styles.textRowContainer, styles.marginBottomWrapper]}>
                                                                    <IconRow clickable={false} icon={PhoneIcon} >
                                                                        <View style={styles.providerTextsContainer}>
                                                                            <Text style={styles.dateText}>{Tools.formatPhoneNumber(shop?.phone, shop?.iso || 'BH')}</Text>
                                                                        </View>
                                                                    </IconRow>
                                                                </View>
                                                                {shop?.address ?
                                                                    <View style={[styles.textRowContainer, styles.marginBottomWrapper]}>
                                                                        <IconRow clickable={false} icon={LocationIcon} >
                                                                            <View style={styles.providerTextsContainer}>
                                                                                <Text style={styles.dateText}>{shop?.address}</Text>
                                                                            </View>
                                                                        </IconRow>
                                                                    </View>
                                                                    :
                                                                    null}
                                                                <View style={[styles.textRowContainer, styles.marginBottomWrapper]}>
                                                                    <IconRow clickable={false} icon={SoldIcon} >
                                                                        <View style={styles.providerTextsContainer}>
                                                                            <Text style={styles.dateText}>{Languages.Common.ProductsSold(shop?.productsSold)}</Text>
                                                                        </View>
                                                                    </IconRow>
                                                                </View>
                                                                <View style={[styles.textRowContainer, styles.marginBottomWrapper]}>
                                                                    <IconRow clickable={false} icon={CountryIcon} >
                                                                        <View style={styles.providerTextsContainer}>
                                                                            <Text style={styles.dateText}>{shop?.countryTitle + ', ' + shop?.cityTitle}</Text>
                                                                        </View>
                                                                    </IconRow>
                                                                </View>
                                                                <View style={[styles.textRowContainer, styles.marginBottomWrapper]}>
                                                                    <IconRow clickable={false} icon={TermsIcon} >
                                                                        <TouchableOpacity onPress={termsPressHandler} style={styles.providerTextsContainer}>
                                                                            <Text style={styles.providerTitle}>{Languages.Common.TermsCondition}</Text>
                                                                        </TouchableOpacity>
                                                                    </IconRow>
                                                                </View>
                                                                <View style={[styles.textRowContainer]}>
                                                                    <IconRow clickable={false} icon={RateIcon} >
                                                                        <View style={[styles.providerTextsContainer, styles.ratesContainer]}>
                                                                            <Text style={styles.dateText}>{Languages.Common.ReviewsCap}</Text>
                                                                            <View style={styles.starsWrapper}>
                                                                                <Stars
                                                                                    height={Scale.moderateScale(20)}
                                                                                    width={Scale.moderateScale(20)}
                                                                                    rate={shop?.surveyScore}
                                                                                    rateOrCountShowText={shop?.surveyScore} />
                                                                            </View>
                                                                        </View>
                                                                    </IconRow>
                                                                </View>
                                                            </View>
                                                        </Collapsible>
                                                    </View>
                                                </View>
                                            </View>

                                            {
                                                shop?.shopSlider?.length > 0 ?
                                                    <View style={{}}>
                                                        <ProviderSlider
                                                            sliderHeight={sliderImageHeight}
                                                            images={shop?.shopSlider}
                                                        />
                                                    </View>
                                                    :
                                                    null
                                            }
                                        </View>
                                    );
                                }}
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
                                    paddingTop: Platform.OS === 'android' ? Scale.moderateScale(10) : Scale.moderateScale(10), // Horizontal spacing before and after the ScrollView
                                }}
                            />
                        </>
                    </View>
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
                onCategoryPress={onCategoryPress}
                // specs={JSON.parse(JSON.stringify(screenData.specs))}
                // brands={JSON.parse(JSON.stringify(screenData.brands))}
                // childCategory={JSON.parse(JSON.stringify(screenData.childCategory))}
                // maxPrice={}
                isProviderScreen={true}
                onRequestClose={closeFilterModalHandler}
                onCloseModal={closeFilterModalHandler}
                visible={filterModalVisible} />
        </LazyHOC>
    );
};

export default ProviderScreen;