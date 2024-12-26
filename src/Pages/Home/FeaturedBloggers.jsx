const FeaturedBloggers = () => {
    const bloggers = [
      {
        id: 1,
        name: "Alice Johnson",
        profileImage: "https://i.ibb.co.com/Yj9hZGn/3135715.png",
        tagline: "Tech Enthusiast",
        popularBlog: "How AI is Changing the World",
      },
      {
        id: 2,
        name: "John Doe",
        profileImage: "https://i.ibb.co.com/0qTN7N6/images-q-tbn-ANd9-Gc-T2-x5v-E0brbo-Tx-Yw-en-QTr0nua-GSVAIdn0dw-s.jpg",
        tagline: "Travel Blogger",
        popularBlog: "Top 10 Destinations in 2024",
      },
      {
        id: 3,
        name: "Emily Clark",
        profileImage: "https://i.ibb.co.com/jhZTLCj/aesthetic-cute-muslim-girl-with-hijab-flat-detailed-avatar-illustration-beautiful-muslim-woman-hijab.jpg",
        tagline: "Food & Recipe Lover",
        popularBlog: "5 Delicious Vegan Recipes You Need to Try",
      },
      {
        id: 4,
        name: "Mark Smith",
        profileImage: "https://i.ibb.co.com/Yj9hZGn/3135715.png",
        tagline: "Fitness Expert",
        popularBlog: "How to Stay Fit While Traveling",
      },
     
    ];
  
    return (
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <h2 className="text-2xl md:text-4xl font-semibold mb-6">
          Meet Our Featured Bloggers
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-4 pb-12">
          {bloggers.map((blogger) => (
            <div
              key={blogger.id}
              className="border rounded-lg p-4 shadow-lg flex flex-col items-center md:p-8"
            >
              <img
                src={blogger.profileImage}
                alt={blogger.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <h3 className="text-lg font-bold mt-4">{blogger.name}</h3>
              <p className="text-gray-600">{blogger.tagline}</p>
              <p className="text-sm text-primary mt-2 text-center">
                Popular Blog: {blogger.popularBlog}
              </p>
              <button className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-blue-600">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FeaturedBloggers;
  