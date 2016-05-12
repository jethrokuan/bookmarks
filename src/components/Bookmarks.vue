<template>
  <h1>Bookmarks <a href="{{repoUrl}}">Repo</a></h1>
  <ol v-if="haveBookmarks" id="bookmarks">
    <bookmark v-for="bookmark in selectedBookmarks" :bookmark.once="bookmark"></bookmark>
  </ol>
  <h2 v-else>Nothing here!</h2>
</template>

<script>
import Bookmark from './Bookmark';

export default {
  props: ['bookmarks', 'labels', 'repo'],
  components: {
    Bookmark,
  },
  computed: {
    repoUrl() {
      return `https://github.com/${this.repo}/issues`;
    },
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
        for (const k in this.selectedLabels) {
          const result = labels.some(l => l === this.selectedLabels[k]);
          if (result) {
            bookmarks.push(this.bookmarks[i]);
            break;
          }
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
    box-shadow: 0 8px 8px -6px rgba(0,0,0,0.2);
    a {
        font-size: 10px;
        text-decoration: underline;
    }
    
}

#bookmarks {
    text-align: left;
    max-height: 60vh;
    overflow-y: auto;
}

::-webkit-scrollbar { 
    display: none; 
}
</style>