import {defineField, defineType} from 'sanity'

export const verseType = defineType({
  name: 'verse',
  title: 'Bible Verse',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Verse Text',
      type: 'text',
      description: 'The complete text of the Bible verse',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'book',
      title: 'Book',
      type: 'string',
      description: 'The name of the Bible book (e.g., John, Genesis, Psalms)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'chapter',
      title: 'Chapter',
      type: 'number',
      description: 'The chapter number',
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: 'verse',
      title: 'Verse',
      type: 'number',
      description: 'The verse number',
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (rule) => rule.required(),
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      text: 'text',
      book: 'book',
      chapter: 'chapter',
      verse: 'verse',
    },
    prepare({text, book, chapter, verse}) {
      const reference = `${book} ${chapter}:${verse}`
      const shortText = text && text.length > 100 ? `${text.substring(0, 100)}...` : text
      
      return {
        title: reference,
        subtitle: shortText || 'No verse text',
        media: () => '📖', // Bible book emoji
      }
    },
  },
  orderings: [
    {
      title: 'Recently Added',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Book Order',
      name: 'bookOrder',
      by: [
        {field: 'book', direction: 'asc'},
        {field: 'chapter', direction: 'asc'},
        {field: 'verse', direction: 'asc'},
      ],
    },
  ],
})
