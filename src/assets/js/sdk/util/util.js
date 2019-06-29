

let util = {
    isEmptyObj: (obj) => {
        for(let key in obj) {
            if(obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    },
    isObject: (val) => {
        if (val === null) { return false;}
        return ( (typeof val === 'object') );
    }
}

export default util;
