<template>
  <div v-if="account.id" class="container-fluid">
    <div class="row">
      <div class="col-12 p-4">
        <h1 class="text-light">My Albums</h1>
      </div>
      <div v-for="a in myAlbums" class="col-md-3">
        <AlbumCard :album="a" />
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row my-4">
      <div class="col-12 p-4">
        <h1 class="text-light">Albums</h1>
      </div>
      <div class="col-md-3" v-for="a in albums" :key="a.id">
        <AlbumCard :album="a" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { albumsService } from '../services/AlbumsService.js'
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import AlbumCard from '../components/AlbumCard.vue';

export default {
  setup() {
    async function getAllAlbums() {
      try {
        await albumsService.getAllAlbums();
      }
      catch (error) {
        Pop.error(error, "[Getting AllAlbums]");
      }
    }

    onMounted(() => {
      getAllAlbums();
    });

    return {
      albums: computed(() => AppState.albums),
      myAlbums: computed(() => AppState.myAlbums),
      account: computed(() => AppState.account)
    };
  },
  components: { AlbumCard }
}
</script>

<style scoped lang="scss"></style>
