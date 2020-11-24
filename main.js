var app = new Vue({
    el: '#root',
    data: {
        search : '',
        catalog : [],
        checker : false,
        baseUrl : ''
    },
    methods: {
        getSearch() {
            if (this.search != '') {
                axios
                    .get('https://api.themoviedb.org/3/search/movie', {
                        params: {
                            api_key: 'ada6c56530afc32ccfe291574cf9f8fa',
                            query: this.search,
                            language: 'it'
                        }
                    }).then((response) => {
                        this.catalog = response.data.results;
                        this.checker = true;
                        //reset dell'input search
                        this.search = '';
                    });
            } else {
                this.catalog = [];
                this.checker = false;
            }
        }
    },
    mounted() {
        //Chiamo API su configuration per ottenere il base URL per visualizzare le img dei poster per ogni movie
        axios
        .get('https://api.themoviedb.org/3/configuration', {
            params: {
                api_key: 'ada6c56530afc32ccfe291574cf9f8fa'
            }
        })
        .then((response) => {
            this.baseUrl = response.data.images.base_url;
        });
    }

});
