<script setup>
import { ref, onBeforeMount } from "vue";
import store from "./store/blog";
import Modal from "./components/Modal.vue";
import scrollToTop from "./helpers/scrollToTop";

onBeforeMount(() => {
    store.dispatch("getArticles");
});

const showModal = ref(false);
const btnIsActive = ref(true);
const render = ref(false);

const sortUp = () => {
    btnIsActive.value = true;
    store.commit("sortArticleUp");
};
const sortDown = () => {

    if(render.value){
        btnIsActive.value = false;
        store.commit("sortArticleDown");
    }

    render.value = true
};
</script>

<template>
    <div class="wrapper">
        <header class="header">
            <div class="logo">
                <router-link to="/"
                    ><img alt="logo" src="../src/image/Logo.png"
                /></router-link>
            </div>
            <div class="button" @click="showModal = true">
                <span></span>
            </div>
        </header>
        <main class="main">
            <div class="conteiner">
                <div class="top">
                    <div class="title"><span>Мой дневничок</span></div>
                    <div class="btn_filter">
                        <button
                            class="btn"
                            :disabled="btnIsActive"
                            :class="{ active: btnIsActive }"
                            @click="sortUp"
                        >
                            <svg
                                v-if="btnIsActive"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M4 6H20M4 12H14M4 18H8"
                                    stroke="#050F28"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M14 16L18 20M18 20L22 16M18 20L18 4"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <svg
                                v-if="!btnIsActive"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M4 6H20M4 12H14M4 18H8"
                                    stroke="#050F28"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M14 16L18 20M18 20L22 16M18 20L18 4"
                                    stroke="#88A1DE"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <span>Сначала новые</span>
                        </button>
                        <button
                            class="btn"
                            :disabled="!btnIsActive"
                            :class="{ active: !btnIsActive }"
                            @click="sortDown"
                        >
                            <svg
                                v-if="btnIsActive"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M4 6H20M4 12H14M4 18H8"
                                    stroke="#050F28"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M14 8L18 4M18 4L22 8M18 4L18 20"
                                    stroke="#88A1DE"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <svg
                                v-if="!btnIsActive"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M4 6H20M4 12H14M4 18H8"
                                    stroke="#050F28"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M14 8L18 4M18 4L22 8M18 4L18 20"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <span>Сначала старые</span>
                        </button>
                    </div>
                </div>

                <router-view></router-view>
            </div>
        </main>
        <footer class="footer">
            <span class="text">Мой Дневничок</span>
            <button class="btnTop" @click="scrollToTop">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M19 12L12 5L5 12M12 5L12 19"
                        stroke="#050F28"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <span>наверх</span>
            </button>
        </footer>
    </div>
    <modal :show="showModal" @close="showModal = false"> </modal>
</template>

<style lang="scss" scoped>
@import "./styles/main.scss";

.wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 25px;
        @media only screen and (max-width: 374px) {
            margin: 10px;
        }

        .logo {
            width: 448px;
            height: 111px;
            @media only screen and (max-width: 374px) {
                height: auto;
            }

            img {
                @media only screen and (max-width: 374px) {
                    width: 186px;
                }
            }
        }

        .button {
            display: flex;
            width: 342px;
            height: 97px;
            padding: 42px 120px;
            justify-content: center;
            cursor: pointer;
            align-items: center;
            gap: 10px;
            border-radius: 65px;
            background: #050f28;
            color: white;

            @media only screen and (max-width: 374px) {
                width: 60px;
                height: 60px;
                border-radius: 30px;
                padding: 1px;
            }

            &:hover {
                background: #88a1de;
            }
            span {
                color: white;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: 90%;
                letter-spacing: 1.08px;
                text-transform: uppercase;
                &::after {
                    content: "написать";
                }
                @media only screen and (max-width: 374px) {
                    &::after {
                        content: url("../src/image/write.svg");
                        padding: 18px;
                    }
                }
            }
        }
    }

    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 80px 80px 0px 0px;
        background: #f6f6f6;

        @media only screen and (max-width: 374px) {
            border-radius: 30px 30px 0px 0px;
        }
        .conteiner {
            display: flex;
            height: 100%;
            flex-direction: column;
            width: 100%;
            padding: 80px 40px 80px 40px;
            gap: 30px;
            border-radius: 15px;

            @media only screen and (max-width: 374px) {
                padding: 30px 10px;
                padding-bottom: 70px;
            }

            .top {
                display: flex;
                justify-content: space-between;
                align-items: end;

                @media only screen and (max-width: 374px) {
                    flex-direction: column;
                    align-items: start;
                }

                .title {
                    width: 40%;
                    span {
                        color: #050f28;
                        font-size: 112px;
                        font-style: normal;
                        font-weight: 700;

                        @media only screen and (min-width: 375px) and (max-width: 1024px) {
                            font-size: 72px;
                        }
                        @media only screen and (max-width: 374px) {
                            font-size: 42px;
                        }
                    }
                    @media only screen and (max-width: 374px) {
                        width: 100%;
                        margin-bottom: 25px;
                    }
                }

                .btn_filter {
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                    @media only screen and (max-width: 374px) {
                        gap: 20px;
                    }

                    .btn {
                        display: inline-flex;
                        padding: 20px;
                        align-items: center;
                        border: none;
                        outline: none;
                        gap: 7px;
                        border-radius: 40px;
                        background-color: #f6f6f6;
                        cursor: pointer;
                        @media only screen and (max-width: 374px) {
                            width: 164px;
                            padding: 10px 14px;
                            gap: 6px;
                        }
                        span {
                            color: #050f28;
                            font-size: 16px;
                            font-style: normal;
                            font-weight: 700;
                            line-height: 110%; 

                            @media only screen and (max-width: 374px) {
                                font-size: 13px;
                            }
                        }
                    }
                    .active {
                        background-color: #88a1de;
                    }
                }
            }
        }
    }
    .footer {
        display: flex;
        height: 70px;
        flex: 0 0 auto;
        background-color: #050f28;
        align-items: center;
        position: relative;

        @media only screen and (max-width: 374px) {
            height: 87px;
            align-items: end;
        }

        .text {
            color: #fff;
            padding-left: 40px;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 110%; 
            letter-spacing: 0.72px;
            @media only screen and (max-width: 374px) {
                margin-bottom: 14px;
                padding-left: 20px;
            }
        }

        .btnTop {
            display: inline-flex;
            position: absolute;
            top: -35px;
            right: 40px;
            padding: 24px 60px;
            justify-content: center;
            align-items: center;
            gap: 16px;
            border-radius: 40px;
            border: none;
            cursor: pointer;
            outline: none;
            background: #88a1de;

            @media only screen and (max-width: 374px) {
                width: 355px;
                top: -50px;
                right: 10px;
            }

            &:hover {
                background: #90a6dd;
                color: white;
            }
            &:hover span {
                color: white;
            }
            span {
                color: #050f28;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: 110%; 
                letter-spacing: 0.72px;
                text-transform: uppercase;
            }
        }
    }
}
</style>
