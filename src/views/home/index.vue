<template>
    <div
        class="app-wrapper"
    >
        <div class="header">
            <div class="header-top">东南亚极端气候事件监测预测系统</div>
            <div class="header-bottom">Southeast Asia Extreme Climate Event Monitoring and Forecasting System</div>
        </div>
        <div class="buttoms">
            <div
                class="buttom"
                @click="Clickrun()"
            >
                <img src="@/assets/zhuye.png" />主页
                <div class="SSSleft"></div>
                <div class="SSSleftone"></div>
            </div>
            <div class="buttom">
                <img src="@/assets/shezhi.png" />设置
                <div class="SSSright"></div>
                <div class="SSSrightone"></div>
            </div>
        </div>
        <div class="bodyBox">
            <div class="bodyLeft">
                <div class="position">
                    <img src="@/assets/xing.png" />
                    <span>数据最新更新时间</span>
                    <div></div>
                </div>
                <div class="bodyLeft-top">
                    <div class="item">
                        <div
                            style="display: flex;flex:1"
                            v-for="(item,index) in items"
                            :key="index"
                        >
                            <img src="@/assets/item.png" />
                            <div style="display: flex;flex-direction: column;justify-content: space-evenly;">
                                <span>{{item.first}}</span>
                                <span>{{item.second}}</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="bodyRight-center">
                    <div class="bodyRight-center-left">
                        <div class="boxs">
                            <div class="boxs-header">
                                <span>云南省降水情况</span>
                                <div class="boxs-header-bottom"></div>
                                <div class="boxs-header-before"></div>
                                <div class="boxs-header-after"></div>
                            </div>
                            <div style="height:calc(100% - 36px);padding: 15px;">
                               <Maplayer/>
                            </div>
                        </div>
                        <div class="boxs">
                            <div class="boxs-header">
                                <span>云南省温度情况</span>
                                <div class="boxs-header-bottom"></div>
                                <div class="boxs-header-before"></div>
                                <div class="boxs-header-after"></div>
                            </div>
                            <div style="height:calc(100% - 36px);padding: 15px;">
                               
                            </div>
                        </div>
                    </div>
                    <div class="bodyRight-center-right">
                        <div class="boxs">
                            <div class="boxs-header">
                                <span>澜沧江-湄公河全流域——日平均气温图</span>
                                <div class="boxs-header-bottom"></div>
                                <div class="boxs-header-before"></div>
                                <div class="boxs-header-after"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bodyRight">
                <div class="position">
                    <img src="@/assets/xing.png" />
                    <span>未来40天数据时间轴</span>
                    <div></div>
                </div>
                <div class="bodyRight-top">
                    <div style="position: relative">
                        <span
                            v-for="(sp,i) in 40"
                            :key="i"
                            :class="i==index ? 'active':''"
                            @click="Point(i)"
                        ></span>
                        <div class="firsttime">{{firsttime}}</div>
                        <div class="lasttime">{{lasttime}}</div>
                    </div>
                </div>
                <div class="bodyRight-center">
                    <div class="bodyRight-center-left">
                        <div class="boxs">
                            <div class="boxs-header">
                                <span>东北半球200hPa高度场色斑图</span>
                                <div class="boxs-header-bottom"></div>
                                <div class="boxs-header-before"></div>
                                <div class="boxs-header-after"></div>
                            </div>
                        </div>
                    </div>
                    <div class="bodyRight-center-right">
                        <div class="boxs">
                            <div class="boxs-header">
                                <span>平均2m气温</span>
                                <div class="boxs-header-bottom"></div>
                                <div class="boxs-header-before"></div>
                                <div class="boxs-header-after"></div>
                            </div>
                            <div style="height:calc(100% - 36px);padding: 15px;">
                                
                            </div>
                        </div>
                        <div class="boxs">
                            <div class="boxs-header">
                                <span>降水</span>
                                <div class="boxs-header-bottom"></div>
                                <div class="boxs-header-before"></div>
                                <div class="boxs-header-after"></div>
                            </div>
                            <div style="height:calc(100% - 36px);padding: 15px;">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footerBox">
            <div class="footerBox-first">
                <div class="boxs">
                    <div class="boxs-header">
                        <span>最近30天气温/降水逐日实况</span>
                        <div class="boxs-header-bottom"></div>
                        <div class="boxs-header-before"></div>
                        <div class="boxs-header-after"></div>
                    </div>
                    <div id="echarts"></div>
                </div>
            </div>
            <div class="footerBox-sencond">
                <div class="boxs">
                    <div class="boxs-header">
                        <span>未来45天气温/降水逐日预报</span>
                        <div class="boxs-header-bottom"></div>
                        <div class="boxs-header-before"></div>
                        <div class="boxs-header-after"></div>
                    </div>
                    <div id="echarts"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Fungetdate } from "@/utils/index";
