import AboutSection from "@/components/home/AboutSection";
import PopularJuicesList from "@/components/home/PopularJuicesList";
import SubscribeAndSocialLinks from "@/components/home/SubscribeAndSocialLinks";

export default function Footer() {
  return (
    <footer className="text-white" style={{ backgroundColor: "#ff66b2" }}>
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-4"><AboutSection /></div>
          <div className="col-md-4"><PopularJuicesList /></div>
          <div className="col-md-4"><SubscribeAndSocialLinks /></div>
        </div>
      </div>
      <div className="mt-2 py-3 bg-footer">
        <div className="col text-center"><p className="mb-0">&copy; 2025 Juice Shop. All rights reserved.</p></div>
      </div>
    </footer>
  );
}
