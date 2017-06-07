<template>
  <div class="cartcontrol">
    <transition name="drop">
      <div @click.stop.prevent="decreaseCart" class="cart-decrease move-transition" v-show="food.count>0">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add inner-hook icon-add_circle" @click.stop.prevent="addCart"></div>

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
  @import "./cartcontrol.styl";
</style>
