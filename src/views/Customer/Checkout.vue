<template>
  <div class="container">
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
                  <button class="btn btn-primary">Checkout</button>
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
