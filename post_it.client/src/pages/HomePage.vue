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
      <div class="col-12 p-4 mb-3">
        <h1 class="text-light">Albums</h1>
      </div>
      <div class="col-10 m-auto">
        <div class="bg-primary rounded p-3 d-flex justify-content-around">
          <button @click="changeFilterCategory('')" class="btn btn-outline-light">All</button>
          <button @click="changeFilterCategory('animals')" class="btn btn-outline-light">Animals</button>
          <button @click="changeFilterCategory('games')" class="btn btn-outline-light">Games</button>
          <button @click="changeFilterCategory('misc')" class="btn btn-outline-light">Misc</button>
        </div>
      </div>
      <div class="col-md-3" v-for="a in albums" :key="a.id">
        <AlbumCard :album="a" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { albumsService } from '../services/AlbumsService.js'
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import AlbumCard from '../components/AlbumCard.vue';

export default {
  setup() {
    const filterCategory = ref('')
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
      albums: computed(() => {
        if (!filterCategory.value) {
          return AppState.albums
        }
        else {
          return AppState.albums.filter(a => a.category == filterCategory.value)
        }
      }),
      myAlbums: computed(() => AppState.myAlbums),
      account: computed(() => AppState.account),

      changeFilterCategory(category) {
        filterCategory.value = category
      }
    };
  },
  components: { AlbumCard }
}
</script>

<style scoped lang="scss"></style>
