export const store = () => ({
    group: {},
    data: [],
    page: 1,
    totalPages: 1
});

export const mutations = {
    setProperty(state, { key, value }) {
        state[key] = value;
    }
}

export const actions = {
    async getGroups({ commit }) {
        try {
            const response = await this.$axios.get('/product-groups');

            commit('setProperty', { key: 'page', value: response.data.current_page });
            commit('setProperty', { key: 'totalPages', value: response.data.last_page });
            commit('setProperty', { key: 'data', value: response.data.data });

            return [response.data.data, false];
        } catch(err) {
            return [false, err];
        }
    },
    async getGroup({ commit }, id) {
        try {
            const response = await this.$axios.get(`/product-groups/${id}`);

            commit('setProperty', { key: 'group', value: response.data });

            return [response.data, false];
        } catch(err) {
            return [false, err];
        }
    }
}