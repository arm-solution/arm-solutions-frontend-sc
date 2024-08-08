import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';


// title,
// text,
// icon,
// confirmButtonText,
// cancelButtonText,
// deleteTitle,
// deleteText,
// successTitle, 
// successText

export const deleteConfirmation = ({title, text, icon, confirmButtonText, cancelButtonText, deleteTitle, deleteText, successTitle, successText}, callback) => {

  const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-outline-success m-2",
          cancelButton: "btn btn btn-outline-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: title || "Are you sure?",
        text: text ||  "You won't be able to revert this!",
        icon: icon || "warning",
        showCancelButton: true,
        confirmButtonText: confirmButtonText || "Yes, delete it!",
        cancelButtonText: cancelButtonText || "No, cancel!",
        reverseButtons: true
      }).then((result) => {


            if (result.isConfirmed) {

              if(typeof callback === 'function') {
                if(callback()) {
                  swalWithBootstrapButtons.fire({
                  title: deleteTitle || "Deleted!",
                  text: deleteText || "Your file has been deleted.",
                  icon: "success"
                });
                } else {
                  swalWithBootstrapButtons.fire({
                  title: "Unsuccessfull Operation",
                  text: "Please Report This issue to file a ticket",
                  icon: "error"
                });
                }
              }

            } else if (result.dismiss === Swal.DismissReason.cancel) {
              return;
          }

          

      });
}

export const errorDialog = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title ||  "Oops...",
    text: text || "",
  });
}


export const successDialog = (message) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: message || "Your work has been saved",
    showConfirmButton: false,
    timer: 1500
  })
}