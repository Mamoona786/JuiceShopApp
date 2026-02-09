import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="text-center py-5" style={{ backgroundImage: "url('/images/Banner.png')", backgroundSize: "cover", borderBottom: "4px solid #cc5291" }}>
      <div className="container">
        <h1 className="display-4 text-white">Fresh, Delicious Juices Delivered to You</h1>
        <p className="lead sub-text">Experience the taste of nature with our all-natural, freshly squeezed juices.</p>
        <Link href="#" className="btn btn-pink btn-lg mt-3"><i className="fa fa-list" /> Explore Our Menu</Link>
      </div>
    </section>
  );
}
