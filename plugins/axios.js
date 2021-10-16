export default function({ $axios }) {
    $axios.onError(error => {
        const data = error.response && error.response.data;

        if(!data || !data.errors) {
            error.errors = ['Неочаквана грешка. Моля опитайте по-късно'];

            return Promise.reject(error);
        }

        const errors = [];

        for(const key in data.errors) {
            const errorsArray = data.errors[key];

            errors.push(errorsArray[0]);
        }

        error.errors = errors;

        return Promise.reject(error);
    });
}