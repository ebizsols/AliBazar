import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceStorage = {
  async storeStringData(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      // saving error
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async storeJsonData(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      // saving error
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async getStringData(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      // console.log(value);
      return value;
      if (value !== null) {
        // value previously stored
      }
    } catch (error) {
      // error reading value
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async getJsonData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log('jsonval', jsonValue, key)
      const val = jsonValue != null ? JSON.parse(jsonValue) : null;
      // console.log(val);

      return val;
    } catch (error) {
      throw error;
      // error reading value
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async clearItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // error reading value
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async clearAll() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      // error reading value
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
};

export default deviceStorage;