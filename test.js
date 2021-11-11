/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    // 可以从数组直接转化为集合
    let set = new Set(nums1);
    // for(let i = 0; i < nums1.length; i++){
    //     set.add(nums1[i]);
    // }    
    let ans = new Set();

    for (let i = 0; i < nums2.length; i++) {
        if (set.has(nums2[i])) {
            ans.add(nums2[i]);
        }
    }
    return Array.from(ans);
};