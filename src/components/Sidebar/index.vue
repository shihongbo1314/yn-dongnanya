<template>
    <div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <span class="sidebarName">{{sidebarName}}</span>
            <div class="block">
                <el-date-picker
                    v-model="valueData"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <i
                    class="el-icon-caret-left"
                    @click="minusTime"
                ></i>
                <i
                    class="el-icon-caret-right"
                    @click="addTime"
                ></i>
            </div>
            <el-collapse v-model="activeNames">
                <el-collapse-item
                    v-for="(item,index) in routeList"
                    :key="index"
                    name="1"
                >
                    <template slot="title">
                        <img :src="item.src" />{{item.type}}
                    </template>
                    <div
                        v-for="(yaosu,ind) in item.children"
                        :key="ind"
                        :class="ind == active ? 'is-active':''"
                        @click="ActiveClick(ind,yaosu.name)"
                    >
                        <svg-icon :icon-class="ind == active ? 'shixin':'kongxin'" />{{yaosu.name}}
                    </div>
                    <div
                        v-for="(yaosu,ind) in item.shuju"
                        :key="ind"
                        :class="ind == active1 ? 'is-active':''"
                        @click="ActiveClickone(ind,yaosu.name)"
                    >
                        <svg-icon :icon-class="ind == active1 ? 'shixin':'kongxin'" />{{yaosu.name}}
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    name: "Sidebar",
    props: {
        sidebarName: {
            type: String,
            default: "",
        },
        routeList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            valueData: new Date(),
            activeNames: ["1", "2"],
            active: null,
            active1: null,
        };
    },
    watch: {
        routeList(val) {
            if (val) {
                this.ActiveClick(0, this.routeList[0].children[0].name);
                this.ActiveClickone(
                    0,
                    this.routeList[1] ? this.routeList[1].shuju[0].name : null
                );
            }
        },
    },
    mounted() {
        this.ActiveClick(0, this.routeList[0].children[0].name);
        this.ActiveClickone(
            0,
            this.routeList[1] ? this.routeList[1].shuju[0].name : ""
        );
    },
    methods: {
        ActiveClick(ind, yaosu) {
            this.active = ind;
            this.$emit("parentClick", yaosu);
        },
        ActiveClickone(ind, yaosu) {
            this.active1 = ind;
            this.$emit("parentClickarea", yaosu);
        },
        minusTime() {
            let time = this.valueData;
            this.valueData = new Date(time.setDate(time.getDate() - 1));
        },
        addTime() {
            let time = this.valueData;
            this.valueData = new Date(time.setDate(time.getDate() + 1));
        },
    },
};
</script>
<style lang="scss" scoped>
.sidebarName {
    display: inline-block;
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #fff;
    padding-left: 20px;
    font-size: 18px;
    text-align: left;
}
.block {
    position: relative;
    ::v-deep.el-input__suffix {
        right: 80px !important;
    }
}
.svg-icon {
    margin: 0 10px;
    vertical-align: initial;
}
::v-deep.el-collapse {
    border: 0px;
    .el-collapse-item__header {
        height: 40px;
        margin-top: 10px;
        background: #1a2a5f;
        border: 0px;
        color: #fff;
        font-size: 16px;
        padding-left: 10px;
        img {
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
        .el-icon-arrow-right {
            display: none;
        }
    }
    .el-collapse-item__content {
        background: #00124d;
        padding-bottom: 0px;
        div {
            width: 184px;
            height: 40px;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
            margin: 10px;
            line-height: 40px;
            text-align: left;
        }
        .is-active {
            background-image: linear-gradient(270deg, #00124d 0%, #00dbff 100%);
            border-radius: 4px;
            cursor: pointer;
        }
        div:hover {
            width: 184px;
            height: 40px;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 4px;
            cursor: pointer;
        }
    }
    .el-collapse-item__wrap {
        border: 0px;
        background: #00124d;
    }
}

.el-icon-caret-left {
    font-size: 16px;
    position: absolute;
    top: 11px;
    right: 50px;
    color: #fff;
    cursor: pointer;
}

.el-icon-caret-right {
    font-size: 16px;
    position: absolute;
    top: 11px;
    right: 30px;
    color: #fff;
    cursor: pointer;
}
::v-deep.el-input--prefix .el-input__inner {
    height: 40px;
    width: 216px;
    color: #fff;
    border-radius: 0;
    border: 0;
    background: #1a2a5f;
}
</style>
