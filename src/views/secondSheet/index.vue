<template>
    <div class="secondSheet">
        <div class="secondSheet-header">
            <div class="secondSheet-header-left">
                <img src="@/assets/logo.png" />
                <span>东南亚极端气候事件监测预测系统</span>
            </div>
            <el-input
                v-model="input"
                placeholder="请输入"
                suffix-icon="el-icon-search"
            ></el-input>
            <div class="secondSheet-header-right">
                <span @click="$router.push('/home')">主页</span>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">实况资料</span>
                    <el-dropdown-menu
                        slot="dropdown"
                        class="header-new-dro"
                    >
                        <el-dropdown-item command="CIMISS">CIMISS</el-dropdown-item>
                        <el-dropdown-item command="CLDAS">CLDAS</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">延伸期预报</span>
                    <el-dropdown-menu
                        slot="dropdown"
                        class="header-new-dro"
                    >
                        <el-dropdown-item command="CFSv2">CFSv2</el-dropdown-item>
                        <el-dropdown-item command="EC数据">EC数据</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">资料汇集</span>
                    <el-dropdown-menu
                        slot="dropdown"
                        class="header-new-dro"
                    >
                        <el-dropdown-item command="ERA-interim">ERA-interim</el-dropdown-item>
                        <el-dropdown-item command="再分析资料实况">再分析资料实况</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">预报校验</span>
                    <el-dropdown-menu
                        slot="dropdown"
                        class="header-new-dro"
                    >
                        <el-dropdown-item command="总体检验">总体检验</el-dropdown-item>
                        <el-dropdown-item command="逐日分组">逐日分组</el-dropdown-item>
                        <el-dropdown-item command="逐周分组">逐周分组</el-dropdown-item>
                        <el-dropdown-item command="逐月分组">逐月分组</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">服务产品</span>
                    <el-dropdown-menu
                        slot="dropdown"
                        class="header-new-dro"
                    >
                        <el-dropdown-item command="服务产品库">服务产品库</el-dropdown-item>
                        <el-dropdown-item command="模板管理">模板管理</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">系统管理</span>
                    <el-dropdown-menu
                        slot="dropdown"
                        class="header-new-dro"
                    >
                        <el-dropdown-item command="用户管理">用户管理</el-dropdown-item>
                        <el-dropdown-item command="角色管理">角色管理</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span @click="$router.push('/login')">退出</span>
            </div>
        </div>
        <Sidebar
            class="sidebar-container"
            :sidebarName='sidebarName'
            :routeList='routeList'
            @parentClick='parentClick'
            @parentClickarea='parentClickarea'
        />
        <div class="main-container">
            <Maplayer />
            <Timeline :textDocument='textDocument' />
        </div>
    </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/index";
