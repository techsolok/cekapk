import type { EnAppContent, EnGuideContent } from "./i18n-en-types";

// English editions (Fase 5) - batch B: spotify, canva, bstation, minecraft, kucing-apk
// + google-chrome, facebook, gmail, google-maps (EN apps Nov 2026)
// + all 6 guides. Original editorial English written for this site, consistent with the
// Indonesian pages: no invented version numbers, sizes, ratings, or scores.

export const enAppsB: EnAppContent[] = [
  {
    slug: "spotify",
    taglineEn: "The biggest licensed music and podcast streaming service - free with ads, or Premium.",
    introEn: [
      "Spotify is licensed music and podcast streaming: you do not buy songs one by one, you rent access to an enormous catalogue while you subscribe, or while you use the free tier supported by ads. In Indonesia it is the main door to listening legally.",
      "Precisely because Premium costs money, searches for Spotify mods and free premium are extremely common - and extremely risky. This page explains the official differences honestly, plus the features, permissions, and how to listen without wasting data. The button here goes only to Play Store.",
    ],
    whatEn: [
      "On a phone, the free tier has real limits: audio ads, shuffle play on many playlists, limited skips, and standard audio quality. Premium removes the ads, unlocks free song choice and unlimited skips, raises quality, and adds downloads so music plays offline inside the app. Official plan prices are always the ones shown in the app - and beware bargain Premium accounts from random sellers: they are usually stolen accounts that can die at any moment, taking yours with them.",
      "A Spotify mod is the official app altered by a third party so paid features open without paying. Beyond violating the terms and the licences that pay musicians, accounts caught using mods can be restricted or closed, and mod files are a favourite malware carrier. The genuinely legal free options have limits, and that is normal: the official free tier, an official trial when offered, or the student plan if you qualify. Spotify is also Indonesia's biggest podcast home, from comedy and horror to education and daily news.",
    ],
    safetyEn: [
      "The official Spotify app from Play Store is safe. The risks live around it: pirated mod files and the market for stolen Premium accounts. Both break the rules, and both put your account at stake - Spotify acts against unofficial clients, so years of playlists can be lost over a shortcut.",
      "Protect the account with a unique password and a verified email, and be wary of messages promising free Premium that ask you to sign in on a Spotify lookalike site - that is phishing. Always sign in from the official app, or by typing the address yourself.",
    ],
    goodFor: [
      "Listening legally to a huge licensed music catalogue",
      "Discovering music through smart playlists and recommendations",
      "Indonesian and global podcasts in one app",
      "Moving between phone, laptop, TV, and speakers with one account",
    ],
    watchOut: [
      "Free tier on mobile limits song choice and skips",
      "Offline downloads are locked behind Premium",
      "Cheap Premium accounts from random sellers can die suddenly",
      "Some songs disappear when regional licences change",
    ],
    faqs: [
      { q: "How can I get Spotify Premium for free?", a: "Legally, only through an official trial when Spotify offers one, or the official student plan if you qualify. Anything beyond that is pirated or stolen: your account can be closed, and the files carry malware risk." },
      { q: "Is a Spotify mod safe for my account?", a: "No. A mod is the app altered by a third party; Spotify sanctions unofficial clients, and mod files are frequently tampered with. Once flagged, you can lose every playlist and your whole listening history." },
      { q: "Can I listen offline without Premium?", a: "Not for music - offline downloads are a Premium feature. On the free tier, listen over Wi-Fi to save data, and lower streaming quality in settings on a mobile connection." },
    ],
  },
  {
    slug: "canva",
    taglineEn: "Drag-and-drop design for posters, presentations, and social content - no design background needed.",
    introEn: [
      "Canva is a drag-and-drop design platform that lets people with no design background produce tidy posters, presentations, invitations, simple logos, and social media content from templates. In Indonesia it is used daily by teachers, students, small businesses, and community admins.",
      "This page explains the real differences between free Canva and Canva Pro, its main features, the app's permissions, and the licensing notes free users most often forget. The button goes only to Play Store - your designs belong in the official app.",
    ],
    whatEn: [
      "Free Canva already covers millions of templates, basic elements, and cloud storage - genuinely enough for personal projects and most small businesses. Canva Pro adds the full premium library, one-click background removal, magic resizing into many formats, and brand kits. There is also Canva for Education, free for verified teachers and students. Avoid cheap Pro accounts and foreign team invitations: they are often the product of abuse, can be revoked along with every design inside them, and a workspace shared with strangers means your designs can be copied.",
      "Not everything inside Canva is free for every purpose. Licensed elements and photos come with conditions: generally fine for content and marketing, but you may not resell the raw elements as stock, sell a printed product that is almost entirely one licensed element, or register a template-based design as a trademark without meaningful change. For a long-term business identity, lean on simple elements and safe fonts. The phone app suits quick work; long documents are more comfortable on a computer.",
    ],
    safetyEn: [
      "Official Canva from Play Store and its own site is safe. The typical Canva risk is not app malware but the account: cheap Pro services, team invitations from strangers, and reused passwords. If your account is taken over, every design inside it goes with it - use a unique password.",
      "On the work side, respect element licences and do not download paid assets from template-leaking sites. For anything used commercially at scale, choose elements whose status is clear, and keep your final exported files as your own records.",
    ],
    goodFor: [
      "Beginners producing tidy designs within minutes",
      "Teachers and students on the official Education plan",
      "Small businesses making posters, stories, and presentations",
      "Working across phone and computer with one synced account",
    ],
    watchOut: [
      "The best time-saving tools are locked behind Pro",
      "Needs the internet - real offline work is very limited",
      "Element licences have limits for commercial products",
      "Popular template designs can look like everyone else's",
    ],
    faqs: [
      { q: "Can free Canva be used for selling?", a: "Generally yes, for marketing materials and business content, following the licence of the elements you used. Prohibited uses include reselling raw elements as stock and selling a printed product made almost entirely of licensed elements. Check Canva's licence summary before mass production." },
      { q: "How can I get Canva Pro for free?", a: "Officially: Canva for Education for verified teachers and students, the non-profit programme, or an official trial when offered. Cheap Pro accounts from random sellers are easily revoked and endanger your designs. For most small businesses, free Canva already suffices." },
      { q: "Can a Canva logo be registered as a trademark?", a: "Be careful: a design heavily based on templates and stock elements is usually not distinctive enough, and Canva itself limits stock-element use in registered logos. Treat Canva as a starting point, or work with a designer." },
    ],
  },
  {
    slug: "bstation",
    taglineEn: "Licensed anime streaming with Indonesian subtitles - free, legal, and on Play Store.",
    introEn: [
      "Bstation is Bilibili's service name for Southeast Asia: a licensed anime streaming app - plus some Asian dramas and creator content - with Indonesian subtitles for many titles. The service is available in Indonesia, the Philippines, Thailand, Vietnam, Singapore, and Malaysia, and new anime episodes are released every day according to its official page. For Indonesian anime viewers, Bstation is the main legal answer to pirated streaming apps and sites.",
    ],
    whatEn: [
      "Bstation shows anime under licence from its rights holders. Most episodes can be watched free with ads; the newest episodes of popular titles sometimes open to Premium subscribers first and follow for free after a delay. That model is what keeps studios and creators paid, unlike pirated apps that show everything without permission. Catalogues differ by country because licences are regional - a title available elsewhere may not be in Indonesia, which is normal in legal streaming.",
      "Unofficial anime apps such as Kucing APK promise everything free with no ads. What they do not tell you: the sources are pirated, the app never passed Play Store review, its income comes from uncontrolled third-party ads, and your watch history sits on servers run by nobody identifiable. Bstation does carry ads, and some episodes sit behind Premium for a while - but your account is official, you can use the viewing history and favourites features available with your account, Indonesian subtitles are available for many titles, and you infringe nobody's rights by watching. For casual viewers, the free tier is more than enough.",
    ],
    safetyEn: [
      "Bstation is an official Play Store app from Bilibili and is safe to install. Because it is popular, lookalike files circulate on random sites promising an ad-free mod or free Premium - the same pattern as every other mod: unofficial, risky, and against the terms. Always install from Play Store.",
      "For families: choose titles by age. Some anime is made for adult audiences, so use each title's rating and synopsis as your first guide before children watch on their own - the same responsibility as on any streaming service.",
    ],
    goodFor: [
      "Watching licensed anime with Indonesian subtitles for free",
      "Fast seasonal releases for popular titles",
      "A safe Play Store app instead of random files",
      "Syncing watch history and favourites across devices",
    ],
    watchOut: [
      "Newest episodes of hit titles are sometimes Premium first",
      "The free tier carries advertising",
      "The catalogue differs by country because of licensing",
      "Some titles are for adult audiences - supervise children",
    ],
    faqs: [
      { q: "Is Bstation legal?", a: "Yes. Bstation is Bilibili's Southeast Asia service showing licensed content with official subtitles. That is its core difference from unofficial anime apps: the rights holders have granted permission, and the app is official on Play Store." },
      { q: "Is Bstation free?", a: "Most episodes can be watched free with advertising. Some of the newest episodes of popular titles open to Premium first, and there is an official paid Premium plan. Prices are always the ones shown inside the app." },
      { q: "Why is my favourite title not on Bstation Indonesia?", a: "Because streaming licences are split by country. A title may be licensed to a different service for Indonesia, or have no Indonesian licence holder yet. This is a limitation of every legal service, not a fault of the app." },
    ],
  },
  {
    slug: "minecraft",
    taglineEn: "The legendary block-building sandbox game - paid, with no official free full version.",
    introEn: [
      "Minecraft is Mojang's sandbox game - Mojang is part of Microsoft - where players build, explore, and survive in randomly generated block worlds. It is one of the best-selling games in history, and on Android it is officially sold on Google Play Store as a one-time paid purchase.",
      "We place this page at the front of our site precisely to correct the most common search: there is no official, legal, free full version of Minecraft for Android. Everything circulating as a free Minecraft APK is pirated. Below are the official options, including the free trial, and the risks of pirated copies.",
    ],
    whatEn: [
      "Minecraft on Android is bought once on Play Store at the price shown there for Indonesia, which can change with official pricing and promotions. Bought once with your Google account, the game is permanently yours: reinstall it on another Android device without paying again, and every official update is included. The official Marketplace inside sells optional extras - maps, skins, texture packs - but the game is complete without them: Survival and Creative modes, unlimited worlds, and official multiplayer.",
      "Mojang also offers Minecraft Trial, an official free app on Play Store: a time-limited survival demo for feeling the gameplay before you buy - the only official free route on Android. Against that, weigh the pirated copies: large game files are an easy place to hide malware; pirated builds get no updates; worlds you build can vanish when the file breaks; and official multiplayer fails licence checks. The sites pushing them are full of adult ads aimed largely at children.",
    ],
    safetyEn: [
      "Official Minecraft from Play Store is safe and signed by Mojang and Microsoft. Every full free version circulating outside Play Store is pirated, without exception - there is no other official distributor for Android. Those files are among the most frequently tampered-with downloads anywhere, because the people searching for them are mostly children and teenagers.",
      "Buy with a family Google account so the purchase is recorded and reinstallable, and turn on purchase approvals on children's accounts so Marketplace spending cannot happen without permission.",
    ],
    goodFor: [
      "One purchase, permanent on your Google account, updates included",
      "Creative, educational play that suits children and families",
      "Offline single-player worlds",
      "Official multiplayer with friends across devices",
    ],
    watchOut: [
      "It is paid - no legal full free version exists",
      "Realms and Marketplace content cost extra (all optional)",
      "Low-end phones can struggle in large worlds",
      "Pirated copies are everywhere and mislead beginners",
    ],
    faqs: [
      { q: "Is there an official free Minecraft for Android?", a: "There is no official free full version. The only official free option is Minecraft Trial, Mojang's limited demo on Play Store. Every site offering the full Minecraft APK for free is distributing piracy or a scam." },
      { q: "How much does Minecraft cost on Android?", a: "The official one-time price is shown on its Play Store page for Indonesia and can change during official promotions. Check the current figure through the official button on this page - we deliberately do not print a number that could go stale." },
      { q: "If I buy it, can I install it on a new phone without paying again?", a: "Yes. The purchase is tied to the Google account that bought it. Sign in with the same account on the new phone, open the Minecraft page on Play Store, and install it again free." },
    ],
  },
  {
    slug: "kucing-apk",
    taglineEn: "An unofficial anime app many people search for - here are the honest facts and risks.",
    seoTitleEn: "Kucing APK: Safety Risks & Legal Alternatives",
    seoDescriptionEn: "Learn about Kucing APK, its unverified developer, potential security risks and legal alternatives. CekAPK does not host or link to a download for this app.",
    introEn: [
      "Kucing APK, often called Kucing Pink, is a third-party anime streaming app circulating outside Google Play Store, claiming free anime with Indonesian subtitles. It is searched over a hundred thousand times a month in Indonesia - so we wrote an honest explainer.",
      "Our position is clear: this page is INFORMATION ONLY. Kucing APK is unofficial and unverified, and it shows licensed works with no clear licensing path. We provide no file, no download link, and no installation instructions. What we provide is the facts, the risks, and legal alternatives that are genuinely safe.",
    ],
    whatEn: [
      "Official apps must pass Google's review and, for a streaming service, prove their right to show the content. Kucing APK circulates only as files on third-party websites, under changing names and packaging, with no verifiable developer. The size and feature claims on those sites come from the sites themselves; no official source confirms them. Nobody is accountable if the app changes behaviour or stops working - that absence is itself the risk.",
      "The practical risks stack up quickly. Device security: files from outside Play Store are not vetted the same way, and pirated streaming apps are among the categories most often repackaged with aggressive ads, data collectors, and harmful payloads - you can never be sure the file is genuine. Law: anime is licensed work, shown here without permission. Privacy: there is no auditable privacy policy. Quality: servers are slow, links die, subtitles inconsistent.",
    ],
    safetyEn: [
      "Our honest answer: Kucing APK cannot be called safe, and no trustworthy party can call it safe. An unverified developer, distribution outside the official store, pirated content, and files anyone can repackage - together, that is the definition of a high-risk app in our safety guide.",
      "If you or your family already installed it: delete the app, turn the unknown-sources install permission back off, run a Google Play Protect scan, and change important passwords if anything odd happens. Then move to the legal alternatives - most popular titles are officially free.",
    ],
    goodFor: [
      "No benefit we can verify - every claim comes from the file-sharing sites themselves",
      "Showing the demand for free subtitled anime is real - and is now met legally",
    ],
    watchOut: [
      "Unofficial and absent from Play Store - no Google review",
      "Unverified developer, with nobody accountable for it",
      "Pirated content infringing anime licence holders",
      "Files easily tampered with when repackaged",
      "No auditable privacy policy",
      "Can vanish at any time, with your watch history",
    ],
    faqs: [
      { q: "Is Kucing APK safe?", a: "It cannot be called safe. The app is unofficial, its developer is unverified, it never passed Play Store review, and its files circulate through sites that can repackage them. We recommend not installing it and using a legal alternative such as Bstation instead." },
      { q: "Why does this site not provide a Kucing APK download link?", a: "Because we only link to official or verifiable sources. Providing a download for an unaccountable pirated app would endanger our visitors and break this site's founding principle. What we can help with is the facts and safe alternatives." },
      { q: "Where can I watch anime with Indonesian subtitles legally and free?", a: "Bstation is the main choice: licensed, Indonesian subtitles, free with ads, official on Play Store. Others: official distributor channels on YouTube, and services such as iQIYI or Vidio." },
    ],
  },
  {
    slug: "google-chrome",
    taglineEn: "The default browser on most Android phones — fast, synced with Google, and worth setting up properly.",
    seoDescriptionEn: "Google Chrome for Android: sync, Safe Browsing, password manager and Incognito explained, plus the privacy settings worth checking.",
    introEn: [
      "Google Chrome is Google's web browser and the default browser on almost every Android phone. Its main strength is sync through a Google account: bookmarks, history, open tabs, addresses, and saved passwords follow you from your phone to your laptop and back. It also brings built-in page translation, voice search, form autofill, and Safe Browsing warnings about dangerous sites.",
      "Chrome is free and carries no third-party ads, but it is tightly tied to Google's ecosystem and data collection. The same convenience that makes switching devices effortless means Chrome stores a lot about you in one account — so how you set up sync and site permissions decides how private your browsing really is. This page sticks to the verified facts and links only to the official Play Store listing.",
    ],
    whatEn: [
      "Everyday use is simple: tap the address bar to search or open a site, manage many pages with tabs (including tab groups), and download files to the device's download folder. If you sign in with a Google account, sync only the data you actually want to carry between devices, and manage passwords through Google's built-in password manager, which also checks saved passwords against known leaks.",
      "Incognito mode opens a session that leaves no history or cookies behind once the window is closed — useful on a borrowed device. Built-in translation offers to translate foreign pages into your language right inside the browser, and the reading list saves pages to read again later, including offline.",
    ],
    safetyEn: [
      "The official Chrome app from Google on the Play Store is the safe route. Two misunderstandings cause most of the trouble. First, sync means your browsing history, searches, and passwords live in your Google account: if the same account is signed in on a family phone or a shared device, other people can see or use that data — protect the account with two-step verification and a lock screen, and sign out of Chrome on devices that are not yours.",
      "Second, Incognito mode does not make you anonymous: websites, your internet provider, and a school or office network can still see your activity; the mode only stops storing history on that device. And Chrome updates only through the Play Store — any site showing a 'your Chrome is outdated, download this file' warning is distributing malware, and lookalike Chrome browsers outside the Play Store are scams.",
    ],
    goodFor: [
      "The smoothest sync between phone and computer for Google users",
      "Built-in translation and voice search",
      "Safe Browsing warnings that help beginners avoid scam sites",
      "Managing many tabs with groups and a reading list",
    ],
    watchOut: [
      "Browsing data centralised in your Google account when full sync is on",
      "Heavy on memory on phones with little RAM",
      "Site notifications easily abused for ads and scam links",
      "Incognito mode often mistaken for full anonymity",
    ],
    faqs: [
      { q: "Does Incognito mode make me invisible online?", a: "No. Incognito only stops Chrome from storing history, cookies, and form data on that device once the window is closed. Websites you visit still see your IP address and activity, your internet provider and a school or office network can still log the connection, and anything you do while signed into an account is linked to that account as usual. Use Incognito to leave no trace on a shared device — not to hide from the internet." },
      { q: "How do I update Google Chrome?", a: "Update Google Chrome only through Google Play Store: open Play Store, search for Google Chrome, and tap Update when it is available — or switch on automatic updates so you always have the latest version. Never download a 'Chrome update' file from a random site, a chat message, or an ad: sites showing a 'your Chrome is outdated, download this file' warning are distributing malware." },
      { q: "Why am I getting ads as notifications from Chrome?", a: "Because some websites ask for notification permission and then abuse it to push ads and scam links to your phone's notification shade. Open Chrome's Site settings, review which sites may send notifications, and remove the ones you do not recognise — news and download sites are the usual offenders. While you are there, also review location, camera, and microphone permissions." },
    ],
    verifiedAtEn: "2026-11-18",
  },
  {
    slug: "facebook",
    taglineEn: "Meta's social network for friends, family, groups, and Marketplace — powerful, and worth locking down.",
    seoDescriptionEn: "Facebook for Android: groups, Marketplace, Pages and privacy settings explained, plus how to spot scams and impersonator apps.",
    introEn: [
      "Facebook is Meta's social network for keeping up with friends and family, joining community groups, watching videos, following business pages, and buying and selling on Marketplace. In Indonesia it is still the centre of many local communities, buy-and-sell groups, and small-business information, especially outside the big cities.",
      "Because it does so much, this page helps you understand its core functions and the privacy settings that matter before your account ends up open to the public. The only download link here goes to the official Play Store listing published by Meta Platforms, Inc.",
    ],
    whatEn: [
      "The Feed shows posts from friends, groups, and pages you follow, plus Stories that disappear after 24 hours. Groups are discussion spaces organised by hobby, neighbourhood, work, and interest, each with its own rules and moderators. Marketplace lets you buy and sell new and used goods nearby, with seller profiles and history you can check first.",
      "Video and live streaming cover short and long videos, plus live broadcasts from creators, sellers, and news pages. For businesses, Pages are separate public profiles with a message button, opening hours, and customer reviews — keep a Page separate from your personal profile.",
    ],
    safetyEn: [
      "The two things to get right are privacy settings and Marketplace scams. A friends list, phone number, and birthday left public make it easy for strangers to map your life; check in Privacy Settings who can see your posts and friends list, switch on login alerts for unrecognised devices, and review third-party apps you once gave sign-in access to. On the Play Store, confirm the developer is Meta Platforms, Inc., because lookalike apps with similar names circulate outside the official store.",
      "On Marketplace, check the seller's profile and history, avoid prices far below market, never pay in advance to a personal account without strong proof, and prefer meeting in a busy public place for used goods. Moving a transaction off the platform removes buyer protection — keep the conversation inside Facebook and report accounts that push you to another channel.",
    ],
    goodFor: [
      "Very active local Indonesian communities and groups",
      "Marketplace for buying and selling near where you live",
      "Small-business promotion through Pages",
      "Detailed privacy and security settings when configured",
    ],
    watchOut: [
      "The Feed easily fills with ads and irrelevant content",
      "Buy-and-sell scams and fake accounts are still common",
      "The app feels heavy on low-end phones",
      "Notifications can get very frequent if left unconfigured",
    ],
    faqs: [
      { q: "How do I avoid scams when buying on Facebook Marketplace?", a: "Check the seller's profile and history, avoid prices far below market value, do not pay in advance to a personal bank account without strong proof, and prefer meeting in a busy public place for used goods. Keep all communication inside the platform and report accounts that pressure you to transact through another channel." },
      { q: "Is Facebook free?", a: "Yes, the app is free with ads and some optional paid features. Be wary of anyone selling a 'premium unlocked' Facebook or asking you to pay for account verification — those are not official offers." },
      { q: "How do I lock down my Facebook privacy?", a: "Open Privacy Settings and check who can see your posts and friends list, then review who can look you up by phone number or email. Switch on login alerts for unrecognised devices, review the third-party apps connected to your account, and keep your birthday and contact details visible only to people you trust." },
    ],
    verifiedAtEn: "2026-11-18",
  },
  {
    slug: "gmail",
    taglineEn: "Google's official email — and the recovery key for almost every account you own.",
    seoDescriptionEn: "Gmail for Android: inbox categories, search, spam filtering and Confidential mode, plus how to spot phishing and protect your account.",
    introEn: [
      "Gmail is Google's email service, and it is the master key for many accounts: banks, marketplaces, social media, and government services all use email for account recovery. The Gmail app brings your inbox, powerful search, spam filtering, and document attachments into one place.",
      "Beyond sending mail, Gmail is where verification codes, bills, tickets, and official notices arrive. Because email is the recovery path for almost every account, Gmail's security matters as much as your banking security — losing access to your email means losing many accounts at once. This page sticks to the verified facts and links only to the official Play Store listing from Google LLC.",
    ],
    whatEn: [
      "The inbox sorts mail automatically into Primary, Social, and Promotions so the important mail does not drown. Search finds old mail by sender, words in the message, attachments, and date range, and Google filters most dangerous mail before it reaches your inbox. Large files go through Google Drive, and documents can be previewed without another app.",
      "Confidential mode lets a message carry an expiry date and a ban on forwarding, for sensitive content. Several Gmail and other accounts can be managed in one app with separate notifications, and labels and archiving keep the inbox from piling up. Gmail is part of Google Workspace, so it connects with Drive, Meet, and Calendar.",
    ],
    safetyEn: [
      "Phishing is the most common attack: mail pretending to be a bank, Google, or a marketplace, asking you to sign in through a link. Check the sender's full address — not just the display name — beware of links whose address is not exactly the official domain, urgent pressure to sign in, and unexpected attachments. Google never asks for your password by email. If in doubt, do not click the link; open the Gmail app or the official site manually and check from there.",
      "Attachments from unknown senders can also be dangerous. Protect the account itself: switch on two-step verification for your Google account, review the devices and sessions signed in, and check forwarding rules that could silently leak your mail to a foreign address. Only sign into a Google account in the official Gmail app — never in a lookalike email app.",
    ],
    goodFor: [
      "The fastest and most accurate email search in its class",
      "Very strong spam and phishing filtering",
      "One central account-recovery key for your other accounts",
      "Connected with Drive, Meet, and Google Calendar",
    ],
    watchOut: [
      "The top target for phishing and account takeovers",
      "Promotional mail still piles up if unmanaged",
      "Storage is shared with Drive and Photos",
      "A full inbox can stop new mail from arriving",
    ],
    faqs: [
      { q: "How do I tell a real Google email from phishing?", a: "Check the sender's full address, not just the display name; watch for links whose address is not exactly the official domain, urgent pressure to sign in, and unexpected attachments. Google never asks for your password by email. If in doubt, do not click the link — open the Gmail app or the official site manually and check from there." },
      { q: "What happens if my Gmail storage fills up?", a: "Gmail shares its storage quota with Google Drive and Google Photos, so a full account can stop new mail from arriving. Free up space by deleting large attachments and old mail, emptying spam and trash, or moving files out of Drive — or buy extra storage through a paid Google One plan." },
      { q: "Is Gmail free?", a: "Yes, the Gmail app is free. Google Workspace plans and extra storage are paid — the official prices are the ones shown in the app and on Google's own pages. Be wary of anyone selling a 'premium Gmail' account; there is no such official product." },
    ],
    verifiedAtEn: "2026-11-18",
  },
  {
    slug: "google-maps",
    taglineEn: "Maps and navigation with routes, live traffic, and place information — free from Google.",
    seoDescriptionEn: "Google Maps for Android: turn-by-turn navigation, live traffic, offline maps and place reviews, plus how to share your location safely.",
    introEn: [
      "Google Maps is Google's map and navigation app, showing driving, public transport, walking, and ride-hailing routes with arrival estimates based on live traffic. In Indonesia it is also a source of opening hours, reviews, and phone numbers for businesses.",
      "People use it to find addresses, avoid traffic, locate the nearest petrol station or restaurant, and share their live location with family while travelling. Small businesses rely on their Maps listing so customers can find them, so checking that a business pin is accurate is genuinely useful. This page sticks to the verified facts and links only to the official Play Store listing from Google LLC.",
    ],
    whatEn: [
      "Navigation gives turn-by-turn voice guidance for driving, motorbikes, and walking, with lane information and arrival estimates. Live traffic colours the roads by congestion, with community reports of jams and closures. Before leaving, compare the routes on offer, since the fastest route changes with traffic.",
      "Place pages carry opening hours, photos, phone numbers, and visitor reviews for millions of businesses. Download a map area to keep basic navigation working without an internet connection in weak-signal areas. Live location sharing sends your real-time position to chosen contacts for a duration you set — stop it as soon as you arrive. Public transport routes cover buses, KRL, MRT, and other transit in supported cities.",
    ],
    safetyEn: [
      "Maps depends on precise location permission, and sharing your live location means someone else can follow your movements in real time. Share only with people you truly trust, pick the shortest sensible duration, and stop sharing as soon as you reach your destination. Never share a live-location link to a public group or social media — anyone holding the link can follow you while sharing is active.",
      "Place reviews are not always honest, so read several recent ones instead of trusting the star number alone. Maps can still send you the wrong way down small alleys and new roads. Manage location history and timeline in your Google account settings, grant precise location only to navigation apps, and confirm Maps comes from Google LLC on the Play Store — lookalike map apps often carry aggressive ads.",
    ],
    goodFor: [
      "The most complete place and traffic data for Indonesia",
      "Voice navigation that lets you drive without holding the phone",
      "Offline maps that save trips in weak-signal areas",
      "Connected with Google search and place reviews",
    ],
    watchOut: [
      "Precise location permission means sensitive movement data",
      "Can still misdirect in small alleys and on new roads",
      "Some place reviews are dishonest or paid",
      "Heavy on battery when navigation and screen stay on for hours",
    ],
    faqs: [
      { q: "How do I share my location in Google Maps safely?", a: "Share only with contacts you know, choose the shortest sensible duration, and stop sharing as soon as you reach your destination. Never share a live-location link to a public group or social media, because anyone holding the link can follow your movements while sharing is active." },
      { q: "Can I use Google Maps offline?", a: "Yes, for basic navigation. Download the area you need before travelling — the downloaded map keeps working without a connection in weak-signal areas. Live traffic, search, and place details still need the internet, so download before you leave and keep the area up to date." },
      { q: "Is Google Maps free?", a: "Yes, the app is free. Some features are not available in all countries or cities, and navigation is not intended for oversized or emergency vehicles. Data charges from your mobile provider still apply when you are online." },
    ],
    verifiedAtEn: "2026-11-18",
  },
  {
    slug: "whatsapp-business",
    taglineEn: "The official WhatsApp for small businesses: product catalogues, chat labels, and quick replies.",
    seoDescriptionEn: "WhatsApp Business for Android: business profile, product catalogue, labels and quick replies — plus the registration-code scams to watch for.",
    introEn: [
      "WhatsApp Business is the official app from WhatsApp LLC for small business owners: a business profile with address and opening hours, a catalogue of products and services, labels to organise customer chats, greeting messages, and quick replies. It uses a dedicated business number, separate from your personal WhatsApp.",
      "In Indonesia, warung, online shops, clinics, and services use it so customers can see the catalogue, prices, and opening hours before asking. Keeping the business number separate from the personal one makes working hours healthier and keeps customer data out of family chats. The only download link here goes to the official Play Store listing published by WhatsApp LLC.",
    ],
    whatEn: [
      "The business profile shows your business name, address, opening hours, email, and description neatly when a customer opens it. The catalogue is a photo storefront with prices and descriptions that customers can browse without asking one question at a time. Labels such as New Customer, In Progress, and Done keep orders from slipping through the cracks.",
      "Quick replies store answers to repeated questions about delivery, stock, and how to order. Greeting and away messages welcome new customers and tell them when you will reply. A short wa.me link and an official QR code can be printed on packaging, shopfronts, and business social media.",
    ],
    safetyEn: [
      "Your catalogue and business number are visible to anyone who contacts you, so do not use a full home address if you run the business from home — use a business address or service area instead. Beware of anyone claiming to be from WhatsApp or Meta asking for your six-digit registration code: that code is as dangerous as an OTP, and no genuine support agent will ever ask for it.",
      "Never share your registration code or two-step verification PIN with anyone, switch on two-step verification with a recovery email you control, and check linked devices regularly. Download only from the Play Store with the developer WhatsApp LLC — lookalike business apps circulate outside the official store.",
    ],
    goodFor: [
      "A catalogue that cuts repeated questions from customers",
      "A business number kept separate from the personal one",
      "Labels and quick replies that save admin time",
      "Free for everyday small-business needs",
    ],
    watchOut: [
      "Needs a separate number and ideally separate phone discipline",
      "Large-scale broadcasts and automation are pushed to the paid Platform",
      "The business profile shows contact details to the public",
      "A target for registration-code scams posing as verification",
    ],
    faqs: [
      { q: "Can one phone run personal WhatsApp and WhatsApp Business together?", a: "Yes, they are separate apps and each uses a different number. On a dual-SIM phone the tidiest setup is your personal number on WhatsApp and a dedicated business number on WhatsApp Business. Do not swap numbers midway — chat history and the catalogue follow the number that is registered." },
      { q: "Is WhatsApp Business free?", a: "Yes, the app is free to download and use for small businesses, with a mix of free and paid features. Larger-scale automation runs through the paid WhatsApp Business Platform. Be wary of anyone selling a 'premium' WhatsApp Business or asking you to pay for verification — those are not official offers." },
      { q: "How do I keep my WhatsApp Business number safe?", a: "Never share your six-digit registration code or your two-step verification PIN with anyone. Switch on two-step verification with a recovery email you control, check linked devices regularly, and download the app only from the Play Store with the developer WhatsApp LLC." },
    ],
    verifiedAtEn: "2026-11-18",
  },
  {
    slug: "messenger",
    taglineEn: "Facebook's official messaging app for chats, voice calls, and video calls.",
    seoDescriptionEn: "Messenger for Android: chats, group calls and message requests explained, plus how to spot impersonator accounts and fake verification links.",
    introEn: [
      "Messenger is Meta's messaging companion to Facebook. It separates conversations from the main Facebook app, so you can chat, make voice calls, and hold video calls without opening the feed. Many Indonesian online sellers use it as their main customer-service channel.",
      "Because it is tied to your Facebook account, Messenger's security depends on the parent Facebook account's security. The only download link here goes to the official Play Store listing published by Meta Platforms, Inc.",
    ],
    whatEn: [
      "Messenger carries personal and group chats with Facebook contacts — text, photos, video, stickers, GIFs, and voice messages — plus location sharing with contacts you choose. Messages from people who are not your friends land in a separate Message Requests folder instead of mixing with your main conversations.",
      "Voice and video calls, including group calls for family, run free over the internet. Sellers can answer customer questions from their business Page directly in Messenger, and emoji reactions plus quoted replies keep group chats easy to follow.",
    ],
    safetyEn: [
      "Watch for messages from accounts impersonating a friend, an admin, or Meta itself, asking you to open a link and sign in again — Meta never asks for your password by message. Gift and account-verification links are the most common account-takeover scam on Messenger: do not open them and do not enter your password on them.",
      "Check your Message Requests and Spam folders regularly, switch on two-step verification on your Facebook account, and review the devices signed in. If you already opened a scam link and entered data, change your Facebook password from the official app straight away and check your signed-in device sessions.",
    ],
    goodFor: [
      "Fully integrated with Facebook contacts and business Pages",
      "Voice and video calls with no extra app needed",
      "A message-request folder that filters strangers",
      "Widely used by Indonesian online sellers for customer service",
    ],
    watchOut: [
      "Still needs a secure Facebook account behind it",
      "A frequent route for scam messages and fake links",
      "Notifications can overlap with the Facebook app",
      "Features and layout change fairly often",
    ],
    faqs: [
      { q: "I got a message with an account-verification link in Messenger — what do I do?", a: "Do not open it and do not enter your password on it. Meta does not send verification orders by private message. Report and block the sender. If you already opened the link and entered data, change your Facebook password from the official app straight away and check your signed-in device sessions." },
      { q: "Do I need a Facebook account to use Messenger?", a: "Yes, Messenger signs in with a Facebook account, so its security follows that account. Protect the Facebook account with two-step verification and login alerts for unrecognised devices, and keep the app itself updated from the Play Store." },
      { q: "What are Message Requests in Messenger?", a: "Messages from people who are not your friends land in a separate Message Requests folder, so they do not mix with your main chats. Check the folder occasionally, do not open links from strangers, and keep conversations with unknown senders out of your main chat list." },
    ],
    verifiedAtEn: "2026-11-18",
  },
  {
    slug: "snapchat",
    taglineEn: "Disappearing photo and video messages with creative camera lenses — and a map that needs locking down.",
    seoDescriptionEn: "Snapchat for Android: disappearing Snaps, Lenses, Stories and Snap Map explained, plus the screenshot truth and Ghost Mode privacy settings.",
    introEn: [
      "Snapchat is the camera and messaging app from Snap Inc., known for Snaps: short photos and videos that disappear after being viewed, plus creative face lenses and filters. Its users skew young, and Snap Map and Stories are its signatures.",
      "The disappearing act feels private, but it is not absolute: a recipient can always take a screenshot — Snapchat tells you when they do — or photograph the screen with another device. This page sticks to the verified facts and links only to the official Play Store listing from Snap Inc.",
    ],
    whatEn: [
      "Snapchat opens straight into the camera: take a Snap, add text or a lens, and send it to a friend or your Story. Text, voice, and video chat live in the same app, and Memories is your private archive of Snaps you chose to save — visible only to you unless you share them.",
      "Snap Map shows friends who share their location; Ghost Mode switches sharing off entirely, or you can limit it to selected friends. Stories are 24-hour collections of Snaps, visible to the audience you choose in your privacy settings.",
    ],
    safetyEn: [
      "Two things teenagers must understand: 'disappearing' content is not truly gone if it is screenshotted or photographed from another device — never send a photo or information that would hurt you if it spread; and Snap Map can reveal a home or school location if left open to all friends.",
      "Set Snap Map to Ghost Mode or friends-only, limit who can contact you and see your Story, and switch on two-step verification. Check your privacy settings after every major update, because social features such as the map and friend suggestions change over time. Download only from the Play Store, developer Snap Inc.",
    ],
    goodFor: [
      "A creative camera and lenses for casual content",
      "Screenshot notifications that give you more control",
      "Ghost Mode that turns location sharing off completely",
      "Good for light chats between close friends",
    ],
    watchOut: [
      "Disappearing content can give teenagers a false sense of safety",
      "Snap Map is risky if privacy is not set from the start",
      "Fewer Indonesian users and brands than Instagram",
      "Some advanced features are locked behind Snapchat+",
    ],
    faqs: [
      { q: "Can someone really not save a Snap I sent?", a: "Snaps delete from the app after being viewed, and Snapchat notifies you if a screenshot is taken — but a recipient can always photograph the screen with another device without leaving a trace. Treat anything you send as potentially saved, and never send a photo or information that would hurt you if it spread." },
      { q: "How do I stop Snapchat sharing my location?", a: "Open the Snap Map settings and choose Ghost Mode to switch location sharing off entirely, or limit it to selected friends. Check the setting again after app updates, because the map and friend-suggestion features change over time." },
      { q: "Is Snapchat free?", a: "Yes, Snapchat is free with ads and optional in-app purchases. Snapchat+ is the paid subscription for extra features. Be wary of anyone selling an 'unlocked' Snapchat or a premium account — those are not official offers." },
    ],
    verifiedAtEn: "2026-11-18",
  },
  {
    slug: "discord",
    taglineEn: "Community servers with always-open voice channels — for gamers, classes, and hobby groups.",
    seoDescriptionEn: "Discord for Android: servers, voice channels, screen sharing and bots explained, plus the public-server safety rules for teens.",
    introEn: [
      "Discord is the community platform from Discord Inc. that combines text chat, voice channels, video, and screen sharing inside community 'servers'. It started with gamers; today Indonesian study groups, online classes, developers, and hobby communities use it too.",
      "Each server has its own channels, member roles, and rules, and you join by invitation. Nitro is the optional subscription for better video quality and extra customisation. This page sticks to the verified facts and links only to the official Play Store listing from Discord Inc.",
    ],
    whatEn: [
      "Servers split into text and voice channels per topic, with roles and member permissions. You can join a voice channel any time without calling anyone one by one, and share your screen while playing or studying together.",
      "Bots handle moderation, music, and reminders on many servers. Direct messages and small groups exist outside servers, and the same account works on phone, PC, and console with synced history.",
    ],
    safetyEn: [
      "Public servers mean talking to strangers. Children and teenagers need guidance: limit who can send direct messages, turn off requests from people you do not know, and watch for links promising free Nitro, game mods, or cheats — those are scams and account stealers.",
      "Switch on two-step verification, check the Safe Direct Messaging and content-scanning settings, and review the servers you follow regularly. Only join invitations from communities you genuinely know. On the Play Store, confirm the developer is Discord Inc.",
    ],
    goodFor: [
      "The tidiest structure for large groups",
      "Stable voice quality for gaming and study",
      "Free for core community features",
      "Works in sync on phone and computer",
    ],
    watchOut: [
      "Public servers contain strangers — supervise younger users",
      "Notifications get noisy when you follow many servers",
      "A target for scam links and fake accounts",
      "The first view can confuse new users",
    ],
    faqs: [
      { q: "Is Discord safe for children and teenagers?", a: "Discord sets a minimum age and provides privacy settings, but public servers still put children in contact with strangers. Supervise use: limit direct messages to friends, choose servers with clear moderators, switch on content scanning, and talk about not sharing personal data or moving to private chats with strangers." },
      { q: "What is Nitro?", a: "Nitro is Discord's optional paid subscription for higher video quality and extra customisation. The core community features are free, and links offering 'free Nitro' are scams — never click them or enter your login on them." },
      { q: "Do I need an invitation to join a Discord server?", a: "Yes, you join servers through an invitation from someone or a community you know. Only trust invitations from communities you genuinely recognise — random invite links in public chats can lead to scam or impersonator servers." },
    ],
    verifiedAtEn: "2026-11-18",
  },
];

