<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul >
        <!--当currentIndex与index相等的时候，设置高亮-->
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"   ref="foodsWrapper">
      <ul>
        <li v-for="(item,index) in goods"  class="food-list food-list-hook" >
          <h1 class="title" :class="{'current':currentIndex === index}">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods"  class="food-item border-1px" >
              <div class="icon">
                <img width="57" height="57" alt="" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <div class="cartcontrol">
                    <div class="cart-add icon-add_circle"></div>
                  </div>

                </div>

              </div>

            </li>
          </ul>

        </li>
      </ul>

    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  const ERR_OK = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          // 判断当currentIndex在height1和height2之间的时候显示
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          // 最后一个区间没有height2
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        // console.log(response);
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
          // console.log(this.goods);
        }
      });
    },
    methods: {
      _initScroll () {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {});
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3
        });
        // 设置监听滚动位置
        this.foodsScroll.on('scroll', (pos) => {
          // scrollY接收变量
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        // 把第一个高度送入数组
        this.listHeight.push(height);
        // 通过循环foodList下的dom结构，将每一个li的高度依次送入数组 试试
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/sytlus/mixin.styl";
  .goods
    bottom: 46px
    display: flex
    overflow: hidden
    position: absolute
    top: 174px
    width: 100%
    .menu-wrapper
      background: #f3f5f7
      flex: 0 0 80px
      width: 80px
      .menu-item
        display: table
        height: 54px
        line-height: 14px
        padding: 0 12px
        width: 56px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
        .icon
          background-repeat: no-repeat
          background-size: 12px 12px
          display: inline-block
          height: 12px
          margin-right: 2px
          vertical-align: top
          width: 12px
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          font-size: 12px
          position: relative
          vertical-align: middle
          width: 56px
          &:after
            border-top: 1px solid rgba(7, 17, 27, 0.1)
            bottom: 0
            content: " "
            display: block
            left: 0
            position: absolute
            width: 100%
    .foods-wrapper
      flex: 1 1 0
      .title
        background: #f3f5f7 none repeat
        border-left: 2px solid #d9dde1
        color: #93999f
        font-size: 12px
        height: 26px
        line-height: 26px
        padding-left: 14px
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        position: relative
        &:after
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          bottom: 0
          content: " "
          display: block
          left: 0
          position: absolute
          width: 100%
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1 1 0
          .name
            color: #07111b
            font-size: 14px
            height: 14px
            line-height: 14px
            margin: 2px 0 8px
          .desc,.extra
            line-height: 12px
            color: #93999f
            font-size: 10px
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              color: #f01414
              font-size: 14px
              margin-right: 8px
            .old
              color: #93999f
              font-size: 10px
              text-decoration: line-through

          .cartcontrol-wrapper
            bottom: 12px
            position: absolute
            right: 0
            .cartcontrol
              font-size: 0
              .cart-add
                color: #00a0dc
                display: inline-block
                font-size: 24px
                line-height: 24px
                padding: 6px

</style>
