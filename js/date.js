


export function DeliveryDete() {
    const date = new Date();
date.setDate(date.getDate() + 5);
const day = String(date.getDate()).padStart(2, '0'); // يوم مع صفر أمام الأرقام المفردة
const month = date.toLocaleString('en-US', { month: 'short' }); // اسم الشهر المختصر (May)
const year = date.getFullYear(); // السنة

const formattedDate = `${day-2} ${month}, ${year} - ${day} ${month}, ${year}`;
return formattedDate;
}
export function DateDay() {
const date = new Date();
const day = String(date.getDate()).padStart(2, '0'); // يوم مع صفر أمام الأرقام المفردة
const month = date.toLocaleString('en-US', { month: 'short' }); // اسم الشهر المختصر (May)
const year = date.getFullYear(); // السنة

const formattedDate = `${day} ${month}, ${year}`;
return formattedDate;
}
export function successAlert(title,Txt) {

    return   Swal.fire({
        icon: 'success',
        title: title,
        text:Txt,
        showConfirmButton: false,
        timer: 1600,
        toast: true,
        position: 'top-end',
        position: 'top-end',
        background: 'var(--card-color)', 
        color: 'var(--main-color)',      
        iconColor: 'var(--main-color)',  
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content'
        }
      });
}
export function RemoveAlert(title,Txt) {

    return     Swal.fire({
        icon: 'success',
        title: title,
        text: Txt,
        showConfirmButton: false,
        timer: 1600,
        toast: true,
        position: 'top-end',
        background: 'var(--card-color)',
        color: 'var(--error)', // أو خليه main-color لو حابب يكون نفس الثيم
        iconColor: 'var(--error)',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content'
        }
      });
}
export function FailAlert(title,Txt) {

    return     Swal.fire({
        icon: 'error',
        title: title,
        text: Txt,
        showConfirmButton: false,
        timer: 1600,
        toast: true,
        position: 'top-end',
        background: 'var(--card-color)',
        color: 'var(--error)', // أو خليه main-color لو حابب يكون نفس الثيم
        iconColor: 'var(--error)',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content'
        }
      });
}

