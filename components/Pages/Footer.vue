<template>
  <footer
    class="bg-white w-full h-[140px] px-[12px] py-[20px] absolute bottom-0 border-t border-[B7B7B7] space-y-2"
  >
    <div class="flex items-center space-x-3 border-b pb-2 border-[B7B7B7]">
      <div class="flex items-center justify-start space-x-1">
        <LazyIconsHeadphone />
        <span class="text-[#003D79] font-bold text-[12px]"
          >Care Center 14032</span
        >
      </div>
      <div class="flex items-center justify-start space-x-1">
        <LazyIconsMail />
        <span class="text-[#003D79] font-bold text-[12px]"
          >care_center@mandirisek.co.id</span
        >
      </div>
    </div>

    <div class="font-bold text-[9px] text-[#B7B7B7] text-center">
      PT Mandiri Sekuritas terdaftar dan di awasi oleh Otoritas Jasa Keuangan
      (OJK)
    </div>

    <div class="flex items-center justify-between space-x-3">
      <img src="@/assets/images/OJK.png" alt="OJK Logo" />
      <img src="@/assets/images/IDX.png" alt="IDX Logo" />
      <img src="@/assets/images/IDClear.png" alt="IDClear Logo" />
      <img src="@/assets/images/KSEI.png" alt="KSEI Logo" />
      <img src="@/assets/images/SIPF.png" alt="SIPF Logo" />
    </div>
  </footer>
</template>