import Maplayer from "@/components/maplayer/index";
import Timeline from "@/components/timeline/index";
import { Fungetdate } from "@/utils/index";
export default {
    name: "secondSheet",
    data() {
        return {
            input: "",
            spanBox: [
                "主页",
                "实况资料",
                "延伸期预报",
                "资料汇集",
                "预报校验",
                "服务产品",
                "系统管理",
                "退出",
            ],
            sidebarName: "",
            routeList: [],
            textDocument: "",
        };
    },
    created() {
        this.handleCommand("CIMISS");
    },
    components: {
        Sidebar,
        Maplayer,
        Timeline,
    },
    methods: {
        handleCommand(command) {
            this.sidebarName = command;
            switch (command) {
                case "CIMISS":
                    this.routeList = [
                        {
                            type: "要素选择",
                            src: require("@/assets/element.png"),
                            children: [
                                {
                                    index: 0,
                                    name: "日平均气温",
                                    title: "temavg",
                                    legend: "TMP",
                                    imgLegend: "TEM",
                                },
                                {
                                    index: 1,
                                    name: "逐日最高温",
                                    title: "temmax",
                                    legend: "TMP",
                                    imgLegend: "TEM",
                                },
                                {
                                    index: 2,
                                    name: "逐日降水量",
                                    title: "pretime2020",
                                    legend: "24HOR",
                                    imgLegend: "ER24",
                                },
                                {
                                    index: 3,
                                    name: "高温热浪",
                                    title: "temmax",
                                    legend: "gaowen",
                                    imgLegend: "GH",
                                    gwrlType: 1,
                                },
                                {
                                    index: 4,
                                    name: "气象干旱综合指数",
                                    title: "MCI",
                                    legend: "ganhan",
                                    imgLegend: "GH",
                                },
                                {
                                    index: 5,
                                    name: "标准化降水指数",
                                    title: "SPI_30",
                                    legend: "ganhan",
                                    imgLegend: "GH",
                                },
                                {
                                    index: 6,
                                    name: "标准化降水指数",
                                    title: "SPI_130",
                                    legend: "ganhan",
                                    imgLegend: "GH",
                                },
                                {
                                    index: 7,
                                    name: "相对湿润度干旱等级",
                                    title: "MI",
                                    legend: "ganhan",
                                    imgLegend: "GH",
                                },
                            ],
                        },
                    ];
                    break;
                case "CFSv2":
                    this.routeList = [
                        {
                            type: "要素选择",
                            src: require("@/assets/element.png"),
                            children: [
                                {
                                    index: 0,
                                    name: "降水",
                                    title: "temavg",
                                    legend: "TMP",
                                    imgLegend: "TEM",
                                },
                                {
                                    index: 1,
                                    name: "平均2m气温",
                                    title: "temmax",
                                    legend: "TMP",
                                    imgLegend: "TEM",
                                },
                                {
                                    index: 2,
                                    name: "最高气温",
                                    title: "pretime2020",
                                    legend: "24HOR",
                                    imgLegend: "ER24",
                                },
                                {
                                    index: 3,
                                    name: "最低气温",
                                    title: "temmax",
                                    legend: "gaowen",
                                    imgLegend: "GH",
                                    gwrlType: 1,
                                },
                                {
                                    index: 4,
                                    name: "500水汽输送场",
                                    title: "MCI",
                                    legend: "ganhan",
                                    imgLegend: "GH",
                                },
                                {
                                    index: 5,
                                    name: "200hPa高度场",
                                    title: "SPI_30",
                                    legend: "ganhan",
                                    imgLegend: "GH",
                                },
                                {
                                    index: 6,
                                    name: "500hPa高度场",
                                    title: "SPI_130",
                                    legend: "ganhan",
                                    imgLegend: "GH",
                                },
                            ],
                        },
                        {
                            type: "数据范围",
                            src: require("@/assets/shujufanwei.png"),
                            shuju: [
                                {
                                    index: 7,
                                    name: "澜沧江",
                                    title: "temavg",
                                    legend: "TMP",
                                    imgLegend: "TEM",
                                },
                                {
                                    index: 8,
                                    name: "东南亚",
                                    title: "temmax",
                                    legend: "TMP",
                                    imgLegend: "TEM",
                                },
                                {
                                    index: 9,
                                    name: "东北半球",
                                    title: "pretime2020",
                                    legend: "24HOR",
                                    imgLegend: "ER24",
                                },
                                {
                                    index: 10,
                                    name: "目标区",
                                    title: "temmax",
                                    legend: "gaowen",
                                    imgLegend: "GH",
                                    gwrlType: 1,
                                },
                            ],
                        },
                    ];
                    break;
                case "EC数据":
                    this.routeList = [
                        {
                            type: "要素选择",
                            src: require("@/assets/element.png"),
                            children: [
                                {
                                    index: 0,
                                    name: "降水",
                                    title: "temavg",
                                    legend: "TMP",
                                    imgLegend: "TEM",
                                },
                                {
                                    index: 1,
                                    name: "温度",
                                    title: "temmax",
                                    legend: "TMP",
                                    imgLegend: "TEM",
                                },
                                {
                                    index: 2,
                                    name: "500hpa高度场",
                                    title: "pretime2020",
                                    legend: "24HOR",
                                    imgLegend: "ER24",
                                },
                                {
                                    index: 3,
                                    name: "200hpa高度场",
                                    title: "temmax",
                                    legend: "gaowen",
                                    imgLegend: "GH",
                                    gwrlType: 1,
                                },
                                {
                                    index: 4,
                                    name: "最高气温",
                                    title: "MCI",
                                    legend: "ganhan",
                                    imgLegend: "GH",
                                },
                                {
                                    index: 5,
                                    name: "最低气温",
                                    title: "SPI_30",
                                    legend: "ganhan",
                                    imgLegend: "GH",
                                },
                                {
                                    index: 6,
                                    name: "500h水汽输送场",
                                    title: "SPI_130",
                                    legend: "ganhan",
                                    imgLegend: "GH",
                                },
                            ],
                        },
                        {
                            type: "数据范围",
                            src: require("@/assets/shujufanwei.png"),
                            shuju: [
                                {
                                    index: 7,
                                    name: "澜沧江",
                                    title: "temavg",
                                    legend: "TMP",
                                    imgLegend: "TEM",
                                },
                                {
                                    index: 8,
                                    name: "东南亚",
                                    title: "temmax",
                                    legend: "TMP",
                                    imgLegend: "TEM",
                                },
                                {
                                    index: 9,
                                    name: "东北半球",
                                    title: "pretime2020",
                                    legend: "24HOR",
                                    imgLegend: "ER24",
                                },
                                {
                                    index: 10,
                                    name: "目标区",
                                    title: "temmax",
                                    legend: "gaowen",
                                    imgLegend: "GH",
                                    gwrlType: 1,
                                },
                            ],
                        },
                    ];
                    break;
                default:
                    break;
            }
        },
        parentClick(yaosu) {
            console.log(yaosu);
            this.textDocument = `未来45天${yaosu}预报`
        },
        parentClickarea(yaosu) {
            console.log(yaosu);
        },
    },
};
</script>
<style lang="scss">
.header-new-dro {
    background-color: #00124d;
}
.header-new-dro li {
    color: #fff;
}
</style>
<style lang="scss" scoped>
.secondSheet {
    height: 100%;
}
.secondSheet-header {
    height: 64px;
    display: flex;
    background: #00124d;
    .secondSheet-header-left {
        width: 560px;
        display: flex;
        height: 64px;
        line-height: 64px;
        background-image: linear-gradient(270deg, #00124d 0%, #005ada 100%);
        img {
            margin: 8px 15px 0 10px;
            width: 48px;
            height: 48px;
        }
        span {
            display: inline-block;
            color: #fff;
            font-size: 28px;
            font-weight: 900;
        }
    }
    .secondSheet-header-right {
        display: flex;
        color: #fff;
        margin-left: 170px;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 28px;
        font-weight: 500;
        span {
            display: inline-block;
            width: 112px;
            height: 64px;
            text-align: center;
            line-height: 64px;
            cursor: pointer;
        }
        span:hover {
            height: 64px;
            background-image: linear-gradient(
                180deg,
                #0058d7 0%,
                rgba(0, 35, 111, 0.8) 100%
            );
            border-bottom: 2px solid #00dbff;
        }
        ::v-deep.el-dropdown {
            display: inline-block;
            width: 112px;
            height: 64px;
            text-align: center;
            line-height: 64px;
            cursor: pointer;
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #ffffff;
            letter-spacing: 0;
        }
    }

    ::v-deep.el-input {
        width: 200px;
        height: 32px;
        margin: auto 150px;
        margin-right: 0;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 16px;
    }
    ::v-deep.el-input__inner {
        width: 200px;
        height: 32px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 16px;
    }
    ::v-deep.el-input__icon {
        line-height: 32px;
    }
}
.sidebar-container {
    position: fixed;
    top: 64px;
    left: 0;
    background: #00124d;
    height: calc(100% - 64px);
}
.main-container {
    height: calc(100% - 64px);
    margin-left: 220px;
}
</style>