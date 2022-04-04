export const state = () => ({
    data: {},
    currentPage: 1,
    totalPages: 1,
    scan: null
});

export const getters = {
    history(state) {
        return state.data[state.currentPage];
    }
}

export const mutations = {
    setPage(store, page) {
        store.currentPage = page;
    },
    setData(store, payload) {
        store.data[payload.current_page] = payload.data;
        store.currentPage = payload.current_page;
        store.totalPages = payload.last_page;
    },
    setScan(store, scan) {
        store.scan = scan;
    }
}

export const actions = {
    async getHistoryItems({ commit, state }, page) {
        if(state.data[page]) {
            commit('setPage', page);
            return;
        }
        
        try {
            const response = await this.$axios.get('product-scans', { page });
            commit('setData', response.data);
        } catch(err) {
            console.log(err);
        }
    },
    async getHistoryItem({ commit }, id) {
        try {
            const response = await this.$axios.get(`product-scans/${id}`);
            commit('setScan', response.data);
            return true;
        } catch(e) {
            return false;
        }
    },
    async getSharedItem({ commit }, { sid, hash }) {
        try {
            const response = await this.$axios.get(`shared/${hash}/${sid}`);

            commit('setScan', response.data);
            return true;
        } catch(e) { console.log(e); return false; }
    }
}