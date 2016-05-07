<template>
  <template v-if="loading">
    <h1>Loading. Please wait...</h1>
    <pulse :loading="loading"></pulse>
  </template>
  <template v-else>
  <h1>Bookmarks</h1>
  <section id="tags">
    <tag-pill v-for="label in labels" :title="label.title" :color="label.color" :selected.sync="label.selected"></tag-pill>
  </section>
  <ol v-if="haveBookmarks" id="bookmarks">
    <bookmark v-for="bookmark in selectedBookmarks" :title="bookmark.title" :url="bookmark.body" :date="bookmark.created_at" :discussion="bookmark.comments"></bookmark>
  </ol>
  <h2 v-else>Nothing here!</h2>
  </template>
</template>

<script>
import request from 'superagent';
import TagPill from './TagPill';
import Bookmark from './Bookmark';
import PulseSpinner from 'vue-spinner/src/PulseLoader';
import _ from 'underscore';

export default {
  components: {
    pulse: PulseSpinner,
    'tag-pill': TagPill,
    bookmark: Bookmark,
  },
  data() {
    return {
      loading: true,
      labels: [],
      bookmarks: [],
    };
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
        const url = `https://api.github.com/repos/${config.repo}/issues`;
        request
          .get(url)
          .set('Accept', 'application/json')
          .end((err2, ghData) => {
            if (err2) {
              return;
            }
            const data = JSON.parse(ghData.text);
            const labels = new Set();
            let i;
            let j;
            for (i in data) {
              for (j in data[i].labels) {
                labels.add({
                  title: data[i].labels[j].name,
                  color: data[i].labels[j].color,
                  selected: true,
                });
              }
            }
            this.$set('loading', false);
            this.$set('labels', Array.from(labels));
            this.$set('bookmarks', data);
          });
      });
    },
  },
  computed: {
    selectedLabels() {
      const arr = [];
      let i;
      for (i in this.labels) {
        if (this.labels[i].selected === true) {
          arr.push(this.labels[i].title);
        }
      }
      return arr;
    },
    selectedBookmarks() {
      const bookmarks = [];
      for (const i in this.bookmarks) {
        const labels = [];
        for (const j in this.bookmarks[i].labels) {
          labels.push(this.bookmarks[i].labels[j].name);
        }
        const result = _.intersection(labels, this.selectedLabels);
        if (result.length !== 0) {
          bookmarks.push(this.bookmarks[i]);
        }
      }
      return bookmarks;
    },
    haveBookmarks() {
      return this.selectedBookmarks.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
    color: #444;
}

#tags {
    padding: 20px;
    box-shadow: 0 8px 8px -6px rgba(0,0,0,0.2);
}

#bookmarks {
    text-align: left;
}
</style>