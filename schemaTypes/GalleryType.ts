import {defineField, defineType} from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Image Name',
      type: 'string',
      description: 'A unique name to identify this image',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'uploadedAt',
      title: 'Uploaded At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'image',
      uploadedAt: 'uploadedAt',
    },
    prepare({name, image, uploadedAt}) {
      const date = uploadedAt ? new Date(uploadedAt).toLocaleDateString() : ''
      
      return {
        title: name || 'Gallery Image',
        subtitle: `Uploaded: ${date}`,
        media: image,
      }
    },
  },
  orderings: [
    {
      title: 'Recently Uploaded',
      name: 'uploadedAtDesc',
      by: [{field: 'uploadedAt', direction: 'desc'}],
    },
    {
      title: 'Oldest First',
      name: 'uploadedAtAsc',
      by: [{field: 'uploadedAt', direction: 'asc'}],
    },
  ],
})