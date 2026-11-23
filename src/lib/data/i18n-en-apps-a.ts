// English editorial content (Fase 5) — set A: tiktok, capcut, whatsapp, instagram,
// telegram, youtube. Original editorial writing for the /en editions, consistent with
// the facts on each app's Indonesian page. Types live in ./i18n-en-types.
import type { EnAppContent } from "./i18n-en-types";

export const enAppsA: EnAppContent[] = [
  {
    slug: "tiktok",
    taglineEn: "The short-video app that runs on an algorithm tuned to your taste.",
    introEn: [
      "TikTok is a short-video platform where anyone can record, edit, and watch vertical videos ranging from a few seconds to several minutes. Its For You feed learns what you watch, like, and skip, then serves more of it — which is why two people opening the same app see completely different worlds.",
      "In Indonesia, TikTok is far more than entertainment: it is where trends start, where small sellers reach buyers through TikTok Shop and live selling, and where quick tutorials rack up millions of views. This page covers the facts — features, permissions, and an honest look at safety — and links only to the official Google Play Store listing.",
    ],
    whatEn: [
      "Creators get a built-in camera with face filters, AR effects, stickers, timers, and a large licensed music library. Videos can be recorded in the app or uploaded from the gallery, then trimmed, captioned, and layered with text and sounds. Features like Duet and Stitch let you respond to other videos side by side or build on a clip, when the original creator allows it.",
      "Commerce is built in. In Indonesia, TikTok's shopping features run with Tokopedia, so sellers can pin products to videos and livestreams and viewers can check out without leaving the app. Live streaming adds real-time comments and virtual gifts, with age limits on who can broadcast. Many creators edit in CapCut — the companion editor from the same ecosystem — before posting.",
    ],
    safetyEn: [
      "The official TikTok app from Google Play is signed by TikTok Pte. Ltd., passes Play Protect scanning, and updates directly from its developer. The real danger is unofficial builds: files calling themselves modded, ad-free, or 'Premium' TikTok come from random sites, are not on the Play Store, and commonly carry aggressive ads or data stealers. There is no official product called TikTok Premium.",
      "On privacy, remember TikTok collects usage data to power recommendations and advertising, as its privacy policy states. Reduce your footprint with a private account if you prefer, limit who can message you, review app permissions now and then, and use Family Pairing plus screen-time limits for teenagers. Its cache also grows quickly on small phones, so clear it from the in-app settings regularly.",
    ],
    goodFor: [
      "Discovering trends, music, and quick tutorials",
      "Creators building an audience from zero",
      "Small sellers doing live shopping",
    ],
    watchOut: [
      "Endless scrolling that eats hours unnoticed",
      "Unofficial 'mod' or 'Premium' APK files",
      "Cache and mobile data growing fast",
    ],
    faqs: [
      { q: "Is there an official TikTok Premium?", a: "No. TikTok is free with advertising and optional in-app purchases such as coins for live gifts. Any website offering a 'TikTok Premium' APK is distributing an unofficial, modified file that can harm your phone and get your account banned." },
      { q: "Why does TikTok fill up my phone's storage?", a: "Videos you watch are cached so replays and scrolling feel instant, and that cache grows over time, especially on 32 GB phones. Clear it from TikTok's in-app settings — not by installing a 'cleaner' version from a random site." },
      { q: "Is TikTok safe for teenagers?", a: "TikTok sets age limits and offers a restricted mode, screen-time reminders, and Family Pairing so parents can link accounts. Even so, the feed is a general-audience mix, so teenagers do best with supervision, a private account, and agreed time limits." },
    ],
  },
  {
    slug: "capcut",
    taglineEn: "The free video editor behind half the TikToks you watch.",
    introEn: [
      "CapCut is a free video editor from Bytedance, the company behind TikTok, built so complete beginners can produce polished videos without editing experience. Its signature feature is templates: pick a trending template, drop in your own clips, and the cuts, effects, and beat sync are done for you in seconds.",
      "In Indonesia, CapCut is the default tool for TikTok creators, online sellers, teachers, and small-business social media admins. It runs on Android and iOS, with desktop and web versions for longer projects. This page sticks to the verified facts and links only to the official Play Store listing.",
    ],
    whatEn: [
      "The everyday toolkit covers trimming, splitting, speed curves, stabilization, filters, transitions, background removal, and chroma key. Its automatic captions turn speech into editable subtitles — including Indonesian — which saves creators the slowest part of short-video production. A large music and sound-effect library is built in, and audio can also be extracted from videos in your gallery.",
      "Most of that is free. CapCut Pro is an optional paid subscription that unlocks extra effects, transitions, stock assets, AI features, and more cloud space; the official price is whatever the Play Store shows when you subscribe. Projects can start on a phone and continue on a computer, which suits sellers producing content on a weekly rhythm.",
    ],
    safetyEn: [
      "The official CapCut is signed by Bytedance Pte. Ltd. and is safe to use. The most common trap aimed at its users is the 'CapCut Pro mod' — APK files from random sites promising every paid feature unlocked free. A mod means unknown parties rewrote the app's code, and you have no way to verify nothing was added; your projects and account carry the risk.",
      "There is no legal way to get CapCut Pro permanently free, so treat any such promise as a warning sign. On privacy, features that send your footage to cloud or AI processing are governed by CapCut's privacy policy; for sensitive material, prefer tools that work locally on the device. Update only from the Play Store, never from links forwarded in chat groups.",
    ],
    goodFor: [
      "Beginners editing their first TikTok or Reel",
      "Sellers making product videos on a phone",
      "Teachers adding Indonesian captions to lessons",
    ],
    watchOut: [
      "'Pro unlocked' mods that carry malware",
      "Heavy exports draining small-RAM phones",
      "Best effects gradually moving behind Pro",
    ],
    faqs: [
      { q: "Is CapCut really free?", a: "Yes for its core toolkit, which is what most creators use daily. A Pro subscription adds premium effects, transitions, stock, and AI extras. The official price is the one shown in the Play Store — ignore any site promising Pro free forever." },
      { q: "How do I remove the CapCut watermark?", a: "For videos you edit yourself, export without a template and check the ending-watermark setting; the mark usually comes from a template's closing clip, which you can delete in the timeline. You do not need a modified app for this." },
      { q: "Does CapCut work offline?", a: "Basic editing of files already on your phone works offline. Downloading templates, music, and effects, and using cloud or AI features, needs an internet connection — grab the assets you need while on Wi-Fi if your data plan is tight." },
    ],
  },
  {
    slug: "whatsapp",
    taglineEn: "Indonesia's default messenger — and the number-one target for fake APKs.",
    introEn: [
      "WhatsApp is the free messaging and calling app that functions as Indonesia's default communication layer: family groups, schools, offices, neighborhood communities, and business customer service all run on it. Because nearly everyone uses it, it is also the top target for fake apps, modified versions, and scams.",
      "This page lays out the official facts — encryption, permissions, backups — and explains plainly how to tell the real app from imitations and why modified versions are a bad bargain. The only download link here goes to the official Play Store listing published by WhatsApp LLC.",
    ],
    whatEn: [
      "The core is personal and group chat protected by end-to-end encryption by default, plus voice and video calls, voice notes, and sharing of photos, documents, and location. Status lets you post updates for 24 hours, Channels carry announcements from organizations and creators, and Communities group related chats under one umbrella for schools and organizations.",
      "For small businesses there is a separate, official app: WhatsApp Business, with a product catalog, greeting messages, customer labels, and quick replies — free and made by Meta, no third party needed. On Android, chat backups go to your Google Drive and count against its storage, so keep periodic backups on and remember which Google account holds them.",
    ],
    safetyEn: [
      "Genuine WhatsApp exists only on the Play Store and App Store. Everything else using its name — GB WhatsApp, WhatsApp Plus, gold or transparent editions — is an unofficial modification whose code was changed by unknown parties, so its encryption claims cannot be verified. WhatsApp also bans accounts that use such apps, sometimes permanently, taking your chat history and groups with them.",
      "The other front line is social engineering: in Indonesia, scammers send APK files disguised as wedding invitations, traffic fines, or parcel notices that steal one-time codes and drain bank accounts. No official body sends apps through chat. Turn on two-step verification, never share your six-digit code with anyone, and delete and report any APK file that arrives from a chat.",
    ],
    goodFor: [
      "Reaching literally everyone you know in Indonesia",
      "Group chats with default end-to-end encryption",
      "Small sellers using the official Business app",
    ],
    watchOut: [
      "Mod versions like GB WhatsApp risking a ban",
      "Scam APK files arriving inside chats",
      "Phone number visible to all group members",
    ],
    faqs: [
      { q: "Is GB WhatsApp safe to use?", a: "No. It is not a Meta product, its modified code cannot be verified, and WhatsApp warns that unofficial apps can lead to account bans. Back up your chats, then move to the official app from the Play Store using the same number." },
      { q: "Someone sent me an APK invitation file on WhatsApp. What should I do?", a: "Do not open or install it. This is a well-known Indonesian scam pattern designed to steal verification codes. Delete the message, block and report the sender inside the app, and warn the real person through another channel in case their account was hijacked." },
      { q: "How do I move my chats to a new phone?", a: "Back up first under Settings > Chats > Chat backup to your Google account, then install official WhatsApp on the new phone, verify the same number, and accept the restore prompt. Do not delete the old app until the restore succeeds." },
    ],
  },
  {
    slug: "instagram",
    taglineEn: "Photos, Reels, and Stories — Indonesia's visual storefront.",
    introEn: [
      "Instagram is Meta's photo and video platform, used in Indonesia as a creator portfolio, a shop catalog, a hobby community hub, and a local news source. Its three main formats now are Reels — short vertical videos pushed by the algorithm — Stories that vanish after 24 hours, and the permanent Feed.",
      "This page covers the official app, what its permissions mean, and the risks that surround it, from download tools to account theft. Our only download link leads to the Play Store. We do not offer modified Instagram APKs; versions promising no ads and unlimited downloads break the rules and endanger your account.",
    ],
    whatEn: [
      "Reels are built for discovery: the algorithm shows them to people who do not follow you yet. Stories are for your existing audience — quick updates with polls, questions, and link stickers. The Feed remains your permanent showcase, and free professional accounts add audience insights and business contact buttons that sellers and creators rely on.",
      "Downloading has rules worth knowing. Instagram provides no general download button for other people's videos. Saving something privately is different from re-uploading someone else's work as your own, which violates copyright and platform terms. For your own content, Instagram offers account data downloads in settings. Third-party downloaders should only ever touch your own public posts or content you have permission for.",
    ],
    safetyEn: [
      "The official app is published by Meta and is safe as software. The danger lives in the ecosystem around it: follower-booster apps, 'private profile viewer' sites, and downloaders that ask for your password. None of them work as promised, all of them break the rules, and handing over your password outside the official app is exactly how accounts get stolen.",
      "Accounts with large followings are valuable targets, sold on or used to scam followers. Switch on two-factor authentication with an authenticator app rather than SMS alone, review login activity regularly, and store recovery codes somewhere safe off your phone. If you run a business account, keep one trusted backup admin so a single lost phone cannot lock you out.",
    ],
    goodFor: [
      "Creators showcasing visual work and products",
      "Shops running a catalog with contact buttons",
      "Following local communities and hobbies",
    ],
    watchOut: [
      "Services asking for your Instagram password",
      "Follower-booster apps that get accounts restricted",
      "DM scams arriving from stranger accounts",
    ],
    faqs: [
      { q: "Can an app really show me private profiles?", a: "No legitimate way exists. Sites and apps claiming to reveal private profiles are almost always scams asking for your login or payment. A private profile is visible only to followers the owner has approved." },
      { q: "How do I download an Instagram video?", a: "For your own videos, use the in-app save and download options or the account data download in settings. Tools that fetch public videos are only appropriate for your own content or with the owner's permission — and never for re-uploading as your own work." },
      { q: "How do I turn on two-factor authentication?", a: "Go to your profile menu, then Settings and privacy, Accounts Center, Password and security, and two-factor authentication. Choose an authenticator app, and save the recovery codes somewhere safe outside your phone." },
    ],
  },
  {
    slug: "telegram",
    taglineEn: "Huge groups, public channels, and big-file sharing in one messenger.",
    introEn: [
      "Telegram is a cloud-based messenger known for enormous groups, broadcast channels, bots, and file sending far beyond what typical chat apps allow. In Indonesia it powers study communities, material distribution, hobby groups, and announcement channels that would be impossible in a normal group chat.",
      "This page explains Telegram's facts, including the encryption detail most people get wrong, plus the risks of its open public spaces. The download button here leads only to the Play Store listing from Telegram FZ-LLC; we do not host Telegram APK files from any other source.",
    ],
    whatEn: [
      "Regular Telegram chats are cloud chats: encrypted in transit and stored on Telegram's servers so the same account works simultaneously on your phone, tablet, and computer. They are not end-to-end encrypted by default. End-to-end encryption exists only in Secret Chats, which you start manually for one contact — they never apply to groups and do not sync between devices.",
      "Channels let one admin broadcast to unlimited subscribers, supergroups hold very large communities with real admin tools, and bots — automated accounts built by communities and services — handle everything from schedule reminders to study quizzes. Because files live in the cloud, documents and videos you sent or received can be downloaded again without filling your phone.",
    ],
    safetyEn: [
      "The official app is safe software, but Telegram's openness is abused: pirated movie channels, gambling groups, fake investment schemes, and scammers impersonating channel admins all operate there. Distributing pirated content or running gambling groups is illegal in Indonesia regardless of how easy it is to find. Leave and report groups that clearly break the law.",
      "Protect the account itself. Because one login opens your whole cloud history on every device, turn on two-step verification with an extra password, set an app passcode, and review active sessions regularly, ending any you do not recognize. Real admins never ask for your login code in a chat, and parents should know public search can surface adult and illegal channels — built-in family filters are limited.",
    ],
    goodFor: [
      "Running very large communities and channels",
      "Sending large files that stay in the cloud",
      "Using one account across phone and desktop",
    ],
    watchOut: [
      "Regular chats are not end-to-end encrypted by default",
      "Pirated content, gambling, and scam channels",
      "A stolen session exposing your full cloud history",
    ],
    faqs: [
      { q: "Is Telegram more secure than WhatsApp?", a: "It depends what you compare. Telegram wins on community features and cloud flexibility, but regular chats are not end-to-end encrypted by default — only Secret Chats are, and they exclude groups. WhatsApp encrypts every chat and call by default. Enable two-step verification on both." },
      { q: "Do I need Telegram Premium?", a: "No. Premium is an optional subscription that raises limits and adds extras. Chatting, groups, channels, and file sending — everything that makes Telegram useful — remain free." },
      { q: "Why are there so many pirated movies on Telegram?", a: "Because channels are easy to create and reach huge audiences. That does not make them legal: sharing pirated films or running gambling groups violates Indonesian law and Telegram's terms, and such channels are regularly reported and shut down. Use Telegram for legitimate communities instead." },
    ],
  },
  {
    slug: "youtube",
    taglineEn: "Long videos, tutorials, music, and Shorts in Google's official app.",
    introEn: [
      "YouTube is the world's largest video platform, owned by Google, and in Indonesia it is the first stop for tutorials, news, music, religious talks, school lessons, and livestreams. Unlike pure short-video apps, its strength is depth: long-form video plus search means almost any practical question has a video answer.",
      "This page summarizes the official app, gives an honest account of free versus Premium, and covers the risks of unofficial downloader and mod apps that surround it. The only button here leads to the Play Store — we do not provide modded YouTube APKs or downloaders that break the platform's terms.",
    ],
    whatEn: [
      "YouTube now has three faces: traditional long videos, Shorts — vertical clips competing with TikTok and Reels — and live streaming with audience chat and scheduled premieres. Watching is free with advertising. Subtitles and auto-captions cover many languages, and creators get the industry's most established monetization through the partner program for eligible channels.",
      "YouTube Premium is the official paid tier: it removes ads, enables official downloads for offline viewing inside the app, background playback, and includes YouTube Music Premium, with family and student plans in many regions. Official downloads stay inside the app and respect creators' rules — the legal way to watch offline, and far safer than any third-party downloader.",
    ],
    safetyEn: [
      "The official YouTube app from Google on the Play Store is the safe route. The hazard is its mod ecosystem: YouTube Vanced and similar mods were unofficial, their development has been discontinued, and successor files circulate through random sites where nobody can verify who changed them. Some mods even ask you to sign in to your Google account outside the official app — a direct risk to your entire Google identity.",
      "On the content side, turn on restricted mode to reduce adult material, and for young children use YouTube Kids — a separate official app with filtered content — together with Google's Family Link for time limits. Manage watch history because recommendations learn from it, and never follow money or prize links in comments or descriptions; crypto and giveaway scams are common there.",
    ],
    goodFor: [
      "Learning anything from deep tutorials",
      "Watching offline legally with official downloads",
      "Creators earning through the partner program",
    ],
    watchOut: [
      "Discontinued mod apps like Vanced from random sites",
      "Heavy data use at high playback quality",
      "Scam prize links in comments and descriptions",
    ],
    faqs: [
      { q: "How can I download YouTube videos for offline viewing?", a: "Use the official Download button in the YouTube app on videos that allow it; the video stays inside the app for offline viewing. Third-party download sites and apps violate YouTube's terms and often carry malware — the exception is your own videos, via YouTube Studio." },
      { q: "Is YouTube Vanced safe?", a: "Vanced was an unofficial app and its development has been discontinued. Lookalike files now circulating cannot be verified, and some request Google sign-in outside official channels. We recommend the official app and its built-in download feature instead." },
      { q: "Can I watch YouTube without ads for free, legally?", a: "There is no official ad-free option besides Premium, apart from videos whose creators chose not to monetize. Ad blockers and mods violate the terms and some carry security risks. The honest choice is free with ads, or paying for Premium." },
    ],
  },
];
