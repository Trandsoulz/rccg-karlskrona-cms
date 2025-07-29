import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'string',
      description: 'Link for event registration or more information',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare({title, date, media}) {
      const eventDate = date ? new Date(date).toLocaleDateString() : ''
      return {
        title: title || 'Event',
        subtitle: eventDate ? `Event Date: ${eventDate}` : 'No date set',
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Recently Added',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    }
  ],
  initialValue: {
    publishedAt: new Date().toISOString(),
  },
})