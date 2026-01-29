export interface PersonalInfo {
  name: string;
  title: string;
  profession: string;
  languages: string[];
  projects: Project[];
  websites: Website[];
  skills: string[];
  contact: {
    email: boolean;
    message: boolean;
  };
  workExperience: WorkExperience[];
  education: string[];
  properties: string[];
}

export interface WorkExperience {
  title: string;
  duration: {
    from: number;
    to: number | string;
  };
  company: {
    name: string;
    website: string;
  };
  tags: string[];
  description: string;
  elaboratedDescription: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  category: string;
}

export interface Website {
  name: string;
  title: string;
  summary: string;
  link: string;
}

export const personalKnowledgeBase: PersonalInfo = {
  name: "Itamar Sharify",
  title: "Itamar Sharify",
  profession: "Software Engineer",
  languages: ["English", "Hebrew"],
  projects: [
    {
      slug: "charts-communications",
      title: "Chart Communications",
      summary: "A simple example of a chart communications app.",
      category: "Example"
    },
    {
      slug: "generator-traffic",
      title: "Generator Traffic",
      summary: "A simple example of a traffic cross app using generators.",
      category: "Example"
    },
    {
      slug: "translated-text",
      title: "Translated Text",
      summary: "A simple example of a translated text implementation.",
      category: "Example"
    },
    {
      slug: "proxy-state",
      title: "Proxy State",
      summary: "A simple example of a proxy state implementation without using setState.",
      category: "Example"
    },
    {
      slug: "ai-chat",
      title: "AI Chat",
      summary: "A simple example of an AI chat implementation.",
      category: "Example"
    }
  ],
  websites: [
    {
      name: "hakapit",
      title: "Hakapit",
      summary: "Liverpool fan podcasts",
      link: "https://hakapit.online"
    },
    {
      name: "reactwind",
      title: "Reactwind",
      summary: "A library adding tailwind as jsx props",
      link: "https://reactwind.itamar.dev"
    }
  ],
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Bun",
    "Node.js",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development"
  ],
  contact: {
    email: true,
    message: true
  },
  workExperience: [
    {
      title: "Software Engineering T.A. (part time)",
      duration: { from: 2015, to: 2016 },
      company: {
        name: "Azrieli College of Engineering",
        website: "https://www.jce.ac.il"
      },
      tags: ["Angular.js", "Node.js", "Javascript", "CSS", "Teaching"],
      description: "Teaching Assistant; Teaching the MEAN stack and acting as a Scrum Master.",
      elaboratedDescription: "Teaching and helping students to build a full project and deploy it in one semester. Helping students to create a production ready project for NPOs for extra credit"
    },
    {
      title: "Web Developer (part time)",
      duration: { from: 2015, to: 2016 },
      company: {
        name: "WishTrip",
        website: "https://www.wishtrip.com/"
      },
      tags: ["Angular.js", "OpenMaps", "Socket.io", "Node.js", "Javascript", "CSS"],
      description: "Creating the company main website from scratch, Building live map user tracking and live chat between users",
      elaboratedDescription: "Bootstrap the company main site from 0 to hero"
    },
    {
      title: "Full-stack developer",
      duration: { from: 2016, to: 2019 },
      company: {
        name: "Koalys",
        website: "http://www.koalys.com/"
      },
      tags: ["React.js", "ClojureScript", "Ruby On Rails", "WebRTC", "Socket.io", "Javascript", "CSS"],
      description: "2 PWA applications help designing and creating tools for internal use",
      elaboratedDescription: ""
    },
    {
      title: "Full-stack Developer",
      duration: { from: 2019, to: 2020 },
      company: {
        name: "Imubit",
        website: "https://www.imubit.com/"
      },
      tags: ["React.js", "Python", "GitLab CI", "Javascript", "CSS"],
      description: "Helping to build the company customer facing application Help recruiting new wev-devs to the team",
      elaboratedDescription: ""
    },
    {
      title: "Python Developer",
      duration: { from: 2020, to: 2022 },
      company: {
        name: "Imubit",
        website: "https://www.imubit.com/"
      },
      tags: ["Python", "JupyterLab", "Javascript", "CSS"],
      description: "Building internal tools for the company field engineers",
      elaboratedDescription: ""
    },
    {
      title: "Full-stack developer",
      duration: { from: 2022, to: "Present" },
      company: {
        name: "Imubit",
        website: "https://www.imubit.com/"
      },
      tags: ["Python", "Go", "JupyterLab", "Javascript", "Typescript", "React", "CSS"],
      description: "Building the next generation of the company customer facing application",
      elaboratedDescription: ""
    },
    {
      title: "Frontend guild leader",
      duration: { from: 2023, to: "Present" },
      company: {
        name: "Imubit",
        website: "https://www.imubit.com/"
      },
      tags: ["Go", "Javascript", "Typescript", "React", "CSS"],
      description: "Managing the frontend guild and pushing the frontend need forward",
      elaboratedDescription: ""
    }
  ],
  education: ["B.Sc. Software Engineering"],
  properties: [
    "Go-getter",
    "Friendly",
    "Communicative",
    "Eagerness",
    "Auto-didactic"
  ]
};

export const getPersonalInfo = (): PersonalInfo => {
  return personalKnowledgeBase;
};

export const getProjects = (): Project[] => {
  return personalKnowledgeBase.projects;
};

export const getWebsites = (): Website[] => {
  return personalKnowledgeBase.websites;
};

export const getSkills = (): string[] => {
  return personalKnowledgeBase.skills;
};

export const getWorkExperience = (): WorkExperience[] => {
  return personalKnowledgeBase.workExperience;
};

export const getEducation = (): string[] => {
  return personalKnowledgeBase.education;
};

export const getProperties = (): string[] => {
  return personalKnowledgeBase.properties;
};

export const searchPersonalInfo = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  const info = personalKnowledgeBase;

  // Search in different sections
  if (lowerQuery.includes('name') || lowerQuery.includes('who')) {
    return `My name is ${info.name} and I'm a ${info.profession}.`;
  }

  if (lowerQuery.includes('project') || lowerQuery.includes('work')) {
    const projectList = info.projects.map(p => `- ${p.title}: ${p.summary}`).join('\n');
    return `Here are my projects:\n${projectList}`;
  }

  if (lowerQuery.includes('skill') || lowerQuery.includes('technology')) {
    return `My skills include: ${info.skills.join(', ')}.`;
  }

  if (lowerQuery.includes('website') || lowerQuery.includes('site')) {
    const websiteList = info.websites.map(w => `- ${w.title}: ${w.summary} (${w.link})`).join('\n');
    return `My websites:\n${websiteList}`;
  }

  if (lowerQuery.includes('contact') || lowerQuery.includes('email')) {
    return `You can contact me through the email form on this website. I'm open to job opportunities and collaborations.`;
  }

  if (lowerQuery.includes('language')) {
    return `I speak ${info.languages.join(' and ')}.`;
  }

  // Default response
  return `I'm ${info.name}, a ${info.profession}. I've worked on various projects including web applications, examples, and tools. You can ask me about my projects, skills, websites, or how to contact me.`;
};
