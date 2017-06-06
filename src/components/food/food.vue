<template>
    <transition name="move">
        <div class="food"  v-show="showFlag">
            <div class="food-content">
                <div class="image-header">
                    <img alt="" :src="food.image">
                </div>
            </div>

        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    export default {
      props: {
        food: {
          type: Object
        }
      },
      data() {
        return {
          showFlag: false
        };
      },
      methods: {
        show() {
          this.showFlag = true;
        }
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "./food.styl";
</style>
