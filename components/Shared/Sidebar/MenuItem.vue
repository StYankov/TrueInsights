<template>
    <div class="sidebar__menu-item" :class="{active: active}">
        <div class="sidebar__menu-item__icon">
            <nuxt-link :to="link">
                <fa v-if="fontawesome" :icon="icon" />
                <img v-else :src="icon" alt="menu-icon" />
            </nuxt-link> 
        </div>
        <div class="sidebar__menu-item__title">
            <nuxt-link class="sidebar__menu-item__link" event="" @click.native.prevent="toggleSubmenu(link)" :to="link">
                {{ title }}

                <fa class="toggle"  v-if="subitems.length" :icon="['fa', 'chevron-down']" />
            </nuxt-link>
            <div v-if="subitems.length" class="sidebar__menu__subitems" :class="{open: this.isOpen}">
                <nuxt-link v-for="item in subitems" :key="item.link" :to="item.to || item.link" @click.native="isOpen = false" class="sidebar__menu__child-link animate_animated">
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
        route: {
            required: true,
            type: String
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
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        toggleSubmenu(route) {
            if(window.innerWidth >= 991 || this.subitems.length === 0) {
                this.$router.push(route);
                return;
            }
                
            this.isOpen = !this.isOpen;
        }
    },
    computed: {
        active() {
            return true;
            // return this.route === this.$route.name.split('-')[0];
        }
    }
}
</script>