import Maplayer from '@/components/maplayer/index.vue'
export default {
    name: "home",
    components: {
        Maplayer
    },
    data() {
        return {
            items: [
                { first: "CIMISS", second: "2022-03-30" },
                { first: "CLDAS", second: "2022-03-30" },
                { first: "CFSV2", second: "2022-03-30" },
                { first: "EC数据", second: "2022-03-30" },
            ],
            index: -1,
            firsttime: null,
            lasttime: null,
            rateChart: null,
            liveStationData: [],
        };
    },
    mounted() {
        this.firsttime = Fungetdate(0);
        this.lasttime = Fungetdate(39);
    },
    methods: {
        Point(i) {
            this.index = i;
            let time = Fungetdate(i);
            console.log(time);
        },
        Clickrun() {
            this.$router.push("/secondSheet");
        },
    },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .header {
        width: 100%;
        height: 80px;
        line-height: 40px;
        background: url("../../assets/header.png");
        background-size: 100% 100%;
        .header-top {
            text-align: center;
            color: #ffffff;
            font-family: Alibaba-PuHuiTi-H;
            font-size: 32px;
            padding-top: 10px;
            font-weight: 900;
        }
        .header-bottom {
            text-align: center;
            color: #ffffff;
            font-family: Alibaba-PuHuiTi-H;
            line-height: 27px;
        }
    }
    .buttoms {
        position: absolute;
        top: 0px;
        right: 16%;
        display: flex;
        vertical-align: middle;
        img {
            width: 25px;
            height: 25px;
            vertical-align: sub;
        }
        .SSSleft {
            width: 0;
            height: 0;
            position: absolute;
            left: 1px;
            bottom: 0px;
            border-top: 9px solid transparent;
            border-left: 9px solid rgb(1, 44, 139);
            border-right: 9px solid transparent;
            border-bottom: 9px solid rgb(1, 44, 139);
        }
        .SSSleftone {
            width: 0;
            height: 0;
            position: absolute;
            left: 123px;
            bottom: 0px;
            border-top: 9px solid transparent;
            border-left: 9px solid rgb(1, 44, 139);
            border-right: 9px solid transparent;
            border-bottom: 9px solid rgb(1, 44, 139);
        }
        .SSSright {
            width: 0;
            height: 0;
            position: absolute;
            right: 121px;
            bottom: 0px;
            border-top: 9px solid transparent;
            border-left: 9px solid transparent;
            border-right: 9px solid rgb(1, 44, 139);
            border-bottom: 9px solid rgb(1, 44, 139);
        }
        .SSSrightone {
            width: 0;
            height: 0;
            position: absolute;
            right: 0px;
            bottom: 0px;
            border-top: 9px solid transparent;
            border-left: 9px solid transparent;
            border-right: 9px solid rgb(1, 44, 139);
            border-bottom: 9px solid rgb(1, 44, 139);
        }
        .buttom {
            vertical-align: middle;
            margin-left: 2px;
            line-height: 48px;
            text-align: center;
            cursor: pointer;
            width: 120px;
            height: 48px;
            font-family: PingFangSC-Medium;
            font-size: 20px;
            color: #ffffff;
            letter-spacing: 0;
            font-weight: 500;
            background-image: linear-gradient(180deg, #002b86 0%, #00d9da 100%);
        }
    }
    .bodyBox {
        width: 100%;
        height: calc(100% - 355px);
        display: flex;
        .bodyLeft {
            width: 50%;
            margin: 20px 10px 0px 20px;
            .position {
                background-image: linear-gradient(
                    0deg,
                    rgba(0, 9, 47, 0.2) 0%,
                    rgba(0, 9, 47, 0.8) 100%
                );
                height: 40px;
                position: absolute;
                width: 30%;
                top: 70px;
                img {
                    width: 100%;
                    height: 100%;
                    line-height: 40px;
                    padding: 10px 0 0 20px;
                }
                span {
                    position: absolute;
                    width: 30%;
                    top: 5px;
                    left: 70px;
                    font-family: PingFangSC-Medium;
                    font-size: 18px;
                    color: #00ffc2;
                    letter-spacing: 0;
                    line-height: 28px;
                    font-weight: 500;
                }
                div {
                    border-top: 20px solid transparent;
                    border-right: 20px solid transparent;
                    border-left: 20px solid rgba(0, 18, 75);
                    border-bottom: 20px solid rgba(0, 18, 75);

                    background-image: linear-gradient(
                        0deg,
                        rgba(0, 9, 47, 0.2) 0%,
                        rgba(0, 9, 47, 0.8) 100%
                    );
                    position: absolute;
                    top: 0;
                    right: -40px;
                }
            }
            .bodyLeft-top {
                height: 84px;
                background-image: linear-gradient(
                    0deg,
                    rgba(0, 9, 47, 0.3) 0%,
                    rgba(0, 9, 47, 0.7) 100%
                );
                .item {
                    display: flex;
                    img {
                        margin: 12px 5px 12px 30px;
                        width: 56px;
                        height: 56px;
                    }
                    span:nth-child(1) {
                        font-family: PingFangSC-Semibold;
                        font-size: 16px;
                        color: #00ffc2;
                        letter-spacing: 0;
                    }
                    span:nth-child(2) {
                        font-family: PingFangSC-Semibold;
                        font-size: 14px;
                        color: #ffffff;
                        letter-spacing: 0;
                        font-weight: 600;
                    }
                }
            }
            .bodyRight-center {
                display: flex;
                width: 100%;
                height: calc(100% - 84px);
                .bodyRight-center-left {
                    display: flex;
                    width: 45%;
                    height: 100%;
                    flex-direction: column;
                    .boxs {
                        width: 100%;
                        height: 50%;
                        margin-top: 10px;
                        background-image: linear-gradient(
                            0deg,
                            rgba(0, 9, 47, 0.3) 0%,
                            rgba(0, 9, 47, 0.7) 100%
                        );
                        .boxs-header {
                            position: relative;
                            margin: 0 auto;
                            width: 200px;
                            height: 36px;
                            text-align: center;
                            background-image: linear-gradient(
                                180deg,
                                #0058d7 0%,
                                rgba(0, 35, 111, 0.8) 100%
                            );
                            span {
                                font-family: PingFangSC-Medium;
                                display: inline-block;
                                color: #fff;
                                font-size: 18px;
                                line-height: 32px;
                            }
                            .boxs-header-bottom {
                                margin: 0 auto;
                                width: 120px;
                                height: 3px;
                                background-image: linear-gradient(
                                    -89deg,
                                    rgba(0, 219, 255, 0) 0%,
                                    rgba(0, 219, 255, 0.7) 50%,
                                    rgba(0, 219, 255, 0) 100%
                                );
                            }
                            .boxs-header-before {
                                position: absolute;
                                top: 0px;
                                left: 0px;
                                height: 36px;
                                width: 36px;
                                background-image: linear-gradient(
                                    180deg,
                                    #0058d7 0%,
                                    rgba(0, 35, 111, 0.8) 100%
                                );
                                border-left: 18px solid rgb(0, 14, 64);
                                border-right: 18px solid transparent;
                                border-top: 18px solid transparent;
                                border-bottom: 18px solid rgb(0, 14, 64);
                            }
                            .boxs-header-after {
                                position: absolute;
                                top: 0px;
                                right: 0px;
                                height: 36px;
                                width: 36px;
                                background-image: linear-gradient(
                                    180deg,
                                    #0058d7 0%,
                                    rgba(0, 35, 111, 0.8) 100%
                                );
                                border-left: 18px solid transparent;
                                border-right: 18px solid rgb(0, 14, 64);
                                border-top: 18px solid transparent;
                                border-bottom: 18px solid rgb(0, 14, 64);
                            }
                        }
                    }
                }
                .bodyRight-center-right {
                    margin: 10px 0 0 10px;
                    width: 55%;
                    background-image: linear-gradient(
                        0deg,
                        rgba(0, 9, 47, 0.3) 0%,
                        rgba(0, 9, 47, 0.7) 100%
                    );
                    .boxs {
                        height: 36px;
                        .boxs-header {
                            position: relative;
                            margin: 0 auto;
                            width: 100%;
                            height: 36px;
                            text-align: center;
                            background-image: linear-gradient(
                                180deg,
                                #0058d7 0%,
                                rgba(0, 35, 111, 0.8) 100%
                            );
                            span {
                                font-family: PingFangSC-Medium;
                                display: inline-block;
                                color: #fff;
                                font-size: 18px;
                                line-height: 32px;
                            }
                            .boxs-header-bottom {
                                margin: 0 auto;
                                width: 254px;
                                height: 3px;
                                background-image: linear-gradient(
                                    -89deg,
                                    rgba(0, 219, 255, 0) 0%,
                                    rgba(0, 219, 255, 0.7) 50%,
                                    rgba(0, 219, 255, 0) 100%
                                );
                            }
                            .boxs-header-before {
                                position: absolute;
                                top: 0px;
                                left: 0px;
                                height: 36px;
                                width: 36px;
                                background-image: linear-gradient(
                                    180deg,
                                    #0058d7 0%,
                                    rgba(0, 35, 111, 0.8) 100%
                                );
                                border-left: 18px solid rgb(0, 14, 64);
                                border-right: 18px solid transparent;
                                border-top: 18px solid transparent;
                                border-bottom: 18px solid rgb(0, 14, 64);
                            }
                            .boxs-header-after {
                                position: absolute;
                                top: 0px;
                                right: 0px;
                                height: 36px;
                                width: 36px;
                                background-image: linear-gradient(
                                    180deg,
                                    #0058d7 0%,
                                    rgba(0, 35, 111, 0.8) 100%
                                );
                                border-left: 18px solid transparent;
                                border-right: 18px solid rgb(0, 14, 64);
                                border-top: 18px solid transparent;
                                border-bottom: 18px solid rgb(0, 14, 64);
                            }
                        }
                    }
                }
            }
        }
        .bodyRight {
            width: 50%;
            margin: 20px 20px 0px 0;
            .position {
                background-image: linear-gradient(
                    0deg,
                    rgba(0, 9, 47, 0.2) 0%,
                    rgba(0, 9, 47, 0.8) 100%
                );
                height: 40px;
                position: absolute;
                width: 30%;
                top: 70px;
                right: 20px;
                img {
                    width: 100%;
                    height: 100%;
                    line-height: 40px;
                    padding: 10px 0 0 20px;
                    transform: rotateY(180deg);
                }
                span {
                    position: absolute;
                    width: 30%;
                    top: 5px;
                    right: 50px;
                    font-family: PingFangSC-Medium;
                    font-size: 18px;
                    color: #00ffc2;
                    letter-spacing: 0;
                    line-height: 28px;
                    font-weight: 500;
                }
                div {
                    border-top: 20px solid transparent;
                    border-right: 20px solid rgba(0, 18, 75);
                    border-left: 20px solid transparent;
                    border-bottom: 20px solid rgba(0, 18, 75);

                    background-image: linear-gradient(
                        0deg,
                        rgba(0, 9, 47, 0.2) 0%,
                        rgba(0, 9, 47, 0.8) 100%
                    );
                    position: absolute;
                    top: 0;
                    left: -40px;
                }
            }
            .bodyRight-top {
                height: 84px;
                background-image: linear-gradient(
                    0deg,
                    rgba(0, 9, 47, 0.3) 0%,
                    rgba(0, 9, 47, 0.7) 100%
                );
                div {
                    padding: 15px 20px 0 20px;
                }
                span {
                    cursor: pointer;
                    display: inline-block;
                    width: 22px;
                    height: 28px;
                    background: rgba(255, 255, 255, 0.2);
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                }
                span:nth-last-child(1) {
                    border-right: none;
                }
                .active {
                    width: 22px;
                    height: 28px;
                    background: #00dbff;
                }
                .firsttime {
                    position: absolute;
                    left: 15px;
                    padding: 10px 0 0 0;
                    color: #fff;
                }
                .lasttime {
                    position: absolute;
                    right: 25px;
                    padding: 10px 0 0 0;
                    color: #fff;
                }
            }
            .bodyRight-center {
                display: flex;
                width: 100%;
                height: calc(100% - 84px);
                .bodyRight-center-left {
                    margin: 10px 10px 0 0;
                    width: 55%;
                    background-image: linear-gradient(
                        0deg,
                        rgba(0, 9, 47, 0.3) 0%,
                        rgba(0, 9, 47, 0.7) 100%
                    );
                    .boxs {
                        height: 36px;
                        height: 50%;
                        .boxs-header {
                            position: relative;
                            margin: 0 auto;
                            width: 100%;
                            height: 36px;
                            text-align: center;
                            background-image: linear-gradient(
                                180deg,
                                #0058d7 0%,
                                rgba(0, 35, 111, 0.8) 100%
                            );
                            span {
                                font-family: PingFangSC-Medium;
                                display: inline-block;
                                color: #fff;
                                font-size: 18px;
                                line-height: 32px;
                            }
                            .boxs-header-bottom {
                                margin: 0 auto;
                                width: 254px;
                                height: 3px;
                                background-image: linear-gradient(
                                    -89deg,
                                    rgba(0, 219, 255, 0) 0%,
                                    rgba(0, 219, 255, 0.7) 50%,
                                    rgba(0, 219, 255, 0) 100%
                                );
                            }
                            .boxs-header-before {
                                position: absolute;
                                top: 0px;
                                left: 0px;
                                height: 36px;
                                width: 36px;
                                background-image: linear-gradient(
                                    180deg,
                                    #0058d7 0%,
                                    rgba(0, 35, 111, 0.8) 100%
                                );
                                border-left: 18px solid rgb(0, 14, 64);
                                border-right: 18px solid transparent;
                                border-top: 18px solid transparent;
                                border-bottom: 18px solid rgb(0, 14, 64);
                            }
                            .boxs-header-after {
                                position: absolute;
                                top: 0px;
                                right: 0px;
                                height: 36px;
                                width: 36px;
                                background-image: linear-gradient(
                                    180deg,
                                    #0058d7 0%,
                                    rgba(0, 35, 111, 0.8) 100%
                                );
                                border-left: 18px solid transparent;
                                border-right: 18px solid rgb(0, 14, 64);
                                border-top: 18px solid transparent;
                                border-bottom: 18px solid rgb(0, 14, 64);
                            }
                        }
                    }
                }
                .bodyRight-center-right {
                    display: flex;
                    height: 100%;
                    width: 45%;
                    flex-direction: column;
                    .boxs {
                        width: 100%;
                        height: 50%;
                        margin-top: 10px;
                        background-image: linear-gradient(
                            0deg,
                            rgba(0, 9, 47, 0.3) 0%,
                            rgba(0, 9, 47, 0.7) 100%
                        );
                        .boxs-header {
                            position: relative;
                            margin: 0 auto;
                            width: 200px;
                            height: 36px;
                            text-align: center;
                            background-image: linear-gradient(
                                180deg,
                                #0058d7 0%,
                                rgba(0, 35, 111, 0.8) 100%
                            );
                            span {
                                font-family: PingFangSC-Medium;
                                display: inline-block;
                                color: #fff;
                                font-size: 18px;
                                line-height: 32px;
                            }
                            .boxs-header-bottom {
                                margin: 0 auto;
                                width: 120px;
                                height: 3px;
                                background-image: linear-gradient(
                                    -89deg,
                                    rgba(0, 219, 255, 0) 0%,
                                    rgba(0, 219, 255, 0.7) 50%,
                                    rgba(0, 219, 255, 0) 100%
                                );
                            }
                            .boxs-header-before {
                                position: absolute;
                                top: 0px;
                                left: 0px;
                                height: 36px;
                                width: 36px;
                                background-image: linear-gradient(
                                    180deg,
                                    #0058d7 0%,
                                    rgba(0, 35, 111, 0.8) 100%
                                );
                                border-left: 18px solid rgb(0, 14, 64);
                                border-right: 18px solid transparent;
                                border-top: 18px solid transparent;
                                border-bottom: 18px solid rgb(0, 14, 64);
                            }
                            .boxs-header-after {
                                position: absolute;
                                top: 0px;
                                right: 0px;
                                height: 36px;
                                width: 36px;
                                background-image: linear-gradient(
                                    180deg,
                                    #0058d7 0%,
                                    rgba(0, 35, 111, 0.8) 100%
                                );
                                border-left: 18px solid transparent;
                                border-right: 18px solid rgb(0, 14, 64);
                                border-top: 18px solid transparent;
                                border-bottom: 18px solid rgb(0, 14, 64);
                            }
                        }
                    }
                }
            }
        }
    }
    .footerBox {
        display: flex;
        width: 100%;
        .footerBox-first {
            height: 260px;
            width: 50%;
            margin: 10px 10px 0 20px;
            background-image: linear-gradient(
                0deg,
                rgba(0, 9, 47, 0.3) 0%,
                rgba(0, 9, 47, 0.7) 100%
            );
            .boxs {
                height: 36px;
                .boxs-header {
                    position: relative;
                    margin: 0 auto;
                    width: 400px;
                    height: 36px;
                    text-align: center;
                    background-image: linear-gradient(
                        180deg,
                        #0058d7 0%,
                        rgba(0, 35, 111, 0.8) 100%
                    );
                    span {
                        font-family: PingFangSC-Medium;
                        display: inline-block;
                        color: #fff;
                        font-size: 18px;
                        line-height: 32px;
                    }
                    .boxs-header-bottom {
                        margin: 0 auto;
                        width: 254px;
                        height: 3px;
                        background-image: linear-gradient(
                            -89deg,
                            rgba(0, 219, 255, 0) 0%,
                            rgba(0, 219, 255, 0.7) 50%,
                            rgba(0, 219, 255, 0) 100%
                        );
                    }
                    .boxs-header-before {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        height: 36px;
                        width: 36px;
                        background-image: linear-gradient(
                            180deg,
                            #0058d7 0%,
                            rgba(0, 35, 111, 0.8) 100%
                        );
                        border-left: 18px solid rgb(0, 14, 64);
                        border-right: 18px solid transparent;
                        border-top: 18px solid transparent;
                        border-bottom: 18px solid rgb(0, 14, 64);
                    }
                    .boxs-header-after {
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        height: 36px;
                        width: 36px;
                        background-image: linear-gradient(
                            180deg,
                            #0058d7 0%,
                            rgba(0, 35, 111, 0.8) 100%
                        );
                        border-left: 18px solid transparent;
                        border-right: 18px solid rgb(0, 14, 64);
                        border-top: 18px solid transparent;
                        border-bottom: 18px solid rgb(0, 14, 64);
                    }
                }
            }
        }
        .footerBox-sencond {
            margin: 10px 20px 0 0px;
            height: 260px;
            width: 50%;
            background-image: linear-gradient(
                0deg,
                rgba(0, 9, 47, 0.3) 0%,
                rgba(0, 9, 47, 0.7) 100%
            );
            .boxs {
                height: 36px;
                .boxs-header {
                    position: relative;
                    margin: 0 auto;
                    width: 400px;
                    height: 36px;
                    text-align: center;
                    background-image: linear-gradient(
                        180deg,
                        #0058d7 0%,
                        rgba(0, 35, 111, 0.8) 100%
                    );
                    span {
                        font-family: PingFangSC-Medium;
                        display: inline-block;
                        color: #fff;
                        font-size: 18px;
                        line-height: 32px;
                    }
                    .boxs-header-bottom {
                        margin: 0 auto;
                        width: 254px;
                        height: 3px;
                        background-image: linear-gradient(
                            -89deg,
                            rgba(0, 219, 255, 0) 0%,
                            rgba(0, 219, 255, 0.7) 50%,
                            rgba(0, 219, 255, 0) 100%
                        );
                    }
                    .boxs-header-before {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        height: 36px;
                        width: 36px;
                        background-image: linear-gradient(
                            180deg,
                            #0058d7 0%,
                            rgba(0, 35, 111, 0.8) 100%
                        );
                        border-left: 18px solid rgb(0, 14, 64);
                        border-right: 18px solid transparent;
                        border-top: 18px solid transparent;
                        border-bottom: 18px solid rgb(0, 14, 64);
                    }
                    .boxs-header-after {
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        height: 36px;
                        width: 36px;
                        background-image: linear-gradient(
                            180deg,
                            #0058d7 0%,
                            rgba(0, 35, 111, 0.8) 100%
                        );
                        border-left: 18px solid transparent;
                        border-right: 18px solid rgb(0, 14, 64);
                        border-top: 18px solid transparent;
                        border-bottom: 18px solid rgb(0, 14, 64);
                    }
                }
            }
        }
    }
}
</style>
