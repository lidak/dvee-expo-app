import { Post } from "@/types/post";

export const POSTS: Post[] = [
  {
    id: "1",
    user: {
      name: "Marta V.",
      handle: "marta.v",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&auto=format",
    },
    timestamp: "2h ago",
    left: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=800&fit=crop&auto=format",
      alt: "Tropical beach at sunrise",
      caption: "Where I want to be",
      likes: 247,
      comments: [
        {
          id: "lc1",
          user: "anna.k",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
          text: "This place looks magical! 🌅",
        },
        {
          id: "lc2",
          user: "oleh_d",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
          text: "Did you actually go there? So jealous",
        },
      ],
    },
    right: {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=800&fit=crop&auto=format",
      alt: "Mountain landscape at golden hour",
      caption: "Where I actually am",
      likes: 189,
      comments: [
        {
          id: "rc1",
          user: "sofia.m",
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop",
          text: "Mountains hit different in autumn 🍂",
        },
        {
          id: "rc2",
          user: "ivan.p",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
          text: "Not bad at all tbh!",
        },
      ],
    },
  },
  {
    id: "ad-1",
    user: {
      name: "Amazon Web Services",
      handle: "aws",
      avatar:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=64&h=64&fit=crop&auto=format",
    },
    timestamp: "Sponsored",
    ad: {
      right: { link: "https://aws.amazon.com", ctaLabel: "Explore AWS →" },
    },
    left: {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop&auto=format",
      alt: "Overcrowded on-premise server room",
      caption: "Before the cloud",
      likes: 0,
      comments: [
        {
          id: "adlc1",
          user: "devops.ua",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
          text: "Been there. 3am reboots every week 😩",
        },
      ],
    },
    right: {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=800&fit=crop&auto=format",
      alt: "Modern cloud infrastructure",
      caption: "After AWS",
      likes: 0,
      comments: [
        {
          id: "adrc1",
          user: "startup.cto",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
          text: "We went from 2-week deploys to 10x a day 🚀",
        },
      ],
    },
  },
  {
    id: "2",
    user: {
      name: "Kyiv Days",
      handle: "kyiv.days",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&auto=format",
    },
    timestamp: "5h ago",
    left: {
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop&auto=format",
      alt: "Cozy coffee shop morning",
      caption: "My morning ritual",
      likes: 512,
      comments: [
        {
          id: "lc3",
          user: "lena.w",
          avatar:
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop",
          text: "The best way to start a day ☕",
        },
      ],
    },
    right: {
      url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=800&fit=crop&auto=format",
      alt: "City skyline at night",
      caption: "My midnight ritual",
      likes: 398,
      comments: [
        {
          id: "rc3",
          user: "tanya.b",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop",
          text: "The city never sleeps 🌃",
        },
      ],
    },
  },
];
