export const state = () => ({
    stores: [],
    report: {}
});

export const mutations = {
    setProperty(state, { key, value }) {
        state[key] = value;
    }
}

export const actions = {
    async getStores({ commit }) {
        try {
            const response = await this.$axios.get('/keyword-explorer');

            commit('setProperty', { key: 'stores', value: response.data });

            return [response.data, null];
        } catch(e) {
            return [null, e.errors];
        }
    },
    async getStoreReport({ commit }, id) {
        try {
            const response = await this.$axios.get(`/keyword-explorer/${id}`);

            commit('setProperty', { key: 'report', value: response.data });

            return [response.data, null];
        } catch(e) {
            return [null, e.errors];
        }
    }
}