<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>

      </div>

    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  import {urlParse} from './common/js/util.js';
  const ERR_OK = 0;
  export default{
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            // console.log(queryParam);
            return queryParam.id;
          })()
        }
      };
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body;
       // console.log(response);
        if (response.errno === ERR_OK) {
          // 给this.seller扩展属性，保留id属性
          this.seller = Object.assign({}, this.seller, response.data);
         // console.log(this.seller);
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/sytlus/mixin.styl"

  #app
    .tab
      display:flex
      width:100%
      height: 40px
      line-height:40px
      border-1px(rgba(7, 17,27, 0.1))
      .tab-item
        flex :1
        text-align :center
        & > a
          display : block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
           color: rgb(240, 20, 20)

</style>
