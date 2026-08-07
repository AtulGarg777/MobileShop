import { toast } from "react-toastify"


function toastSuccess(msg) {
    toast.success(msg);
}
function toastError(msg) {
    toast.error(msg);
}


export { toastSuccess, toastError }