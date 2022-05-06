import { Ref, ref } from "vue";
import { IProduct } from "../domain/interfaces/IProduct";
import { getURLImage, upload } from "../domain/storage/functions";

function use(product: Ref<IProduct>) {
    const imageFile = ref();
    const imagePreview = ref("");

    async function onGetImage(e: any) {
        const file = e.target.files[0];
        imagePreview.value = URL.createObjectURL(file);
        imageFile.value = file;
    }
      
    async function uploadImage(): Promise<string> {
        const path = await upload(product.value, imageFile.value);
        const downloadPath = await getURLImage(path);
        return downloadPath;
    }

    return {
        imageFile,
        imagePreview,
        onGetImage,
        uploadImage
    }
}


export const ImageUploadHooks = {
    use
}