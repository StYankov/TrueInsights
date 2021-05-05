<template>
    <div class="header__account">
        <button class="account-btn btn" @click.stop="toggle">
            <img class="account-avatar" src="http://via.placeholder.com/50x50" />
            <fa :icon="['fas', 'chevron-down']" />
        </button>
        <div 
            v-if="showModal"
            ref="accountModal" 
            class="account-modal animate__animated animate__backInRight" 
            :class="{'animate__backOutRight': willExit}" 
        >
            <img class="account-modal__avatar" src="http://via.placeholder.com/50x50" alt="user-avatar" />
            <h4 class="account-modal__username">Stoil Y</h4>
            <p class="account-modal__email">office@newavedigital.com</p>
            <a class="account-modal__settings">Settings</a>

            <div class="account-modal__nav">
                <a href="#" class="account-modal__nav-link">
                    <span class="link-icon">
                        <fa :icon="['fas', 'file-invoice-dollar']" />
                    </span>
                    Billing
                </a>
                <a href="#" class="account-modal__nav-link">
                    <span class="link-icon">
                        <fa :icon="['fas', 'users']" />
                    </span>
                    Access
                </a>
                <a href="#" class="account-modal__nav-link">
                    <span class="link-icon">
                        <fa :icon="['fas', 'network-wired']" />
                    </span>
                    Connections
                </a>
                <a href="#" class="account-modal__nav-link">
                    <span class="link-icon">
                        <fa :icon="['fas', 'sign-out-alt']" />
                    </span>
                    Log Out
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showModal: false,
            willExit: false,
            _timeout: null
        }
    },
    mounted() {
        document.body.addEventListener('click', this.onOutsideClick, false);
    },
    beforeDestroy() {
        document.body.removeEventListener('click', this.onOutsideClick, false);
    },
    methods: {
        onOutsideClick(e) {
            if(!this.$refs.accountModal.contains(e.target)) {
                this.beginExit();
            }
        },
        toggle() {
            if(this.showModal) {
                this.beginExit();
            } else this.showModal = true;
        },
        beginExit() {
            this.willExit = true;

            if(this._timeout)
                clearTimeout(this._timeout);

            this._timeout = setTimeout(() => {
                this.showModal = false;
                this.willExit = false;
                this._timeout = null;
            }, 300);
        }
    }
}
</script>
<style scoped>
.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}
</style>