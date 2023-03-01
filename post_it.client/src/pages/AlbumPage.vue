<template>
  <div class="AlbumPage container-fluid" v-if="album">
    <div class="row">
      <div class="col-3 mt-3">
        <div class="row">
          <div class="col-12 d-flex justify-content-between mb-3">
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
              <button v-if="account.id && !album.archived && foundCollab" class="btn btn-warning"
                data-bs-target="#pictureModal" data-bs-toggle="modal">
                <i class="mdi mdi-plus-box"></i>
                <span>
                  add picture
                </span>
              </button>
              <div v-else-if="album.archived" class="bg-danger rounded text-center p-3">
                <i class="mdi mdi-lock"></i>
                <span>
                  Archived
                </span>
              </div>
            </div>
          </div>
          <div class="col-12 mb-3 d-flex justify-content-around">
            <div class="bg-warning rounded p-2 fw-bold">
              <div>{{ collabs.length }}</div>
              <div>Collaborators</div>
            </div>
            <button v-if="!foundCollab" @click="createCollaboration()" :disabled="album.archived" class="btn btn-success">
              <i class="mdi mdi-heart"></i>
              <br>
              <b>Collab</b>
            </button>
            <button v-else @click="removeCollaboration(foundCollab.collaboratorId)" class="btn btn-danger">
              <i class="mdi mdi-close-circle"></i>
              <br>
              <b>UnCollab</b>
            </button>
          </div>
          <div class="col-12">
            <div class="row">
              <div v-for="c in collabs" class="col-4">
                <img class="img-fluid rounded" :src="c.picture" :alt="c.name + ' picture'" :title="c.name">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8 mt-3">
        <div class="row">
          <div v-for="p in pictures" class="col-3">
            <img :src="p.imgUrl" alt="" class="img-fluid rounded">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-light text-center p-5">
    <h1 class="display-1">
      <i class="mdi mdi-pinwheel mdi-spin"></i><i class="mdi mdi-pinwheel mdi-spin"></i><i
        class="mdi mdi-pinwheel mdi-spin"></i><i class="mdi mdi-pinwheel mdi-spin"></i>
    </h1>
  </div>

  <ModalComponent id="pictureModal">
    <PictureForm />
  </ModalComponent>
</template>


<script>
import { onMounted, computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import ModalComponent from '../components/ModalComponent.vue';
import PictureForm from '../components/PictureForm.vue';
import { albumsService } from '../services/AlbumsService.js';
import { collaboratorsService } from '../services/CollaboratorsService.js'
import { picturesService } from '../services/PicturesService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    async function getOneAlbumById() {
      try {
        const albumId = route.params.albumId;
        await albumsService.getOneAlbumById(albumId);
      }
      catch (error) {
        Pop.error("Go Home we don't want you here", "[Getting Album By Id]");
        router.push("/"); // that was a bad Id
      }
    }
    // TODO get pictures
    async function getPicturesByAlbumId() {
      try {
        const albumId = route.params.albumId;
        await picturesService.getPicturesByAlbumId(albumId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    async function getCollaboratorsByAlbumId() {
      try {
        const albumId = route.params.albumId;
        await collaboratorsService.getCollaboratorsByAlbumId(albumId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    // NOTE watcheffect replaced this
    // onMounted(() => {
    //   getOneAlbumById()
    // })
    // NOTE whenever a reactive property changes(route.params.albumId) rerun this code
    watchEffect(() => {
      if (route.params.albumId) {
        getOneAlbumById();
        getPicturesByAlbumId();
        getCollaboratorsByAlbumId();
      }
    });
    return {
      album: computed(() => AppState.album),
      pictures: computed(() => AppState.pictures),
      account: computed(() => AppState.account),
      collabs: computed(() => AppState.collabs),
      foundCollab: computed(() => AppState.collabs.find(c => c.id == AppState.account.id)),
      async createCollaboration() {
        try {
          await collaboratorsService.createCollaboration({ albumId: route.params.albumId });
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },
      async removeCollaboration(collaboratorId) {
        try {
          if (await Pop.confirm("BUD ARE YOU SURE", "REALLY REALLY REALLY SURE?", "ok")) {
            await collaboratorsService.removeCollaboration(collaboratorId);
          }
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      }
    };
  },
  components: { ModalComponent, PictureForm }
}
</script>


<style lang="scss" scoped>
.album-image {
  width: 60%;
}
</style>
