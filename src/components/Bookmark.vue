<template>
  <li>
    <a href="{{bookmark.url}}">{{bookmark.title}}</a>
    <span id="date">{{date}}</span>
  </li>
</template>

<script>
import moment from 'moment';

export default {
  props: ['bookmark'],
  computed: {
    date() {
      return moment(this.bookmark.date).format('MMM Do, YYYY');
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  padding: 5px 0;
}
a {
  display: block;
}
#date {
  color: #aaa;
  font-size: 14px;
}
</style>