// components/cyber-rant/constants.ts

export const sidebarLinks = [
  { imgURL: '/cyberrant/dashboardrant.png', route: '/cyber-rant', label: 'Cyber-Home' },
  { imgURL: '/cyberrant/search.png', route: '/cyber-rant/search', label: 'Search' },
  { imgURL: '/cyberrant/activity.png', route: '/cyber-rant/activity', label: 'Activity' },
  { imgURL: '/cyberrant/createrants.png', route: '/cyber-rant/create-rants', label: 'Create Rants', },
  { imgURL: '/cyberrant/communities.png', route: '/cyber-rant/communities', label: 'CyberTribes', },
  { imgURL: '/cyberrant/profile.png', route: '/cyber-rant/profile', label: 'Profile' },
];

export const profileTabs = [
  { value: 'CyberRant', label: 'CyberRant', icon: '/cyberrant/reply-dark.png' },
  { value: 'replies', label: 'Replies', icon: '/cyberrant/tabreplies.png' },
  { value: 'tagged', label: 'Tagged', icon: '/cyberrant/hash.png' },
];

export const communityTabs = [
  { value: 'CyberRants', label: 'CyberRants', icon: '/cyberrant/reply-dark.png' },
  { value: 'members', label: 'Members', icon: '/cyberrant/members.png' },
  { value: 'requests', label: 'Requests', icon: '/cyberrant/requests.png' },
];
