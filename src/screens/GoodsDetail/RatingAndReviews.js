import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native';
import HTML from "react-native-render-html";
import { clientHome } from 'api/client';

import { Languages, Scale } from 'common'
import { Progressbar, Stars, CommentItem, RequestLoader } from 'components/UI'
import { Colors, Typography } from 'styles';
import LottieView from 'lottie-react-native';
import EmptyCommentIcon from 'assets/icons/empty-comment.svg';
import CloseIcon from 'assets/icons/close-gray.svg';
import RatingHeader from './RatingHeader';

const RatingAndReviewsScreen = (props) => {

    const { goodsId } = props.route?.params;

    const [isLoading, setIsLoading] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
    const [shouldLoadMore, setShouldLoadMore] = useState(true);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 5
    });

    const [data, setData] = useState({
        surveyList: null,
        goodsComment: null,
        goodsCommentCount: null,
        allSurveyAverage: null
    });

    const getGoodsCustomerComment = (pageNumber, pageSize, setLoader = false) => {
        if (setLoader)
            setIsLoading(true);
        else
            setIsLoadingMore(true)
        clientHome.getGoodsCustomerComment(pageNumber, pageSize, goodsId)
            .then((response) => {
                const res = response.data;
                // res.result.goodsCommentCount = 10;
                // res.result.allSurveyAverage = 4.3;
                // res.result.goodsComment = [];
                // res.result.goodsComment.push({
                //     commentId: 1,
                //     commentText: 'Optimum cleaning performance for all floors. Thanks to the electronic performance control, it can be easily adjusted using the rotary control.',
                //     commentDate: '2020/03/04',
                //     customerName: 'Dan Reid',
                //     likeCount: 1,
                //     reviewPoint: 5,
                //     isAccepted: true,
                //     tGoodsCommentPoints: [
                //         {
                //             pointId: 1,
                //             pointText: 'Color',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color1',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color2',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color3',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color4',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color5',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color6',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color7',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color8',
                //             pointType: true
                //         },
                //         {
                //             pointId: 2,
                //             pointText: 'power',
                //             pointType: false
                //         },
                //         {
                //             pointId: 3,
                //             pointText: 'cabel',
                //             pointType: false
                //         },
                //         ,
                //         {
                //             pointId: 4,
                //             pointText: 'design',
                //             pointType: true
                //         }
                //     ]
                // });
                // res.result.goodsComment.push({
                //     commentId: 2,
                //     commentText: 'Optimum cleaning performance for all floors. Thanks to the electronic performance control, it can be easily adjusted using the rotary control.',
                //     commentDate: '2020/03/04',
                //     customerName: 'Dan Reid',
                //     likeCount: 1,
                //     reviewPoint: 5,
                //     isAccepted: true,
                //     tGoodsCommentPoints: [
                //         {
                //             pointId: 1,
                //             pointText: 'Color',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color1',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color2',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color3',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color4',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color5',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color6',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color7',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color8',
                //             pointType: true
                //         },
                //         {
                //             pointId: 2,
                //             pointText: 'power',
                //             pointType: false
                //         },
                //         {
                //             pointId: 3,
                //             pointText: 'cabel',
                //             pointType: false
                //         },
                //         ,
                //         {
                //             pointId: 4,
                //             pointText: 'design',
                //             pointType: true
                //         }
                //     ]
                // });
                // res.result.goodsComment.push({
                //     commentId: 3,
                //     commentText: 'Optimum cleaning performance for all floors. Thanks to the electronic performance control, it can be easily adjusted using the rotary control.',
                //     commentDate: '2020/03/04',
                //     customerName: 'Dan Reid',
                //     likeCount: 1,
                //     reviewPoint: 5,
                //     isAccepted: true,
                //     tGoodsCommentPoints: [
                //         {
                //             pointId: 1,
                //             pointText: 'Color',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color1',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color2',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color3',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color4',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color5',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color6',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color7',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color8',
                //             pointType: true
                //         },
                //         {
                //             pointId: 2,
                //             pointText: 'power',
                //             pointType: false
                //         },
                //         {
                //             pointId: 3,
                //             pointText: 'cabel',
                //             pointType: false
                //         },
                //         ,
                //         {
                //             pointId: 4,
                //             pointText: 'design',
                //             pointType: true
                //         }
                //     ]
                // });
                // res.result.goodsComment.push({
                //     commentId: 4,
                //     commentText: 'Optimum cleaning performance for all floors. Thanks to the electronic performance control, it can be easily adjusted using the rotary control.',
                //     commentDate: '2020/03/04',
                //     customerName: 'Dan Reid',
                //     likeCount: 1,
                //     reviewPoint: 5,
                //     isAccepted: true,
                //     tGoodsCommentPoints: [
                //         {
                //             pointId: 1,
                //             pointText: 'Color',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color1',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color2',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color3',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color4',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color5',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color6',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color7',
                //             pointType: true
                //         },
                //         {
                //             pointId: 1,
                //             pointText: 'Color8',
                //             pointType: true
                //         },
                //         {
                //             pointId: 2,
                //             pointText: 'power',
                //             pointType: false
                //         },
                //         {
                //             pointId: 3,
                //             pointText: 'cabel',
                //             pointType: false
                //         },
                //         ,
                //         {
                //             pointId: 4,
                //             pointText: 'design',
                //             pointType: true
                //         }
                //     ]
                // });

                // res.result.surveyList = [];
                // res.result.surveyList.push({
                //     value: 1,
                //     average: 50
                // });
                // res.result.surveyList.push({
                //     value: 2,
                //     average: 60
                // });
                // res.result.surveyList.push({
                //     value: 3,
                //     average: 70
                // });
                // res.result.surveyList.push({
                //     value: 4,
                //     average: 83
                // });
                // res.result.surveyList.push({
                //     value: 5,
                //     average: 60
                // });

                if (setLoader == true) {
                    // reset data
                    setData({
                        allSurveyAverage: res.result.allSurveyAverage,
                        goodsComment: res.result.goodsComment,
                        goodsCommentCount: res.result.goodsCommentCount,
                        surveyList: res.result.surveyList,
                    })
                } else {
                    setData((prev) => ({
                        ...prev,
                        goodsComment: data.goodsComment.concat(res.result.goodsComment)
                    }))
                }


                if (res.result?.goodsComment?.length < pagination.pageSize) {
                    setShouldLoadMore(false);
                }

                if (setLoader)
                    setIsLoading(false);
                else
                    setIsLoadingMore(false)
            }).catch((err) => {
                if (setLoader)
                    setIsLoading(false);
                else
                    setIsLoadingMore(false);
            });
    };

    useEffect(() => {
        getGoodsCustomerComment(pagination.pageNumber, pagination.pageSize, true);
    }, []);

    const RenderFooter = () => {
        // if (isLoadingMore == false) {
        //     return null;
        // }
        return (
            <View style={[styles.footerLoaderContainer, isLoadingMore == false ? { opacity: 0 } : {}]} >
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
    }

    const loadMoreHandler = () => {
        console.log('load moree...');
        // if (!onEndReachedCalledDuringMomentum && shouldLoadMore) {
        console.log('make request in load more');
        const tempPagination = { ...pagination };
        tempPagination.pageNumber = tempPagination.pageNumber + 1;
        setPagination(tempPagination);

        getGoodsCustomerComment(tempPagination.pageNumber, tempPagination.pageSize);
        // }

        // if (!onEndReachedCalledDuringMomentum && shouldLoadMore) {
        //     console.log('Load more send request...');
        //     const tempFilterModal = {...filterModel};
        //     tempFilterModal.pageNumber = tempFilterModal.pageNumber + 1;
        //     console.log(tempFilterModal);
        //     setFilterModel(tempFilterModal);

        //     getFilterGoods(tempFilterModal);
        // }
    };



    return (
        <>
            {isLoading == true ? <RequestLoader /> : null}
            <View
                style={styles.container}>
                <View style={styles.closeContainer}>
                    <Text style={styles.title}>{Languages.GoodsDetail.Overview}</Text>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.closeIconWrapper}>
                        <CloseIcon
                            width={Scale.moderateScale(30)}
                            height={Scale.moderateScale(30)}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    {data.goodsCommentCount > 0 ?
                        <>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={data.goodsComment}
                                ListHeaderComponent={() => {
                                    return (
                                        <RatingHeader
                                            allSurveyAverage={data.allSurveyAverage}
                                            goodsCommentCount={data.goodsCommentCount}
                                            surveyList={data.surveyList}
                                        />
                                    )
                                }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.commentWraper}>
                                            <CommentItem data={item} />
                                            <View style={[styles.seprateLineContainer]}>
                                                <View style={[styles.seprateLine]}></View>
                                            </View>
                                        </View>
                                    )
                                }}
                                keyExtractor={(item) => item.commentId?.toString()}
                                onEndReached={loadMoreHandler}
                                onEndReachedThreshold={0.5}
                                onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false); }}
                                contentInset={{ // iOS ONLY
                                    top: 0,
                                    left: 0, // Left spacing for the very first card
                                    bottom: Scale.moderateScale(100),
                                    right: 0 // Right spacing for the very last card
                                }}
                                ListFooterComponent={<RenderFooter />}
                                contentContainerStyle={{ // contentInset alternative for Android
                                    paddingBottom: Platform.OS === 'android' ? Scale.moderateScale(100) : 0, // Horizontal spacing before and after the ScrollView
                                    paddingTop: Platform.OS === 'android' ? 0 : 0 // Horizontal spacing before and after the ScrollView
                                }}
                            />
                        </>
                        :
                        null
                    }

                    {data.goodsCommentCount == 0 && isLoading == false ?
                        <View style={styles.emptyViewContainer}>
                            <EmptyCommentIcon
                                height={Scale.moderateScale(150)}
                                width={Scale.moderateScale(150)
                                } />
                            <Text style={styles.emptyViewText}>{Languages.GoodsDetail.ThereNoCommentsForThisproduct}</Text>
                        </View>
                        :
                        null}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: Scale.moderateScale(20),
        backgroundColor: Colors.WHITE,
        flex: 1,
    },
    title: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE
    },
    barsContainer: {
        paddingRight: Scale.moderateScale(15),
        paddingLeft: Scale.moderateScale(8),
    },
    progressBarWrapper: {
        marginVertical: Scale.moderateScale(4)
    },
    topContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    avgRateText: {
        fontSize: Typography.FONT_SIZE_24,
        color: Colors.BIGSTONE,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    startContainer: {
        marginVertical: Scale.moderateScale(7)
    },
    reviewsText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.SILVERCHALICE,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    commentWraper: {
        paddingHorizontal: Scale.moderateScale(10),
        paddingVertical: Scale.moderateScale(10)
    },
    seprateLineContainer: {
        height: Scale.moderateScale(2),
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    seprateLine: {
        height: Scale.moderateScale(1.2),
        width: '100%',
        backgroundColor: Colors.GALLERY,
    },
    emptyViewContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    emptyViewText: {
        color: Colors.BIGSTONE,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        textAlign: "center"
    },
    //
    closeContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingTop: Scale.moderateScale(8),
        paddingHorizontal: Scale.moderateScale(20),
        marginBottom: Scale.moderateScale(25)
    },
    closeIconWrapper: {

    },
    //
    lottie: {
        width: Scale.moderateScale(50),
        height: Scale.moderateScale(50),
        justifyContent: "center",
        alignSelf: "center",
    },
});

export default RatingAndReviewsScreen;
