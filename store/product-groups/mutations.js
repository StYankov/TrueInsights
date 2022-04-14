export default {
    SET_DATA(state, paginationData) {
        state.perPage = paginationData.per_page;
        state.page = paginationData.current_page;
        state.totalPages = paginationData.last_page;
        state.data[state.page] = paginationData.data;
    },
    SET_PROPERTY(state, { key, value }) {
        state[key] = value;
    },
    setFilter(state, { key, filter }) {
        state.filters[key] = filter;
    },
    DELETE_GROUP(state, id) {
        const groups = state.data.reduce((acc, val) => acc.concat(val), [])
            .filter(x => x._id !== id);

        const chunks = [];
        let page = 1;
        for(let i = 0; i < groups.length; i += state.perPage) {
            chunks[page++] = groups.slice(i, i + state.perPage);
        }

        state.data = chunks;
        state.totalPages = page - 1;
        state.page = Math.min(state.page, state.totalPages);
    }
}