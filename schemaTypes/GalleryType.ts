import {defineField, defineType} from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Media Name',
      type: 'string',
      description: 'A unique name to identify this image or video',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' }
        ],
        layout: 'radio'
      },
      initialValue: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({document}) => document?.mediaType !== 'image',
      validation: (rule) => rule.custom((value, context) => {
        const mediaType = context.document?.mediaType
        if (mediaType === 'image' && !value) {
          return 'Image is required when media type is Image'
        }
        return true
      }),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      description: 'Upload a video file. Preview will be available after upload.',
      hidden: ({document}) => document?.mediaType !== 'video',
      validation: (rule) => rule.custom((value, context) => {
        const mediaType = context.document?.mediaType
        if (mediaType === 'video' && !value) {
          return 'Video is required when media type is Video'
        }
        return true
      }),
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
      mediaType: 'mediaType',
      image: 'image',
      video: 'video',
      uploadedAt: 'uploadedAt',
    },
    prepare({name, mediaType, image, video, uploadedAt}) {
      const date = uploadedAt ? new Date(uploadedAt).toLocaleDateString() : ''
      const mediaIcon = mediaType === 'video' ? '🎥' : '🖼️'
      
      return {
        title: `${mediaIcon} ${name || 'Gallery Media'}`,
        subtitle: `${mediaType?.toUpperCase()} • Uploaded: ${date}`,
        media: mediaType === 'video' ? video : image,
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