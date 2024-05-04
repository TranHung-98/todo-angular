import { Injectable } from "@angular/core";
import { SweetAlertPosition } from "sweetalert2";

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  fireErrorAlert(title: string, text: string, time: number, toast: boolean, showConfirmButton: boolean, position: SweetAlertPosition) {
    import('sweetalert2').then(({ default: Swal }) => {
      Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        timer: time,
        toast: toast,
        position: position,
        showConfirmButton: showConfirmButton,
      });
    }).catch(error => console.error("Error loading sweetalert2", error));
  }

  fireSuccessAlert(title: string, text: string, time: number, toast: boolean, showConfirmButton: boolean, position: SweetAlertPosition) {
    import('sweetalert2').then(({ default: Swal }) => {
      Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        timer: time,
        toast: toast,
        position: position,
        timerProgressBar: true,
        showConfirmButton: showConfirmButton,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
    }).catch(error => console.error("Error loading sweetalert2", error));
  }

  fireWarningAlert(title: string, text: string) {
    import('sweetalert2').then(({ default: Swal }) => {
      Swal.fire({
        icon: 'warning',
        title: title,
        text: text,
      });
    }).catch(error => console.error("Error loading sweetalert2", error));
  }

  fireInfoAlert(title: string, text: string) {
    import('sweetalert2').then(({ default: Swal }) => {
      Swal.fire({
        icon: 'info',
        title: title,
        text: text,
      });
    }).catch(error => console.error("Error loading sweetalert2", error));
  }

  async showConfirmationDialog(title: string, message: string, confirmText: string, colorCancel: string, colorBtn: string): Promise<boolean> {
    const Swal = await import('sweetalert2');
    const result = await Swal.default.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colorBtn,
      cancelButtonColor: colorCancel,
      confirmButtonText: confirmText,
    });
    return result.isConfirmed;
  }

}
