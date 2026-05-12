const navLinks = [
  {
    id: 1,
    name: 'Projects',
    type: 'finder',
  },
  {
    id: 3,
    name: 'Contact',
    type: 'contact',
  },
  {
    id: 4,
    name: 'Resume',
    type: 'resume',
  },
]

const navIcons = [
  {
    id: 1,
    img: '/icons/wifi.svg',
  },
  {
    id: 2,
    img: '/icons/search.svg',
  },
  {
    id: 3,
    img: '/icons/user.svg',
  },
  {
    id: 4,
    img: '/icons/mode.svg',
  },
]

const dockApps = [
  {
    id: 'finder',
    name: 'Portfolio', // was "Finder"
    icon: 'finder.png',
    canOpen: true,
  },
  {
    id: 'safari',
    name: 'Articles', // was "Safari"
    icon: 'safari.png',
    canOpen: true,
  },
  {
    id: 'photos',
    name: 'Gallery', // was "Photos"
    icon: 'photos.png',
    canOpen: true,
  },
  {
    id: 'contact',
    name: 'Contact', // or "Get in touch"
    icon: 'contact.png',
    canOpen: true,
  },
  {
    id: 'terminal',
    name: 'Skills', // was "Terminal"
    icon: 'terminal.png',
    canOpen: true,
  },
  {
    id: 'trash',
    name: 'Archive', // was "Trash"
    icon: 'trash.png',
    canOpen: false,
  },
]

const blogPosts = [
  {
    id: 1,
    date: 'Sep 2, 2025',
    title:
      'TypeScript Explained: What It Is, Why It Matters, and How to Master It',
    image: '/images/blog1.png',
    link: 'blog-1-link',
  },
  {
    id: 2,
    date: 'Aug 28, 2025',
    title: 'The Ultimate Guide to Mastering Three.js for 3D Development',
    image: '/images/blog2.png',
    link: 'blog-2-link',
  },
  {
    id: 3,
    date: 'Aug 15, 2025',
    title: 'The Ultimate Guide to Mastering GSAP Animations',
    image: '/images/blog3.png',
    link: 'blog-3-link',
  },
]

const techStack = [
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'TypeScript'],
  },
  {
    category: 'Mobile',
    items: ['React Native', 'Expo'],
  },
  {
    category: 'Styling',
    items: ['Tailwind CSS', 'CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express'],
  },
  {
    category: 'Database',
    items: ['MongoDB', 'PostgreSQL'],
  },
  {
    category: 'Dev Tools',
    items: ['Git', 'GitHub', 'Docker'],
  },
]

const socials = [
  {
    id: 1,
    text: 'Github',
    icon: '/icons/github.svg',
    bg: '#f4656b',
    link: 'https://github.com/seanhoenderdos',
  },
  {
    id: 2,
    text: 'LinkedIn',
    icon: '/icons/linkedin.svg',
    bg: '#05b6f6',
    link: 'https://www.linkedin.com/in/sean-hoenderdos-ux-engineer/',
  },
]

const photosLinks = [
  {
    id: 1,
    icon: '/icons/gicon1.svg',
    title: 'Library',
  },
  {
    id: 2,
    icon: '/icons/gicon2.svg',
    title: 'Memories',
  },
  {
    id: 3,
    icon: '/icons/file.svg',
    title: 'Places',
  },
  {
    id: 4,
    icon: '/icons/gicon4.svg',
    title: 'People',
  },
  {
    id: 5,
    icon: '/icons/gicon5.svg',
    title: 'Favorites',
  },
]

const gallery = [
  {
    id: 1,
    img: '/images/gal1.png',
  },
  {
    id: 2,
    img: '/images/gal2.png',
  },
  {
    id: 3,
    img: '/images/gal3.png',
  },
  {
    id: 4,
    img: '/images/gal4.png',
  },
]

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
}

