<template>
<body>
    <v-carousel hide-delimiters>
      <v-carousel-item
      :src="'../src/assets/img/home/slider1_new.webp'"
      >
        <v-row
          class="fill-height"
          align-content="center"
          justify="center"
        >
          <div class="display-2 white-smoke pl-5 pr-5 hidden-sm-only"><strong>Auction 1</strong></div><br/>
        </v-row>
      </v-carousel-item>
      <v-carousel-item
        :src="'../src/assets/img/home/slider2.webp'"
      >
        <v-row
          class="fill-height"
          align-content="center"
          justify="center"
        >
          <div class="display-2 white-smoke pl-5 pr-5 hidden-sm-only" style="text-decoration: white;"><strong>Auction 2</strong></div><br/>
        </v-row>
      </v-carousel-item>
      <v-carousel-item
        :src="'../src/assets/img/home/slider3.webp'"
      >
        <v-row
          class="fill-height"
          align-content="center"
          justify="center"
        >
          <div class="display-2 white-smoke pl-5 pr-5 hidden-sm-only"><strong>Auction 3</strong></div><br/>
        </v-row>
      </v-carousel-item>
      <v-carousel-item
        :src="'../src/assets/img/home/slider4.webp'"
      >
        <v-row
          class="fill-height"
          align-content="center"
          justify="center"
        >
          <div class="white-smoke display-2 pl-5 pr-5 hidden-sm-only"><strong>Auction 4</strong></div><br/>
        </v-row>
      </v-carousel-item>

    </v-carousel>
    <div class="pl-4 pr-4 row">
      <div
       class="col-md-6 col-sm-6 col-xs-12"
      >
        <v-card>

          <v-img
            :src="'../src/assets/img/home/slider2.webp'"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          >
           <h1 class="text-center font-size white-smoke">LAST FEW SEATS LEFT!</h1>
            <div class="text-center">
              <v-btn  href="/" class="white--text " outlined>REGISTER NOW!</v-btn>
            </div>


<!--            <v-expand-transition>-->
<!--              <div-->
<!--                v-if="hover"-->
<!--                class="d-flex transition-fast-in-fast-out orange darken-2 v-card&#45;&#45;reveal display-3 white&#45;&#45;text"-->
<!--                style="height: 100%;"-->
<!--              >-->

<!--                <h3>Top Picks</h3><br/>-->
<!--                <h3>sdfs</h3>-->
<!--              </div>-->
<!--            </v-expand-transition>-->
          </v-img>
        </v-card>
<!--        </v-hover>-->
      </div>
      <div
        class="col-md-6 col-sm-6 col-xs-12"
      >
        <v-card>
          <v-img
            :src="'../src/assets/img/home/slider3.webp'"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          >
            <h1 class="text-center font-size white-smoke">BLIND</h1>
            <div class="text-center">
              <v-btn  href="/" class="white--text" outlined>REGISTER NOW!</v-btn>
            </div>
          </v-img>
        </v-card>
      </div>
    </div>
    <div class="pl-4 pr-4 row">
      <div
       class="col-md-4 col-sm-4 col-xs-12"
      >
        <v-card outlined>
          <v-img
            :src="'../src/assets/img/home/deal2.jpg'"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="300px"
          >
            <h1 class="text-center font-size white-smoke">Buy</h1>
            <div class="text-center mt-2">
              <v-btn class="white--text caption"  href="/" text>Buy <v-icon class="caption">mdi-arrow-right</v-icon></v-btn>
            </div>
          </v-img>
        </v-card>
      </div>
      <div
        class="col-md-4 col-sm-4 col-xs-12"
      >
        <v-card outlined>
          <v-img
            :src="'../src/assets/img/home/deal3.jpg'"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="300px"
          >
            <h1 class="text-center font-size white-smoke">Buy</h1>
            <div class="text-center mt-2">
              <v-btn class="white--text caption"  href="/" text>SHOP NOW <v-icon class="white--text caption">mdi-arrow-right</v-icon></v-btn>
            </div>
          </v-img>
        </v-card>
      </div>
      <div
        class="col-md-4 col-sm-4 col-xs-12"
      >
        <v-card outlined>
          <v-img
            :src="'../src/assets/img/home/deal4.jpg'"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="300px"
          >
            <h1 class="text-center font-size white-smoke">Buy</h1>
            <div class="text-center mt-2">
              <v-btn class="white--text caption"  href="/" text>SHOP NOW <v-icon class="white--text caption">mdi-arrow-right</v-icon></v-btn>
            </div>
          </v-img>
        </v-card>
      </div>
    </div>
    <v-container>
      <v-row no-gutters>
        <v-col :cols="12">
          <v-card-text
            class=""
            tile
            outlined
          >
            <v-card-title class="subheading ">Sweet Deals in the Auction</v-card-title>
            <v-divider></v-divider>
            <div class="row">
              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center">
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                >
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="'../src/assets/img/home/deal1.jpg'"
                  >
                    <v-card-title>Bags & Purses </v-card-title>
                  </v-img>

                  <v-card-text class="text--primary text-center">
                    <div>Lorem ipsum</div>
                    <div>Vintage Baggit, Zara, Fossil</div>
                  </v-card-text>

                  <div class="text-center">
                    <v-btn
                      href="/"
                      class="ma-2"
                      outlined
                      color="info"
                    >
                      Explore
                    </v-btn>
                  </div>
                </v-card>
                </v-hover>
              </div>
              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center" >
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                  >
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="'../src/assets/img/home/deal2.jpg'"
                  >
                    <v-card-title>T-Shirt </v-card-title>
                  </v-img>

                  <v-card-text class="text--primary text-center">
                    <div></div>
                    <div>Limited Edition Zara, Selected, Celio</div>
                  </v-card-text>

  <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide"
  >
    <Slide v-for="slide in bidDetails.length" :key="slide">
      <div class="carStyle" style="background-color: black;" @click="AuctionClassifier">
        <img :src="link1"/></div>
      <h1>{{imgLinks[slide-1]}}</h1>
    </Slide>
  </Carousel>

                  <div class="text-center">
                    <v-btn href="/"
                      class="ma-2"
                      outlined
                      color="info"
                    >
                      Explore
                    </v-btn>
                  </div>
                </v-card>
                </v-hover>
              </div>
              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center" >
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                  >
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="'../src/assets/img/home/deal4.jpg'"
                  >
                    <v-card-title>Vintage Shoes</v-card-title>
                  </v-img>

                  <v-card-text class="text--primary text-center">
                    <div>Exclusive</div>
                    <div>Nike, Adidas, Puma</div>
                  </v-card-text>

                  <div class="text-center">
                    <v-btn href="/"
                      class="ma-2"
                      outlined
                      color="info"
                    >
                      Explore
                    </v-btn>
                  </div>
                </v-card>
                </v-hover>
              </div>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
    <v-card  class="accent" >
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row >
              <v-col class="col-12 col-sm-3 pr-4"  align: right>
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">SHIPPING CHARGES EXTRA</h3>
                              <p class="font-weight-thin">Free Shipping over $300</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row >
              <v-col class="col-12 col-sm-3 pr-4"   align: right>
                <v-icon class="display-2">mdi-cash-usd</v-icon>
              </v-col>
              <v-col  class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light"></h3>
                <p class="font-weight-thin"></p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align:right>
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col  class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">+1-456-789-123</h3>
                <p class="font-weight-thin">24/7 Available Support</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </body>
