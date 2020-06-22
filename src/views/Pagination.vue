<template id="pagination">
    <ul class="pagination">
        <li v-for="i in maxPages" :key="i">
            <a href='#'
               :class="{'active': currentPage === i}"
               @click="$emit('change', i)">
                {{i}}
            </a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'pagination',
        data() {
            return {};
        },
        props: {
            currentPage: {
                default: 1,
                required: true,
            },
            maxPages: {
                type: Number,
                default: 1,
                required: true,
            },
        },
    }
</script>