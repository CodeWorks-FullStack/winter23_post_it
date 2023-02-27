<template>
  <div class="AlbumPage text-light" v-if="album">
    <h1>Hello Album Page</h1>
    {{ album.title }}

  </div>

  <div v-else class="text-light text-center p-5">
    <h1 class="display-1">
      <i class="mdi mdi-pinwheel mdi-spin"></i><i class="mdi mdi-pinwheel mdi-spin"></i><i class="mdi mdi-pinwheel mdi-spin"></i><i class="mdi mdi-pinwheel mdi-spin"></i>
    </h1>
  </div>

</template>


<script>
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const route = useRoute()
    const albumId = route.params.albumId // was set in the router :albumId
    const router = useRouter()

    async function getOneAlbumById() {
      try {
        await albumsService.getOneAlbumById(albumId)
        // TODO get pictures

      } catch (error) {
        Pop.error('Go Home we don\'t want you here', '[Getting Album By Id]')
        router.push('/') // that was a bad Id
      }
    }

    onMounted(() => {
      getOneAlbumById()
    })

    return {
      album: computed(() => AppState.album)
    }
  }
}
</script>


<style lang="scss" scoped></style>
