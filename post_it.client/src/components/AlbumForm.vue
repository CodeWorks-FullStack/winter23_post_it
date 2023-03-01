<template>
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">New Album</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form @submit.prevent="createAlbum()">
      <div class="modal-body">
        <div class="mb-3">
          <label for="title" class="form-label">title</label>
          <input v-model="editable.title" required type="text" class="form-control" id="title"
            aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="coverImg" class="form-label">coverImg</label>
          <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg"
            aria-describedby="emailHelp">
        </div>
        <label for="category" class="form-label">category</label>
        <select v-model="editable.category" class="form-select mb-3" aria-label="Default select example" id="category">
          <option selected value="misc">Misc.</option>
          <option value="cars">Cars</option>
          <option value="animals">Animals</option>
          <option value="pokemon">Pokemon</option>
          <option value="fish">Fish</option>
          <option value="food">Food</option>
          <option value="germs">Jerms</option>
          <option value="coding">Coding</option>
          <option value="games">Games</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Album</button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from 'vue';
import { albumsService } from '../services/AlbumsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({
      category: 'misc'
    })
    return {
      editable,
      async createAlbum() {
        try {
          const formData = editable.value
          await albumsService.createAlbum(formData)
          editable.value = { category: 'misc' }
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>