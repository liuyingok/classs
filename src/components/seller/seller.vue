<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="-36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h1>起送价</h1>
            <div class="content"><span class="stress">{{seller.minPrice}}</span>元</div>
          </li>
          <li class="block">
            <h1>商家配送</h1>
            <div class="content"><span class="stress">{{seller.deliveryPrice}}</span>元</div>
          </li>
          <li class="block">
            <h1>平均配送时间</h1>
            <div class="content"><span class="stress">{{seller.deliveryTime}}</span>分钟</div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from '../../common/js/store.js';
  import star from '../star/star';
  import split from '../split/split.vue';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          // 读取favorate数据
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    methods: {
      toggleFavorite(event) {
        // console.log(1);
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        // 存储favorate数据
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    components: {
      star,
      split
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./seller.styl"
</style>
