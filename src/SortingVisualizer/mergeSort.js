const animation = [];

export function mergeSortAnimation(array, first, last) {
  if(array.length<=1) return array;
  if (first < last) {
    var mid = Math.floor((first + last) / 2);
    mergeSortAnimation(array, first, mid);
    mergeSortAnimation(array, mid + 1, last);
    merge(array, first, mid, last, animation);
  }
  console.log(animation)
  return animation;
}

function merge(array, first, mid, last, animation) {
  var firstHalf = array.slice(first, mid + 1);
  var secondHalf = array.slice(mid + 1, last + 1);
  var i = 0, j = 0, k = first;
  while (i < firstHalf.length && j < secondHalf.length) {
    animation.push([k, j + mid + 1]);
    animation.push([k, j + mid + 1]);
    if (firstHalf[i] < secondHalf[j]) {
      animation.push([k, firstHalf[i]]);
      array[k++] = firstHalf[i++];
    }
    else {
      animation.push([k, secondHalf[j]]);
      array[k++] = secondHalf[j++];
    }
  }
  while (i < firstHalf.length) {
    animation.push([k, j + mid]);
    animation.push([k, j + mid]);
    animation.push([k, firstHalf[i]]);
    array[k++] = firstHalf[i++];
  }
  while (j < secondHalf.length) {
    animation.push([k, j + mid]);
    animation.push([k, j + mid]);
    animation.push([k, secondHalf[j]]);
    array[k++] = secondHalf[j++];
  }
}