<template>
  <section id="tags">
    <tag-pill v-for="label in labels" :title="label.title" :color="label.color"></tag-pill>
  </section>  
  <hr></hr>
  <bookmark v-for="bookmark in bookmarks" :bookmark="bookmark"></bookmark>
</template>

<script>
import request from 'superagent';
import TagPill from './TagPill';
import Bookmark from './Bookmark';

export default {
  components: {
    'tag-pill': TagPill,
    bookmark: Bookmark,
  },
  data() {
    return {
      bookmarks: [],
    };
  },
  ready() {
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
            this.$set('bookmarks', JSON.parse(ghData.text));
          });
      });
  },
  computed: {
    labels() {
      const labels = new Set();
      let i;
      let j;
      if (this.bookmarks === []) {
        return [];
      }
      for (i in this.bookmarks) {
        const bm = this.bookmarks[i];
        for (j in bm.labels) {
          labels.add({
            title: bm.labels[j].name,
            color: bm.labels[j].color,
          });
        }
      }
      return Array.from(labels);
    },
  },
};
</script>

<style scoped>
h1 {
    color: #42b983;
}
#tags {
    margin: 20px 0;
}
</style>