<template>
    <transition name="move">
        <div class="food"  v-show="showFlag"  ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img alt="" :src="food.image">
                    <div class="back">
                        <i class="icon-arrow_lift" @click="hide"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old"  v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                      <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <div class="text">{{food.info}}</div>
                </div>
                <split></split>
                <div class="rating">
                  <h1 class="title">商品评价</h1>
                <ratingselect :desc="desc" :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent"
                  @selecttype="setType" @content="setOnlycontent"></ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px" v-for="rating in food.ratings">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img :src="rating.avatar"  width="12" height="12" alt=""  class="avatar">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}">{{rating.text}}</span>
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>

        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  import split from '../../components/split/split.vue';
  import ratingselect from '../../components/ratingselect/ratingselect.vue';
  import {formatDate} from '../../common/js/date.js';
  const ALL = 2;
    export default {
      props: {
        food: {
          type: Object
        }
      },
      data() {
        return {
          showFlag: false,
          selectType: ALL,
          onlyContent: false,
          desc: {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          }
        };
      },
      methods: {
        setType(type) {
          this.selectType = type;
          // 手动刷新better-scroll重新计算页面高度
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        // 手动刷新better-scroll重新计算页面高度
        setOnlycontent() {
          this.onlyContent = !this.onlyContent;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        show() {
          this.showFlag = true;
          this.selectType = ALL;
          this.onlyContent = true;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.food, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        },
        hide() {
          this.showFlag = false;
        },
        addFirst(event) {
          if (!event._constructed) {
            return;
          }
          this.$emit('add', event.target);
          Vue.set(this.food, 'count', 1);
        },
        needShow(type, text) {
          if (this.onlyContent && !text) {
            return false;
          }
          if (this.selectType === ALL) {
            return true;
          } else {
            return type === this.selectType;
          }
        }
      },
      filters: {
        formatDate(time) {
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      components: {
        cartcontrol,
        ratingselect,
        split

      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "./food.styl";
</style>
