import { toolDefinition } from '@tanstack/ai';
import { z } from 'zod';
import { searchPersonalInfo, getProjects, getSkills, getWebsites } from './knowledge-base';

// Tool to get personal information
export const getPersonalInfoTool = toolDefinition({
  name: 'getPersonalInfo',
  description: 'Get personal information about Itamar Sharify',
  inputSchema: z.object({
    query: z.string().describe('The specific information to search for (name, profession, skills, projects, etc.)')
  }),
  outputSchema: z.object({
    response: z.string().describe('The response with personal information')
  }),
}).server(async ({ query }) => {
  const response = searchPersonalInfo(query);
  return { response };
});

// Tool to get projects
export const getProjectsTool = toolDefinition({
  name: 'getProjects',
  description: 'Get information about Itamar\'s projects',
  inputSchema: z.object({
    category: z.string().optional().describe('Optional category filter for projects')
  }),
  outputSchema: z.object({
    projects: z.array(z.object({
      slug: z.string(),
      title: z.string(),
      summary: z.string(),
      category: z.string()
    })).describe('List of projects')
  }),
}).server(async ({ category }) => {
  const projects = getProjects();
  const filteredProjects = category 
    ? projects.filter(p => p.category.toLowerCase().includes(category.toLowerCase()))
    : projects;
  
  return { projects: filteredProjects };
});

// Tool to get skills
export const getSkillsTool = toolDefinition({
  name: 'getSkills',
  description: 'Get information about Itamar\'s technical skills',
  inputSchema: z.object({}),
  outputSchema: z.object({
    skills: z.array(z.string()).describe('List of technical skills')
  }),
}).server(async () => {
  const skills = getSkills();
  return { skills };
});

// Tool to get websites
export const getWebsitesTool = toolDefinition({
  name: 'getWebsites',
  description: 'Get information about Itamar\'s websites and external projects',
  inputSchema: z.object({}),
  outputSchema: z.object({
    websites: z.array(z.object({
      name: z.string(),
      title: z.string(),
      summary: z.string(),
      link: z.string()
    })).describe('List of websites')
  }),
}).server(async () => {
  const websites = getWebsites();
  return { websites };
});

// Export all tools for use in chat
export const chatTools = [
  getPersonalInfoTool,
  getProjectsTool,
  getSkillsTool,
  getWebsitesTool
];
