export default {
    async getGroups({ commit, state }) {
        if(state.data.length)
            return [state.data, false];
        
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
    async getGroup({ state, commit }, id) {
        try {
            const response = await this.$axios.get(`/product-groups/${id}`);

            commit('setProperty', { key: 'group', value: response.data });

            return [response.data, false];
        } catch(err) {
            return [false, err];
        }
    },
    async export({}, id) {
        const response = await this.$axios({
            url: `/product-groups/${id}/export`,
            method: 'GET',
            responseType: 'blob'
        });

        const fileName = `${id}-export.csv`;

        const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement('a');

        fileLink.href = fileUrl;
        fileLink.setAttribute('download', fileName);
        document.body.appendChild(fileLink);

        fileLink.click();
    },
    async deleteGroup({ commit }, id) {
        try {
            await this.$axios.delete(`product-groups/${id}`);

            commit('DELETE_GROUP', id);

            return [true, null]; 
        } catch(err) {
            return [false, err];
        }
    }
}