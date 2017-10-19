export const last = function(ary){
  return ary[ary.length - 1];
};

export const assembleList = function(list){
  //This loop creates a list of the current border nodes of the search tree
  //so the user can observe the abstract data type the algorithm is using
  let out = [];
  for (let i = 0; i < list.length; i++) {
    out[i] = " "+last(list[i])[0]+"-"+last(list[i])[1];
    if (i < list.length -1){out[i]+=",";}
  }
  return out;
};
