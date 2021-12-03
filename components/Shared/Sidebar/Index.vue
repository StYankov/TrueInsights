<template>
    <div ref="sidebar" class="sidebar">
        <div class="sidebar__header">
            <img class="sidebar__logo-small" src="/images/logo-icon.png" />
            <p class="sidebar__logo-text animate__animated">True Insights</p>
            <button class="sidebar__close" @click="closeSidebar">
                <fa :icon="['fas', 'times']" />
            </button>
        </div>

        <div class="sidebar__content">
            <MenuItem 
                v-for="(menuItem, i) in menus" 
                :key="'menu-' + i"
                :title="menuItem.title"
                :route="menuItem.route"
                :icon="menuItem.icon"
                :fontawesome="menuItem.fontawesome || false"
                :link="menuItem.to"
                :subitems="menuItem.subitems"
            />
        </div>
    </div>
</template>
<script>
import MenuItem from '@/components/Shared/Sidebar/MenuItem';
import menuData from '@/data/menu';

export default {
    components: {
        MenuItem
    },
    data() {
        return {
            menus: menuData
        }
    },
    methods: {
        closeSidebar() {
            document.body.classList.toggle('sidebar-open');
        }
    }
}
</script>