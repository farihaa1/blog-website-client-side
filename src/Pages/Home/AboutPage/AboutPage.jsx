import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h4 className="text-2xl md:text-4xl font-semibold text-center mb-6">
        Create, Share, and Engage with BlogWeb Blog Site
      </h4>

      <p className="text-center mb-8">
        BlogWeb is more than just a blog platform; it's a community where creators, writers, and readers come together to share ideas, stories, and knowledge.
      </p>

      <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
        <figure className="flex-1">
          <img src="path/to/your-image1.jpg" alt="Powerful Blogs" className="w-full h-auto rounded-lg shadow-lg" />
        </figure>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">POWERFUL Blogs</h3>
          <ul className="list-disc pl-5">
            <li>
              BlogWeb’s easy-to-use editor empowers you to create rich, interactive blog posts with media, links, and more.
            </li>
            <li>
              Enhance your content with embedded videos, images, and code snippets, making it easy to share your thoughts clearly and creatively.
            </li>
          </ul>
          <div className="mt-4">
            <p className="text-lg text-gray-500">Categories: Technology, Lifestyle, Education, Business</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
        <figure className="flex-1">
          <img src="path/to/your-image2.jpg" alt="Real-Time Collaboration" className="w-full h-auto rounded-lg shadow-lg" />
        </figure>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Keep EVERYONE On the Same Page</h3>
          <ul className="list-disc pl-5">
            <li>
              Collaborate seamlessly with fellow bloggers, readers, and contributors in real-time through comments and live editing.
            </li>
            <li>
              Stay connected and keep your audience engaged with real-time notifications and updates on your blog posts.
            </li>
          </ul>
          <div className="mt-4">
            <p className="text-lg text-gray-500">Real-Time Collaboration</p>
            <p className="text-lg text-gray-500">Comments & Engagement</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
        <figure className="flex-1">
          <img src="path/to/your-image3.jpg" alt="Organized Workspaces" className="w-full h-auto rounded-lg shadow-lg" />
        </figure>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">ORGANIZE Your Content with Ease</h3>
          <ul className="list-disc pl-5">
            <li>
              Organize your blogs into categories, tags, and collections to make it easy for readers to find what they love.
            </li>
            <li>
              BlogWeb allows for seamless scalability, ensuring you can grow your content and audience while keeping things neatly organized.
            </li>
          </ul>
          <div className="mt-4">
            <p className="text-lg text-gray-500">Category Management</p>
            <p className="text-lg text-gray-500">Content Organization</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-xl font-semibold mb-4">
          Ready to share your story? Join the BlogWeb community today!
        </p>
        <a href="/signup" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
          Start Writing Now
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