export const enGuides: EnGuideContent[] = [
  {
    slug: "apa-itu-apk-hijau",
    titleEn: "What Is 'APK Hijau'? It Is Not an Official App - Meaning and Risks",
    metaDescriptionEn: "What 'APK Hijau' means, why the viral term is not an official app, and the risks of downloading from unclear links.",
    introEn: [
      "Every so often, the term APK hijau surges in Indonesian search. Many people assume it is the name of some new viral app. It is not: APK hijau is an informal slang label, not the name of any official app, and its meaning shifts with context.",
      "This page explains what people actually mean by it, why going straight from this term to a download link is dangerous, and what to do instead. We provide no download link, because there is no single official app by that name.",
    ],
    bodyEn: [],
    sectionsEn: [
      { heading: "One Term, Many Different Meanings", paragraphs: [
        "In some content, hijau - Indonesian for green - points at the icon colour or branding of an official app, such as a green messaging app or e-wallet. In other content, an 'APK hijau collection' means premium apps shared for free - almost always pirated apps. In still other content it is a code word, including for gambling and adult content. That ambiguity is the problem: search results get filled by whoever wants to exploit your curiosity.",
        "The confusion is the point. When a term can mean anything, the results for it are a mixture of honest explainers, download sites with no clear operator, and official apps that happen to be green. Nothing in that mixture tells you which result is safe, and the download sites are built to look like the answer you wanted. A term with no official meaning cannot have an official download - so any site offering one is selling you something else.",
      ]},
      { heading: "Why Does This Term Go Viral?", paragraphs: [
        "The virality pattern is always the same: someone drops a vague term on TikTok, X, or a WhatsApp group without explaining it; curious viewers search Google; more searches spawn more content built to capture them, and the term spreads further. Within weeks, a word with no official meaning can be everywhere.",
        "Some creators use code words deliberately so their content escapes platform moderation, especially for prohibited topics like gambling or adult material. So when you meet a coded term like this, that is precisely when to be most careful, not most curious. The less a term can be explained in plain words, the more you should ask what it is hiding.",
      ]},
      { heading: "The Risks of Downloading from APK Hijau Results", paragraphs: [
        "The first risk is malware. Sites that claim to offer APK hijau usually share files with no identifiable developer, no store review, and layers of fake download buttons - an app file is the perfect vehicle for data thieves, because you install it yourself and grant it permissions.",
        "The second risk is subscription scams and aggressive advertising. Many such sites lead to pages that ask for your phone number or install ad-generating apps. The third risk is legal: if what the term actually points to is gambling, adult content, or pirated apps, downloading and using it can bring trouble entirely out of proportion to a moment of curiosity.",
      ]},
      { heading: "What to Do Instead", paragraphs: [
        "Start instead from a simple question: which actual app is being talked about? If it is an official green-branded messaging or finance app, get the real thing from Play Store under its official name - WhatsApp or Telegram for messaging, for example. If the need is anime, use a legal service like Bstation. And if the context is gambling, adult content, or free premium apps, stop there - there is no safe version.",
        "Apply our general rule for every app file: only from Play Store or a developer's official site, check the developer name and reviews, check the permissions it asks for, and keep Play Protect switched on. The step-by-step version of that rule is in our safe-installation guide, linked from the related guides on this page.",
      ], checklist: [
        "Name the actual app first. If nobody can name it, there is nothing safe to download.",
        "Get official apps from Google Play Store under their real names.",
        "For anime, use a legal streaming service such as Bstation.",
        "If the context is gambling, adult content, or pirated premium apps, stop - there is no safe version.",
        "Never install a file from a site whose operator you cannot identify.",
      ]},
    ],
    faqs: [
      { q: "What app is APK hijau, actually?", a: "It is not one app. APK hijau is a viral slang term whose meaning depends on context - an official green-branded app, collections of pirated apps, or a code word for prohibited content. Because it is not an official name, there is no correct download link for it." },
      { q: "Is APK hijau safe?", a: "The term itself is neither safe nor unsafe, because it is not an app. The danger is links using this term to hand out files with no official source. Treat every such download as unsafe until proven to come from Play Store." },
      { q: "Why do so many sites offer APK hijau downloads?", a: "Because the search volume is large. Some sites chase advertising revenue from your curiosity, some share pirated apps, and some are malware or subscription traps. The number of download offers is a reason to be more careful, not more trusting." },
      { q: "I already downloaded a file from an APK hijau site. What now?", a: "If you have not installed it, delete the file. If you already installed it, remove the app, switch off install permission from unknown sources, run a Play Protect scan, and watch for strange ads or battery drain for a few days. If you suspect data theft, back up your important data and consider resetting the device." },
      { q: "What is the difference between APK hijau and APK ijo?", a: "Practically nothing - ijo is the informal everyday spelling of hijau, the Indonesian word for green. Both refer to the same viral-term phenomenon, and neither is the name of an official app." },
    ],
    relatedAppsEn: ["bstation", "whatsapp", "telegram"],
    verifiedAtEn: "2026-11-18",
  },
  {
    slug: "apa-itu-apk-ijo",
    titleEn: "What Is 'APK Ijo'? Meaning and Risks of the Viral Term",
    metaDescriptionEn: "What 'APK Ijo' means, where the viral slang comes from, and why links using it deserve caution.",
    introEn: [
      "APK ijo is the everyday spelling of APK hijau - ijo is how Indonesians informally write hijau, the word for green - and just like its partner term, it is not the name of any official app. People usually search for it after seeing it on TikTok, X, Facebook, or WhatsApp, unexplained.",
      "This page exists for one purpose: to answer that curiosity honestly, so you do not end up clicking a dangerous download link. There is no download button here, because there is no official app called APK ijo.",
    ],
    bodyEn: [],
    sectionsEn: [
      { heading: "What APK Ijo Means Depends on Who Says It", paragraphs: [
        "Ijo is the informal way Indonesians write hijau. When someone says APK ijo, they might mean an app with a green icon, a green messaging or finance app - or, most often in viral content, a code word. Code words exist to escape platform moderation, usually for things restricted under their real names: pirated apps, gambling, adult content.",
        "Because one term holds so many meanings, the results are always a mixture: explainers like this one, download sites with no clear operator, and occasionally an official app that happens to be green. That mixture is not a safe place to hunt for a file to install on your phone.",
      ]},
      { heading: "Why You Should Stop at the Explainer", paragraphs: [
        "Consider what installing the top result would mean: you do not know its developer, you cannot read a real privacy policy, it never passed Google's review, and its file may have been repackaged by anyone. That app would then sit on the same phone as your mobile banking, e-wallets, and family WhatsApp.",
        "Compare the official route: Play Store shows a developer name, a download count, public reviews, and a permission list before you install, and Play Protect scans the app. Curiosity is natural; installing an unclear file is not a safe answer to it.",
      ]},
      { heading: "If What You Really Want Is a Specific App", paragraphs: [
        "Often, behind an APK ijo search there is a simple need: a messaging app, an entertainment app, or whatever friends are discussing. Search its official name on Play Store - WhatsApp for messaging, Bstation for legal anime, TikTok for short video. If the discussion turns out to be gambling, adult content, or pirated premium apps, consider your search finished.",
        "There is no safe version of those three, and this site will not help you find one - not because the answer is unknown, but because the risk to your device, your data, and yourself is real.",
      ]},
      { heading: "Why Colours Make Perfect Code Words", paragraphs: [
        "Colour words make perfect codes: memorable, invisible to keyword filters, and understood only by people following the conversation. One colour word can stand in for an app name, a type of content, or even a link, without a single forbidden word being written. The same pattern appears in many languages and countries - whenever a topic is restricted by a platform, its community tends to invent an indirect name for it.",
        "The practical consequence for you as a searcher: the search engine does not know exactly what you mean, so the results are a lottery between an honest explainer like this page, an official app that happens to relate to the colour, and a trap. If a term can only be explained properly by an article - not by an app page - that is a sign that what you are looking for is not an official product worth installing.",
      ]},
    ],
    faqs: [
      { q: "Are APK ijo and APK hijau the same thing?", a: "Yes - ijo is simply the informal spelling of hijau, Indonesian for green. Both are the same slang term, and neither is the name of an official app." },
      { q: "Why don't people just say the app's name?", a: "Usually because the real name would trigger platform moderation - gambling, adult, and pirated content is restricted on TikTok and other platforms, so creators use colour code words instead. That is exactly why a coded term deserves suspicion, not following." },
      { q: "Is there any official APK ijo download link?", a: "No, because there is no such app. Any link claiming to be the official APK ijo download is selling something unaccountable - a random file, a pirated app, or an advertising and subscription trap." },
      { q: "How do I know if the green app I mean is official?", a: "Search for its real name on Play Store: an official app has a page with a clear developer name, an update history, and public reviews. If the only way to get it is a file from a file-sharing site, that is not the official route." },
    ],
    relatedAppsEn: ["bstation", "whatsapp"],
    verifiedAtEn: "2026-11-18",
  },
  {
    slug: "cara-instal-apk-aman",
    titleEn: "How to Install Apps Safely on Android",
    metaDescriptionEn: "How to install Android apps safely: trusted sources, developer checks, Play Protect, and the rules for sideloading APK files.",
    introEn: [
      "Almost every case of an Android phone in Indonesia being hit by malware begins with a single moment: installing an app from the wrong place. The good news is that avoiding it needs no technical skill - just the right habits, applied every time you install something new.",
      "This guide covers safe installation from start to finish: sources you can trust, what to check before you press Install, the security settings that must stay on, and the special rules for the rare times you genuinely have to install an APK file from outside Play Store.",
    ],
    bodyEn: [],
    sectionsEn: [
      { heading: "Install Safely in Six Steps", steps: [
        { title: "Always start from Google Play Store", desc: "Play Store is the only store that reviews what it lists, displays verified developers, and scans with Google Play Protect. Banking apps, e-wallets, and messaging apps may only ever come from here - no exceptions." },
        { title: "Check the developer's name, not just the app's name", desc: "Fake apps copy famous names and icons. Make sure the publisher is the real company (for example WhatsApp LLC for WhatsApp, Google LLC for Google's apps), and be suspicious of publishers with almost-right names." },
        { title: "Read the numbers and reviews critically", desc: "Look at the download count and the pattern of recent reviews. A genuinely popular official app has millions of downloads and mixed reviews. A new app with few downloads claiming to be the official version of something famous is a red flag." },
        { title: "Check the permission list before and after installing", desc: "The Play Store page has a permissions section. After installing, open Settings, then Apps, then Permissions, and switch off anything illogical for what the app does - a flashlight does not need your contacts." },
        { title: "Make sure Play Protect is switched on", desc: "Open Play Store, tap your profile picture, then Play Protect, and make sure scanning is on. Play Protect checks apps from Play Store and from outside it, regularly, and warns you about harmful ones." },
        { title: "Take updates only from the same source", desc: "Play Store app updates come from Play Store. If a site or a message tells you to 'update' via a downloaded file, that is not an update - it is an attempt to swap your app for a different one." },
      ]},
      { heading: "Special Rules for APK Files from Outside Play Store (Sideloading)", paragraphs: [
        "There are legitimate reasons to install an APK from outside Play Store - an open-source app from its project's official repository, a company internal app, a direct file from a developer you know - but they are narrow, and sideloading is almost never necessary for ordinary users. For banking and e-wallets it is never acceptable.",
        "If you truly must: download only from the project's official site, never from a file-collecting site; match the developer name and signature if the project publishes them; let Play Protect scan the file when you install it; and afterwards switch the unknown-sources permission back off for the browser or file manager you used.",
      ]},
      { heading: "Habits After Installing", paragraphs: [
        "Watch how the phone behaves for a few days after installing a new app. Ads appearing outside any app, a battery that suddenly drains, a phone heating up while unused, or mobile data vanishing are common signs of a problem app - remove the most recently installed app and run a Play Protect scan if they appear.",
        "Every few months, review the installed list and delete what you no longer use. The fewer apps you have, the smaller the attack surface - and the freer your phone's storage.",
      ]},
    ],
    faqs: [
      { q: "Is installing an APK from outside Play Store always dangerous?", a: "Not always, but always higher risk. The legitimate cases are narrow: an official open-source project, a company app, or a known developer outside Play Store. For popular apps, banking, and e-wallets, the answer is always Play Store only." },
      { q: "What is Google Play Protect, and is it enough?", a: "Play Protect is Android's built-in security scanner; it checks apps at install and periodically afterwards, including apps from outside Play Store. It helps a great deal, but is no guarantee against files crafted to evade detection - your download source is the main defence." },
      { q: "Why does my phone ask about installing from unknown sources?", a: "That is Android's security warning that you are installing an app from outside the official store. Android asks per source app (for example per browser). Grant it only when you fully understand what the file is and which official site it came from - and revoke it again afterwards." },
      { q: "Are apps on Play Store always safe?", a: "Far safer, not perfect. Google reviews and scans, but a bad app occasionally slips through and is later removed. So keep checking the developer, permissions, and reviews - and delete any app that is reported as harmful right away." },
      { q: "A friend sent me an APK file over WhatsApp. Can I install it?", a: "Treat it like any random download: do not install unless you know exactly what it is, who made it, and why it is not simply fetched from Play Store. Chat-forwarded files are a common OTP-scam route in Indonesia." },
    ],
    relatedAppsEn: ["whatsapp", "minecraft"],
    verifiedAtEn: "2026-11-18",
  },
  {
    slug: "cara-cek-izin-aplikasi",
    titleEn: "How to Check App Permissions on Android, in Plain Language",
    metaDescriptionEn: "How to open an Android app permission list and what camera, microphone, location and other permissions mean in plain language.",
    introEn: [
      "App permissions are keys you hand to every app: keys to your camera, your contacts, your location, your files, and your microphone. Some are genuinely needed for an app to work; others are demanded by ill-behaved apps to collect data that has nothing to do with their function.",
      "This guide shows how to view and change permissions on an Android phone, explains the important ones in everyday language, and gives a practical rule for deciding which grants are reasonable and which should be revoked.",
    ],
    bodyEn: [],
    sectionsEn: [
      { heading: "How to Check Permissions in Five Steps", steps: [
        { title: "Open the permission list for one app", desc: "Go to Settings, then Apps, choose the app, then Permissions. You will see which permissions are allowed and which are denied, and you can change each one at any time without deleting the app." },
        { title: "Or review by permission type", desc: "In Settings, under Security and privacy, then Privacy, then Permission manager (names vary slightly by brand), pick a type such as Location or Contacts to see every app holding it at once." },
        { title: "Apply the function-fit test", desc: "For each permission, ask: does this app's main job plausibly need it? A video editor needing files and camera is reasonable; a calculator needing contacts and location is not - revoke it." },
        { title: "Use one-time grants and approximate location", desc: "Modern Android offers 'allow only this time' and approximate location instead of an exact point. For most apps, these two options give enough function at far less risk." },
        { title: "Revoke what looks wrong, then test the app", desc: "Revoke a suspicious permission and then use the app. If it still works normally, the permission was not needed. If a feature needs it, you can always grant it again when you use that feature." },
      ]},
      { heading: "What the Important Permissions Mean", paragraphs: [
        "Camera and Microphone mean the app can capture images and sound while allowed - necessary for video calls and recorders, dangerous in unclear hands. Contacts means reading the names and numbers on your phone - needed by messaging apps, never by games or flashlights. Location ranges from a rough area to an exact point. Storage should mean only the files you pick; modern apps should only access files you choose.",
        "Some permissions should make you stop and think: Accessibility, which can read the screen and control the phone and is frequently abused by banking scams; Display over other apps, the basis of fake windows and ads; Install unknown apps; and Device administrator. Outside a very clear need - a trusted security app or an official accessibility tool - do not grant these.",
      ]},
      { heading: "Permissions and Popular Apps", paragraphs: [
        "On every app page on this site, we explain that app's permissions one by one in plain language and why they are requested - for example why WhatsApp needs contacts and microphone, or why a video editor like CapCut needs file access. Use that page before installing, then compare it with what you see on your phone.",
        "Remember that the permission list can grow through updates. Reviewing permissions every few months - especially for apps you rarely use - is the cheapest security habit there is.",
      ]},
      { heading: "Review Your Permissions Regularly", paragraphs: [
        "Permissions are not a once-in-a-lifetime decision. Apps gain new permissions through updates, and you sometimes grant one in a hurry to finish a task and then forget it. Spend ten minutes every few months in the Permission Manager reviewing the five most important categories: Location, Contacts, Microphone, Camera, and Storage.",
        "Many phone brands also provide a privacy dashboard showing which apps recently used sensitive permissions - an unfamiliar name there is your cue to revoke and consider uninstalling.",
      ]},
    ],
    faqs: [
      { q: "Will revoking a permission break the app?", a: "It will not break anything. At most, the dependent feature pauses until you allow it again - a messaging app cannot attach photos while file access is revoked. You can always restore it from the same menu." },
      { q: "Which permissions are the most dangerous?", a: "Accessibility, device administrator, display over other apps, and install unknown apps are the most abused, including by scams that read OTP codes and drain bank accounts. Grant them only to apps you know and fully trust, with a clear reason." },
      { q: "Why does an app ask for permissions it does not seem to use?", a: "Some are for side features, analytics, or advertising; some developers simply ask for more than they need. Modern Android limits this with one-time grants and picked-file access. Refuse what you do not understand - a good app keeps working." },
      { q: "How do I know an app's permissions before installing it?", a: "The app's Google Play Store page has a data safety and permissions section. This site also summarises popular apps' permissions and their meaning on every app page, in simple language." },
      { q: "My phone brand's menu does not look the same", a: "Menu names differ slightly between brands (Samsung, Xiaomi, Oppo, Vivo, and others), but the structure is the same: Settings, then Apps, then the app, then Permissions, and the privacy settings for the permission manager. Use the search box at the top of Settings and type 'permissions' if you cannot find it." },
    ],
    relatedAppsEn: ["whatsapp", "tiktok", "capcut"],
    verifiedAtEn: "2026-11-18",
  },
  {
    slug: "cara-mengenali-apk-palsu",
    titleEn: "How to Spot Fake APKs and Scam Apps on Android",
    metaDescriptionEn: "How to spot fake APKs and scam apps: bank and WhatsApp impersonation, fake premium promises, and what to do if you installed one.",
    introEn: [
      "Fake apps are built to resemble the ones you trust - banking, e-wallets, WhatsApp, even wedding invitations - with one goal: to get you to install and open them. In Indonesia, this pattern steals OTP codes, takes over accounts, and drains bank balances.",
      "This guide summarises the signs to check in under a minute before installing anything, and the steps to take if you or your family already installed one.",
    ],
    bodyEn: [],
    sectionsEn: [
      { heading: "Sign 1: It Arrives by Chat, Not from an Official Store", paragraphs: [
        "Banks, e-wallets, couriers, and agencies never send apps over WhatsApp or SMS. Files calling themselves wedding invitations, traffic tickets, or parcel receipts - ending in .APK, delivered through chat - are a well-documented Indonesian scam pattern; genuine invitations arrive as links or PDFs from official channels, not as app files you must install.",
        "The family rule is absolute and easy to remember: no app is ever installed from a chat. If in doubt, open the official app you already have installed, or call customer service using the number on the institution's official website - never the number in the suspicious message.",
      ]},
      { heading: "Sign 2: The Name and Developer Are Almost Right - But Not Right", paragraphs: [
        "Outside Play Store, and occasionally in search results, fake apps copy names with small changes: a swapped letter, an added Mod, Pro, Gold, or 2026, a slightly different icon, and a developer name that resembles the real company. Always compare with the official listing: a banking app's developer is the bank itself, WhatsApp is published by WhatsApp LLC / Meta, and genuine download counts run into the millions or billions.",
        "The promise is the next giveaway: free Premium forever, instant followers, viewing private profiles, money for no work, guaranteed gambling wins. In the world of apps, a promise that breaks the platform's rules is almost always paid for with your data or your money.",
      ]},
      { heading: "Sign 3: It Asks for Dangerous Permissions Right Away", paragraphs: [
        "Fake apps typically ask straight away for Accessibility, SMS reading, display over other apps, or device administrator - dressed up as 'verification' or security. For an invitation viewer or a document viewer, such requests make no sense; Accessibility plus SMS access is precisely the combination banking scams use to read OTP codes and control your phone remotely.",
        "Behaviour after installing also speaks: a hot phone and draining battery for no reason, ads appearing on the home screen outside any app, a banking app closing by itself, or a fake-looking bank login appearing over other apps. All of these are reasons to stop using the phone for transactions until the device is clean.",
      ]},
      { heading: "If You Already Installed One: Emergency Steps", paragraphs: [
        "Act immediately. Switch on airplane mode to cut the connection, do not open any banking or e-wallet app, and delete the suspicious app. From another safe device, contact your bank and e-wallet providers to block access, change your important passwords - your main email first, because email is the recovery key for all your accounts - and switch on two-step verification everywhere.",
        "Run a Play Protect scan after removal. If symptoms continue, or if you handed over an OTP code and see unfamiliar transactions, report it to the bank and the police with screenshots as evidence, and consider a factory reset after safely backing up your photos and important data. Speed in the first hour decides how much loss can be prevented.",
      ], checklist: [
        "Switch on airplane mode to cut the connection.",
        "Do not open any banking or e-wallet app.",
        "Delete the suspicious app.",
        "From a safe device, contact your bank and e-wallet providers to block access.",
        "Change important passwords - main email first - and switch on two-step verification.",
        "Run a Play Protect scan after removal.",
        "If you shared an OTP code, report it to the bank and police with screenshots.",
        "Consider a factory reset after backing up, if symptoms continue.",
      ]},
    ],
    faqs: [
      { q: "I received a wedding-invitation APK from a number I know. Does that make it safe?", a: "No. The sender's number may itself have been hijacked - that is exactly how this pattern spreads, from one victim to all their contacts. Confirm by voice call - and still never install it." },
      { q: "How can a fake app drain a bank account?", a: "Usually by reading OTP codes via SMS or Accessibility permission, then signing into the victim's banking - or by showing a fake bank login to harvest the password. Banks never ask for an OTP code: anyone who asks is a scammer." },
      { q: "Can fake apps get into Play Store?", a: "Rarely, but it has happened, and Google removes them once detected. So keep checking developer, reviews, and permissions even on Play Store." },
      { q: "A seller offers cheap premium APKs on social media. Is that fake?", a: "Almost always a problem: pirated mod files, stolen accounts, or an advance-payment scam. Besides breaking the terms of service, you have no protection at all when the account or the file stops working. Use the official route or the official free version." },
      { q: "How do I teach my family not to fall for fake APKs?", a: "Teach two rules that are easy to remember: never install an app from a chat under any circumstances, and never give an OTP code to anyone. Offer yourself as the person to ask before they install anything new - one question can prevent a large loss." },
    ],
    relatedAppsEn: ["whatsapp", "minecraft", "kucing-apk"],
    verifiedAtEn: "2026-11-18",
  },
  {
    slug: "apakah-apkpure-aman",
    titleEn: "Is APKPure Safe? Security Risks, APK Checks & Safety Tips",
    introEn: [
      "Is APKPure safe to download Android apps? Learn about its security history, APK verification, potential risks, and practical ways to protect your device.",
      "The short answer: APKPure is safer than a random APK download site, because it checks that each file carries the original developer's signature - but it is not as safe as Google Play Store, and no honest guide can call it fully safe. Its own app was once infected with malware in 2021, and the store's checks cannot catch an app that is malicious from its own developer. This guide explains what APKPure is, what really happened in 2021, what its checks can and cannot do, and how to protect your phone if you use it.",
      "This is an explainer, not a store: there is no download button here. Everything below comes from independent security research (Kaspersky, 2021), Google's own guidance, and APKPure's own statements - the sources are listed at the end, and the two kinds of evidence are kept apart.",
    ],
    bodyEn: [],
    sectionsEn: [
      { heading: "What Is APKPure?", paragraphs: [
        "APKPure is one of the best-known third-party Android app stores. It has run since 2014, and it works in two ways: through its website, apkpure.com, and through the APKPure app, which you install separately. From either one you can download an app's installation file - an APK, or an XAPK for large apps made of several files - and install it directly on your phone, without Google Play and without a Google account.",
        "Installing from outside the official store is called sideloading. Android allows it by design, but it asks for a special permission first - 'install unknown apps' - and Google Play Protect will show a warning. That warning is Android's standard policy for every install from outside Play Store, not a verdict that the file is a virus.",
      ]},
      { heading: "How APKPure Works", paragraphs: [
        "You search or browse for an app, pick a version, and download the APK or XAPK file. Android then asks you to allow installation from that source; once allowed, the app installs like any other. APKPure also offers older versions of apps, which Play Store generally does not, and apps that are not released in your country.",
        "Before a file is listed, APKPure says it checks the file's digital signature against the original developer's signature, and that it scans files before publishing. Updates work the same way as the first install: you download the newer file from APKPure and install it. There is no Google account, no Play review, and no Play Protect check built into the store itself - the protection on your phone is whatever Android and Play Protect provide.",
      ]},
      { heading: "Is APKPure an Official Google Play Store?", paragraphs: [
        "No. APKPure is an independent store and is not affiliated with Google. Google Play Store is the official store on most Android phones - the one that comes with Google Mobile Services. APKPure is a separate company running its own catalogue, its own listing rules, and its own checks.",
        "That distinction matters because the two stores offer different guarantees. Play Store reviews apps before publishing, verifies developer identities, and runs Play Protect malware scanning. APKPure relies mainly on signature verification and its own internal checks, without the same depth or transparency. Using APKPure is not using Google Play - it is using an alternative, with the trade-offs that come with it.",
      ]},
      { heading: "The APKPure Security Incident of 2021", paragraphs: [
        "In April 2021, Kaspersky's researchers found malicious code inside the official APKPure app itself - version 3.17.18. The infection was most likely introduced through an advertising software kit (SDK) from an unverified source, a pattern Kaspersky compared to the earlier CamScanner incident, in which a developer's ad SDK turned out to be malicious.",
        "When the infected app started, it decrypted and ran a hidden payload. The payload collected information about the device and sent it to a command-and-control server, and depending on the server's response it could show ads when the phone was unlocked, open browser pages with ads again and again, and download further executable modules - including a Trojan closely related to the notorious Triada malware, which Kaspersky detects as HEUR:Trojan-Dropper.AndroidOS.Triada.ap. That Trojan could display and click ads, sign users up for paid subscriptions, and download other malware.",
        "How bad it got depended on the phone. On a reasonably recent Android version (Android 8 or newer), the main risks were paid subscriptions appearing out of nowhere and intrusive ads. On older phones running Android 6 or 7 without security updates, the malware could do far worse - including installing apps onto the system partition, where they survive even a factory reset, like the xHelper Trojan. The incident is a fact of history, and it is the single most important reason to treat any third-party store with caution - including this one.",
      ]},
      { heading: "What Happened, Which Version Was Affected, and How It Was Fixed", paragraphs: [
        "The affected version was APKPure 3.17.18. Kaspersky notified APKPure's developers on 8 April 2021. APKPure confirmed the problem the next day, and shortly afterwards released version 3.17.19. Its release notes said the update 'Fixed a potential security problem, making APKPure safer to use.' Kaspersky checked the new version and confirmed it: 'APKPure 3.17.19 doesn't contain the malicious component. It is safe to use.'",
        "That confirmation covers version 3.17.19, in April 2021. It does not prove anything about other versions, and it does not mean the store is safe forever - it means the specific infection was found, disclosed, and removed quickly. If you ever used the APKPure app around that time, the advice then was to delete the infected version, install 3.17.19 or newer, and run a full scan of the device. The lesson that survives the incident is simpler: no platform is immune, not even the platform itself - so the safety of any store has to be checked continuously, not assumed once.",
      ]},
      { heading: "Does APKPure Verify APK Signatures?", paragraphs: [
        "Yes - according to APKPure itself. Every Android developer signs their app with a unique cryptographic key, a kind of digital fingerprint. APKPure states that it checks that the signature on each file it lists matches the original developer's signature before the file is published, and its own pages say every app goes through digital signature verification and that verified apps carry a Safety Badge.",
        "That check is real protection, and it is better than what most APK download sites offer - most check nothing at all. But its limit is widely misunderstood: a signature check only proves the file was not altered by someone else after the developer signed it. It answers the question 'was this file tampered with?', not the question 'is this app harmless?'. An app that is malicious from its own developer will pass signature verification, because its signature is genuinely the developer's.",
        "The second question is answered by malware scanning and developer review - exactly what Google Play Protect and Play Store's review process do, and what APKPure does not do to the same standard. The good news is that Play Protect on your phone still scans apps installed from outside Play Store, so an APKPure user is not left entirely unprotected. The bad news is that a signature match is not a safety verdict - treat it as one check among several, never as a guarantee.",
      ]},
      { heading: "The Risks of Downloading APKs From Third-Party Sources", paragraphs: [
        "The first risk is malware in the file itself: spyware, adware, or banking Trojans hidden inside an app that looks ordinary. The second is repackaging: someone takes a genuine app, adds malicious code, and re-uploads it under the same name. Signature verification is designed to catch exactly this - but only if the store actually performs it, and only for files that pass through its listing process.",
        "The third risk is outdated versions. Old app versions can contain security holes that were fixed long ago, and an old version downloaded today may never be updated. The fourth is permission abuse: an app that asks for contacts, SMS, location, or accessibility access it does not need for its job, and then uses that access to read one-time codes or harvest data.",
        "Then there are the risks that have nothing to do with code. Downloading a paid app for free is software piracy, whatever the platform - and the 'free paid app' offers that cluster around third-party stores are also where malware and lookalike domains concentrate. A file from a lookalike site, a comment link, or a chat message has none of the checks a real store applies, and there is no company to complain to if it damages your phone or empties an account.",
      ]},
      { heading: "How to Check an APK Before You Install It", paragraphs: [
        "No single check can guarantee an APK is safe. Use all of them together, and treat a failure of any one as a reason to stop. A clean antivirus scan does not guarantee an APK is completely safe - a scan only recognises threats it already knows, and new malware can pass undetected. Likewise, a matching developer signature proves the file is authentic, not that the app is harmless.",
        "The limits matter as much as the checks. A signature match cannot catch malware written by the developer. A scan cannot catch malware nobody has seen yet. Permissions only tell you what an app asks for, not what it does with it. That is why the checklist works as a whole: each check closes a different gap, and none of them closes them all.",
      ], checklist: [
        "Prefer Google Play or the developer's official website. If the app is there, there is no reason to get it anywhere else.",
        "Confirm the app name and the developer identity. The developer of a banking app is the bank itself; a name that is almost right is a warning sign.",
        "Check the package name carefully. A genuine app keeps its official package name - a small change means a different app.",
        "Check whether the APK signature matches a trusted official version, where possible. A mismatch means the file was altered or comes from someone else.",
        "Review the requested permissions and question unrelated sensitive ones. A flashlight does not need your contacts; a wallpaper app does not need your SMS.",
        "Scan the APK with Google Play Protect. Play Protect can check apps installed from outside Play Store - keep it switched on and run a scan after installing.",
        "Do not ignore Android security warnings. A warning is not a verdict, but it is a reason to pause and check, not to tap through.",
        "Avoid modified, cracked, or suspiciously repackaged APKs. 'Mod', 'cracked', and 'free Premium' files are where malware and piracy meet.",
        "Keep Android and your installed apps updated. Security updates close the holes that older versions leave open.",
      ]},
      { heading: "How to Use Google Play Protect", paragraphs: [
        "Google Play Protect is Android's built-in safety check. It is on by default, and Google recommends keeping it on. It checks apps from Play Store before you download them, and it also checks your device for harmful apps from other sources - including apps installed from APKPure. If it finds something harmful, it can warn you, disable the app, or remove it. It can also block an unverified app that asks for sensitive permissions commonly used in financial scams.",
        "Play Protect can also check apps installed from sources outside Google Play - that is the point for an APKPure user. A scan result saying an app 'looks safe' is a good sign, not a guarantee; a warning is a reason to delete the app, not to argue with the warning.",
      ], steps: [
        { title: "Open Google Play Store", desc: "Open the Play Store app on your Android phone." },
        { title: "Tap the profile icon", desc: "Tap your profile picture or initial at the top right of the screen." },
        { title: "Select Play Protect", desc: "Tap Play Protect in the menu to open the safety overview." },
        { title: "Run a scan", desc: "Tap Scan to check the apps on your device right now. Play Protect also scans automatically in the background." },
        { title: "Keep app scanning enabled", desc: "In Play Protect settings, keep 'Scan apps with Play Protect' switched on, so new installs - including sideloaded ones - are checked. Play Protect may also offer to send an unknown app to Google for a deeper check before you install it." },
      ]},
      { heading: "Warning Signs That an APK May Be Dangerous", paragraphs: [
        "A permission that has nothing to do with the app's job is the clearest warning: a calculator asking for contacts, a video player asking for SMS. A missing or unidentifiable developer is the second - a real app has a real company behind it, with a website and a history. A third is the source: a file offered in a chat message, a comment, or an ad, or on a domain that only resembles the real store's name.",
        "Watch the promises too. 'Free Premium forever', 'unlimited followers', or a paid app offered for free are not bargains - they are the bait that malware and piracy use. After installing, watch the phone itself: ads appearing on the home screen outside any app, a battery that suddenly drains, a phone that runs hot, or new permission requests that make no sense. Any one of these is a reason to uninstall the app and run a Play Protect scan.",
      ]},
      { heading: "APKPure vs Google Play Store", paragraphs: [
        "Play Store wins on safety and accountability; APKPure wins on freedom of choice - old versions, apps outside your region, and no Google account. That freedom comes with a responsibility to check things yourself, because the store will not do it for you.",
      ], table: { headers: ["", "APKPure", "Google Play Store"], rows: [
        ["Official store", "No - independent third-party store", "Yes - Google's official store"],
        ["App review before publishing", "Internal checks; signature verification (the company's own claim)", "Full review process, including developer identity checks"],
        ["Malware scanning", "Signature-focused; no Play Protect-level scanning in the store", "Play Protect scans apps before download and on the device"],
        ["Old app versions", "Available - a main reason people use it", "Generally only the latest version"],
        ["Region-locked apps", "Available across regions", "Only apps released in your country"],
        ["Google account needed", "No", "Yes"],
        ["App updates", "By re-downloading from APKPure", "Automatic through the official channel"],
        ["Developer accountability", "Limited public history and reviews", "Public developer page, reviews, download counts"],
      ]}},
      { heading: "Safer Alternatives to APKPure", paragraphs: [
        "The safest alternative is the one you already have: Google Play Store. It reviews apps, verifies developers, and runs Play Protect - and for the apps most people actually need, it is the whole answer. If an app is not on Play Store, the next safest source is the developer's own official website; many developers publish their APK there, signed with the same key as the Play version.",
        "For open-source apps, F-Droid is a reputable catalogue that only lists free and open-source software, with reproducible builds for many apps - but it only covers open-source apps, not the commercial apps most people search for. Samsung's Galaxy Store is another official store, for Samsung phones. APKMirror is a widely used mirror that verifies signatures against Play Store versions, but it is still sideloading: the same checklist and the same Play Protect scan apply. Whatever the alternative, the rule does not change - the safest download is the one from the official store or the developer, and every step away from that needs more checking, not less.",
      ]},
      { heading: "Final Safety Recommendation", paragraphs: [
        "So, is APKPure safe? No honest guide can call it completely safe - and this one will not. It is safer than a random APK site because it checks developer signatures, and its 2021 infection was found, disclosed, and fixed within days. But signature checks cannot catch an app that is malicious from its own developer, the store does not scan like Play Protect does, and its own app was once the infection vector. That history does not prove APKPure is infected today - it proves no platform is immune.",
        "Use Google Play Store first, and the developer's official site second. If you still use APKPure, use only the official site, apkpure.com - never a lookalike domain or a link from a chat - keep Play Protect switched on, check the permissions before you install, and stay away from modified, cracked, or 'free paid app' files. An APK safety check is a habit, not a single scan: the store you choose matters, but what you check before tapping Install matters more.",
      ]},
    ],
    faqs: [
      { q: "Is APKPure safe?", a: "Relatively safe compared with random APK sites, but not as safe as Google Play Store. APKPure checks developer signatures to make sure a file was not altered, but that check cannot detect an app that is malicious from its own developer, and it is not the same as Play Protect malware scanning. Use it carefully, and keep Play Protect switched on." },
      { q: "Is APKPure safe now, after the 2021 incident?", a: "The 2021 infection was in version 3.17.18 of the APKPure app. Kaspersky reported it on 8 April 2021, APKPure released the fix as version 3.17.19, and Kaspersky confirmed the new version was clean. The incident is history - it does not prove APKPure is infected today - but it also does not make the store safe forever. Treat every download with the same checks." },
      { q: "Is APKPure legal?", a: "Installing apps from outside Play Store - sideloading - is not a crime. Downloading a free app that is genuinely free is generally legal. Downloading a paid app for free is software piracy, whatever the platform. APKPure's policy is to refuse pirated apps, but with the volume it handles, some can slip through - so avoid any 'paid app for free' offer." },
      { q: "What is the difference between APKPure and Google Play Store?", a: "Play Store reviews apps, verifies developer identities, and scans for malware with Play Protect, but generally only offers the latest version of apps released in your country. APKPure offers old versions and apps across regions through signature verification, but without Play Store's review depth or malware scanning." },
      { q: "Why does Play Protect warn me when I install from APKPure?", a: "Because that is Android's standard policy for every app installed from outside Play Store - not a verdict that the file is malware. The warning reminds you the install skipped the official route: read it, check the app's permissions, and continue only if you trust the source." },
      { q: "Does APKPure offer paid apps for free?", a: "According to its policy, no - APKPure says it refuses pirated apps. If you find a paid app offered for free under APKPure's name, treat it as piracy or a lookalike site, and do not download it." },
      { q: "I already installed an app from APKPure - what should I check?", a: "Check its permissions in Settings, run a Play Protect scan, and watch for strange behaviour such as aggressive ads, a draining battery, or odd new permission requests. If anything looks wrong, uninstall the app. Our Permission Checker can help you read an app's permissions from a screenshot if you are unsure." },
    ],
    relatedAppsEn: ["tiktok", "whatsapp", "telegram"],
    sourcesEn: [
      { label: "Kaspersky Securelist - Malicious code in APKPure app (9 April 2021)", url: "https://securelist.com/apkpure-android-app-store-infected/101845/" },
      { label: "Kaspersky Daily - APKPure is not safe, distributes Trojans (9 April 2021)", url: "https://www.kaspersky.com/blog/infected-apkpure/39273/" },
      { label: "Google Play Protect help - Use Google Play Protect to help keep your apps safe", url: "https://support.google.com/android/answer/2812853" },
      { label: "Android Help - Download apps to your Android device", url: "https://support.google.com/android/answer/9457058" },
      { label: "APKPure - About (apkpure.net)", url: "https://apkpure.net/about.html" },
    ],
    verifiedAtEn: "2026-11-07",
  },
];
