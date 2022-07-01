<template>
    <div class="timeline">
        <div class="header-top">
            <div>{{textDocument}}</div>
            <div>当前日期 {{NewDate}}</div>
        </div>
        <div class="timelineboxs">
            <span
                v-for="sp,index in timeList"
                :key="index"
                :class="active == index ? 'active':''"
                @click="pointClick(index)"
            >{{sp | tian }}</span>
        </div>
        <el-select
            class="el-select"
            v-model="value"
            @change="changeSelect"
            placeholder="时间间隔      1天"
        >
            <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
            >
            </el-option>
        </el-select>
        <el-button
            class="Bigbutton"
            @click="Bigbutton"
        ><img src="@/assets/xiazai.png" />{{dialogVisible ? '切换为地图展示':'切换为列表展示'}}</el-button>
        <el-dialog
            :modal='false'
            :visible.sync="dialogVisible"
            width="87%"
            :close-on-click-modal="false"
        >
            <div
                slot="title"
                class="dialog-title"
            >
                <el-radio-group
                    v-model="radio"
                    @change='changeRadio'
                >
                    <el-radio :label="3">全选</el-radio>
                    <el-radio :label="6">选择部分</el-radio>
                </el-radio-group>
                <div class="Allbutton"><img src="@/assets/xiazai2.png" />批量下载</div>
            </div>
            <div class="PictureList">
                <el-card
                    :body-style="{ padding: '0px' }"
                    class="el-card"
                    v-for="card,index in cardList"
                    :key="index"
                >
                    <el-checkbox v-model="card.checked">
                        <img
                            :src="card.src"
                            class="image"
                        >
                        <div class="bottom-box">
                            <span>{{card.label}}</span>
                            <div style="position: relative;">
                                <div>{{card.time}}</div>
                                <div class="poc">
                                    <img src="@/assets/fangda.png" />
                                    <img src="@/assets/xiazai2.png" />
                                </div>
                            </div>
                        </div>
                    </el-checkbox>
                </el-card>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// @ is an alias to /src
