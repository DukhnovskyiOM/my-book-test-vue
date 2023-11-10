<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import store from "../store/blog";

const props = defineProps({
    show: Boolean,
});

const articleForm = ref({
    title: "",
    date: "",
    text: "",
});

const emit = defineEmits(["close"]);

async function onSubmit(e) {
    e.preventDefault();
    const data = new Date();
    const hour = data.getHours();
    const minutes = data.getMinutes();
    const time = hour + ":" + minutes;

    const item = {
        title: articleForm.value.title,
        date: articleForm.value.date.split("-").reverse().join("."),
        time: time,
        text: articleForm.value.text,
    };
    await store.dispatch("newItem", item);
    articleForm.value = {
        title: "",
        date: "",
        text: "",
    };
    emit("close");
    // location.reload();
}
</script>
<template>
    <template v-if="show">
        <div class="modal-mask" @click="$emit('close')"></div>
        <div class="modal-container">
            <div class="content">
                <svg
                    class="del_comment"
                    @click="$emit('close')"
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                >
                    <path
                        d="M11.0834 11.0835L26.9167 26.9168M11.0834 26.9168L26.9167 11.0835"
                        stroke="#050F28"
                        stroke-width="3.16667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <div class="modal-header">
                    <slot name="header">Новая запись</slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        <form class="form" @submit="onSubmit">
                            <div class="form_top">
                                <label>
                                    Заголовок
                                    <span
                                        v-if="!articleForm.title.length"
                                        class="warn"
                                        ><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                opacity="0.16"
                                                cx="12"
                                                cy="12"
                                                r="9"
                                                fill="#FF832A"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="9"
                                                stroke="#FF832A"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <rect
                                                x="12"
                                                y="16"
                                                width="0.01"
                                                height="0.01"
                                                stroke="#FF832A"
                                                stroke-width="3"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M12 12L12 8"
                                                stroke="#FF832A"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            /></svg>Обязательное поле</span
                                    >
                                    <input
                                        v-model="articleForm.title"
                                        name="title"
                                        type="text"
                                        maxlength="200"
                                        required
                                    />
                                </label>
                                <label>
                                    Дата
                                    <span
                                        v-if="!articleForm.date.length"
                                        class="warn"
                                        ><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                opacity="0.16"
                                                cx="12"
                                                cy="12"
                                                r="9"
                                                fill="#FF832A"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="9"
                                                stroke="#FF832A"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <rect
                                                x="12"
                                                y="16"
                                                width="0.01"
                                                height="0.01"
                                                stroke="#FF832A"
                                                stroke-width="3"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M12 12L12 8"
                                                stroke="#FF832A"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            /></svg>Обязательное поле</span
                                    >
                                    <input
                                        v-model="articleForm.date"
                                        name="date"
                                        type="date"
                                        required
                                    />
                                </label>
                            </div>
                            <label>
                                Заметка
                                <span
                                    v-if="!articleForm.text.length"
                                    class="warn"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            opacity="0.16"
                                            cx="12"
                                            cy="12"
                                            r="9"
                                            fill="#FF832A"
                                        />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="9"
                                            stroke="#FF832A"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <rect
                                            x="12"
                                            y="16"
                                            width="0.01"
                                            height="0.01"
                                            stroke="#FF832A"
                                            stroke-width="3"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M12 12L12 8"
                                            stroke="#FF832A"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        /></svg>Обязательное поле</span
                                >
                                <textarea
                                    v-model="articleForm.text"
                                    name="text"
                                    type="text"
                                    maxlength="2000"
                                    required
                                ></textarea>
                            </label>
                            <button class="button" type="submit">
                                <span>Поделиться наболевшим</span>
                            </button>
                        </form>
                    </slot>
                </div>
            </div>
        </div>
    </template>
</template>

<style lang="scss" scoped>
@import "../styles/main.scss";

.modal-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    .content {
        display: flex;
        flex-direction: column;
        width: 1214px;
        height: 637px;
        border-radius: 40px;
        background: #fff;
        padding: 60px 40px;
        position: relative;

        @media only screen and (min-width: 375px) and (max-width: 1024px) {
            width: 924px;
            height: 745px;
        }
        @media only screen and (max-width: 374px) {
            width: 374px;
            height: 745px;
            padding: 40px 4px;
            border-radius: 1px;
        }

        .del_comment {
            position: absolute;
            right: 34px;
            top: 27px;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            color: rgb(170, 35, 35);
            font-size: 10px;
            font-weight: 600;

            @media only screen and (max-width: 374px) {
                right: 8px;
                top: 7px;
            }

            &:hover {
                color: rgb(236, 58, 58);
            }
        }
        .modal-header {
            color: #000;
            font-size: 42px;
            margin-bottom: 22px;
            font-style: normal;
            font-weight: 700;
            line-height: 110%; /* 46.2px */

            @media only screen and (max-width: 374px) {
                font-size: 32px;
            }
        }

        .modal-body {
            margin: 20px 0;

            .form {
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                font-size: 14px;
                gap: 10px;

                .form_top {
                    display: flex;
                    flex-direction: row;
                    gap: 42px;

                    @media only screen and (min-width: 375px) and (max-width: 1024px) {
                        flex-direction: column;
                        gap: 10px;
                    }
                    @media only screen and (max-width: 374px) {
                        flex-direction: column;
                        gap: 10px;
                    }
                }
                label {
                    display: flex;
                    position: relative;
                    align-items: flex-start;
                    color: #000;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 110%; /* 19.8px */
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 4px;

                    .warn {
                        display: flex;
                        position: absolute;
                        right: 5px;
                        top: 1px;
                        align-items: center;
                        gap: 3px;
                        color: #ff832a;
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 110%; /* 19.8px */
                        svg {
                            padding-bottom: 3px;
                        }
                    }

                    textarea {
                        width: 1102px;
                        height: 166px;
                        resize: none;
                        border-radius: 4px;
                        background: #f6f6f6;
                        font-size: 28px;
                        padding: 15px;

                        &:required:invalid {
                            border: 1px solid #ff832a;
                        }
                        @media only screen and (min-width: 375px) and (max-width: 1024px) {
                            width: 825px;
                        }
                        @media only screen and (max-width: 374px) {
                            width: 355px;
                            height: 223px;
                        }
                    }

                    input {
                        width: 526px;
                        height: 80px;
                        border-radius: 4px;
                        font-size: 28px;
                        padding: 15px;
                        background: #f6f6f6;

                        &:required:invalid {
                            border: 1px solid #ff832a;
                        }
                        @media only screen and (min-width: 375px) and (max-width: 1024px) {
                            width: 825px;
                        }
                        @media only screen and (max-width: 374px) {
                            width: 355px;
                        }
                    }
                }

                .button {
                    display: inline-flex;
                    padding: 42px 120px;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    border-radius: 65px;
                    margin-top: 33px;
                    cursor: pointer;
                    border: none;
                    outline: none;
                    background: #050f28;

                    @media only screen and (max-width: 374px) {
                        display: flex;
                        width: 357px;
                        padding: 42px 12px;
                        margin-top: 13px;
                    }

                    &:hover {
                        background-color: #88a1de;
                    }

                    span {
                        color: #fff;
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: 90%; /* 16.2px */
                        letter-spacing: 1.08px;
                        text-transform: uppercase;
                    }
                }
            }
        }
    }
}
.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #050f28;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
}
</style>
