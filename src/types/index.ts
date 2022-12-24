interface project_member {
  name: string;
  project_name: string;
  skill: string;
  xp: number;
  id?: string;
}
interface projects {
  id?: string;
  project_name: string;
  total_xp: number;
  lead_name: string;
  members?: project_member[];
}
interface XpBySkills {
  name: string;
  personType: string;
  writing: number;
  development: number;
  desgin: number;
  video: number;
  OPs: number;
  Strategy: number;
  Total: number;
  Last_Updated: string;
}
interface XpByWork {
  name: string;
  personType: string;
  Project: number;
  Indie: number;
  Team: number;
  Bounty: number;
  CAB: number;
  Total: number;
}
export { project_member, projects, XpBySkills, XpByWork };
