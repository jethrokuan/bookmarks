<template>
  <li>
    <a href="{{bookmark.body}}">{{bookmark.title}}</a>
    <a href="{{url}}"><span id="comments">{{bookmark.comments}}</span></a>
    <span v-for="{{label in bookmark.labels}}" :style="{backgroundColor: label.color}">hi</span>
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
    url() {
      return this.bookmark.url.replace('api.github.com/repos', 'github.com');
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  padding: 5px 0;
}
a {
  display: inline-block;
}
#comments {
    display: inline;
    font-size: 14px;
    color: #666;
    background-color: #FFF;
    padding: 1px 4px;
    border-radius: 2px;
    border: 1px solid #666;
}
#date {
    display: block;
    color: #aaa;
    font-size: 14px;
}
</style>