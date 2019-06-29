import Verify  from './verify';
let LV = {};
LV.install = function (Vue, opts) {
    Verify(Vue, opts);
}


export default LV.install;