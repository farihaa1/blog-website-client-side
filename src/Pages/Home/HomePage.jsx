import AboutPage from "./AboutPage/AboutPage";
import Banner from "./Banner";
import FeaturedBloggers from "./FeaturedBloggers";
import Newsletter from "./Newsletter";
import RecentBlogs from "./RecentBlogs";

const HomePage = () => {
  return (
    <div>
      <header>
        <Banner></Banner>
      </header>
      <main>
        <RecentBlogs></RecentBlogs>
      </main>
      <section>
        <AboutPage></AboutPage>
      </section>
      <section>
        <FeaturedBloggers></FeaturedBloggers>
      </section>
      <section>
        <Newsletter></Newsletter>
      </section>
    </div>
  );
};

export default HomePage;