const WORK_LOCATION = {
  id: 1,
  type: 'work',
  name: 'Work',
  icon: '/icons/work.svg',
  kind: 'folder',
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: 'Pharmaceutical Website',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-10 left-5', // icon position inside Finder
      windowPosition: 'top-[5vh] left-5', // optional: Finder window position
      children: [
        {
          id: 1,
          name: 'Shearon Pharmaceutical Website.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 left-10',
          description: [
            {
              title: 'Intro',
              paragraphs: [
                'The Shearon Pharmaceutical website is a sleek, modern website designed for doctors, pharmacists, and healthcare professionals to request stock and find medical information.',
                'Instead of feeling like a simple wholesale website, it delivers an immersive experience with bold visuals, smooth animations, and simple navigation.',
                "It's built with Next.js, GSAP, and Tailwind, giving the site fast performance, responsive layouts, and a clean premium look.",
              ],
            },
            {
              title: 'My approach',
              paragraphs: [
                'I started by researching the target audience to understand their needs, pain points, and decision-making process. That research showed that BEE status was important for government contracts, while product indications and medical clarity mattered most to doctors and pharmacists.',
                'From there, I focused on a user-friendly interface with clear calls to action, making it easy for healthcare professionals to find what they need while staying up to date with the latest products.',
                'I used GSAP animation to reduce friction and make the experience feel calm, polished, and trustworthy. I also designed the Shearon logo, created the front of the packaging in Figma, and produced mockups in Adobe.',
                'Because the client had a tight deadline, I moved straight into prototyping instead of designing the full website in Figma first. My design and systems experience helped me align business goals and user needs without slowing the project down.',
                'One of my favourite challenges was turning the legal information into something easier to use. I solved that with a carousel, making dense information feel more digestible and easier to navigate.',
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'shearonpharma.co.za',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://shearonpharma.co.za',
          position: 'top-10 right-8',
        },
        {
          id: 4,
          name: 'Junior_Tummy Up_Single.webp',
          icon: '/images/Junior_Tummy Up_Single.webp',
          kind: 'file',
          fileType: 'img',
          position: 'top-48 left-10',
          imageUrl: '/images/Junior_Tummy Up_Single.webp',
        },
        {
          id: 5,
          name: 'Adult_Energy_Single.webp',
          icon: '/images/Adult_Energy_Single.webp',
          kind: 'file',
          fileType: 'img',
          position: 'top-48 left-[15rem]',
          imageUrl: '/images/Adult_Energy_Single.webp',
        },
        {
          id: 6,
          name: 'Adult_Sport_Single.webp',
          icon: '/images/Adult_Sport_Single.webp',
          kind: 'file',
          fileType: 'img',
          position: 'top-48 left-[26rem]',
          imageUrl: '/images/Adult_Sport_Single.webp',
        },
        {
          id: 7,
          name: 'Adult_Tummy Down_Single.webp',
          icon: '/images/Adult_Tummy Down_Single.webp',
          kind: 'file',
          fileType: 'img',
          position: 'top-[20rem] left-10',
          imageUrl: '/images/Adult_Tummy Down_Single.webp',
        },
        {
          id: 8,
          name: 'Adult_Tummy_Up_Single.webp',
          icon: '/images/Adult_Tummy_Up_Single.webp',
          kind: 'file',
          fileType: 'img',
          position: 'top-[20rem] left-[15rem]',
          imageUrl: '/images/Adult_Tummy_Up_Single.webp',
        },
        {
          id: 9,
          name: 'Junior_Tummy Down_Single.webp',
          icon: '/images/Junior_Tummy Down_Single.webp',
          kind: 'file',
          fileType: 'img',
          position: 'top-[20rem] left-[26rem]',
          imageUrl: '/images/Junior_Tummy Down_Single.webp',
        },
        {
          id: 10,
          name: 'Shearon-Logo.svg',
          icon: '/images/Shearon-Logo.svg',
          kind: 'file',
          fileType: 'img',
          position: 'top-10 left-[15rem]',
          imageUrl: '/images/Shearon-Logo.svg',
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: 'Ai Sermon Workspace',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-52 right-80',
      windowPosition: 'top-[20vh] left-7',
      children: [
        {
          id: 1,
          name: 'Ai Sermon Workspace Project.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 right-10',
          description: [
            {
              title: 'Intro',
              paragraphs: [
                'Lighted is an AI-powered sermon preparation workspace built to help pastors and Bible teachers move from scattered ideas to structured, research-backed sermon material.',
                'The project combines voice transcription, theological research generation, and a rich document editor so users can begin a sermon in the way that feels most natural to them: by speaking a thought aloud, importing an existing Word document, or starting from a blank workspace.',
                'When a user records audio in the app or sends a voice note through Telegram, Lighted transcribes it with Whisper, generates an exegesis brief, and organizes the result into useful sermon-prep sections like original transcript, word studies, historical context, and outline points.',
                'The workspace also supports document import, autosaving, offline save recovery, research sidebars, copyable notes, denomination-aware preferences, and export to Word or PDF, turning the tool into more than a chatbot: it becomes a practical writing environment for ministry work.',
              ],
            },
            {
              title: 'Standout Features',
              paragraphs: [
                'Voice-to-brief workflow: users can record sermon thoughts directly in the app or send a Telegram voice note, then receive a structured exegesis brief.',
                'AI research pipeline: audio is transcribed with Groq Whisper and transformed into historical context, original-language insights, and sermon outline points.',
                'Sermon workspace: Lighted includes a TipTap editor with document import, autosave, offline recovery, formatting tools, and export to Word or PDF.',
                'Theological personalization: users can save denomination and church preferences so generated content better matches their ministry context.',
                'Persistent library: briefs are saved to a PostgreSQL database with search, filters, bookmarks, statuses, and user ownership checks.',
              ],
            },
            {
              title: 'My approach',
              paragraphs: [
                'I began by speaking to real users to understand how they prepare sermons, what challenges they face, and what they value most in the process.',
                'One of the key insights I discovered was that, while AI can help generate an entire sermon, many users felt that doing so would compromise the integrity of their message. They did not want AI to replace their own preparation, conviction, or voice.',
                'Instead, users wanted support that made the process easier without taking over the work. Based on this insight, we focused on building features that improved the sermon preparation workflow while keeping the user in control.',
                'This included features such as starting a sermon from a Telegram voice note, importing existing documents into Lighted, and continuing to develop sermon content within the platform.',
                'My approach was highly iterative and feedback-driven. I continuously gathered user feedback, identified the most valuable features to prioritize, aligned those decisions with business requirements, and then developed and refined the product accordingly.',
                'Figma was not used extensively because the project required fast movement and frequent adaptation. Instead, I applied systems thinking, product judgment, and design knowledge directly in the build process, allowing me to quickly test, iterate, and improve the experience based on real user needs.',
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'lighted.life',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://www.lighted.life/',
          position: 'top-20 left-20',
        },
        {
          id: 4,
          name: 'lighted.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 left-80',
          imageUrl: '/images/lighted.png',
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: 'Food Delivery App',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-10 left-80',
      windowPosition: 'top-[33vh] left-7',
      children: [
        {
          id: 1,
          name: 'Food Delivery App Project.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 left-10',
          description: [
            'Our Food Delivery App is a fast and convenient way to order meals from your favorite restaurants.',
            'Instead of making calls or waiting in line, you can browse menus, customize orders, and track deliveries in real time.',
            'Think of it like having your favorite restaurants in your pocket—ready to deliver anytime, anywhere.',
            'It’s built with React Native, so it works smoothly on both iOS and Android with a clean, modern design.',
          ],
        },
        {
          id: 2,
          name: 'food-delivery-app.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'paste-your-app-link-here.com',
          position: 'top-10 right-20',
        },
        {
          id: 4,
          name: 'food-delivery-app.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 right-80',
          imageUrl: '/images/project-3.png',
        },
        {
          id: 5,
          name: 'Design.fig',
          icon: '/images/plain.png',
          kind: 'file',
          fileType: 'fig',
          href: 'https://google.com',
          position: 'top-60 right-20',
        },
      ],
    },
  ],
}

const ABOUT_LOCATION = {
  id: 2,
  type: 'about',
  name: 'About me',
  icon: '/icons/info.svg',
  kind: 'folder',
  children: [
    {
      id: 1,
      name: 'me.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-10 left-5',
      imageUrl: '/images/sean.jpg',
    },
    {
      id: 2,
      name: 'casual-me.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-28 right-72',
      imageUrl: '/images/sean-2.jpg',
    },
    {
      id: 3,
      name: 'conference-me.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-52 left-80',
      imageUrl: '/images/sean-3.jpeg',
    },
    {
      id: 4,
      name: 'about-me.txt',
      icon: '/images/txt.png',
      kind: 'file',
      fileType: 'txt',
      position: 'top-60 left-5',
      subtitle: 'Meet the Developer Behind the Code',
      image: '/images/sean.jpg',
      description: [
        'Hey, I’m Sean 👋 I’m a developer and UI/UX engineer who loves building AI-powered apps, smooth web experiences, and useful automation tools.',
        'I work with Next.js, TypeScript, and React Native to turn ideas into products that feel clean, fast, and genuinely helpful 🚀',
        'I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.',
        "Outside of work, you'll find me experimenting with AI, sipping overpriced coffee, or soaking up nature with friends and family 🌿",
      ],
    },
  ],
}

const RESUME_LOCATION = {
  id: 3,
  type: 'resume',
  name: 'Resume',
  icon: '/icons/file.svg',
  kind: 'folder',
  children: [
    {
      id: 1,
      name: 'Resume.pdf',
      icon: '/images/pdf.png',
      kind: 'file',
      fileType: 'pdf',
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
}

const TRASH_LOCATION = {
  id: 4,
  type: 'trash',
  name: 'Trash',
  icon: '/icons/trash.svg',
  kind: 'folder',
  children: [
    {
      id: 1,
      name: 'trash1.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-10 left-10',
      imageUrl: '/images/trash-1.png',
    },
    {
      id: 2,
      name: 'trash2.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-40 left-80',
      imageUrl: '/images/trash-2.png',
    },
  ],
}

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
}

const INITIAL_Z_INDEX = 1000

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
}

export { INITIAL_Z_INDEX, WINDOW_CONFIG }
