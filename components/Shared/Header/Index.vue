<template>
    <header class="header">
        <button class="hamburger hamburger--spin header__hamburger d-lg-none" type="button" @click="toggle">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </button>

        <div class="header__quick-access">
            <a class="btn header__qa-btn" href="#">
                Tools
            </a>
            <a class="btn header__qa-btn" href="#">
                Learning Center
            </a>
            <a class="btn header__qa-btn" href="#">
                Submit a Ticket
            </a>
            <a class="btn header__qa-btn" href="#">
                For Innovators
            </a>
        </div>

        <div class="header__actions">
            <button type="button" class="header-action-btn btn action-search">
                <fa :icon="['fas', 'search']" />
            </button>

            <div class="header__actions-divider"></div>

            <button type="button" class="header-action-btn btn action-notifications">
                <fa :icon="['far', 'bell']" />
            </button>
        </div>

        <Account />

    </header>
</template>
<script>
import Account from '@/components/Shared/Header/Account';

export default {
    components: { Account },
    methods: {
        toggle() {
            document.body.classList.toggle('sidebar-open');
        }
    }
}
</script>