<template>
  <div class="container">
    <div class="flex flex-col items-center font-semibold text-xl space-y-4">
      <div class="flex flex-col items-center">
        <div>Rate</div>
        <div>Pesanan Anda</div>
      </div>
      <div class="rating rating-lg">
        <input type="radio" name="rating" class="mask mask-star-2 bg-primary" />
        <input type="radio" name="rating" class="mask mask-star-2 bg-primary" />
        <input type="radio" name="rating" class="mask mask-star-2 bg-primary" />
        <input type="radio" name="rating" class="mask mask-star-2 bg-primary" />
        <input type="radio" name="rating" class="mask mask-star-2 bg-primary" />
      </div>
      <div class="btn btn-primary">Submit Rating</div>
    </div>
    <div class="rounded-lg border-2 p-4 m-4">
      <div class="font-semibold text-xl">Pesanan Anda</div>
      <div class="overflow-x-auto">
        <table class="table table-compact text-center w-full">
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img src="@/assets/munch.png" class="w-24" />
              </td>
              <td>Detail Item</td>
              <td>Harga Item</td>
              <td>Tanggal Delivery</td>
            </tr>
            <tr>
              <td colspan="5">
                <div class="flex flex-col">
                  <div>Total: Rp.0</div>
                  <div>Jumlah Pesanan: 1</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
