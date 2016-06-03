<template>
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
#bookmarks {
    text-align: left;
}
</style>