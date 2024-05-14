import { defineStore } from "pinia"
import SSH2 from "./SSH2"

const state = () => ({
    sidebarStatus: {
        opened: !+localStorage.getItem('sidebarStatus'),
        withoutAnimation: false
    },
    device: 'desktop'
})

export const useAppStore = defineStore({
    id: 'app',
    state,
    actions: {
        // ...SSH2.actions,
        ToggleSideBar() {
            if (this.sidebarStatus.opened) {
                localStorage.setItem('sidebarStatus', 1)
            } else {
                localStorage.setItem('sidebarStatus', 0)
            }
            this.sidebarStatus.opened = !this.sidebarStatus.opened
        },
        CloseSideBar({ withoutAnimation }) {
            localStorage.setItem('sidebarStatus', 1)
            this.sidebarStatus.opened = false
            this.sidebarStatus.withoutAnimation = withoutAnimation
        }
    }
})