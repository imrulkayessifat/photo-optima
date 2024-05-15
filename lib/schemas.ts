import { z } from "zod";

export const ProductCreatechema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    vendor: z.string().optional(),
    status: z.string().optional(),
    product_type: z.string().optional(),
    body_html: z.string().optional(),
    // metafields:z.any()
})

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
export const UploadImageFormSchema = z.object({
    image: z
        .any()
        .refine((files) => {
            return files?.[0]?.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
});

export const AutoCompressionSchema = z.object({
    auto_compression: z.boolean().optional(),
})