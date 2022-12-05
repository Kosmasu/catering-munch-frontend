<template>
  <div class="container">
    <div class="text-center m-8">
      <input
        type="text"
        v-model="query"
        placeholder="Search…"
        class="input input-primary input-bordered"
      />
    </div>
    <div class="overflow-x-auto">
      <table class="table table-compact text-center w-full">
        <thead>
          <tr>
            <th colspan="5" class="bg-primary">Hasil pencarian</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <img src="@/assets/munch.png" class="w-24" />
            </td>
            <td>Detail Item</td>
            <td>Harga Item</td>
            <button
              @click="detail(menu.menu_id)"
              class="btn btn-primary rounded-lg"
            >
              Detail
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
