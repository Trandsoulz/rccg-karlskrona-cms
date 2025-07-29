import {defineField, defineType} from 'sanity'

export const facebookType = defineType({
  name: 'facebook',
  title: 'Facebook Post',
  type: 'document',
  fields: [
    defineField({
      name: 'iframeCode',
      title: 'Facebook Iframe Code',
      type: 'text',
      description: 'Paste the complete Facebook iframe embed code here (from Facebook\'s embed options)',
      rows: 4,
      validation: (rule) => 
        rule
          .required()
          .custom((iframe) => {
            if (iframe && !iframe.includes('<iframe') && !iframe.includes('facebook.com')) {
              return 'Must be a valid Facebook iframe embed code'
            }
            return true
          }),
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
      iframe: 'iframeCode',
      publishedAt: 'publishedAt',
    },
    prepare({iframe, publishedAt}) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : ''
      
      return {
        title: 'Facebook Post',
        subtitle: `Iframe embed • ${date}`,
        media: () => '📘', // Facebook icon emoji
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
})