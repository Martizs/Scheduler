/* utils */
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';

// util funtion to generate day array according
// to the month and year
export function genDayArr(year, month) {
  const numbDays = new Date(year, month, 0).getDate();
  const dayArr = [];
  for (let i = 0; i < numbDays; i++) {
    const item = i + 1;
    dayArr.push({
      key: item + '',
      title: item + '',
      value: item,
    });
  }
  return dayArr;
}

// adjusts hours and minutes dropdown
// if the preceding time is the same as the task full date
export function adjustDD(adjust, ddArr, tValue, initValue) {
  if (tValue === initValue) {
    return ddArr;
  }

  if (adjust) {
    const cloneArr = cloneDeep(ddArr);
    const maxInd = findIndex(cloneArr, ['value', tValue]);
    if (maxInd === -1) {
      console.log('lol found index is -1 wth', cloneArr);
      return cloneArr;
    }
    return cloneArr.splice(0, maxInd + 1);
  }

  return ddArr;
}
