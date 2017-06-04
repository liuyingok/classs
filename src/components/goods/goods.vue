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
                  <cartcontrol @event="getEvent" :food="food"></cartcontrol>
                </div>

              </div>

            </li>
          </ul>

        </li>
      </ul>

    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price ="seller.deliveryPrice" :min-price ="seller.minPrice"></shopcart >
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../../components/shopcart/shopcart.vue';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
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
      },
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
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
      _drop (target) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _initScroll () {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
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
        // 通过循环foodList下的dom结构，将每一个li的高度依次送入数组 最后试一次
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      getEvent(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      }
    },
    components: {
      shopcart,
      cartcontrol
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./goods.styl";
</style>
