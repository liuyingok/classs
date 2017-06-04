<template>
  <div class="cartcontrol">
    <transition name="drop">
      <div @click="decreaseCart" class="cart-decrease move-transition" v-show="food.count>0">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add inner-hook icon-add_circle" @click="addCart"></div>

  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('event', event.target);
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear 0s
      &.move-transition
        opacity: 1
        transform: translate3d(0px, 0px, 0px)
        .inner
          color: #00a0dc
          display: inline-block
          font-size: 24px
          line-height: 24px
          transform: rotate(0deg)
          transition: all 0.4s linear 0s
      &.move-enter,&.move-leave
        opacity: 0
        transform: translate3d(24px, 0px, 0px)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      line-height: 24px
      padding-top: 6px
      text-align: center
      vertical-align: top
      width: 12px
      color: #93999f
      font-size: 12px
    .cart-add
      color: #00a0dc
      display: inline-block
      font-size: 24px
      line-height: 24px
      padding: 6px

</style>