</template>

<script> 
export default {
  name: 'Gallery',
  components: {
    Carousel, 
    Slide,
    Navigation,
  },
  data: (async) => ({
    currentSlide: 0,
    imgLinks:["\"../assets/img/home/slider1.jpg\"","\"../assets/img/home/slider2.jpg\"","\"../assets/img/home/slider3.jpg\""],
    blindBidImageList:["\"../assets/img/home/slider4.jpg\""],
    ItemsOnSaleList:["\"../assets/img/home/slider4.jpg\""],
    link1:"../assets/img/home/slider1.jpg",
    bidItems: bidItemsRes.data,
    bidDetails:bidDetailsRes.data,
  }),
  methods: {
  
    slideTo(val: number) {
      this.currentSlide = val
    },
    Logger(){
      console.log("button clicked!")
    },
    async getAuctionNum(){
     console.log("image clicked",this.currentSlide+1)

    },

      async AuctionClassifier(data:any) {
  try {
    await AuthService.getBidDetails()
    .then((res:any) => {
        //console.warn(res);
        //console.log(AuthService.getImageDetails())
        
        let currentBidDetails=res.data[this.currentSlide];
        
        //console.log(currentBidDetails.bidType)
       if(currentBidDetails.bidType=="blind"){
        router.push({path: "/make-blind-auction",
        query: { 
            bidId: currentBidDetails.bidId,
            startTime: currentBidDetails.startTime,
            endTime: currentBidDetails.endTime,
          }
        })
       }
       else if(currentBidDetails.bidType=="live")
       {
          router.push({path: "/make-bid", 
          query: { 
            bidId: currentBidDetails.bidId,
            startTime: currentBidDetails.startTime,
            endTime: currentBidDetails.endTime,
          },
        });
        
       }
      })
      .catch((err: any) => {
        console.error(err);
      });
  } catch {
    console.error("Error in auction button exception");
  }
    },
    async BuyItem(){
      console.log("item bought")
      router.push("/make-sell");

    }
  },
  setup() {
    const sell = () => {
      console.log("Sell");
    };

    const auction = () => {
      console.log("Auction");
    };

    return {
      sell,
      auction,
    };
  },
};
</script>
<style>
body {
  background-color: lightseagreen;
}
.white-smoke{
  color: whitesmoke;
}
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }


.main-card {
  border: 1px solid;
  max-width: 30vw;
  margin: 0.5em;
}

.main-card > .img {
  height: 30vh;
}
.main-home-section {
  height: 30vh;
  display: flex;
  flex-wrap: wrap;
}
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-btn > button {
  margin: 2em;
  padding: 1em;
}

.try{
  position:fixed; left:0;right:0;top:0;bottom:0;
}
</style>
