<template>
    <div class="sidebar__menu-item" :class="{active: active}">
        <div class="sidebar__menu-item__icon">
            <nuxt-link :to="link">
                <fa v-if="fontawesome" :icon="icon" />
                <img v-else :src="icon" alt="menu-icon" />
            </nuxt-link> 
        </div>
        <div class="sidebar__menu-item__title">
            <nuxt-link class="sidebar__menu-item__link" :to="link">
                {{ title }}
            </nuxt-link>
            <div v-if="subitems.length" class="sidebar__menu__subitems">
                <nuxt-link v-for="item in subitems" :key="item.link" :to="item.to || item.link" class="sidebar__menu__child-link animate_animated">
                    {{ item.title }}
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        fontawesome: {
            required: false,
            type: Boolean,
            default: false
        },
        icon: {
            required: true,
            type: [String, Array]
        },
        title: {
            required: true,
            type: String
        },
        link: {
            required: false,
            type: String,
            default: '#'
        },
        subitems: {
            required: false,
            type: Array,
            default: () => []
        },
        active: {
            required: false,
            type: Boolean,
            default: false
        }
    }
}
</script>