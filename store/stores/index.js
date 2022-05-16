export const store = () => ({
    stores: []
});

export const getters = {
    stores: state => (filter = null) => filter ? state.stores.filter(x => x.capabilities.indexOf(filter) !== -1) : state.stores
}

export const mutations = {
    SET_DATA(state, stores) {
        state.stores = stores;
    }
}

export const actions = {
    async fetchStores({ commit }) {
        try {
            const response = await this.$axios.get('stores');

            commit('SET_DATA', response.data.data);

            return [true, false];
        } catch(err) {
            return [false, 'Could not load stores'];
        }
    }
}