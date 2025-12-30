import { defineCollection, z } from 'astro:content';

const storyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    sections: z.array(z.object({
      heading: z.string(),
      content: z.string(),
    })),
  }),
});

const faqCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    questions: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
  }),
});

const travelCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),

    venue: z.object({
      name: z.string(),
      address: z.string(),
    }),

    accommodations: z.array(
      z.object({
        name: z.string(),
        address: z.string(),
        phone: z.string(),
      })
    ),

    transportation: z.object({
      airport: z.object({
        name: z.string(),
        driveTime: z.string(),
      }),

      options: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      ),

      local: z.object({
        description: z.string(),
      }),
    }),
  }),
});


const thingsToDoCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    intro: z.string(),
    categories: z.array(z.object({
      name: z.string(),
      items: z.array(z.string()),
    })),
  }),
});

const registryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    intro: z.string(),
    stores: z.array(z.object({
      name: z.string(),
      description: z.string(),
      url: z.string().optional(),
    })),
    note: z.string().optional(),
  }),
});

const homeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    dateLabel: z.string(),
    dateDetail: z.string(),
    intro: z.string(),
  }),
});

export const collections = {
  'story': storyCollection,
  'faq': faqCollection,
  'travel': travelCollection,
  'things-to-do': thingsToDoCollection,
  'registry': registryCollection,
  'home': homeCollection,
};

