<template>
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">Add Picture</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form @submit.prevent="createPicture()">
      <div class="modal-body">
        <div class="mb-3">
          <label for="imgUrl" class="form-label">imgUrl</label>
          <input v-model="editable.imgUrl" required type="url" class="form-control" id="imgUrl" aria-describedby="imgUrl">
        </div>
        <label for="color" class="form-label">color</label>
        <select v-model="editable.bgColor" class="form-select mb-3" aria-label="Default select example" id="color">
          <option selected value="pink">pink</option>
          <option value="blue">blue</option>
          <option value="purple">purple</option>
          <option value="chartreuse">chartreuse</option>
          <option value="bisque">bisque</option>
          <option value="orange">orange</option>
          <option value="yellow">yellow</option>
          <option value="indigo">indigo</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add Picture</button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { picturesService } from '../services/PicturesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({
      bgColor: 'pink'
    })
    const route = useRoute()
    return {
      editable,
      async createPicture() {
        try {
          const pictureData = editable.value
          pictureData.albumId = route.params.albumId
          await picturesService.createPicture(pictureData)
          editable.value = { bgColor: 'pink' }
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