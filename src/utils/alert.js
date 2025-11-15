import Swal from "sweetalert2";

export const successAlert = (title) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const errorAlert = (title) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};
