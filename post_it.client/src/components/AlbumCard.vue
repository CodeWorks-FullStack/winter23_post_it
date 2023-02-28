<template>
  <router-link class="text-light selectable" :to="{ name: 'Album', params: { albumId: album.id } }">
    <div class="AlbumCard card my-3" :style="{ backgroundColor: bg }">
      <img :src="album.coverImg" alt="">
      <div class="card-body text-center">
        <p class="mb-0">
          <b>{{ album.title }}</b>
        </p>
        <p class="">
          <span>{{ album.albumMemberCount }}</span>
          <i class="mdi mdi-heart"></i>
        </p>
      </div>
    </div>
  </router-link>
</template>


<script>
import { computed } from 'vue';
import { Album } from '../models/Album.js';

export default {
  props: {
    album: { type: Album, required: true }
  },
  setup() {

    const colors = ['blue', 'purple', 'chartreuse', 'bisque', 'orange', 'indigo', 'pink']

    return {
      bg: computed(() => colors[~~(Math.random() * colors.length)])
    }
  }
}
</script>


<style lang="scss" scoped>
.AlbumCard {
  height: 40vh;
  overflow: hidden;
  text-shadow: 0 0 4px black;
  letter-spacing: .07rem;

  img {
    height: 30vh;
    object-fit: cover;
    object-position: bottom;
  }
}
</style>
