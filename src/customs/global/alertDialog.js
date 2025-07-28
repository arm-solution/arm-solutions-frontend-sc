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

export const deleteConfirmation = async ({ title, text, icon, confirmButtonText, cancelButtonText, deleteTitle, deleteText, successTitle, successText }, callback) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-outline-success m-2",
      cancelButton: "btn btn-outline-danger"
    },
    buttonsStyling: false
  });

  const result = await swalWithBootstrapButtons.fire({
    title: title || "Are you sure?",
    text: text || "You won't be able to revert this!",
    icon: icon || "warning",
    showCancelButton: true,
    confirmButtonText: confirmButtonText || "Yes, delete it!",
    cancelButtonText: cancelButtonText || "No, cancel!",
    reverseButtons: true
  });

  if (result.isConfirmed) {
    try {
      const callbackResult = await callback();

      if (callbackResult) {
        await swalWithBootstrapButtons.fire({
          title: deleteTitle || "Deleted!",
          text: deleteText || "Your file has been deleted.",
          icon: "success"
        });
      } else {
        await swalWithBootstrapButtons.fire({
          title: "Unsuccessful Operation",
          text: "Please report this issue to file a ticket.",
          icon: "error"
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the callback execution
      await swalWithBootstrapButtons.fire({
        title: "Error",
        text: "An error occurred while processing your request.",
        icon: "error"
      });
    }
  }
};


export const handleConfirmation = async (
  { title, text, icon, confirmButtonText, cancelButtonText, confirmationTitle, confirmationText, failedMessageTitle, failedMessageText },
   callback) => {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-outline-success m-2",
      cancelButton: "btn btn-outline-danger"
    },
    buttonsStyling: false
  });

  const result = await swalWithBootstrapButtons.fire({
    title: title || "Are you sure?",
    text: text || "You won't be able to revert this!",
    icon: icon || "warning",
    showCancelButton: true,
    confirmButtonText: confirmButtonText || "Yes",
    cancelButtonText: cancelButtonText || "No, cancel!",
    reverseButtons: true
  });

  if (result.isConfirmed) {
    try {
      const callbackResult = await callback();

      if (callbackResult) {
        await swalWithBootstrapButtons.fire({
          title: confirmationTitle || "Successful",
          text: confirmationText || "",
          icon: "success"
        });
      } else {
        await swalWithBootstrapButtons.fire({
          title: failedMessageTitle || "Unsuccessful Operation",
          text: failedMessageText || "Please report this issue to file a ticket.",
          icon: "error"
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the callback execution
      await swalWithBootstrapButtons.fire({
        title: "Error",
        text: "An error occurred while processing your request.",
        icon: "error"
      });
    }
  }
};


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