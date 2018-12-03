import moment from 'moment';
import _ from 'lodash';
// import Share from 'react-native-share';
import { Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default {
  validateField(name) {
    return name !== '';
  },

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  getDate(date) {
    return moment(date).format('MM/DD/YYYY') === moment().format('MM/DD/YYYY')
      ? 'Today'
      : moment(date).format('MMM DD');
  },
  sortById(list) {
    if (!list) return -1;
    list.sort((a, b) => {
      if (!a || !b) return -1;
      if (a._id < b._id) {
        return -1;
      }
      if (a._id > b._id) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  },
  sortByProps(list, props) {
    if (!list) return [];
    const newList = list.sort((a, b) => {
      if (!a || !b) return -1;
      if (this.change_alias(a[props]) < this.change_alias(b[props])) {
        return -1;
      }
      if (this.change_alias(a[props]) > this.change_alias(b[props])) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    return newList;
  },
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  UpperCaseFirstChart(str) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
  },
  change_alias(alias) {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ {2}|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ {2}|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
      '-',
    );
    str = str.replace(/-+-/g, '-');
    str = str.replace(/^\-+|\-+$/g, '');
    return str;
  },
  validateName(name) {
    const re = /^[^0-9 *&^$#@!(){}\[\]\\//]+[^0-9*&^$#@!(){}\[\]\\//]+$/;
    return re.test(name);
  },
  userPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        },
      );
    });
  },
  formatMoney(number, n, x) {
    const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\.' : '$'})`;
    return Number(number)
      .toFixed(Math.max(0, ~~n))
      .replace(new RegExp(re, 'g'), '$& ');
  },
  formatLocation(location) {
    const arrayLocation = _.split(location, ',');
    if (arrayLocation.length > 4) {
      return arrayLocation.splice(arrayLocation.length - 4).join(',');
    }
    return location;
  },
  findIndexPointerByProps(list, data, props) {
    if (!list) return -1;
    return list.findIndex((_data, index) => {
      if (!_data || !data[props]) return -1;
      if (data[props].trim() == _data[props].trim()) {
        return index > -1;
      }
    });
  },
  findPointerByProps(list, data, props) {
    if (!list) return null;
    return list.find((_data, index) => {
      return _data[props] == data[props];
    });
  },
  calculatorPrice(room, timer) {
    const start = moment(timer.start, 'h:mmA');
    const end = timer.end == '12:00AM' ? moment(timer.end, 'h:mmA').add(1, 'd') : moment(timer.end, 'h:mmA');
    const specialStartTime = room.special_price
      ? moment(room.special_price.start_time, 'HH:mm')
      : 0;
    const specialEndTime = room.special_price ? moment(room.special_price.end_time, 'HH:mm') : 0;
    const specialTimeRange = room.special_price
      ? specialEndTime.diff(specialStartTime, 'hours', true)
      : 0;
    const specialStartTimeRange = room.special_price
      ? start.diff(specialStartTime, 'hours', true)
      : 0; // 1
    const specialEndTimeRange = room.special_price ? end.diff(specialEndTime, 'hours', true) : 0; // 1.5
    const timeRange = end.diff(start, 'hours', true); // 1.5
    let specialTime = specialTimeRange
      - (specialStartTimeRange > 0 ? specialStartTimeRange : 0)
      + (specialEndTimeRange < 0 ? specialEndTimeRange : 0);
    specialTime = specialStartTimeRange > specialTimeRange ? 0 : specialTime;
    const regularTime = timeRange - specialTime;
    const total = specialTime * (room.special_price ? room.special_price.price : 0)
      + room.regular_price * regularTime;
    return {
      specialTimeRange: room.special_price
        ? `${room.special_price.start_time} - ${room.special_price.end_time}`
        : 'none',
      specialTime,
      regularTime,
      specialPrice: room.special_price ? room.special_price.price : 0,
      regularPrice: room.regular_price,
      tax_price: (room.tax / 100) * total,
      total,
    };
  },
  renderContentForShare(roomData) {
    return {
      contentType: 'link',
      contentUrl: 'http://blackorchidz.com/',
      contentDescription: `Check this great room for ${roomData.room_type.name}`,
    };
  },
  // shareFacebook(roomData) {
  //   const shareOptions = {
  //     title: 'Spotz',
  //     message: `Check ${roomData.name} on ${roomData.hotel.address1}, this great room `,
  //     url: 'http://blackorchidz.com/',
  //     subject: 'Spotz', //  for email
  //   };
  //   Share.open(shareOptions);
  // },
  checkURLImg(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  },
};

export const openURL = (url, isWeb) => {
  let newUrl = url;
  if (isWeb && newUrl.indexOf('http://') < 0 && newUrl.indexOf('https://') < 0) {
    newUrl = `http://${newUrl}`;
  }
  Linking.canOpenURL(newUrl)
    .then((supported) => {
      if (!supported) {
        // console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(newUrl);
      }
    })
    .catch((err) => {
      // console.error('An error occurred', err)
    });
};

export const shareApp = () => {
  const shareOptions = {
    title: 'Bệnh viện ABC',
    message: 'Benh vien ABC cho bạn trải nghiệm tốt hơn.',
    url: 'https://google.com',
    subject: 'Bệnh viện ABC', //  for email
  };
  Share.open(shareOptions).then((data) => {});
};

export const updateDataForList = (list, newData) => {
  let tmpList = [...list];
  const index = _.findIndex(tmpList, { _id: newData._id });
  if (index > -1) {
    tmpList[index] = newData;
  } else {
    tmpList = [newData, ...tmpList];
  }
  return tmpList;
};

export const convertAppoiment = (appointments) => {
  const waiting = appointments.filter(data => data.status === 0).reverse();
  const during = appointments.filter(data => data.status === 1).reverse();
  const completed = appointments.filter(data => data.status === 2).reverse();
  return [...during, ...waiting, ...completed];
};

// TODO: For Google
// export const findCity = result => {
//   // const data = result.find(item => item.types[0] === 'locality');
//   const address = result.plus_code.compound_code.split(',');
//   if (address.length > 0) {
//     return `${address[address.length - 2]},${address[address.length - 1]}`;
//     // return {
//     //   // city: data.address_components[0].long_name,
//     //   // country: data.address_components[2].long_name,
//     //   address:address[address.length-2]+','+ address[address.length-1]
//     // };
//   }
//   return null;
// };

// TODO: For Bing Map
export const findCity = (result) => {
  const { name } = result?.resourceSets[0]?.resources[0];
  if (name) {
    const addresses = name.split(', ');
    return `${addresses[addresses.length - 2]}, ${addresses[addresses.length - 1]}`;
  }
  return null;
};

export const findDetailAddress = (result) => {
  const { name } = result?.resourceSets[0]?.resources[0];
  return name;
};

const searchAsyncRequest = (func, callback) => (data) => {
  func(data).then(res => callback(res));
};

export const searchAsync = (func, callback) => {
  let task = null;
  if (task) {
    task.cancel();
  }
  task = _.debounce(searchAsyncRequest(func, callback), 500, {});
  return task;
};

// TODO: hasNotch
export const hasNotch = DeviceInfo.hasNotch();
