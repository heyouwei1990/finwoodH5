<template>
  <div id="Loading" v-title="' '">
    <!-- <div class="box">
			<div class="cube"></div>
			<div class="cube"></div>
			<div class="cube"></div>
			<div class="cube"></div>
		</div> -->
		<p>Finwood</p>
  </div>
</template>

<script>
import app from "../utils/common";
import { mapGetters, mapActions } from "vuex";

export default {
  created() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf("micromessenger") > 1 && this.getOpenid == null) {
      //有则表示是回调成功
      if (location.href.indexOf("code") > 0) {
        if (this.GetQueryString("code") != null) {
          //允许授权
          app.post("social/wxuserinfo",{
              code: this.GetQueryString("code"),
              state: this.GetQueryString("state")
            },r => {
              this.author({
                openid: r.result.wxuser.openid,
                unionid: r.result.wxuser.unionid
              });
              if(r.result.token != null && r.result.token != ''){
                this.login(r.result.token);
              }
              let hash = app.getStore("beforeEnterHash");
              if (hash != null && hash.indexOf('login') < 0) {
                window.location.href = `/?v=${window.config.version}${hash}`;
              } else {
                window.location.href = `/?v=${window.config.version}#`;
              }
            }
          );
        } else {
          //拒绝授权
        }
      } else {
        app.post("social/wxauthen", {}, r => {
          window.location.href = r.result;
        });
      }
    }else {
      let hash = app.getStore("beforeEnterHash");
      if (hash != null && hash.indexOf('login') < 0) {
        window.location.href = `/?v=${window.config.version}${hash}`;
      } else {
        window.location.href = `/?v=${window.config.version}#`;
      }
    }
  },
  computed: {
    ...mapGetters(["getOpenid"])
  },
  methods: {
    ...mapActions([
      "author",
      'login'
    ]),
    GetQueryString(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    }
  }
};
</script>

<style lang="scss">
#Loading {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  line-height: 1.4;
  box-sizing: border-box;
  background: #fff;
  .cube {
    position: absolute;
    width: 1em;
    height: 1em;
    background: #3bdf59;
    -webkit-animation: move 3s ease-in-out infinite;
    animation: move 3s ease-in-out infinite;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    box-shadow: 5em 5em .3em .1em #DBDBDB;
  }

  .cube::before,
  .cube::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .cube::before {
    background-color: #009b1c;
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
    -webkit-transform: rotateY(-90deg);
    transform: rotateY(-90deg);
  }

  .cube::after {
    background-color: #13ae2f;
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    -webkit-transform: rotateX(90deg);
    transform: rotateX(90deg);
  }

  .cube:nth-of-type(1) {
    -webkit-animation-delay: -11.25s;
    animation-delay: -11.25s;
  }

  .cube:nth-of-type(2) {
    -webkit-animation-delay: -10.5s;
    animation-delay: -10.5s;
  }

  .cube:nth-of-type(3) {
    -webkit-animation-delay: -9.75s;
    animation-delay: -9.75s;
  }

  .cube:nth-of-type(4) {
    -webkit-animation-delay: -9s;
    animation-delay: -9s;
  }

  @-webkit-keyframes move {
    0%,
    87.5%,
    100% {
      -webkit-transform: translate(1em, 0em);
      transform: translate(1em, 0em);
    }
    12.5% {
      -webkit-transform: translate(2em, 0em);
      transform: translate(2em, 0em);
    }
    25% {
      -webkit-transform: translate(2em, 1em);
      transform: translate(2em, 1em);
    }
    37.5%,
    50% {
      -webkit-transform: translate(1em, 1em);
      transform: translate(1em, 1em);
    }
    62.5% {
      -webkit-transform: translate(0em, 1em);
      transform: translate(0em, 1em);
    }
    75% {
      -webkit-transform: translate(0em, 0em);
      transform: translate(0em, 0em);
    }
  }

  @keyframes move {
    0%,
    87.5%,
    100% {
      -webkit-transform: translate(1em, 0em);
      transform: translate(1em, 0em);
    }
    12.5% {
      -webkit-transform: translate(2em, 0em);
      transform: translate(2em, 0em);
    }
    25% {
      -webkit-transform: translate(2em, 1em);
      transform: translate(2em, 1em);
    }
    37.5%,
    50% {
      -webkit-transform: translate(1em, 1em);
      transform: translate(1em, 1em);
    }
    62.5% {
      -webkit-transform: translate(0em, 1em);
      transform: translate(0em, 1em);
    }
    75% {
      -webkit-transform: translate(0em, 0em);
      transform: translate(0em, 0em);
    }
  }

  .box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 3em;
    height: 2em;
    margin: 30vmin auto;
    font-size: 50px;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: rotateX(60deg) rotateZ(45deg);
    transform: rotateX(60deg) rotateZ(45deg);
  }

  /*.box:hover * {
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
  }

  .box:active * {
    -webkit-animation-play-state: running;
    animation-play-state: running;
  }*/
  p {
    font-size: 16px;
    position: absolute;
    bottom: 12%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

