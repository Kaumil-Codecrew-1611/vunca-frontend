import axios from "axios";

export const uploadImage = async image => {
    try {
        const data = new FormData()
        data.append('image', image)
        let url = `https://api.imgbb.com/1/upload?key=${process.env.imgbb_key}`;
        const res = await axios.post(url, data, {})
        if (res.data.success) {
            return res.data.data.image.url
        }
    } catch (e) {
        return ''
    }
}

export const getUploadImageUrl = async image => {
    if (image?.length > 0) {
        if (image[0].uid === '-1') {
            return image[0].url
        } else {
            let {originFileObj} = image[0]
            return await uploadImage(originFileObj)
        }
    }
    return ''
}

export const getUploadImagesUrl = async images => {
    if (images?.length > 0) {
        let urls = []
        for (let i = 0; i < images?.length; i++) {
            if (typeof images[i] === 'string') {
                urls.push(images[i])
            } else {
                let url = await uploadImage(images[i])
                urls.push(url)
            }
        }
        return urls;
    }
    return []
}