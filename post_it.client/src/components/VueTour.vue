<template>
  <v-tour name="myTour" :steps="steps" :callbacks="tourCallbacks"></v-tour>
</template>

<script>
import { accountService } from "../services/AccountService";

export default {
  name: 'my-tour',
  data() {
    return {
      tourCallbacks: {
        onFinish: (() => accountService.edit({ needsTour: false })),
        onSkip: (() => accountService.edit({ needsTour: false }))
      },
      steps: [
        {
          target: '#startVueTour',  // We're using document.querySelector() under the hood
          header: {
            title: '<div class="pleaseWork">Welcome to Post It, here we have wide array of albums to search.</div>',
          },
          content: `<marquee><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"></i><i class="mdi mdi-fence"></i><i class="mdi mdi-fence"></i><i class="mdi mdi-fence"></i><i class="mdi mdi-fence"></i><i class="mdi mdi-fence"></i><i class="mdi mdi-railroad-light"><i class="mdi mdi-railroad-light"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"></i><i class="mdi mdi-train"></i><i class="mdi mdi-train-car-caboose"></i><i class="mdi mdi-train-"></i><i class="mdi mdi-train-car-box"></i><i class="mdi mdi-train-car-box"></i><i class="mdi mdi-train-car-box"></i><i class="mdi mdi-train-car-box"></i><i class="mdi mdi-train-car-box-open"></i><i class="mdi mdi-train-car-box-open"></i><i class="mdi mdi-train-car-box-open"></i><i class="mdi mdi-train-car-box-open"></i><i class="mdi mdi-train-car-flatbed-car"></i><i class="mdi mdi-train-car-flatbed-car"></i><i class="mdi mdi-train-car-flatbed-car"></i><i class="mdi mdi-train-car-flatbed-tank"></i><i class="mdi mdi-train-car-flatbed-tank"></i><i class="mdi mdi-train-car-flatbed-tank"></i><i class="mdi mdi-train-car-container"></i><i class="mdi mdi-train-car-container"></i><i class="mdi mdi-train-car-container"></i><i class="mdi mdi-train-car-container"></i><i class="mdi mdi-train-car-container"></i><i class="mdi mdi-train-car-container"></i><i class="mdi mdi-train-car-container"></i><i class="mdi mdi-train-car-container"></i><i class="mdi mdi-train-car-container"></i><i class="mdi mdi-train-car-hopper-full"></i><i class="mdi mdi-train-car-hopper-full"></i><i class="mdi mdi-train-car-hopper-full"></i><i class="mdi mdi-train-car-hopper-full"></i><i class="mdi mdi-train-car-hopper-full"></i><i class="mdi mdi-train-car-hopper-full"></i>i class="mdi mdi-train-car-caboose"></i><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"><i class="mdi mdi-fence"></marquee>`
        },
        {
          target: '#allVue',
          content: 'Will show all albums'
        },
        {
          target: '#animalsVue',
          content: 'This buttons will sort albums based on if there is an animal in it!',
          params: {
            placement: 'top' // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          }
        }
      ]
    }
  },
  mounted: function () {
    this.$tours['myTour'].start()
  }
}
</script>

<style>
.v-step {
  background-color: green !important;
}

.v-step__header {
  background-color: red !important;
}

.pleaseWork::selection {
  background: green !important;
  color: red !important;
}

.v-step__content {
  background-color: green !important;
  user-select: red !important;
}
</style>
