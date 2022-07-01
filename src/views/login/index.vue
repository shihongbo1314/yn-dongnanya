<template>
    <div class="login-container">
        <div class="title-container">
            <img src="@/assets/logo.png" />
            <div>
                <div class="title">东南亚极端气候事件监测预测系统</div>
                <div class="title-bottom">Southeast Asia Extreme Climate Event Monitoring and Forecasting System</div>
            </div>

        </div>
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
        >
            <div class="title-header">
                用户登录
            </div>
            <div class="body-container">
                <el-form-item prop="username">
                    <span class="svg-container">
                        <img
                            src="@/assets/user.png"
                            class="img-class"
                        >
                    </span>
                    <span class="text-container">
                        用户名
                    </span>
                    <el-divider direction="vertical"></el-divider>
                    <el-input
                        ref="username"
                        v-model="loginForm.username"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <span class="svg-container">
                        <img
                            src="../../assets/password.png"
                            class="img-class"
                        >
                    </span>
                    <span
                        class="text-container"
                        style="letter-spacing: 20px;"
                    >
                        密码
                    </span>
                    <el-divider
                        direction="vertical"
                        content-position="right"
                    />
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter.native="handleLogin"
                    />
                </el-form-item>

                <el-button
                    :loading="loading"
                    type="primary"
                    style="width:100%;height: 54px;background: #2A82FF;border-radius: 4px;margin-top:30px"
                    @click.native.prevent="handleLogin"
                >登录</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error("Please enter the correct user name"));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(
                    new Error("The password can not be less than 6 digits")
                );
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                username: "admin",
                password: "111111",
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateUsername,
                    },
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validatePassword,
                    },
                ],
            },
            loading: false,
            passwordType: "password",
            redirect: undefined,
        };
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true,
        },
    },
    methods: {
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.$router.push('/home')
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    background-image: url("../../assets/bg.png");
    background-size: 100% 100%;
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 105px;
            color: #000;
            font-size: 18px;
            height: 47px;
            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
        margin-bottom: 30px;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 600px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        top: 60px;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        .img-class {
            width: 28.14px;
            height: 29.87px;
            position: absolute;
            top: 10px;
            left: 8px;
        }
    }
    .text-container {
        font-size: 24px;
        color: #000;
        position: absolute;
        top: 5px;
        left: 48px;
    }
    .title-container {
        position: relative;
        width: 100%;
        top: 130px;
        text-align: center;
        display: flex;
        justify-content: center;
        img {
            margin-right: 20px;
        }
        .title {
            height: 74px;
            font-size: 54px;
            color: #ffffff;
            font-weight: 900;
        }
        .title-bottom {
            height: 32px;
            font-size: 22.5px;
            color: #ffffff;
            letter-spacing: 1px;
            font-weight: 400;
        }
    }
    .title-header {
        position: relative;
        font-family: PingFangSC-Semibold;
        font-size: 30px;
        color: #ffffff;
        text-align: center;
        font-weight: 600;
        line-height: 100px;
        border-radius: 10px 10px 0 0;
        width: 540px;
        height: 100px;
        background-image: linear-gradient(
            180deg,
            #0058d7 0%,
            rgba(0, 35, 111, 0.8) 100%
        );
        border-radius: 10px 10px 0px 0px;
    }
    .body-container {
        width: 540px;
        height: 420px;
        overflow: hidden;
        padding: 70px;
        border-radius: 0 0 10px 10px;
        background: rgba(0, 9, 47, 0.7);
        border-radius: 0px 0px 10px 10px;
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
    ::v-deep.el-form-item__content {
        height: 54px;
        background: #f1f3f8;
        border: 1px solid rgba(217, 221, 232, 1);
        border-radius: 4px;
    }
    ::v-deep.el-divider--vertical {
        height: 2em;
        width: 2px;
        left: 100px;
        color: #000;
    }
}
</style>
