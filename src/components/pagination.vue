<template>
    <!--    <div class="pagination">-->
    <!--        &lt;!&ndash; <span>共{{totalCount}}条记录，每页{{ requestCount }}条，当前{{ currentPage + 1 }}/{{ totle + 1 }}页 | </span> &ndash;&gt;-->
    <!--        <Button @cb='pre' :size="'middle'" :type="'primary'" class="pre" :class="{disabled : currentPage <= 0}">-->
    <!--            <i class="iconfont icon-arrow"></i>-->
    <!--        </Button>-->
    <!--        <select @change="pageJump" :value="currentPage + 1">-->
    <!--            <option v-for="n in totle + 1" :value="n" :key="n">{{ n }}</option>-->
    <!--        </select>-->
    <!--        <Button @cb='next' :size="'middle'" :type="'primary'" class="next" :class="{disabled : totle <= currentPage || totalCount <= requestCount }">-->
    <!--            <i class="iconfont icon-arrow"></i>-->
    <!--        </Button>-->
    <!--    </div>-->
    <div class="pagination_box">
        <div class="go_pre" @click="pre" :class="{none:currentPage<=1}"></div>
        <input type="text" v-model="currentPage" @input="input">
        <!-- <input type="text" v-model="currentPage" @change="pageJump" @input="input"> -->
        <div class="go_next" @click="next" :class="{none:currentPage>=totalPage}"></div>
    </div>
</template>
<script>

function debounce(fn, delay) {
  var timer

  return function () {
    var context = this
    var args = arguments

    clearTimeout(timer)

    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

export default {
    props:{
        //一共多少数据
        totalCount:{
            type:Number,
            default:10
        },
        // 一页展示多少条数据
        pageCount:{
            type:Number,
            default:2
        },
        // 翻页是否需要向后台发送请求
        needToFetch:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            disabledNext: false,
            currentPage:1,
            changeFn: () => {}
        }
    },
    computed:{
        //总共多少页
        totalPage(){
            let ins = 1;
            ins = (this.totalCount%this.pageCount) == 0 ? Math.floor(this.totalCount/this.pageCount): Math.ceil(this.totalCount/this.pageCount)
            return ins;
        },
        //每一页数组的起始坐标
        pageStartIndex(){
            let ins = 0;
            ins = (this.currentPage-1)*this.pageCount;
            return ins;
        },
    },
    created() {
        // 监听上级的传值
        eventBus.$on('trigger', (e) => this.currentPage = e);
        this.changeFn =  debounce(() => {
                  if(!this.needToFetch)
                        this.$emit('jump',this.pageStartIndex);
                  else{
                        this.currentPage = this.currentPage > this.totalPage ? this.totalPage : +this.currentPage;
                        if(!this.currentPage) this.currentPage = 1;
                        this.$emit('loadPage',this.currentPage)
                  }           
            }, 1000)
    },
    methods:{
        input() {
            this.changeFn();
        },
        next(){
            if(this.totalPage > this.currentPage){
                this.currentPage++;
                if(!this.needToFetch)
                    this.$emit('next',this.pageStartIndex)
                else    
                    this.$emit('loadPage',this.currentPage)
            }
        },
        pre(){
            if(this.currentPage > 1){
                this.currentPage--;
                if(!this.needToFetch)
                    this.$emit('pre',this.pageStartIndex)       
                else 
                    this.$emit('loadPage',this.currentPage)          
            }
        },
        // pageJump(){
        //     if(!this.needToFetch)
        //         this.$emit('jump',this.pageStartIndex);
        //     else{
        //         this.currentPage = this.currentPage > this.totalPage ? this.totalPage : this.currentPage;
        //         this.$emit('loadPage',this.currentPage)
        //     }            
        // }
    }
}
</script>

