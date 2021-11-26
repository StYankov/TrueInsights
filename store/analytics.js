export const state = () => ({
    stores: null,
    urls: {}
});

export const mutations = {
    setProperty(state, { key, value }) {
        state[key] = value;
    },
    setUrl(state, { storeId, url }) {
        state.urls[storeId] = url;
    }
}

export const actions = {
    async fetchStores({ commit, state }) {
        if(state.stores) return;

        try {
            const response = await this.$axios.get('/analytics');

            commit('setProperty', { key: 'stores', value: response.data });

            return [response.data, null];

        } catch(err) {
            return [null, err.errors];
        }
    },
    async fetchAnalyticsUrl({ commit, state }, storeId) {
        if(state.urls[storeId])
            return;

        try {
            const response = await this.$axios.get('/analytics/' + storeId);

            commit('setUrl', { storeId, url: response.data });

            return [response.data, false];
        } catch(err) {
            return [null, err.errors];
        }
    }
}