import { parseTime, Fungetdate } from "@/utils/index";
export default {
    name: "Timeline",
    props: {
        textDocument: {
            type: String,
            default: "",
        },
    },
    filters: {
        tian(val) {
            return val < 10 ? "0" + val : "" + val;
        },
    },
    data() {
        return {
            active: null,
            options: ["1天", "3天", "5天", "7天"],
            value: null,
            dialogVisible: false,
            radio: 3,
            cardList: [
                {
                    src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                    label: "ECCC 2M Temperture suib…",
                    time: "2022-04-01",
                    checked: false,
                },
                {
                    src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                    label: "ECCC 2M Temperture suib…",
                    time: "2022-04-01",
                    checked: false,
                },
                {
                    src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                    label: "ECCC 2M Temperture suib…",
                    time: "2022-04-01",
                    checked: false,
                },
                {
                    src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                    label: "ECCC 2M Temperture suib…",
                    time: "2022-04-01",
                    checked: false,
                },
                {
                    src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                    label: "ECCC 2M Temperture suib…",
                    time: "2022-04-01",
                    checked: false,
                },
                {
                    src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                    label: "ECCC 2M Temperture suib…",
                    time: "2022-04-01",
                    checked: false,
                },
                {
                    src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                    label: "ECCC 2M Temperture suib…",
                    time: "2022-04-01",
                    checked: false,
                },
            ],
            NewDate: parseTime(new Date(), "yyyy-MM-dd"),
            timeList: [],
        };
    },
    mounted() {
        if (this.radio == 3) {
            this.cardList.map((item) => {
                item.checked = true;
            });
        }
        for (let i = 0; i <= 45; i++) {
            let time = Fungetdate(i).split("-")[1];
            this.timeList.push(time);
        }
    },
    methods: {
        pointClick(ind) {
            this.active = ind;
        },
        changeSelect() {
            this.timeList = [];
            this.value =
                "时间间隔" +
                "\xa0" +
                "\xa0" +
                "\xa0" +
                "\xa0" +
                "\xa0" +
                "\xa0" +
                this.value;
            switch (this.value) {
                case "时间间隔      1天":
                    for (let i = 0; i <= 45; i++) {
                        let time = Fungetdate(i).split("-")[1];
                        this.timeList.push(time);
                    }
                    break;
                case "时间间隔      3天":
                    for (let i = 0; i <= 45; i++) {
                        let time = Fungetdate(i).split("-")[1];
                        if (time % 3 == 0) {
                            this.timeList.push(time);
                        }
                    }
                    break;
                case "时间间隔      5天":
                    for (let i = 0; i <= 45; i++) {
                        let time = Fungetdate(i).split("-")[1];
                        if (time % 5 == 0) {
                            this.timeList.push(time);
                        }
                    }
                    break;
                case "时间间隔      7天":
                    for (let i = 0; i <= 45; i++) {
                        let time = Fungetdate(i).split("-")[1];
                        if (time % 7 == 0) {
                            this.timeList.push(time);
                        }
                    }
                    break;
                default:
                    break;
            }
        },
        Bigbutton() {
            this.dialogVisible = !this.dialogVisible;
        },
        changeRadio() {
            if (this.radio == 6) {
                this.cardList.map((item) => {
                    item.checked = false;
                });
            } else {
                this.cardList.map((item) => {
                    item.checked = true;
                });
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.timeline {
    display: flex;
    align-items: center;
    height: 56px;
    width: 87%;
    background: rgba(0, 18, 77, 0.6);
    border-radius: 0px 4px 4px 4px;
    position: absolute;
    z-index: 999;
    margin: 0 15px;
    bottom: 15px;
    .header-top {
        position: absolute;
        top: -40px;
        left: 0;
        display: flex;
        color: #fff;
        cursor: pointer;
        div:nth-child(1) {
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            background-image: linear-gradient(
                180deg,
                #0058d7 0%,
                rgba(0, 35, 111, 0.8) 100%
            );
            border-radius: 4px 4px 0px 0px;
        }
        div:nth-child(2) {
            width: 202px;
            margin-left: 1px;
            height: 40px;
            line-height: 40px;
            background-image: linear-gradient(
                180deg,
                #0058d7 0%,
                rgba(0, 35, 111, 0.8) 100%
            );
            border-radius: 4px 4px 0px 0px;
        }
    }
    .timelineboxs {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px 4px 4px 4px;
        height: 24px;
        margin-left: 15px;
        cursor: pointer;
        span {
            width: 28px;
            height: 24px;
            display: inline-block;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.5);
            letter-spacing: 0;
            text-align: center;
            line-height: 24px;
            font-weight: 400;
        }
    }
    .el-select {
        width: 160px;
        height: 32px;
        margin-left: 20px;
        border: 1px solid rgba(231, 235, 241, 1);
        border-radius: 4px;
        border: none;
        ::v-deep.el-input__inner {
            height: 32px !important;
            background-color: transparent !important;
            color: #fff;
            &::placeholder {
                color: #fff;
            }
        }
        ::v-deep.el-input__icon {
            line-height: 32px;
        }
    }
    .Bigbutton {
        width: 160px;
        height: 32px;
        color: #fff;
        background: #2981ff;
        margin-left: 20px;
        border-radius: 4px;
        padding: 0;
        border: none;
        img {
            width: 24px;
            height: 24px;
            vertical-align: middle;
        }
    }
    .Allbutton {
        width: 116px;
        height: 32px;
        line-height: 32px;
        color: #fff;
        background: #0058d6;
        border-radius: 4px;
        margin-left: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img {
            width: 24px;
            height: 24px;
        }
    }
    ::v-deep.el-dialog {
        margin-top: 80px !important;
        margin-bottom: 0;
        margin-left: 235px !important;
        box-shadow: none !important;
        .el-radio-group {
            line-height: 45px;
        }
        .dialog-title {
            display: flex;
        }
        .PictureList {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            .el-checkbox__input {
                position: absolute;
                top: 12px;
                left: 12px;
            }
            .el-checkbox__label {
                padding-left: 0;
            }
            .el-checkbox__inner {
                width: 30px;
                height: 30px;
                border-radius: 8px;
            }
            .el-checkbox__inner::after {
                width: 10px;
                height: 20px;
                left: 9px;
            }
            .el-checkbox__input.is-checked + .el-checkbox__label {
                background: #00124d;
                border-radius: 4px;
                color: #fff;
            }
            .bottom-box {
                text-align: left;
                padding: 0 10px;
                div {
                    margin: 10px 0;
                }
                .poc {
                    position: absolute;
                    right: 0;
                    top: -13px;
                    img {
                        width: 24px;
                        height: 24px;
                        margin: 0 5px;
                    }
                }
            }
        }
        .el-dialog__header {
            height: 48px;
            padding: 10px 20px 10px;
            background: #e7ebf1;
            border-radius: 4px 4px 0px 0px;
            overflow: hidden;
        }
        .el-dialog__body {
            // 128
            height: 740px !important;
            padding: 20px !important;
            .image {
                width: 230px;
                height: 138px;
                margin: 10px;
            }
            .el-card {
                border: none;
                box-shadow: none !important;
                margin: 0 10px 20px 10px;
                .el-card__body {
                    width: 250px;
                    height: 224px;
                    background: #ffffff;
                    border: 1px solid rgba(231, 235, 241, 1);
                    border-radius: 4px;
                }
            }
        }
    }
    ::v-deep .el-dialog__wrapper {
        bottom: 69px;
    }
    .active {
        width: 28px;
        height: 24px;
        cursor: pointer;
        background: #2981ff !important;
    }
}
</style>