import Image from "next/image";
export default function PopularJuicesList() {
  return (
    <div>
      <h5>Popular Juices</h5>
      <ul className="list-unstyled pt-3">
        <li className="d-flex align-items-center mb-2">
          <Image src="/images/thumb/thumb_apple.png" alt="Apple Juice" width={60} height={50} style={{ borderRadius: "10%" }} />
          <a href="#" className="text-white text-decoration-none ms-2">Apple Juice</a>
        </li>
      </ul>
    </div>
  );
}
