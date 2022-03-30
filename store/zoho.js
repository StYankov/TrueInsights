export const state = () => ({
    data: {},
    view: {}
});

export const mutations = {
    SET_DATA(state, payload) {
        state.data[payload.category] = payload.data;
    },
    SET_VIEW(state, payload) {
        state.view = payload;
    }
}

export const actions = {
    async getViews({ commit, state }, category) {
        if(state[category])
            return;

        const response = await this.$axios.get('zoho-views', { params: { category } });

        const data = response.data;

        commit('SET_DATA', {
            category,
            data
        });
    },
    async getView({ commit }, viewId) {
        try {
            const response = await this.$axios.get(`zoho-view/${viewId}`);
            const data = response.data;

            commit('SET_VIEW', data);

            return true;
        } catch(err) {
            return false;
        }
    }
}