<template>
    <div ref="sidebar" class="sidebar">
        <div class="sidebar__header">
            <img class="sidebar__logo-small" src="/images/logo-icon.png" />
            <p class="sidebar__logo-text animate__animated">True Insights</p>
        </div>

        <div class="sidebar__content">
            <MenuItem 
                v-for="(menuItem, i) in menus" 
                :key="'menu-' + i"
                :active="i === 0"
                :title="menuItem.title"
                :icon="menuItem.icon"
                :fontawesome="menuItem.fontawesome || false"
                :subitems="menuItem.subitems"    
                :expand="expand"
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
    }
}
</script>