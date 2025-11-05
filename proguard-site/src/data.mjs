// Data model based on the provided PDF content
export const pageModel = {
    hero: {
      titleKey: 'hero.title',
      subtitleKey: 'hero.subtitle',
      ctaKey: 'hero.cta',
      imageKey: 'hero.main',
    },
    products: [
      {
        id: 'ultraguard', // ref: page 5
        titleKey: 'product.ultraguard.title',
        descriptionKey: 'product.ultraguard.desc',
        imageKey: 'product.ultraguard.card',
        qrLink: 'https://proshuteng.com/ultraguard',
      },
      {
        id: 'bioguard', // ref: page 6 (Note: in PDF TOC it's BloGuard)
        titleKey: 'product.bioguard.title',
        descriptionKey: 'product.bioguard.desc',
        imageKey: 'product.bioguard.card',
        qrLink: 'https://proshuteng.com/bioguard',
      },
      {
        id: 'smartguard', // ref: page 7
        titleKey: 'product.smartguard.title',
        descriptionKey: 'product.smartguard.desc',
        imageKey: 'product.smartguard.card',
        qrLink: 'https://proshuteng.com/smartguard',
      },
      {
        id: 'fastguard', // ref: page 8
        titleKey: 'product.fastguard.title',
        descriptionKey: 'product.fastguard.desc',
        imageKey: 'product.fastguard.card',
        qrLink: 'https://proshuteng.com/fastguard',
      },
      {
        id: 'richguard', // ref: page 9
        titleKey: 'product.richguard.title',
        descriptionKey: 'product.richguard.desc',
        imageKey: 'product.richguard.card',
        qrLink: 'https://proshuteng.com/richguard',
      },
      {
        id: 'nanoguard', // ref: page 10
        titleKey: 'product.nanoguard.title',
        descriptionKey: 'product.nanoguard.desc',
        imageKey: 'product.nanoguard.card',
        qrLink: 'https://proshuteng.com/nanoguard',
      },
    ],
    // ... other sections like faq, contact can be added here
  };