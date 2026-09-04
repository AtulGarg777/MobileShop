import { useForm } from 'react-hook-form'
import { toastError, toastSuccess } from '../../Util/toastify';

export default function AddProduct() {

    let { register, watch, handleSubmit, formState: { errors } } = useForm()

    async function handle_add_product(data) {

        let formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
            if (value instanceof FileList) {
                //convert fileList to array and store in formData
                let files = Array.from(value);
                for (const file of files) {
                    formData.append(key, file)
                }
            } else {
                formData.append(key, value);
            }
        }

        let response = await fetch(`${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api/admin/addProduct`, {
            method: 'post',
            body: formData
        })

        let res = await response.json();

        if (!res.success) {
            toastError('Error occured !Try Again')
            return;
        }

        toastSuccess(res.message)

    }

    return (
        <div>
            <form method="" onSubmit={handleSubmit(handle_add_product)}>
                <div>
                    <label htmlFor="">Title</label>
                    <input type="text" {...register('title')} placeholder="Enter Title here" />
                </div>
                <div>
                    <label htmlFor="">Description</label>
                    <input type="text" {...register('description')} placeholder="Enter description" />
                </div>
                <div>
                    <label htmlFor="">Price</label>
                    <input type="text" {...register('price')} inputMode="numeric" placeholder="Enter Price" />
                </div>
                <div>
                    <label htmlFor="">Main image</label>
                    <input type="file" {...register('mainImage')} accept="image/*" placeholder="Upload main image" />
                </div>
                <div>
                    <label htmlFor="">Images</label>
                    <input type="file" {...register('images')} accept="image/*" multiple placeholder="Upload image from device" />
                </div>
                <div>
                    <label htmlFor="">brand</label>
                    <input type="text" {...register('brand')} placeholder="brand name" />
                </div>
                <div>
                    <label htmlFor="">Category</label>
                    <input type="text" {...register('category')} placeholder="" />
                </div>
                <div>
                    <label htmlFor="">Stock</label>
                    <input type="text" {...register('stock')} placeholder="" />
                </div>
                <button type="submit">Submit Product</button>
            </form>
        </div>
    )
}