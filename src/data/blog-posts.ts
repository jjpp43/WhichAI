export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  readTime: string;
  category: string;
  slug: string;
  featured: boolean;
  tags?: string[];
  image?: string; // Optional featured image for the post
}

export const blogPosts: BlogPost[] = [
  {
    id: "what-is-stable-diffusion",
    title: "What is Stable Diffusion?",
    excerpt:
      "Discover how to leverage AI tools to boost your productivity and creativity. This comprehensive guide covers everything from chatbots to image generation.",
    content: `
      <h2>Introduction to AI Tools</h2>
      <p>Stable Diffusion is a powerful generative AI model designed to create original, photorealistic images based on text or image prompts. First released in 2022, it has since expanded to support video and animation generation as well. Built on diffusion technology and operating in latent space, the model is efficient enough to run on personal computers with a capable GPU.

One of its standout features is how customizable it is—you can fine-tune it with just a handful of images using transfer learning. Unlike many earlier models, Stable Diffusion is open to the public under a permissive license, making it more accessible and flexible for a wide range of users.</p>
      
      <div class="my-8">
        <img src="/images/ai-tools-overview.jpg" alt="Overview of various AI tools and their applications" class="w-full rounded-lg shadow-md" />
        <p class="text-sm text-neutral-500 mt-2 text-center">AI tools are transforming how we work and create</p>
      </div>
      
      <h2>Why AI Tools Matter</h2>
      <p>AI tools can significantly boost your productivity by automating repetitive tasks, generating creative content, and providing insights that would take hours to discover manually. Whether you're a content creator, developer, or business professional, there's an AI tool that can help you work smarter, not harder.</p>
      
      <p>Imagine being able to generate high-quality content in minutes instead of hours, or having an AI assistant that can help you debug code and suggest improvements. These are just a few examples of how AI tools are changing the game.</p>
      
      <div class="my-8">
        <img src="/images/productivity-comparison.jpg" alt="Before and after comparison showing productivity improvements with AI tools" class="w-full rounded-lg shadow-md" />
        <p class="text-sm text-neutral-500 mt-2 text-center">AI tools can save hours of manual work</p>
      </div>
      
      <h2>Getting Started with AI Tools</h2>
      <p>Before diving into specific tools, it's important to understand the different categories of AI applications:</p>
      <ul>
        <li><strong>Chatbots and Language Models:</strong> Tools like ChatGPT, Claude, and Perplexity for text generation and conversation</li>
        <li><strong>Image Generation:</strong> Platforms like Midjourney, DALL-E, and Stable Diffusion for creating visual content</li>
        <li><strong>Productivity Tools:</strong> AI-powered assistants for writing, coding, and task management</li>
        <li><strong>Audio and Video:</strong> Tools for voice generation, video editing, and multimedia content</li>
      </ul>
      
      <div class="my-8">
        <img src="/images/ai-categories.jpg" alt="Visual representation of different AI tool categories" class="w-full rounded-lg shadow-md" />
        <p class="text-sm text-neutral-500 mt-2 text-center">The main categories of AI tools available today</p>
      </div>
      
      <h2>Choosing the Right AI Tools</h2>
      <p>With so many options available, it can be overwhelming to choose the right tools. Consider these factors:</p>
      <ul>
        <li><strong>Your specific needs:</strong> What problems are you trying to solve?</li>
        <li><strong>Budget:</strong> Many AI tools offer free tiers, but premium features often require payment</li>
        <li><strong>Learning curve:</strong> Some tools are more user-friendly than others</li>
        <li><strong>Integration:</strong> How well does the tool work with your existing workflow?</li>
      </ul>
      
      <p>It's important to start with tools that align with your current workflow and gradually expand as you become more comfortable with AI technology.</p>
      
      <div class="my-8">
        <img src="/images/tool-selection-guide.jpg" alt="Decision tree for choosing the right AI tools" class="w-full rounded-lg shadow-md" />
        <p class="text-sm text-neutral-500 mt-2 text-center">Use this guide to choose the right AI tools for your needs</p>
      </div>
      
      <h2>Best Practices for Using AI Tools</h2>
      <p>To get the most out of AI tools, follow these best practices:</p>
      <ol>
        <li><strong>Start with free tiers:</strong> Most AI tools offer free versions to test before committing</li>
        <li><strong>Learn the prompts:</strong> The quality of your output depends heavily on how you communicate with AI</li>
        <li><strong>Combine multiple tools:</strong> Use different AI tools together for better results</li>
        <li><strong>Stay updated:</strong> The AI landscape is rapidly evolving, so keep learning</li>
      </ol>
      
      <div class="my-8">
        <img src="/images/ai-workflow.jpg" alt="Example workflow showing how to combine multiple AI tools" class="w-full rounded-lg shadow-md" />
        <p class="text-sm text-neutral-500 mt-2 text-center">A typical workflow combining multiple AI tools</p>
      </div>
      
      <h2>Conclusion</h2>
      <p>AI tools are not just a trend—they're the future of work and creativity. By starting with the right tools and following best practices, you can unlock new possibilities and achieve more than ever before.</p>
      
      <div class="my-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
        <img src="/images/future-ai.jpg" alt="Vision of the future with AI tools" class="w-full rounded-lg shadow-md" />
        <p class="text-sm text-neutral-500 mt-2 text-center">The future of work is AI-powered</p>
      </div>
    `,
    author: "AI Tools Hub",
    publishedDate: "2024-01-15",
    readTime: "8 min read",
    category: "AI Guides",
    slug: "getting-started-with-ai-tools",
    featured: true,
    tags: ["AI", "beginners", "productivity", "guides"],
    image: "/images/ai-tools.jpg",
  },
  {
    id: "top-ai-chatbots-2024",
    title: "Top 10 AI Chatbots That Will Transform Your Workflow in 2024",
    excerpt:
      "Explore the most powerful AI chatbots available today and learn how they can streamline your communication and content creation.",
    content: `
      <h2>The Rise of AI Chatbots</h2>
      <p>AI chatbots have evolved far beyond simple customer service tools. Today's advanced language models can help with writing, coding, research, and creative tasks. Here are the top 10 AI chatbots that are making waves in 2024.</p>
      
      <h2>1. ChatGPT (OpenAI)</h2>
      <p>ChatGPT remains the gold standard for AI chatbots. With its GPT-4 model, it excels at creative writing, coding, analysis, and conversation. The paid version offers even more advanced capabilities.</p>
      
      <h2>2. Claude (Anthropic)</h2>
      <p>Claude is known for its safety-focused approach and excellent reasoning capabilities. It's particularly strong at analysis, writing, and handling complex tasks.</p>
      
      <h2>3. Perplexity AI</h2>
      <p>Perplexity combines the power of AI with real-time web search, making it excellent for research and finding current information.</p>
      
      <h2>4. Gemini (Google)</h2>
      <p>Google's Gemini offers strong multimodal capabilities, understanding both text and images. It's particularly good at creative tasks and analysis.</p>
      
      <h2>5. Pi (Inflection AI)</h2>
      <p>Pi is designed to be more conversational and empathetic, making it great for brainstorming and creative collaboration.</p>
      
      <h2>Conclusion</h2>
      <p>Each of these chatbots has unique strengths. The key is to experiment and find the ones that best fit your specific needs and workflow.</p>
    `,
    author: "AI Tools Hub",
    publishedDate: "2024-01-10",
    readTime: "6 min read",
    category: "AI Tools",
    slug: "top-ai-chatbots-2024",
    featured: false,
    tags: ["chatbots", "AI", "productivity", "tools"],
    image: "/images/ai-chatbots.jpg",
  },
  {
    id: "ai-image-generation-comparison",
    title:
      "Midjourney vs DALL-E vs Stable Diffusion: Which AI Image Generator is Best?",
    excerpt:
      "A detailed comparison of the top AI image generation tools, including pricing, features, and use cases for each platform.",
    content: `
      <h2>AI Image Generation Landscape</h2>
      <p>The field of AI image generation has exploded with powerful tools that can create stunning visuals from text descriptions. Let's compare the three most popular options.</p>
      
      <div class="my-8">
        <img src="/images/midjourney-example.jpg" alt="Midjourney AI generated image example" class="w-full rounded-lg shadow-md" />
        <p class="text-sm text-neutral-500 mt-2 text-center">Example of Midjourney's artistic style</p>
      </div>
      
      <h2>Midjourney</h2>
      <p>Midjourney is known for its artistic and creative outputs. It excels at creating beautiful, stylized images with a strong artistic flair.</p>
      <ul>
        <li><strong>Strengths:</strong> Artistic quality, creative styles, community features</li>
        <li><strong>Best for:</strong> Creative projects, concept art, artistic exploration</li>
        <li><strong>Pricing:</strong> Subscription-based model</li>
      </ul>
      
      <h2>DALL-E (OpenAI)</h2>
      <p>DALL-E offers excellent integration with other OpenAI tools and is known for its ability to follow detailed prompts accurately.</p>
      
      <div class="my-8">
        <img src="/images/dalle-example.jpg" alt="DALL-E AI generated image example" class="w-full rounded-lg shadow-md" />
        <p class="text-sm text-neutral-500 mt-2 text-center">DALL-E's precise prompt following</p>
      </div>
      
      <ul>
        <li><strong>Strengths:</strong> Prompt accuracy, integration, ease of use</li>
        <li><strong>Best for:</strong> Commercial projects, precise requirements</li>
        <li><strong>Pricing:</strong> Pay-per-use model</li>
      </ul>
      
      <h2>Stable Diffusion</h2>
      <p>Stable Diffusion is open-source and offers the most flexibility for customization and local deployment.</p>
      <ul>
        <li><strong>Strengths:</strong> Customization, local deployment, cost-effective</li>
        <li><strong>Best for:</strong> Developers, custom solutions, privacy-focused users</li>
        <li><strong>Pricing:</strong> Free (self-hosted) or various hosted options</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The best choice depends on your specific needs. Midjourney for creativity, DALL-E for precision, and Stable Diffusion for customization.</p>
    `,
    author: "AI Tools Hub",
    publishedDate: "2024-01-05",
    readTime: "10 min read",
    category: "AI Comparison",
    slug: "ai-image-generation-comparison",
    featured: false,
    tags: ["image generation", "AI", "comparison", "Midjourney", "DALL-E"],
    image: "/images/ai-image-comparison.jpg",
  },
  {
    id: "ai-productivity-tools",
    title: "10 AI Productivity Tools That Will Save You Hours Every Day",
    excerpt:
      "Discover AI-powered tools that can automate repetitive tasks and help you focus on what matters most in your work.",
    content: `
      <h2>AI-Powered Productivity Revolution</h2>
      <p>AI tools are transforming how we work by automating repetitive tasks and enhancing our capabilities. Here are 10 tools that can save you hours every day.</p>
      
      <h2>1. Notion AI</h2>
      <p>Notion AI helps you write, edit, and organize content within your workspace. It can generate ideas, summarize documents, and help with project management.</p>
      
      <h2>2. GrammarlyGO</h2>
      <p>GrammarlyGO goes beyond grammar checking to help you write better content faster. It can rewrite sentences, generate ideas, and improve your writing style.</p>
      
      <h2>3. Cursor (AI-Powered Code Editor)</h2>
      <p>Cursor combines the power of AI with a code editor, helping developers write code faster and debug more efficiently.</p>
      
      <h2>4. GitHub Copilot</h2>
      <p>GitHub Copilot is an AI pair programmer that helps you write code faster by suggesting completions and entire functions.</p>
      
      <h2>5. Jasper</h2>
      <p>Jasper is a powerful AI writing assistant that can help create marketing copy, blog posts, and other content quickly.</p>
      
      <h2>Conclusion</h2>
      <p>These AI tools can significantly boost your productivity. Start with one or two that fit your workflow and gradually integrate more as you become comfortable.</p>
    `,
    author: "AI Tools Hub",
    publishedDate: "2024-01-01",
    readTime: "7 min read",
    category: "Productivity",
    slug: "ai-productivity-tools",
    featured: false,
    tags: ["productivity", "AI", "tools", "automation"],
    image: "/images/ai-productivity.jpg",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getRegularPosts(): BlogPost[] {
  return blogPosts.filter((post) => !post.featured);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}
