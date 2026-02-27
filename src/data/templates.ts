export interface Template {
  id: string;
  title: string;
  category: string;
  roles: ('operator' | 'founder' | 'ceo')[];
  content: string;
}

export const templates: Template[] = [
  {
    id: 'marketplace-invite',
    title: 'Marketplace Invite (Commission-Led)',
    category: 'Acquisition',
    roles: ['operator'],
    content:
      "Hey [Name]! We're WonderCow — we make colostrum gummies that are blowing up on TikTok Shop right now. We'd love to send you a free sample to try on camera. Our creators are earning 20–50% commission on every sale, and our top creators are making $1K–$5K+/month. Interested? We'll ship product to your door this week.",
  },
  {
    id: 'approval-message',
    title: 'Approval Message',
    category: 'Acquisition',
    roles: ['operator'],
    content:
      "Welcome to WonderCow! You're approved. Here's what happens next:\n\n1. We're shipping your free gummy sample today (arrives in 3–5 days)\n2. Once you get it, post 2–3 videos within 14 days\n3. Tag the product so you earn commission on every sale\n\nTips that work: unboxings, taste tests, morning routines, and honest reviews perform best. Let us know if you have any questions!",
  },
  {
    id: 'day-3-nudge',
    title: 'Day 3 Nudge',
    category: 'Follow-Up',
    roles: ['operator'],
    content:
      'Hey [Name]! Your WonderCow gummies should have arrived by now. Have you had a chance to try them? Our creators are seeing great results with simple taste test or unboxing videos. Let us know if you need anything to get started!',
  },
  {
    id: 'day-7-nudge',
    title: 'Day 7 Nudge',
    category: 'Follow-Up',
    roles: ['operator'],
    content:
      "Hi [Name] — just checking in! It's been about a week since your WonderCow sample shipped. We'd love to see your content. Even a quick 30-second taste test or routine video works great. Our top creators started with simple posts and are now earning $1K+/month. Ready to get started?",
  },
  {
    id: 'breakout-message',
    title: 'Breakout Message (Request Variants)',
    category: 'Growth',
    roles: ['operator'],
    content:
      "[Name] — your WonderCow video is doing amazing! Congrats on [X views / $X in sales]. When a video pops like this, making 2–3 variations of the same hook usually keeps the momentum going. Would you be down to film a couple more this week? We'll send you more product if you need it.",
  },
  {
    id: 'sprint-week',
    title: 'Sprint Week Announcement',
    category: 'Growth',
    roles: ['operator'],
    content:
      "It's SPRINT WEEK at WonderCow! For the next 7 days, we're running a special bonus: the top 3 creators by sales this week win:\n\n\u{1F947} 1st place: $1,000 cash\n\u{1F948} 2nd place: $500 cash\n\u{1F949} 3rd place: $250 cash\n\nPost as many videos as you can. Tag the product. Let's go! Current leaderboard updates daily.",
  },
  {
    id: 'bonus-leaderboard',
    title: 'Bonus Leaderboard Announcement',
    category: 'Retention',
    roles: ['operator'],
    content:
      "WonderCow Monthly Leaderboard is LIVE! Every month, our top 3 creators by GMV win cash bonuses:\n\n\u{1F947} 1st: $1,000\n\u{1F948} 2nd: $500\n\u{1F949} 3rd: $250\n\nYour sales count automatically through TikTok Shop. Post more = sell more = win more. Let's have a huge month!",
  },
  {
    id: 'live-promo',
    title: 'LIVE Promo Template',
    category: 'LIVE',
    roles: ['founder'],
    content:
      "Going LIVE tonight at [TIME] on TikTok! We're talking about [TOPIC — e.g., why colostrum is the #1 immune supplement of 2026] and answering all your questions. Plus, exclusive bundle deals only available during the LIVE. Set your reminder — see you there!",
  },
  {
    id: 'cohost-invite',
    title: 'Co-Host Invite Message',
    category: 'LIVE',
    roles: ['operator', 'founder'],
    content:
      "Hey [Name]! Your WonderCow content has been incredible. We'd love to invite you to co-host a LIVE session with us this week. It's a great way to connect with your audience, share your experience with the product, and earn commission on LIVE sales. Would [DAY] at [TIME] work for you? It'll be about 30–45 minutes.",
  },
];
