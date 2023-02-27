<template>
  <div class="container">
    <div class="row my-4">
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

export default {
  setup() {

    async function getAllAlbums() {
      try {
        await albumsService.getAllAlbums()
      } catch (error) {
        Pop.error(error, '[Getting AllAlbums]')
      }
    }

    onMounted(() => {
      getAllAlbums()
    })

    return {
      albums: computed(() => AppState.albums)
    }
  }
}
</script>

<style scoped lang="scss"></style>
