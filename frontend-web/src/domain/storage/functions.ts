
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { IProduct } from "../interfaces/IProduct";
import { getRef } from "./index";

async function upload(product: IProduct, file: any): Promise<string> {
    const { id, code, company, category } = product;
    //const path: string = `products/images/${company}/${category}/${code}_${id}`;
    const path = `${code}`;
    const ref = getRef(path)
    const data = await uploadBytes(ref, file);
    return data.ref.fullPath;
}

async function getURLImage(path: string){
    const ref = getRef(path)
    return await getDownloadURL(ref)
}



export { upload, getURLImage };
