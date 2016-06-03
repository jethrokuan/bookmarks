<template>
  <div id="app">
    <template v-if="loading">
      <div id="loading">
        <h1>Loading...</h1>
        <pulse-spinner :loading="loading"></pulse-spinner>
      </div>
    </template>
    <template v-else>
    <tags :labels.sync="labels"></tags>
                 <h1>Bookmarks<a href="{{repoUrl}}">Repo</a></h1>
                 <hr/>
    <bookmarks :bookmarks.sync="bookmarks" :labels.sync="labels" :repo.sync="repo"></bookmarks>
    <footer>Built with ❤ by <a href="http://www.jethrokuan.com">Jethro Kuan</a></footer>
    </template>
  </div>
  <a href="https://github.com/jethrokuan/bookmarks"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/121cd7cbdc3e4855075ea8b558508b91ac463ac2/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png"></a>
</template>

<script>
import Bookmarks from './components/Bookmarks';
import Tags from './components/Tags';
import PulseSpinner from 'vue-spinner/src/PulseLoader';
import request from 'superagent';

export default {
  components: {
    Bookmarks,
    Tags,
    'pulse-spinner': PulseSpinner,
  },
  data() {
    return {
      repo: '',
      loading: true,
      labels: [],
      bookmarks: [],
    };
  },
  computed: {
    repoUrl() {
      return `https://github.com/${this.repo}/issues`;
    },
  },
  ready() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      request
      .get('/static/config.json')
      .set('Accept', 'application/json')
      .end((err1, configRes) => {
        if (err1) {
          return;
        }
        const config = JSON.parse(configRes.text);
        this.$set('repo', config.repo);
        const url = `https://api.github.com/repos/${config.repo}/issues`;
        request
          .get(url)
          .set('Accept', 'application/json')
          .end((err2, ghData) => {
            if (err2) {
              return;
            }
            const data = JSON.parse(ghData.text);
            const labelSet = [];
            const labels = [];
            for (const i in data) {
              for (const j in data[i].labels) {
                if (labels.indexOf(data[i].labels[j].name) === -1) {
                  labelSet.push({
                    title: data[i].labels[j].name,
                    color: data[i].labels[j].color,
                    selected: true,
                  });
                  labels.push(data[i].labels[j].name);
                }
              }
            }
            this.$set('loading', false);
            this.$set('labels', labelSet);
            this.$set('bookmarks', data);
          });
      });
    },
  },
};
</script>

<style>
html {
    height: 100%;
}

body {
    width: 720px;
    margin-left: auto;
    margin-right: auto;
}

#app {
    color: #2c3e50;
    margin-top: 50px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
}

header {
    box-shadow: 0 8px 8px -6px rgba(0,0,0,0.2);
}

a {
    color: #42b983;
    text-decoration: underline;
}

.logo {
    width: 100px;
    height: 100px
}

footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 720px;

    margin: 0 auto auto;
}
</style>

<style scoped lang="scss">
#loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    h1 {
        font-size: 34px;
    }
}
h1 {
    display: block;
    text-align: left;
    margin-bottom: 4px;
    font-size: 20px;
    margin: 0;
}
a {
    display: block;
    float: right;
    padding: 0 3px;
    font-size: 14px;
}
</style>