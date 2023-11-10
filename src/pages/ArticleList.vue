<script setup>
import { ref } from "vue";
import store from "../store/blog";
import scrollToTop from "../helpers/scrollToTop";

const btnIsActive = ref(1);
const btnDisabled = ref(false);

store.subscribe((mutation, state) => {
    if(mutation.type == "oneActivePage"){
        btnIsActive.value = 1
    }
})

const moreItems = () => {
    btnDisabled.value = false;
    if (btnIsActive.value == store.getters.getCountPage.length) {
        btnDisabled.value = true;
    } else {
        const n = +btnIsActive.value + 1;
        store.commit("moreActivePage", n);
        console.log(n);
        btnIsActive.value = +btnIsActive.value + 1;
    }
};

const nextPage = () => {
    if (
        btnIsActive.value >= 1 &&
        btnIsActive.value < store.getters.getCountPage.length
    ) {
        btnIsActive.value = btnIsActive.value + 1;
        const n = +btnIsActive.value;
        store.commit("updateActivePage", n);
        scrollToTop();
    }
};

const prevPage = () => {
    if (
        btnIsActive.value > 1 &&
        btnIsActive.value <= store.getters.getCountPage.length
    ) {
        btnIsActive.value = btnIsActive.value - 1;
        const n = +btnIsActive.value;
        store.commit("updateActivePage", n);
        scrollToTop();
    }
};

const pageSelection = (n) => {
    btnIsActive.value = n;
    store.commit("updateActivePage", n);
    scrollToTop();
};
</script>

<template>
    <div class="content">
        <div
            class="item"
            v-for="item in store.getters.pageArticles"
            :key="item"
        >
            <h1 class="title">{{ item.title }}</h1>
            <p class="text">{{ item.text }}</p>
            <div>
                <span class="date">{{ item.date }}</span>
                <span class="time">{{ item.time }}</span>
            </div>
        </div>
    </div>
    <button
        v-if="btnIsActive !== store.getters.getCountPage.length"
        class="more"
        @click="moreItems"
        :disabled="btnDisabled"
    >
        <span>Показать больше</span>
    </button>
    <div class="page">
        <span class="prev" @click="prevPage"></span>
        <div v-for="n in store.getters.getCountPage" :key="n">
            <span
                class="numPage"
                :class="{ active: btnIsActive == n }"
                @click="pageSelection(n)"
                >{{ n }}</span
            >
        </div>
        <span class="next" @click="nextPage"></span>
    </div>
</template>

<style lang="scss" scoped>
.page {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    gap: 35px;
    padding: 25px 0;

    .prev {
        margin-right: 60px;
        cursor: pointer;

        @media only screen and (max-width: 374px) {
            margin-right: 1px;
        }
        &::after {
            content: url("../image/prev.svg");
        }
    }
    .next {
        margin-left: 60px;
        cursor: pointer;
        @media only screen and (max-width: 374px) {
            margin-left: 1px;
        }
        &::after {
            content: url("../image/next.svg");
        }
    }

    .numPage {
        color: #050f28;
        cursor: pointer;
        font-size: 22px;
        text-align: center;
        font-style: normal;
        font-weight: 700;
        line-height: 90%;
        // letter-spacing: 22px;
        text-transform: uppercase;
    }

    .active {
        color: #88a1de;
    }
}

.more {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    margin-top: 25px;
    background: #fff;
    padding: 42px;
    border: none;
    outline: none;
    cursor: pointer;

    span {
        color: #050f28;
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 90%;
        letter-spacing: 1.32px;
        text-transform: uppercase;
    }
}
.content {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    width: 100%;
    @media only screen and (max-width: 374px) {
        gap: 20px;
    }

    .item {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 578px;
        padding: 70px 30px;
        background-color: white;
        border-radius: 10px;

        @media only screen and (min-width: 375px) and (max-width: 1024px) {
            width: 453px;
            padding: 50px 30px;
        }

        @media only screen and (max-width: 374px) {
            padding: 35px 10px;
        }

        h1 {
            color: #050f28;
            font-size: 42px;
            font-style: normal;
            font-weight: 700;
            line-height: 110%; /* 46.2px */
        }

        p {
            color: #050f28;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 170%; /* 30.6px */
        }

        div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 45px;
            span {
                display: flex;
                color: #88a1de;
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                line-height: 120%; /* 24px */
                align-items: center;
                justify-content: center;
            }
            .date {
                &::before {
                    content: url("../image/cal.svg");
                    padding-right: 14px;
                    margin-top: 3px;
                }
            }

            .time {
                &::before {
                    content: url("../image/tim.svg");
                    padding-right: 14px;
                    margin-top: 3px;
                }
            }
        }
    }
}
</style>
