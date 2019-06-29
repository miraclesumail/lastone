var sortIndex = {
    crewProfit: '输赢',
    depositCount: '存款',
    withdrawAmount: '提款',
    validBet: '投注额',
    promoAmount: '优惠额',
    platformFee: '平台费',
    totalDepositWithdrawFee: '手续费',
    commission: '贡献佣金'
}

export const mixins = {
    data: function () {
        return {
            sjData: {list: []},
            sortBy: {},
            totalData: [],
            titleArr: [],
            selectMember: 1,
            page:1,
            sortTypes:[
                '存款', '提款', '输赢', '投注额', '优惠额', '平台费', '手续费', '贡献佣金'
            ]
        }
    },
    created() {
        this.init();
       // this.totalData = this.mockData();
    },
    methods: {
        getMenus(titleArr) {
            this.titleArr = titleArr;
        },
        fetchData(page) {
            // if(!this.sortBy.name) {
            //     const list = this.totalData.list.slice((page-1)*10, page*10);
            //     this.sjData = {
            //           ...this.sjData,
            //           stats: {
            //                 "totalCount": 130,
            //                 "currentPage": page,
            //                 "totalPage": 10
            //           },
            //           list
            //     }
            // } else {
            //     this.handlePageData(page); 
            // }
            this.page = page;
            this.init();
        },
        setProperty(key, val) {
            // 排序
            if(key == 'sortBy') {
                if(!this.sortBy.name) {
                    this.sortBy = {name: val, order: 'down'};
                } else if(this.sortBy.name == val && this.sortBy.order == 'down'){  
                    this.sortBy = {name: val, order: 'up'}
                } else {
                    this.sortBy = {name: val, order: 'down'}
                }
            } else {
                    this[key] = val;
            }
        },
        // 搜索框输入查询
        searchByName(name) {
            this.init(name, true);
        }
    },
    watch: {
        sortBy(next, prev) {
            this.init();
        },
        selectTime(next, prev) {
            eventBus.$emit('trigger', 1); 
            this.page = 1;
            if(Object.keys(this.sortBy).length)
               this.sortBy = {}
            else
               this.init();   
        },
        selectMember(next, prev) {
            eventBus.$emit('trigger', 1); 
            this.page = 1;
            if(Object.keys(this.sortBy).length)
                this.sortBy = {}
            else
                this.init();   
        }
    }    
}

 // handlePageData(page) {
            //      const sort = this.sortBy.order == 'up';
            //      let name = this.sortBy.name;
            //         for(let i in sortIndex){
            //             if(sortIndex[i] == name)
            //                name = i
            //         }

            //         let list = this.totalData.list.sort((prev, next) =>  sort ? prev[name] - next[name] : next[name] - prev[name]);
            //         list = list.slice((page-1)*10, page*10);
            //         this.sjData = {
            //               ...this.sjData,
            //               stats: {
            //                     "totalCount": 130,
            //                     "currentPage": page,
            //                     "totalPage": 10
            //               },
            //               list
            //         }
            // },
            // getMenus(titleArr) {
            //     this.titleArr = titleArr;
            // },
            // setProperty(key, val) {
            //     console.log(key);      
            //     // 排序
            //     if(key == 'sortBy') {
            //         if(!this.sortBy.name) {
            //             this.sortBy = {name: val, order: 'down'};
            //         } else if(this.sortBy.name == val && this.sortBy.order == 'down'){  
            //             this.sortBy = {name: val, order: 'up'}
            //         } else {
            //             this.sortBy = {name: val, order: 'down'}
            //         }
            //     } else {
            //             this[key] = val;
            //     }
            // },