<template>
  <li>
    <a href="{{url}}">{{title}}</a>
    <span id="date">{{prettyDate(date)}}</span>
  </li>
</template>

<script>
import moment from 'moment';

export default {
  props: ['url', 'title', 'discussion', 'date'],
  methods: {
    prettyDate(date) {
      return moment(date).format('MMM Do, YYYY');
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