import Image from "next/image";
export default function AboutSection() {
  return (
    <div>
      <Image src="/images/logo.png" alt="Juice Shop Logo" width={120} height={48} className="mb-3" />
      <h5>About Juice Shop</h5>
      <p>Welcome to Juice Shop, where we offer the freshest juices made from high quality ingredients. Enjoy our wide variety of flavors designed to satisfy every taste.</p>
    </div>
  );
}
