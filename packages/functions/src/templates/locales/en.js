export default {
  "rp-onboarding": {
    subject: 'Get started with Dinify',
    preview: 'Did you know, that as of today you have <b>${stats.targetCount} reviews</b> on TripAdvisor and <b>${stats.targetPercent}</b> of them are written in many different languages other than Czech or English? Here is what we found among all your reviews at ${restaurant.name}. The following chart shows the ditribution of languages and the corresponding count of reviews',
    hero: {
      title: 'A restaurant menu that speaks multiple languages',
      cta: 'Start for free'
    },
    main: {
      dear: 'Dear ${restaurant.name},',
      body: 'Did you know, that as of today you have <b>${stats.targetCount} reviews</b> on TripAdvisor and <b>${stats.targetPercent}</b> of them are written in many different languages other than Czech or English?'
    },
    insights: {
      title: 'A little more insights',
      body: 'Here is what we found among all your reviews at ${restaurant.name}. The following chart shows the ditribution of languages and the corresponding count of reviews.'
    },
    accordions: {
      meaning: {
        title: 'What does this mean?',
        body: 'The large number of reviews tells you that your restaurant is already popular internationally and on the want-to-go list of many travelers to Prague. So, it\'s time to think how to make your business even better.'
      },
      why: {
        title: 'What would you do?',
        body: 'Giving them a <b>delightful experience</b> with <b>great food</b>, which you already have, and <b>great service</b> will enable you to continue your successful business journey. That\'s why we want to come and help you achieve more and further improve customer service.'
      },
      impression: {
        title: 'Build an awesome first impression',
        body: 'You always try to give a nice first impressions to your guests. Great decoration, comfortable chair, smiling wait staff and lovely music.'
      }
    },
    imageCaption: 'Dinify is an interactive multilingual menu app.',
    partner: {
      title: {
        text: 'Partner with us',
        variant: 'headline4'
      },
      cta: 'Start for free',

      // not using for now
      item1: {
        title: 'Have your menu in over 50 languages',
        body: 'Empower your foreign guests to order in their own language wuth confidence, no matter where they are from and no matter what language they speak.'
      },
      item2: {
        title: 'Delight your foreign guests',
        body: 'Wouldn\'t you be happy if you were given a restaurant menu in Czech when traveling to Tokyo or Istanbul? That\'s what your guests would feel.'
      },
      item3: {
        title: 'Seamless dining experience',
        body: 'Enable your guests to read and order with confidence. Not only with language, but also with the power of your interactive menu that streamlines the ordering process.'
      },
      item4: {
        title: 'Improve employee efficiency',
        body: 'Make your staff work smarter. Taking orders from foreign guests and serving them usually takes longer, killing your operation efficiency.'
      },
      item5: {
        title: 'Serve more guests',
        body: 'Improve the average meal duration of your foreign guests by more than 20%. Being able to serve more guests generates more revenue.'
      },
      pricing: {
        title: 'All for ${price} per month'
      }
    },
    footer: {
      phone: {
        link: 'tel:+420800200129',
        text: '+420 800200129',
        caption: 'Call us toll free domestically'
      },
      contactus: 'Get in touch with us at',
      preference: 'Email preferences',
      love: ['Made with', 'by Dinify']
    }
  }
}
