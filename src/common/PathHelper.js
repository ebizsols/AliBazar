
import { Constants, AppConfig } from './index';

export default class PathHelper {
    static getSliderImagePath(imageName) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.SLIDER + imageName;
    }
    static getModuleCollectionImagePath(imageName, iModuleId, collectionId, wantThumb = false) {
        let thumbPath = '/';
        if (wantThumb) {
            thumbPath = '/thumb-'
        }
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.MODULECOLLECTIONS + iModuleId + '/' + collectionId + '/' + imageName;
    }

    static getGoodsImagePath(imageName, goodsId, wantThumb = false) {
        let thumbPath = '/';
        if (wantThumb) {
            thumbPath = '/thumb-'
        }
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.GOODS + goodsId + thumbPath + imageName;
    }

    static getGoodsVarietyImagePath(imageName, goodsId) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.GOODS + goodsId + '/GoodsVariety/' + imageName;
    }

    static getCategoryImagePath(imageName, categoryId) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.CATEGORY + categoryId + '/' + imageName;
    }

    static getFlagIconImagePath(imageName) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.FLAG + imageName;
    }

    static getImageInLogoFolderPath(imageName) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.LOGOFOLDER + imageName;
    }

    static getTopicIconPath(imageName, topicId) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.TOPICICON + topicId + '/' + imageName;
    }

    static getShopImagePath(imageName, shopId) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.SHOP + shopId + '/' + imageName;
    }

    static getShopImagePath(imageName, shopId) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.SHOP + shopId + '/' + imageName;
    }

    static getShopSliderImagePath(imageName, shopId) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.SHOP + shopId + '/shopslider/' + imageName;
    }

    static getPaymentLogoPath(imageName) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.PAYMENTLOG + '/' + imageName;
    }

    static getFileDownloadPath(goodsId, downloadUrlName) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.DOWNLOADLYFILES + '/' + goodsId + '/' + downloadUrlName;
    }

    static getShippingMethodPathWithType(shippingType, lang) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.SHIPPINGMETHOD + '/' + shippingType + '.' + lang + '.png';
    }

    static getShippingMethodPathWithName(imageName) {
        return AppConfig.ApiConfig.baseUrl + Constants.FilePathes.SHIPPINGMETHOD + '/' + imageName;
    }
}
