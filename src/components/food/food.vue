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
            </div>

        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
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
          onlyContent: false
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
        }
      },
      components: {
        cartcontrol
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "./food.styl";
</style>
