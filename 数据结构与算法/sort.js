/**
 * Created by colin on 2017/7/10.
 */

let ary = [];

// make random array
for(let i=1;i < 99; i++) {
  ary.push(Math.floor(Math.random() * 100 + 1));
}

// 冒泡排序
function bubbleSort(array) {
  let length = array.length;

  for(let outer = length; outer > 1; --outer) {
    for(let inner = 0; inner <= outer - 1; ++inner){
      if(array[inner] > array[outer]){
        // 交换数据
        let temp = array[outer];
        array[outer] = array[inner];
        array[inner] = temp;
      }
    }

    console.log(array);
  }
}

// bubbleSort([10,9,8,7,6,5,4,3,2,1]);
bubbleSort([5,2,10,6,2,1,2,3,8,6]);