import {defineStore} from "pinia";

export const globalStore = defineStore("globalStore", {
    state: () => ({
        activeIndex: "edit",
        sourceContent: "",
        transformContent: "",
        token: "",
        timestamp: new Date().getTime(),
    }),
    actions: {
        refreshTimestamp() {
            this.timestamp = new Date().getTime();
        },
    },
});
