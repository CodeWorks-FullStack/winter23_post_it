<template>
  <div class="AlbumPage container-fluid" v-if="album">
    <div class="row">
      <div class="col-3">
        <div class="row">
          <div class="col-12 d-flex justify-content-between mt-3">
            <img :src="album.coverImg" alt="" class="img-fluid album-image rounded">
            <div>
              <div class="bg-info p-2 text-light rounded mb-3">
                <p>
                  <b>{{ album.title }}</b>
                </p>
                <p>
                  <b>by {{ album.creator.name }}</b>
                </p>
              </div>
              <button class="btn btn-warning">
                <i class="mdi mdi-plus-box"></i>
                <span>
                  add picture

                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8"></div>
    </div>
  </div>

  <div v-else class="text-light text-center p-5">
    <h1 class="display-1">
      <i class="mdi mdi-pinwheel mdi-spin"></i><i class="mdi mdi-pinwheel mdi-spin"></i><i
        class="mdi mdi-pinwheel mdi-spin"></i><i class="mdi mdi-pinwheel mdi-spin"></i>
    </h1>
  </div>
</template>


<script>
import { onMounted, computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { albumsService } from '../services/AlbumsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const route = useRoute()
    const router = useRouter()

    async function getOneAlbumById() {
      try {
        const albumId = route.params.albumId
        await albumsService.getOneAlbumById(albumId)
        // TODO get pictures

      } catch (error) {
        Pop.error('Go Home we don\'t want you here', '[Getting Album By Id]')
        router.push('/') // that was a bad Id
      }
    }

    // NOTE watcheffect replaced this
    // onMounted(() => {
    //   getOneAlbumById()
    // })

    // NOTE whenever a reactive property changes(route.params.albumId) rerun this code
    watchEffect(() => {
      if (route.params.albumId) {
        getOneAlbumById()
      }
    })

    return {
      album: computed(() => AppState.album)
    }
  }
}
</script>


<style lang="scss" scoped>
.album-image {
  width: 60%;
}
</style>
