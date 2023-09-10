import React from 'react'

export const NotFound = () => {
  return (
    <section className="bg-white ">
    <div className="container flex items-center min-h-[600px] px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <p className="p-3 text-sm font-medium text-orange-500 rounded-full bg-orange-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-600 ">ไม่พบสถานีที่ค้นหา</h1>
            <p className="mt-4 text-gray-500 ">"ไม่พบสถานีรถไฟฟ้าในบริเวณที่คุณค้นหา ให้ลองค้นหาสถานที่อื่นๆ หรือตรวจสอบสถานที่หรือระยะทางอีกครั้งเพื่อหาทางที่ใกล้เคียงใหม่!"</p>
           
        </div>
    </div>
</section>
  )
}
