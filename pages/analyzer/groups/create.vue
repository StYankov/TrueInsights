<template>
    <div class="container">
        <h3 class="section-title mb-5">Create Product Group</h3> 
        <form @submit.prevent="onSubmit" method="POST">
            <Input containerClass="mb-5" placeholder="Group Name" :value="groupName" @input="groupName = $event.target.value" />

            <Input
                containerClass="mb-5" 
                placeholder="Product URLs" 
                desc="Product URLs divided by comma"
                :value="input"
                @input="input = $event.target.value"
                @enter="processUrlsFromInput"
                @blur="processUrlsFromInput"
            >
                <template v-slot:below-input>
                    <div class="upload-buttons">
                        <input class="hidden-input" type="file" ref="uploadFromFile" accept=".txt" @change="onUploadFile">
                        <input class="hidden-input" type="file" ref="uploadFromCSV" accept=".csv" @change="onUploadCSV">
                        <input class="hidden-input" type="file" ref="uploadFromXLSX" accept=".xlsx" @change="onUploadXLSX">

                        <button type="button"  @click="$refs.uploadFromFile.click()" class="btn btn-upload btn-text">
                            <fa :icon="['fa', 'file']" /> Upload from file 
                        </button>
                        <button type="button" @click="$refs.uploadFromCSV.click()" class="btn btn-upload btn-csv">
                            <fa :icon="['fa', 'file-csv']" /> Upload from CSV 
                        </button>

                        <button type="button" @click="$refs.uploadFromXLSX.click()" class="btn btn-upload btn-excel">
                            <fa :icon="['fa', 'file-excel']" /> Upload from Excel (xlsx)
                        </button>
                    </div>
                </template>
            </Input>

            <UploadUrlsTable :urls="parsedUrls" @remove="removeUrl" />
            <p v-if="parsedUrls && parsedUrls.length" class="text-muted">Invalid URLS will not be processed!</p>

            <Button type="submit" center>Process</Button>
        </form>

        <ColumnSelect
            v-if="showSelectColumnModal"
            :options="headers" 
            @selected="closeModalAndProcess" 
            @close="showSelectColumnModal = null" 
        />

        <div v-if="groupId" class="mt-5">
            <ProgressBar :progress="progress" />
        </div>
    </div>
</template>
<script>
import { parseCSV, parseXlsx, getFileContents, extractUrls, parseUrls } from '@/utils/files';
import Input from '@/components/Shared/FormElements/Input';
import Button from '@/components/Shared/FormElements/Button';
import UploadUrlsTable from '@/components/ProductAnalyzer/Groups/UploadUrlsTable';
import ColumnSelect from '@/components/ProductAnalyzer/Groups/ColumnSelect';
import ProgressBar from '@/components/Shared/FormElements/HorizontalLoader';

export default {
    components: {
        Input,
        UploadUrlsTable,
        ColumnSelect,
        Button,
        ProgressBar
    },
    data() {
        return {
            input: '',
            groupName: '',
            fileData: [],
            showSelectColumnModal: false,
            column: null,
            uploadType: null,
            headers: [],
            urls: [],
            parsedUrls: [],
            groupId: null,
            current: 0,
            total: 0
        }
    },
    methods: {
        async onSubmit() {
            try {
                const response = await this.$axios.post('/product-groups', {
                    'name': this.groupName,
                    'urls': this.parsedUrls.filter(x => x.valid).map(x => x.url)
                });

                this.groupId = response.data._id;
                this.pool();
            } catch(e) {
                const data = e.response.data;
                const errors = data.errors;

                const keys = Object.keys(errors);

                if(keys.length) {
                    this.$swal.fire(
                        'Error',
                        errors[keys[0]][0],
                        'warning'
                    );
                }
            }
        },
        async onUploadFile(e) {
            const file = e.target.files[0];

            if(!file)
                return;

            this.uploadType = 'txt';

            const text = await getFileContents(file);

            this.urls = text.split('\n').map(x => x.trim());
            this.parsedUrls = parseUrls(this.urls);
        },
        async onUploadCSV(e) {
            const file = e.target.files[0];

            if(!file)
                return;

            this.uploadType = 'csv';

            const text = await getFileContents(file);
            const csv = parseCSV(text);

            if(csv.length) {
                this.fileData = csv;
                this.showSelectColumnModal = true;
                this.headers = csv[0];
            }
        },
        async onUploadXLSX(e) {
            const file = e.target.files[0];

            if(!file)
                return;

            this.uploadType = 'xlsx';

            const data = await parseXlsx(file);

            if(data.length) {
                this.fileData = data;
                this.showSelectColumnModal = true;
                this.headers = Object.keys(data[0]).map(x => x.trim());
            }
        },
        async pool() {
            const response = await this.$axios.get(`/product-groups/${this.groupId}/status`);

            if(response.data.status === 'completed') {
                this.current = response.data.current;
                this.total = response.data.total;

                setTimeout(() => {
                    this.$router.push(`/analyzer/groups/${this.groupId}`);
                }, 300);
            } else {
                this.current = response.data.current;
                this.total = response.data.total;

                setTimeout(() => {
                    this.pool();
                }, 1000);
            }
        },
        closeModalAndProcess(column) {
            this.column = column;
            this.showSelectColumnModal = false;

            this.urls = extractUrls(this.fileData, this.uploadType, column);
            this.parsedUrls = parseUrls(this.urls);
        },
        removeUrl(index) {
            this.parsedUrls.splice(index, 1);
        },
        processUrlsFromInput() {
            if(this.input.length === 0)
                return;
            
            const newUrls = parseUrls(this.input.split(','));
            this.parsedUrls = [...newUrls, ...this.parsedUrls];
            this.input = '';
        }
    },
    computed: {
        progress() {
            if(this.total === 0)
                return 0;

            return Math.ceil(this.current / this.total * 100);
        }
    }
}
</script>
<style lang="scss" scoped>
    .hidden-input {
        position: absolute;
        visibility: hidden;
        left: -9999px;
    }
    .upload-buttons {
        display: flex;
    }
    .btn {
        background-color: #e4ebee;
        border-radius: 8px;
        font-size: 14px;
        white-space: nowrap;
        margin-right: 10px;

        &:hover {
            background-color: darken(#e4ebee, 10%);
        }

        svg {
            color: $accent;
            fill: $accent;
            margin-right: 6px;
        }
    }
</style>