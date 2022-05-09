export const state = () => ({
    selected: [],
    scorecard: null,
    scoreByBrands: null,
    filters: null,
    selectedFilters: {}
});

export const getters = {
    selectedGroups: (state, getters, rootState) => {
        const groups = [];

        for(const groupId of state.selected) {
            const group = rootState.groups.data.find(x => x._id == groupId)

            group && groups.push(group);
        }
        return groups;
    }
}

export const mutations = {
    TOGGLE_GROUP(state, groupId) {
        if(state.selected.indexOf(groupId) !== -1)
            state.selected.splice(state.selected.indexOf(groupId), 1);
        else
            state.selected.push(groupId);
    },
    SET_SCORECARD(state, scorecard) {
        state.scorecard = scorecard;
    },
    SET_FILTERS(state, filters) {
        state.filters = filters;
    },
    SET_SCORE_BY_BRAMDS(state, results) {
        state.scoreByBrands = results;
    },
    SELECT_FILTER(state, payload) {
        state.selectedFilters[payload.key] = payload.filters;
    }
}

export const actions = {
    async calculateScorecard({ commit, state }) {
        try {
            const data = {
                group_ids: state.selected,
                filters: state.selectedFilters
            };

            const response = await this.$axios.post('scorecard', data);

            commit('SET_SCORECARD', response.data.results);
            commit('SET_FILTERS', response.data.availableFilters);
            commit('SET_SCORE_BY_BRAMDS', response.data.resultsByBrand);
        } catch(err) { console.log(err); }
    },
    async getAvailableFilters({ commit, state }) {
        try {
            const params = {
                group_ids: state.selected.join(',')
            }

            const response = await this.$axios.get('scorecard/filters', { params });

            commit('SET_FILTERS', response.data);
        } catch(err) {}
    }
}